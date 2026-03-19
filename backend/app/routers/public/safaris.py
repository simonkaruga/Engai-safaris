from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay
from app.schemas import SafariListOut, SafariDetailOut, ItineraryDayOut

router = APIRouter(prefix="/safaris", tags=["safaris"])


@router.get("", response_model=list[SafariListOut])
async def list_safaris(
    category: str | None = Query(None),
    is_featured: bool | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    q = select(Safari).where(Safari.is_active == True)
    if category:
        q = q.where(Safari.category == category)
    if is_featured is not None:
        q = q.where(Safari.is_featured == is_featured)
    q = q.order_by(Safari.sort_order)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/featured", response_model=list[SafariListOut])
async def featured_safaris(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Safari).where(Safari.is_active == True, Safari.is_featured == True).limit(3)
    )
    return result.scalars().all()


@router.get("/{slug}", response_model=SafariDetailOut)
async def get_safari(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Safari).where(Safari.slug == slug, Safari.is_active == True))
    safari = result.scalar_one_or_none()
    if not safari:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Safari not found")
    days_result = await db.execute(
        select(ItineraryDay).where(ItineraryDay.safari_id == safari.id).order_by(ItineraryDay.day_number)
    )
    safari_dict = SafariDetailOut.model_validate(safari).model_dump()
    safari_dict["itinerary_days"] = [ItineraryDayOut.model_validate(d) for d in days_result.scalars().all()]
    return safari_dict
