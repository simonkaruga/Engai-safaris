import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.models.enquiry import Enquiry
from app.services.auth import require_admin

router = APIRouter(prefix="/admin/dashboard", tags=["admin"])


@router.get("")
async def dashboard(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    total_bookings = await db.scalar(select(func.count()).select_from(Booking))
    confirmed = await db.scalar(select(func.count()).select_from(Booking).where(Booking.status == "confirmed"))
    revenue_kes = await db.scalar(select(func.sum(Booking.total_kes)).where(Booking.status == "confirmed")) or 0
    new_enquiries = await db.scalar(select(func.count()).select_from(Enquiry).where(Enquiry.status == "new"))

    # Cash flow: confirmed bookings where lodge payment falls due soon
    # Lodge payment due = 30 days before travel_date
    # Flag any where (travel_date - 30 days) is within the next 14 days
    today = datetime.date.today()
    lodge_due_from = today
    lodge_due_to = today + datetime.timedelta(days=14)

    cf_result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(
            Booking.status == "confirmed",
            # travel_date between (today + 30 days) and (today + 44 days)
            Booking.travel_date >= (today + datetime.timedelta(days=30)),
            Booking.travel_date <= (today + datetime.timedelta(days=44)),
        )
        .order_by(Booking.travel_date)
    )
    cf_rows = cf_result.all()
    cash_flow_alerts = [
        {
            "reference": b.reference,
            "customer_name": b.customer_name,
            "safari_name": s.name,
            "travel_date": str(b.travel_date),
            "lodge_payment_due": str(b.travel_date - datetime.timedelta(days=30)),
            "balance_kes": float(b.balance_kes),
        }
        for b, s in cf_rows
    ]

    return {
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed,
        "revenue_kes": float(revenue_kes),
        "new_enquiries": new_enquiries,
        "cash_flow_alerts": cash_flow_alerts,
    }
