from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.agent import Agent
from app.services.auth import require_admin, hash_password
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/admin/agents", tags=["admin"])


class AgentCreate(BaseModel):
    company_name: str
    contact_name: str
    email: EmailStr
    password: str
    phone: str | None = None
    country: str | None = None
    discount_pct: int = 15
    credit_limit_kes: float | None = None
    notes: str | None = None


class AgentUpdate(BaseModel):
    company_name: str | None = None
    contact_name: str | None = None
    phone: str | None = None
    country: str | None = None
    discount_pct: int | None = None
    credit_limit_kes: float | None = None
    is_active: bool | None = None
    notes: str | None = None


@router.get("")
async def list_agents(db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Agent).order_by(Agent.company_name))
    return result.scalars().all()


@router.post("", status_code=201)
async def create_agent(data: AgentCreate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    agent = Agent(
        company_name=data.company_name,
        contact_name=data.contact_name,
        email=data.email,
        password_hash=hash_password(data.password),
        phone=data.phone,
        country=data.country,
        discount_pct=data.discount_pct,
        credit_limit_kes=data.credit_limit_kes,
        notes=data.notes,
    )
    db.add(agent)
    await db.commit()
    return agent


@router.patch("/{agent_id}")
async def update_agent(agent_id: str, data: AgentUpdate, db: AsyncSession = Depends(get_db), _=Depends(require_admin)):
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(404)
    for k, v in data.model_dump(exclude_none=True).items():
        setattr(agent, k, v)
    await db.commit()
    return agent
