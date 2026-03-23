import logging
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel, EmailStr
from app.database import get_db
from app.models.enquiry import Enquiry
from app.schemas import EnquiryOut
from app.services import email as email_svc
import random, string

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    subject: str | None = None
    message: str


@router.post("", status_code=201)
async def submit_contact(data: ContactMessage, db: AsyncSession = Depends(get_db)):
    """Public contact form — saved as an enquiry with source=contact."""
    ref = "ENG-" + "".join(random.choices(string.digits, k=8))
    enquiry = Enquiry(
        reference=ref,
        customer_name=data.name,
        customer_email=data.email,
        customer_phone=data.phone or "",
        interests={"subject": data.subject, "message": data.message},
        source="contact",
        status="new",
    )
    db.add(enquiry)
    await db.commit()
    await db.refresh(enquiry)
    try:
        await email_svc.send_enquiry_confirmation(enquiry.customer_email, enquiry.customer_name, enquiry.reference)
    except Exception:
        logger.exception("Failed to send contact confirmation for %s", ref)
    return {"reference": ref, "message": "Message received. We'll be in touch within 24 hours."}
