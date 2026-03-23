import logging
import random, string
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.enquiry import Enquiry
from app.schemas import EnquiryCreate, EnquiryOut
from app.services import email as email_svc

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/enquiries", tags=["enquiries"])


def _gen_ref() -> str:
    return "ENG-" + "".join(random.choices(string.digits, k=8))


@router.post("", response_model=EnquiryOut, status_code=201)
async def create_enquiry(data: EnquiryCreate, db: AsyncSession = Depends(get_db)):
    enquiry = Enquiry(**data.model_dump(), reference=_gen_ref())
    db.add(enquiry)
    await db.commit()
    await db.refresh(enquiry)
    try:
        await email_svc.send_enquiry_confirmation(enquiry.customer_email, enquiry.customer_name, enquiry.reference)
    except Exception:
        logger.exception("Failed to send enquiry confirmation email for %s", enquiry.reference)
    return enquiry
