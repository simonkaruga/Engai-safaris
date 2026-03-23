from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.review import Review
from app.services.auth import require_admin

router = APIRouter(prefix="/admin/reviews", tags=["admin"])


@router.get("")
async def list_reviews(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Review).order_by(Review.created_at.desc()))
    return result.scalars().all()


@router.patch("/{review_id}")
async def update_review(review_id: str, data: dict, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Review).where(Review.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(404)
    for k, v in data.items():
        if k in {"is_approved", "is_featured"}:
            setattr(review, k, v)
    await db.commit()
    return review


@router.delete("/{review_id}", status_code=204)
async def delete_review(review_id: str, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Review).where(Review.id == review_id))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(404)
    await db.delete(review)
    await db.commit()
