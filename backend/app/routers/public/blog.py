from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.blog import BlogPost

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("")
async def list_posts(
    category: str | None = Query(None),
    page: int = Query(1, ge=1),
    db: AsyncSession = Depends(get_db),
):
    limit, offset = 12, (page - 1) * 12
    q = select(BlogPost).where(BlogPost.is_published == True)
    if category:
        q = q.where(BlogPost.category == category)
    q = q.order_by(BlogPost.published_at.desc()).limit(limit).offset(offset)
    result = await db.execute(q)
    posts = result.scalars().all()
    return [{"id": p.id, "slug": p.slug, "title": p.title, "excerpt": p.excerpt,
             "cover_image": p.cover_image, "category": p.category,
             "read_time_min": p.read_time_min, "published_at": p.published_at} for p in posts]


@router.get("/{slug}")
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    from fastapi import HTTPException
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug, BlogPost.is_published == True))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404)
    return post
