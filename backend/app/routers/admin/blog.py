from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.blog import BlogPost
from app.services.auth import require_admin
from pydantic import BaseModel
from typing import Any
from datetime import datetime

router = APIRouter(prefix="/admin/blog", tags=["admin"])


class BlogCreate(BaseModel):
    slug: str
    title: str
    excerpt: str | None = None
    content: str | None = None
    cover_image: str | None = None
    category: str | None = None
    tags: list[str] = []
    author: str | None = None
    read_time_min: int | None = None
    is_published: bool = False
    meta_title: str | None = None
    meta_desc: str | None = None


@router.get("")
async def list_posts(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(BlogPost).order_by(BlogPost.created_at.desc()))
    return result.scalars().all()


@router.post("", status_code=201)
async def create_post(data: BlogCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    post = BlogPost(**data.model_dump())
    if data.is_published:
        post.published_at = datetime.utcnow()
    db.add(post)
    await db.commit()
    return post


@router.patch("/{post_id}")
async def update_post(post_id: str, data: BlogCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(404)
    updates = data.model_dump(exclude_none=True)
    if updates.get("is_published") and not post.is_published:
        post.published_at = datetime.utcnow()
    for k, v in updates.items():
        setattr(post, k, v)
    await db.commit()
    return post


@router.delete("/{post_id}", status_code=204)
async def delete_post(post_id: str, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(BlogPost).where(BlogPost.id == post_id))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(404)
    await db.delete(post)
    await db.commit()
