from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.partner_lodge import PartnerLodge

router = APIRouter(prefix="/partner-lodges", tags=["partner-lodges"])


@router.get("")
async def list_lodges(
    destination: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    q = select(PartnerLodge).where(PartnerLodge.is_active == True)
    if destination:
        q = q.where(PartnerLodge.destination_slug == destination)
    q = q.order_by(PartnerLodge.is_featured.desc(), PartnerLodge.price_usd_per_night.desc())
    result = await db.execute(q)
    return result.scalars().all()
