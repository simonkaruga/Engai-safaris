from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.affiliate import Affiliate
from app.services.auth import require_admin
from pydantic import BaseModel, EmailStr
from typing import Any

router = APIRouter(prefix="/admin/affiliates", tags=["admin"])


class AffiliateCreate(BaseModel):
    name: str
    email: EmailStr
    type: str | None = None
    platform: str | None = None
    commission_pct: int = 5
    utm_code: str | None = None
    payment_details: Any = None


class AffiliateUpdate(BaseModel):
    name: str | None = None
    type: str | None = None
    platform: str | None = None
    commission_pct: int | None = None
    utm_code: str | None = None
    is_active: bool | None = None
    payment_details: Any = None


@router.get("")
async def list_affiliates(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Affiliate).order_by(Affiliate.total_earned.desc()))
    return result.scalars().all()


@router.post("", status_code=201)
async def create_affiliate(data: AffiliateCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    affiliate = Affiliate(**data.model_dump())
    db.add(affiliate)
    await db.commit()
    return affiliate


@router.patch("/{affiliate_id}")
async def update_affiliate(affiliate_id: str, data: AffiliateUpdate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Affiliate).where(Affiliate.id == affiliate_id))
    affiliate = result.scalar_one_or_none()
    if not affiliate:
        raise HTTPException(404)
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(affiliate, k, v)
    await db.commit()
    return affiliate


@router.delete("/{affiliate_id}", status_code=204)
async def delete_affiliate(affiliate_id: str, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Affiliate).where(Affiliate.id == affiliate_id))
    affiliate = result.scalar_one_or_none()
    if not affiliate:
        raise HTTPException(404)
    await db.delete(affiliate)
    await db.commit()
