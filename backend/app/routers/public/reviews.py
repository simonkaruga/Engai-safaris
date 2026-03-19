from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.review import Review
from app.schemas import ReviewCreate, ReviewOut

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[ReviewOut])
async def list_reviews(featured: bool = Query(False), db: AsyncSession = Depends(get_db)):
    q = select(Review).where(Review.is_approved == True)
    if featured:
        q = q.where(Review.is_featured == True)
    q = q.order_by(Review.created_at.desc())
    result = await db.execute(q)
    return result.scalars().all()


@router.post("", response_model=ReviewOut, status_code=201)
async def submit_review(data: ReviewCreate, db: AsyncSession = Depends(get_db)):
    review = Review(**data.model_dump())
    db.add(review)
    await db.commit()
    await db.refresh(review)
    return review
