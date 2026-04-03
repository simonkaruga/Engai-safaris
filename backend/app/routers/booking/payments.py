import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from app.database import get_db
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.safari import Safari
from app.schemas import PaymentInitiate
from app.services.pesapal import pesapal
from app.services.email import send_booking_confirmation
from app.services import sms as sms_svc
from app.config import settings


class PesapalIPN(BaseModel):
    OrderTrackingId: str | None = None
    OrderNotificationType: str | None = None
    OrderMerchantReference: str | None = None

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/initiate")
async def initiate_payment(data: PaymentInitiate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Booking).where(Booking.id == data.booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    token = await pesapal.get_token()
    order = await pesapal.submit_order(booking, token)
    payment = Payment(
        booking_id=booking.id,
        payment_type=data.payment_type,
        pesapal_order_id=order.get("order_tracking_id"),
        amount_kes=booking.deposit_kes,
        phone_number=data.phone_number,
    )
    db.add(payment)
    await db.commit()
    return {"redirect_url": order.get("redirect_url"), "order_tracking_id": order.get("order_tracking_id")}


@router.post("/ipn")
async def pesapal_ipn(payload: PesapalIPN, db: AsyncSession = Depends(get_db)):
    tracking_id = payload.OrderTrackingId
    if not tracking_id:
        raise HTTPException(status_code=400)
    token = await pesapal.get_token()
    status_data = await pesapal.get_transaction_status(tracking_id, token)
    result = await db.execute(select(Payment).where(Payment.pesapal_order_id == tracking_id))
    payment = result.scalar_one_or_none()
    if payment:
        payment.status = "completed" if status_data.get("payment_status_description") == "Completed" else "failed"
        payment.ipn_data = status_data
        if payment.status == "completed":
            booking_result = await db.execute(select(Booking).where(Booking.id == payment.booking_id))
            booking = booking_result.scalar_one_or_none()
            if booking:
                booking.status = "confirmed"
                await db.commit()
                # Fire email + SMS confirmations
                try:
                    await send_booking_confirmation(
                        to=booking.customer_email,
                        name=booking.customer_name,
                        reference=booking.reference,
                        itinerary_pdf_url=f"{settings.FRONTEND_URL}/bookings/{booking.reference}/itinerary",
                    )
                except Exception:
                    logger.exception("Failed to send booking confirmation email for %s", booking.reference)
                try:
                    await sms_svc.send_sms(
                        phone=booking.customer_phone,
                        template="confirmation",
                        ref=booking.reference,
                        safari="Your safari",
                        date=str(booking.travel_date),
                        pax=booking.pax,
                        deposit=int(booking.deposit_kes),
                        balance=int(booking.balance_kes),
                    )
                except Exception:
                    logger.exception("Failed to send booking confirmation SMS for %s", booking.reference)
        else:
            await db.commit()
    return {"status": "ok"}


@router.get("/status/{order_tracking_id}")
async def payment_status(order_tracking_id: str):
    token = await pesapal.get_token()
    return await pesapal.get_transaction_status(order_tracking_id, token)
