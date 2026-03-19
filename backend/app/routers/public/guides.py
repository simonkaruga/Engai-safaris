from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.guide import Guide
from app.schemas import GuideOut

router = APIRouter(prefix="/guides", tags=["guides"])


@router.get("", response_model=list[GuideOut])
async def list_guides(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Guide).order_by(Guide.is_featured.desc()))
    return result.scalars().all()


@router.get("/{slug}", response_model=GuideOut)
async def get_guide(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Guide).where(Guide.slug == slug))
    guide = result.scalar_one_or_none()
    if not guide:
        raise HTTPException(status_code=404, detail="Guide not found")
    return guide
