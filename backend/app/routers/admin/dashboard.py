from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.booking import Booking
from app.models.enquiry import Enquiry
from app.services.auth import require_admin

router = APIRouter(prefix="/admin/dashboard", tags=["admin"])


@router.get("")
async def dashboard(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    total_bookings = await db.scalar(select(func.count()).select_from(Booking))
    confirmed = await db.scalar(select(func.count()).select_from(Booking).where(Booking.status == "confirmed"))
    revenue_kes = await db.scalar(select(func.sum(Booking.total_kes)).where(Booking.status == "confirmed")) or 0
    new_enquiries = await db.scalar(select(func.count()).select_from(Enquiry).where(Enquiry.status == "new"))
    return {
        "total_bookings": total_bookings,
        "confirmed_bookings": confirmed,
        "revenue_kes": float(revenue_kes),
        "new_enquiries": new_enquiries,
    }
