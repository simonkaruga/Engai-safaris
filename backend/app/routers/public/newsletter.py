import logging
import httpx
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/newsletter", tags=["newsletter"])


class SubscribeRequest(BaseModel):
    email: EmailStr


@router.post("/subscribe", status_code=200)
async def subscribe(data: SubscribeRequest):
    """Add an email to the Resend audience.

    Falls back gracefully if RESEND_AUDIENCE_ID is not configured —
    the subscription is accepted but not stored in Resend.
    """
    if not settings.RESEND_AUDIENCE_ID:
        logger.warning("RESEND_AUDIENCE_ID not set — newsletter subscriber %s not added to audience", data.email)
        return {"ok": True, "note": "audience not configured"}

    try:
        async with httpx.AsyncClient(timeout=8) as client:
            res = await client.post(
                f"https://api.resend.com/audiences/{settings.RESEND_AUDIENCE_ID}/contacts",
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={"email": data.email, "unsubscribed": False},
            )
            if res.status_code not in (200, 201):
                # Already subscribed returns 409 — treat as success
                if res.status_code == 409:
                    return {"ok": True, "note": "already subscribed"}
                logger.error("Resend contacts API error %s: %s", res.status_code, res.text)
                # Still return 200 — subscriber shouldn't see Resend errors
                return {"ok": True, "note": "queued"}
    except Exception:
        logger.exception("Failed to add newsletter subscriber %s to Resend", data.email)

    return {"ok": True}
