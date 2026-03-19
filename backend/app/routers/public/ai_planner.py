from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from app.database import get_db
from app.models.safari import Safari
from app.models.enquiry import Enquiry
from app.schemas import AIPlannerRequest
from app.services.claude_ai import chat, get_safari_recommendation
from app.services.sms import send_sms
from slowapi import Limiter
from slowapi.util import get_remote_address
import random, string

router  = APIRouter(prefix="/ai-planner", tags=["ai"])
limiter = Limiter(key_func=get_remote_address)


class ChatRequest(BaseModel):
    conversation: list[dict]
    session_id:   str


class SubmitEnquiryRequest(BaseModel):
    conversation:   list[dict]
    customer_name:  str
    customer_email: str
    customer_phone: str | None = None


@router.post("/chat")
@limiter.limit("20/minute")
async def ai_chat(
    request: Request,
    body: ChatRequest,
    db: AsyncSession = Depends(get_db),
):
    if len(body.conversation) > 20:
        raise HTTPException(status_code=400, detail="Conversation too long. Please start a new chat.")
    response = await chat(body.conversation, db)
    return {"response": response}


@router.post("/submit-enquiry")
async def submit_ai_enquiry(
    body: SubmitEnquiryRequest,
    db: AsyncSession = Depends(get_db),
):
    ref = "ENG-" + "".join(random.choices(string.digits, k=6))
    enquiry = Enquiry(
        reference      = ref,
        customer_name  = body.customer_name,
        customer_email = body.customer_email,
        customer_phone = body.customer_phone,
        source         = "ai_planner",
        ai_conversation= body.conversation,
        status         = "new",
        notes          = "Submitted via AI Safari Planner",
    )
    db.add(enquiry)
    await db.commit()
    if body.customer_phone:
        try:
            await send_sms(body.customer_phone, "ai_confirm", name=body.customer_name, ref=ref)
        except Exception:
            pass  # SMS failure must not break enquiry submission
    return {"reference": ref, "message": "Enquiry submitted! Our team will contact you within 4 hours."}


# Legacy endpoint — keep existing frontend working during transition
@router.post("")
async def ai_planner_legacy(data: AIPlannerRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Safari.name, Safari.slug, Safari.tagline, Safari.duration_days,
                                     Safari.price_usd_2pax, Safari.category).where(Safari.is_active == True))
    catalogue = [dict(r._mapping) for r in result.all()]
    reply = await get_safari_recommendation(data.conversation, catalogue)
    return {"reply": reply}
