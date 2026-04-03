from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.safari import Safari
from app.services.auth import require_admin
from pydantic import BaseModel
from typing import Any

router = APIRouter(prefix="/admin/safaris", tags=["admin"])


class SafariUpdate(BaseModel):
    name: str | None = None
    tagline: str | None = None
    description: str | None = None
    category: str | None = None
    duration_days: int | None = None
    group_size_max: int | None = None
    price_usd_solo: float | None = None
    price_usd_2pax: float | None = None
    price_usd_4pax: float | None = None
    price_usd_6pax: float | None = None
    price_kes_solo: float | None = None
    price_kes_2pax: float | None = None
    price_kes_4pax: float | None = None
    price_kes_6pax: float | None = None
    wholesale_usd: float | None = None
    deposit_pct: int | None = None
    installments_ok: bool | None = None
    cover_image: str | None = None
    gallery: list[str] | None = None
    video_url: str | None = None
    highlights: Any = None
    inclusions: Any = None
    exclusions: Any = None
    what_to_bring: Any = None
    cancellation_policy: str | None = None
    difficulty: str | None = None
    is_active: bool | None = None
    is_featured: bool | None = None
    is_shared: bool | None = None
    sort_order: int | None = None
    meta_title: str | None = None
    meta_desc: str | None = None
    # Seasonal multipliers
    peak_multiplier: float | None = None
    low_multiplier: float | None = None
    # Beach extension
    has_beach_extension: bool | None = None
    beach_extension_days: int | None = None
    beach_extension_price_usd: float | None = None
    beach_extension_price_kes: float | None = None
    beach_extension_desc: str | None = None
    # Cost tracking fields (admin only)
    cost_park_fees_usd: float | None = None
    cost_accommodation_usd: float | None = None
    cost_vehicle_usd: float | None = None
    cost_insurance_usd: float | None = None
    cost_evac_usd: float | None = None


@router.get("")
async def list_safaris(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Safari).order_by(Safari.sort_order))
    return result.scalars().all()


@router.patch("/{safari_id}")
async def update_safari(safari_id: str, data: SafariUpdate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Safari).where(Safari.id == safari_id))
    safari = result.scalar_one_or_none()
    if not safari:
        raise HTTPException(404)
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(safari, k, v)
    await db.commit()
    return safari
