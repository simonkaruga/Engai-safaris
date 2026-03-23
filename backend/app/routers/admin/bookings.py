import logging
import urllib.parse
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.services.auth import require_admin
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
