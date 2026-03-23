import logging
import random, string, datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.models.payment import Payment
from app.models.availability import SafariAvailability
from app.services.pesapal import pesapal
from app.services.email import send_booking_confirmation
from app.services import sms as sms_svc
from app.config import settings
from pydantic import BaseModel, EmailStr

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/bookings", tags=["bookings"])

PEAK_MONTHS = {7, 8, 9, 10}   # Jul–Oct Great Migration
LOW_MONTHS  = {4, 5}           # Apr–May long rains


def get_season(date: datetime.date) -> tuple[str, float]:
    if date.month in PEAK_MONTHS:
        return "peak", 1.35
    if date.month in LOW_MONTHS:
        return "low", 0.75
    return "standard", 1.0


def get_price_usd(safari: Safari, pax: int) -> tuple[float, int] | tuple[None, None]:
    """Return (group_total_usd, tier_pax). Price fields are per-group totals, not per-person."""
    if pax == 1 and safari.price_usd_solo:
        return float(safari.price_usd_solo), 1
    if pax <= 3 and safari.price_usd_2pax:
        return float(safari.price_usd_2pax), 2
    if pax <= 5 and safari.price_usd_4pax:
        return float(safari.price_usd_4pax), 4
    if safari.price_usd_6pax:
        return float(safari.price_usd_6pax), 6
    return None, None


class BookingIntent(BaseModel):
    safari_slug:    str
    travel_date:    str | None = None
    pax:            int | None = None
    customer_email: str
    customer_name:  str | None = None
    customer_phone: str | None = None


@router.post("/intent")
async def save_booking_intent(data: BookingIntent, db: AsyncSession = Depends(get_db)):
    """Save a partial booking intent — fired before the customer completes payment.
    Used for abandoned-cart recovery via WhatsApp/email follow-up."""
    from app.models.enquiry import Enquiry
    enquiry = Enquiry(
        customer_name=data.customer_name or "Prospective Guest",
        customer_email=data.customer_email,
        customer_phone=data.customer_phone,
        travel_date_from=data.travel_date,
        group_size=data.pax,
        special_requests=f"Safari: {data.safari_slug}",
        source="booking_intent",
        status="new",
    )
    db.add(enquiry)
    try:
        await db.commit()
    except Exception:
        await db.rollback()
    return {"saved": True}


# ---------------------------------------------------------------------------
# Promo / affiliate codes
# ---------------------------------------------------------------------------
# Format: CODE -> { discount_pct, description, type }
# type: "percentage" only for now.  Move to DB when you need dynamic codes.
PROMO_CODES: dict[str, dict] = {
    "ENGAI10":   {"discount_pct": 10, "description": "10% welcome discount"},
    "ENGAI15":   {"discount_pct": 15, "description": "15% loyalty discount"},
    "HONEY20":   {"discount_pct": 20, "description": "20% honeymoon special"},
    "FAMILY10":  {"discount_pct": 10, "description": "10% family safari discount"},
    "AGENT5":    {"discount_pct":  5, "description": "5% agent referral discount"},
}


class PromoValidate(BaseModel):
    code: str


@router.post("/validate-promo")
async def validate_promo(data: PromoValidate):
    """Return discount info for a promo/affiliate code, or 404 if invalid."""
    promo = PROMO_CODES.get(data.code.strip().upper())
    if not promo:
        raise HTTPException(404, "Invalid or expired promo code")
    return {"code": data.code.upper(), **promo}


class BookingCreate(BaseModel):
    safari_slug:      str
    travel_date:      str          # YYYY-MM-DD
    pax:              int
    customer_name:    str
    customer_email:   EmailStr
    customer_phone:   str
    customer_country: str | None = None
    celebration:      str | None = None
    special_requests: str | None = None
    promo_code:       str | None = None


class PricePreview(BaseModel):
    safari_slug:  str
    travel_date:  str
    pax:          int


@router.post("/preview")
async def price_preview(data: PricePreview, db: AsyncSession = Depends(get_db)):
    """Return price breakdown before booking — used by the frontend to show live pricing."""
    result = await db.execute(select(Safari).where(Safari.slug == data.safari_slug, Safari.is_active == True))
    safari = result.scalar_one_or_none()
    if not safari:
        raise HTTPException(404, "Safari not found")

    try:
        date = datetime.date.fromisoformat(data.travel_date)
    except ValueError:
        raise HTTPException(400, "Invalid date")

    pax = max(1, min(data.pax, safari.group_size_max))
    season, multiplier = get_season(date)
    group_usd, tier_pax = get_price_usd(safari, pax)
    if not group_usd:
        raise HTTPException(400, "No pricing available for this group size")

    # group_usd is the total for tier_pax people; derive per-person then scale to actual pax
    usd_pp = group_usd / tier_pax
    total_usd = round(usd_pp * pax * multiplier, 2)
    total_kes = round(total_usd * settings.USD_TO_KES, 0)
    deposit_kes = round(total_kes * safari.deposit_pct / 100, 0)
    balance_kes = total_kes - deposit_kes

    return {
        "safari_name":   safari.name,
        "duration_days": safari.duration_days,
        "cover_image":   safari.cover_image,
        "pax":           pax,
        "season":        season,
        "multiplier":    multiplier,
        "base_usd_pp":   round(usd_pp, 2),
        "total_usd":     total_usd,
        "total_kes":     total_kes,
        "deposit_kes":   deposit_kes,
        "balance_kes":   balance_kes,
        "deposit_pct":   safari.deposit_pct,
        "installments_ok": safari.installments_ok,
    }


@router.post("")
async def create_booking(data: BookingCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Safari).where(Safari.slug == data.safari_slug, Safari.is_active == True))
    safari = result.scalar_one_or_none()
    if not safari:
        raise HTTPException(404, "Safari not found")

    try:
        date = datetime.date.fromisoformat(data.travel_date)
    except ValueError:
        raise HTTPException(400, "Invalid date")

    # Availability check — reject blocked or full dates
    avail_result = await db.execute(
        select(SafariAvailability).where(
            SafariAvailability.safari_id == safari.id,
            SafariAvailability.date == date,
        )
    )
    avail = avail_result.scalar_one_or_none()
    if avail and avail.status in ("blocked", "full"):
        raise HTTPException(409, f"This date is {avail.status}. Please choose another date.")

    pax = max(1, min(data.pax, safari.group_size_max))
    season, multiplier = get_season(date)
    group_usd, tier_pax = get_price_usd(safari, pax)
    if not group_usd:
        raise HTTPException(400, "No pricing for this group size")

    usd_pp = group_usd / tier_pax
    total_usd = round(usd_pp * pax * multiplier, 2)
    total_kes = round(total_usd * settings.USD_TO_KES, 0)

    # Apply promo discount if code is valid
    promo_discount_pct = 0
    if data.promo_code:
        promo = PROMO_CODES.get(data.promo_code.strip().upper())
        if promo:
            promo_discount_pct = promo["discount_pct"]
            discount_factor = 1 - promo_discount_pct / 100
            total_kes = round(total_kes * discount_factor, 0)
            total_usd = round(total_usd * discount_factor, 2)

    deposit_kes = round(total_kes * safari.deposit_pct / 100, 0)
    balance_kes = total_kes - deposit_kes

    ref = "ENG-" + "".join(random.choices(string.digits, k=6))

    booking = Booking(
        reference=ref,
        safari_id=safari.id,
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        customer_phone=data.customer_phone,
        customer_country=data.customer_country,
        celebration=data.celebration,
        promo_code=data.promo_code.upper() if data.promo_code else None,
        travel_date=date,
        pax=pax,
        season=season,
        season_multiplier=multiplier,
        base_price_usd=round(usd_pp, 2),
        total_usd=total_usd,
        total_kes=total_kes,
        deposit_kes=deposit_kes,
        balance_kes=balance_kes,
        addons_total_kes=0,
        currency="KES",
        booking_type="b2c",
        installments=False,
        status="pending",
    )
    db.add(booking)
    await db.flush()

    # Initiate Pesapal payment
    try:
        token = await pesapal.get_token()
        order = await pesapal.submit_order(booking, token)
        payment = Payment(
            booking_id=booking.id,
            payment_type="deposit",
            pesapal_order_id=order.get("order_tracking_id"),
            amount_kes=deposit_kes,
            currency="KES",
            status="pending",
        )
        db.add(payment)
        await db.commit()

        # Send pending booking email so customer has reference while payment processes
        try:
            await send_booking_confirmation(
                to=booking.customer_email,
                name=booking.customer_name,
                reference=booking.reference,
                itinerary_pdf_url=None,
            )
        except Exception:
            logger.exception("Failed to send pending confirmation email for %s", ref)

        return {
            "reference":         ref,
            "redirect_url":      order.get("redirect_url"),
            "order_tracking_id": order.get("order_tracking_id"),
            "deposit_kes":       deposit_kes,
            "total_kes":         total_kes,
        }
    except HTTPException:
        raise
    except Exception:
        logger.exception("Payment gateway error for booking %s", ref)
        await db.rollback()
        raise HTTPException(502, "Payment gateway error. Please try again or contact support.")
