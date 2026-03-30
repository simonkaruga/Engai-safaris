from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.agent import Agent
from app.schemas import LoginIn, TokenOut
from app.services.auth import verify_password, create_token
from app.config import settings
from pydantic import BaseModel

router = APIRouter(prefix="/agent/auth", tags=["agent-auth"])


@router.post("/login", response_model=TokenOut)
async def agent_login(data: LoginIn, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agent).where(Agent.email == data.email, Agent.is_active == True))
    agent = result.scalar_one_or_none()
    if not agent or not verify_password(data.password, agent.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_token(str(agent.id), "agent")}


class GoogleTokenIn(BaseModel):
    id_token: str


@router.post("/google", response_model=TokenOut)
async def agent_google_login(data: GoogleTokenIn, db: AsyncSession = Depends(get_db)):
    """Verify a Google ID token and return a JWT for an existing active agent."""
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=501, detail="Google login not configured")

    try:
        from google.oauth2 import id_token as google_id_token
        from google.auth.transport import requests as google_requests
        id_info = google_id_token.verify_oauth2_token(
            data.id_token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    email = id_info.get("email", "").lower()
    if not email:
        raise HTTPException(status_code=401, detail="No email in Google token")

    result = await db.execute(select(Agent).where(Agent.email == email, Agent.is_active == True))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(
            status_code=403,
            detail="No active agent account found for this Google account. Contact agents@engaisafaris.com to apply."
        )

    return {"access_token": create_token(str(agent.id), "agent")}
