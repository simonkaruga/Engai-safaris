from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari

router = APIRouter(prefix="/receipts", tags=["receipts"])


@router.get("/{reference}")
async def get_receipt(reference: str, db: AsyncSession = Depends(get_db)):
    """Return booking receipt data by reference number (public — customer uses this)."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.reference == reference)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Receipt not found")
    booking, safari = row

    return {
        "reference": booking.reference,
        "customer_name": booking.customer_name,
        "customer_email": booking.customer_email,
        "safari_name": safari.name,
        "safari_duration_days": safari.duration_days,
        "travel_date": str(booking.travel_date),
        "pax": booking.pax,
        "season": booking.season,
        "total_usd": float(booking.total_usd) if booking.total_usd else None,
        "total_kes": float(booking.total_kes),
        "deposit_kes": float(booking.deposit_kes),
        "balance_kes": float(booking.balance_kes),
        "status": booking.status,
        "created_at": booking.created_at.isoformat() if hasattr(booking.created_at, "isoformat") else str(booking.created_at),
    }
