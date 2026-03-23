import logging
import urllib.parse
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.services.auth import require_admin
from app.services.pesapal import pesapal
from app.services.email import send_balance_payment_email, send_review_request, send_photo_album_ready
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin/bookings", tags=["admin"])


@router.get("")
async def list_bookings(
    status: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    q = select(Booking).order_by(Booking.created_at.desc())
    if status:
        q = q.where(Booking.status == status)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/{booking_id}")
async def get_booking(booking_id: str, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(404)
    return booking


@router.patch("/{booking_id}")
async def update_booking(booking_id: str, data: dict, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(404)
    allowed = {"status", "guide_id", "itinerary_pdf", "voucher_pdf", "memories_url"}
    for k, v in data.items():
        if k in allowed:
            setattr(booking, k, v)
    await db.commit()
    return booking


@router.post("/{booking_id}/send-balance")
async def send_balance_request(
    booking_id: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    """Create a Pesapal payment link for the remaining balance and email it to the customer."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.id == booking_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(404, "Booking not found")
    booking, safari = row

    if float(booking.balance_kes) <= 0:
        raise HTTPException(400, "No balance outstanding on this booking")

    try:
        token = await pesapal.get_token()
        order = await pesapal.submit_balance_order(booking, token)
        payment_url = order.get("redirect_url", "")
    except Exception as exc:
        logger.exception("Pesapal balance order failed for %s", booking.reference)
        raise HTTPException(502, f"Payment gateway error: {exc}") from exc

    try:
        await send_balance_payment_email(
            to=booking.customer_email,
            name=booking.customer_name.split()[0],
            reference=booking.reference,
            safari_name=safari.name,
            travel_date=str(booking.travel_date),
            balance_kes=int(booking.balance_kes),
            payment_url=payment_url,
        )
    except Exception:
        logger.exception("Failed to send balance email for %s", booking.reference)

    return {
        "booking_reference": booking.reference,
        "balance_kes": int(booking.balance_kes),
        "payment_url": payment_url,
        "email_sent_to": booking.customer_email,
    }


@router.post("/{booking_id}/complete")
async def mark_trip_complete(
    booking_id: str,
    data: dict = {},
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    """Mark a trip as completed, send review request, and optionally send album link."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.id == booking_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(404, "Booking not found")
    booking, safari = row

    # Update status + optional memories URL
    booking.status = "completed"
    memories_url = data.get("memories_url") if data else None
    if memories_url:
        booking.memories_url = memories_url
    await db.commit()

    first_name = booking.customer_name.split()[0] if booking.customer_name else "there"
    review_link = f"{settings.FRONTEND_URL}/reviews?safari={safari.slug}&ref={booking.reference}"

    emails_sent = []
    try:
        await send_review_request(
            to=booking.customer_email,
            name=first_name,
            review_link=review_link,
        )
        emails_sent.append("review_request")
    except Exception:
        logger.exception("Failed to send review request for %s", booking.reference)

    if memories_url:
        try:
            await send_photo_album_ready(
                to=booking.customer_email,
                name=first_name,
                memories_url=memories_url,
            )
            emails_sent.append("photo_album_ready")
        except Exception:
            logger.exception("Failed to send album email for %s", booking.reference)

    return {
        "booking_reference": booking.reference,
        "status": "completed",
        "emails_sent": emails_sent,
    }


@router.post("/{booking_id}/recover")
async def send_recovery_message(
    booking_id: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    """Send a WhatsApp recovery message to a customer with a pending/abandoned booking."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.id == booking_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(404, "Booking not found")
    booking, safari = row

    first_name = booking.customer_name.split()[0] if booking.customer_name else "there"
    book_url = f"{settings.frontend_url}/book?safari={safari.slug}&date={booking.travel_date}&pax={booking.pax}"
    deposit_kes = f"KES {int(booking.deposit_kes):,}" if booking.deposit_kes else "a small deposit"

    message = (
        f"Hi {first_name} 👋 It's Engai Safaris.\n\n"
        f"We noticed you were looking at *{safari.name}* — a great choice!\n\n"
        f"Your booking for {booking.pax} {'person' if booking.pax == 1 else 'people'} on "
        f"{booking.travel_date} is reserved but not yet confirmed.\n\n"
        f"To secure your spot with just {deposit_kes}, tap here:\n{book_url}\n\n"
        f"Questions? Reply here — we answer within 2 hours. 🦁"
    )

    # Build WhatsApp link (for manual send or automated via WhatsApp API)
    phone = booking.customer_phone or ""
    # Normalize phone — ensure starts with country code
    if phone.startswith("0"):
        phone = "254" + phone[1:]
    elif phone.startswith("+"):
        phone = phone[1:]

    wa_link = f"https://wa.me/{phone}?text={urllib.parse.quote(message)}"

    logger.info("Recovery message prepared for booking %s → %s", booking.reference, phone)
    return {
        "booking_reference": booking.reference,
        "customer_name": booking.customer_name,
        "customer_phone": booking.customer_phone,
        "safari_name": safari.name,
        "wa_link": wa_link,
        "message_preview": message,
    }
