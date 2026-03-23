import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from app.database import get_db
from app.models.enquiry import Enquiry

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/partners", tags=["partners"])


class PartnerApplication(BaseModel):
    name: str
    email: EmailStr
    company: str
    country: str
    website: str | None = None
    clients_per_year: str | None = None
    message: str | None = None


@router.post("/apply")
async def apply_as_partner(data: PartnerApplication, db: AsyncSession = Depends(get_db)):
    """Store partner application as an enquiry tagged source='partner_application'."""
    body = (
        f"Company: {data.company}\n"
        f"Country: {data.country}\n"
        f"Website: {data.website or 'N/A'}\n"
        f"Clients/year: {data.clients_per_year or 'N/A'}\n"
        f"Message: {data.message or 'N/A'}"
    )
    enquiry = Enquiry(
        customer_name=data.name,
        customer_email=data.email,
        source="partner_application",
        special_requests=body,
        status="new",
    )
    db.add(enquiry)
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        logger.exception("Failed to save partner application from %s", data.email)
        raise HTTPException(500, "Could not save application")
    return {"saved": True}
