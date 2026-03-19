from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.payment import Payment
from app.schemas import PaymentInitiate
from app.services.pesapal import pesapal

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
async def pesapal_ipn(payload: dict, db: AsyncSession = Depends(get_db)):
    tracking_id = payload.get("OrderTrackingId")
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
    return {"status": "ok"}


@router.get("/status/{order_tracking_id}")
async def payment_status(order_tracking_id: str):
    token = await pesapal.get_token()
    return await pesapal.get_transaction_status(order_tracking_id, token)
