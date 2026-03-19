from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.safari import Safari
from app.schemas import AIPlannerRequest
from app.services.claude_ai import get_safari_recommendation

router = APIRouter(prefix="/ai-planner", tags=["ai"])


@router.post("")
async def ai_planner(data: AIPlannerRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Safari.name, Safari.slug, Safari.tagline, Safari.duration_days,
                                     Safari.price_usd_2pax, Safari.category).where(Safari.is_active == True))
    catalogue = [dict(r._mapping) for r in result.all()]
    reply = await get_safari_recommendation(data.conversation, catalogue)
    return {"reply": reply}
