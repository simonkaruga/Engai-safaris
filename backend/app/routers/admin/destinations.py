from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.destination import Destination
from app.services.auth import require_admin
from pydantic import BaseModel
from typing import Any

router = APIRouter(prefix="/admin/destinations", tags=["admin"])


class DestinationUpdate(BaseModel):
    name: str | None = None
    tagline: str | None = None
    description: str | None = None
    cover_image: str | None = None
    gallery: Any = None
    best_months: Any = None
    highlights: Any = None
    wildlife_list: Any = None
    peak_fee_usd: float | None = None
    low_fee_usd: float | None = None
    is_active: bool | None = None
    meta_title: str | None = None
    meta_desc: str | None = None


@router.get("")
async def list_destinations(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Destination).order_by(Destination.name))
    return result.scalars().all()


@router.patch("/{destination_id}")
async def update_destination(destination_id: str, data: DestinationUpdate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Destination).where(Destination.id == destination_id))
    dest = result.scalar_one_or_none()
    if not dest:
        raise HTTPException(404)
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(dest, k, v)
    await db.commit()
    return dest
