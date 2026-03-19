from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.enquiry import Enquiry
from app.services.auth import require_admin

router = APIRouter(prefix="/admin/enquiries", tags=["admin"])


@router.get("")
async def list_enquiries(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Enquiry).order_by(Enquiry.created_at.desc()))
    return result.scalars().all()


@router.patch("/{enquiry_id}")
async def update_enquiry(enquiry_id: str, data: dict, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Enquiry).where(Enquiry.id == enquiry_id))
    enquiry = result.scalar_one_or_none()
    if not enquiry:
        raise HTTPException(status_code=404)
    allowed = {"status", "notes", "follow_up_date", "quoted_amount_usd"}
    for k, v in data.items():
        if k in allowed:
            setattr(enquiry, k, v)
    await db.commit()
    return enquiry
