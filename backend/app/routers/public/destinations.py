from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.destination import Destination
from app.schemas import DestinationOut

router = APIRouter(prefix="/destinations", tags=["destinations"])


@router.get("", response_model=list[DestinationOut])
async def list_destinations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Destination).where(Destination.is_active == True))
    return result.scalars().all()


@router.get("/{slug}", response_model=DestinationOut)
async def get_destination(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Destination).where(Destination.slug == slug, Destination.is_active == True))
    dest = result.scalar_one_or_none()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest
