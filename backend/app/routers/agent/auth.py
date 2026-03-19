from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.agent import Agent
from app.schemas import LoginIn, TokenOut
from app.services.auth import verify_password, create_token

router = APIRouter(prefix="/agent/auth", tags=["agent-auth"])


@router.post("/login", response_model=TokenOut)
async def agent_login(data: LoginIn, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agent).where(Agent.email == data.email, Agent.is_active == True))
    agent = result.scalar_one_or_none()
    if not agent or not verify_password(data.password, agent.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_token(str(agent.id), "agent")}
