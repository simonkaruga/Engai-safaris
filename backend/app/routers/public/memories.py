from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari

router = APIRouter(prefix="/memories", tags=["memories"])


@router.get("/{reference}")
async def get_memories(reference: str, db: AsyncSession = Depends(get_db)):
    """Public endpoint — returns photo album URL and trip info for a booking reference."""
    result = await db.execute(
        select(Booking).where(Booking.reference == reference.upper())
    )
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(404, "Booking not found")
    if not booking.memories_url:
        raise HTTPException(404, "Photo album not ready yet")

    safari_result = await db.execute(select(Safari).where(Safari.id == booking.safari_id))
    safari = safari_result.scalar_one_or_none()

    return {
        "reference": booking.reference,
        "customer_name": booking.customer_name.split()[0],  # first name only
        "safari_name": safari.name if safari else "Your Safari",
        "travel_date": str(booking.travel_date),
        "memories_url": booking.memories_url,
    }
