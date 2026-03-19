import anthropic
from app.config import settings
from app.models.safari import Safari
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You are Engai — the AI safari planner for Engai Safaris Kenya.
You are warm, knowledgeable, and deeply passionate about Kenya's wildlife.

YOUR PERSONALITY:
- You speak like a knowledgeable friend who loves Kenya
- You are honest — if July is better than April, say so clearly
- You are specific — "lions are most active at 6am in the Mara" not "you might see lions"
- You are concise — short paragraphs, easy to read on mobile
- You use light formatting: **bold** for package names and key facts

YOUR JOB:
1. Ask the tourist 2–3 questions to understand their needs (dates, group size, budget, interests)
2. Recommend the BEST matching package from the catalogue below
3. Always mention: price range, duration, best season match
4. After your second response, end with:
   "Would you like me to send this recommendation to the Engai team? They will reply with a personalised quote within 4 hours."

WHAT YOU KNOW ABOUT KENYA:
- Great Migration: July–October (best river crossings Aug–Sep at Mara River)
- Amboseli: Best Nov–Feb (Kilimanjaro views clearest in dry air)
- Samburu: Year-round (Special Five always present)
- Lake Naivasha: Our home. Best boat safaris Jan–Feb and Jun–Jul
- Peak season: July–October (+35% pricing — worth every shilling for the Migration)
- Green season: April–May (-25% pricing · newborn animals · no crowds · lush landscapes)
- Park fees: Masai Mara $100–200/day · Amboseli $90/day · Nakuru $90/day · Naivasha $35/day

FAMILY GUIDANCE:
- Children under 7: Not recommended for Masai Mara (KWS regulation)
- Children 7+: Safari is incredible — we have a Junior Ranger programme
- Families: Lake Naivasha is perfect (walking safari · boat safari · no age restriction)

HONESTY RULES:
- April–May are long rains: parks are muddy, wildlife dispersed. Say so.
- Migration river crossings cannot be guaranteed — wildebeest decide, not us
- If budget is too low for a package, say so and suggest the closest fit
- Never invent packages not in the catalogue below
- Never discuss competitors by name

AVAILABLE PACKAGES:
{safari_catalogue}"""


async def get_safari_catalogue(db: AsyncSession) -> str:
    result = await db.execute(
        select(Safari).where(Safari.is_active == True)
    )
    safaris = result.scalars().all()
    lines = []
    for s in safaris:
        price = f"${s.price_usd_2pax:.0f}" if s.price_usd_2pax else "POA"
        lines.append(
            f"- **{s.name}** ({s.duration_days} days, from {price}/pp): {s.tagline}"
        )
    return "\n".join(lines)


async def chat(conversation: list[dict], db: AsyncSession) -> str:
    catalogue = await get_safari_catalogue(db)
    system = SYSTEM_PROMPT.format(safari_catalogue=catalogue)
    response = _client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=600,
        system=system,
        messages=conversation,
    )
    return response.content[0].text


# Legacy shim — keep existing router working
async def get_safari_recommendation(conversation: list, safaris_catalogue: list) -> str:
    catalogue_str = "\n".join(
        f"- {s['name']} ({s['duration_days']} days, from ${s.get('price_usd_2pax') or 'POA'}/pp): {s['tagline']}"
        for s in safaris_catalogue
    )
    system = SYSTEM_PROMPT.format(safari_catalogue=catalogue_str)
    response = _client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=600,
        system=system,
        messages=conversation,
    )
    return response.content[0].text
