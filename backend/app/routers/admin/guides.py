from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.guide import Guide
from app.services.auth import require_admin
from pydantic import BaseModel
from typing import Any
import uuid

router = APIRouter(prefix="/admin/guides", tags=["admin"])


class GuideCreate(BaseModel):
    slug: str
    name: str
    title: str | None = None
    bio: str | None = None
    photo_url: str | None = None
    languages: Any = None
    specialities: Any = None
    certifications: Any = None
    years_exp: int | None = None
    home_region: str | None = None
    fun_fact: str | None = None
    is_featured: bool = False


@router.get("")
async def list_guides(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Guide).order_by(Guide.name))
    return result.scalars().all()


@router.post("", status_code=201)
async def create_guide(data: GuideCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    guide = Guide(**data.model_dump())
    db.add(guide)
    await db.commit()
    return guide


@router.patch("/{guide_id}")
async def update_guide(guide_id: str, data: GuideCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Guide).where(Guide.id == guide_id))
    guide = result.scalar_one_or_none()
    if not guide:
        raise HTTPException(404)
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(guide, k, v)
    await db.commit()
    return guide


@router.delete("/{guide_id}", status_code=204)
async def delete_guide(guide_id: str, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Guide).where(Guide.id == guide_id))
    guide = result.scalar_one_or_none()
    if not guide:
        raise HTTPException(404)
    await db.delete(guide)
    await db.commit()
