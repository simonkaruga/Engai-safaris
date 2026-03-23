import anthropic
from app.config import settings
from app.models.safari import Safari
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import AsyncIterator

_client       = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
_async_client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

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
2. Recommend the BEST matching package from the catalogue below — always use the exact package name
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

AVAILABLE PACKAGES (use exact names when recommending):
{safari_catalogue}"""


async def get_safari_catalogue(db: AsyncSession) -> tuple[str, dict[str, str]]:
    """Returns (formatted catalogue string, slug_map {name_lower: slug})."""
    result = await db.execute(select(Safari).where(Safari.is_active == True))
    safaris = result.scalars().all()
    lines: list[str] = []
    slug_map: dict[str, str] = {}
    for s in safaris:
        price = f"${s.price_usd_2pax:.0f}" if s.price_usd_2pax else "POA"
        lines.append(
            f"- **{s.name}** ({s.duration_days} days, from {price}/pp): {s.tagline}"
        )
        slug_map[s.name.lower()] = s.slug
        slug_map[s.slug.replace("-", " ")] = s.slug
    return "\n".join(lines), slug_map


def find_safari_slugs(text: str, slug_map: dict[str, str]) -> list[str]:
    """Return up to 3 safari slugs mentioned in the AI response."""
    found: set[str] = set()
    text_lower = text.lower()
    for key, slug in slug_map.items():
        if key in text_lower:
            found.add(slug)
        if len(found) >= 3:
            break
    return list(found)


async def stream_chat(conversation: list[dict], db: AsyncSession) -> AsyncIterator[str]:
    """Yield text chunks from Claude as they arrive, then yield a sentinel with safari slugs."""
    catalogue, slug_map = await get_safari_catalogue(db)
    system = SYSTEM_PROMPT.format(safari_catalogue=catalogue)

    full_text = ""
    async with _async_client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=700,
        system=system,
        messages=conversation,
    ) as stream:
        async for chunk in stream.text_stream:
            full_text += chunk
            yield chunk

    # Signal completion with matched safari slugs
    slugs = find_safari_slugs(full_text, slug_map)
    # Yield a JSON-tagged sentinel line the router will intercept
    import json
    yield "\x00" + json.dumps({"safari_slugs": slugs})


async def chat(conversation: list[dict], db: AsyncSession) -> str:
    """Non-streaming fallback — returns full response string."""
    catalogue, _ = await get_safari_catalogue(db)
    system = SYSTEM_PROMPT.format(safari_catalogue=catalogue)
    response = _client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=700,
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
        model="claude-sonnet-4-6",
        max_tokens=700,
        system=system,
        messages=conversation,
    )
    return response.content[0].text
