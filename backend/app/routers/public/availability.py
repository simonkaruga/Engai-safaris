from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, extract
from app.database import get_db
from app.models.safari import Safari
from app.models.availability import SafariAvailability
from fastapi import HTTPException
import datetime

router = APIRouter(prefix="/safaris", tags=["availability"])


@router.get("/{slug}/availability")
async def get_availability(
    slug: str,
    month: str = Query(..., description="YYYY-MM"),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Safari.id).where(Safari.slug == slug, Safari.is_active == True))
    safari_id = result.scalar_one_or_none()
    if not safari_id:
        raise HTTPException(status_code=404, detail="Safari not found")

    try:
        year, mon = int(month.split("-")[0]), int(month.split("-")[1])
    except Exception:
        raise HTTPException(status_code=400, detail="month must be YYYY-MM")

    result = await db.execute(
        select(SafariAvailability).where(
            SafariAvailability.safari_id == safari_id,
            extract("year", SafariAvailability.date) == year,
            extract("month", SafariAvailability.date) == mon,
        )
    )
    rows = result.scalars().all()

    return [
        {
            "date": str(row.date),
            "status": row.status,
            "spots_left": row.spots_left,
            "note": row.note,
        }
        for row in rows
    ]
