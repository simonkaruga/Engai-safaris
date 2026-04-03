import anthropic
from app.config import settings
from app.models.safari import Safari
from app.models.availability import SafariAvailability
from app.models.enquiry import Enquiry
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import AsyncIterator
import json, random, string, logging

logger = logging.getLogger(__name__)

_client       = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
_async_client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You are Engai — the agentic AI safari planner for Engai Safaris Kenya.
You are warm, knowledgeable, and deeply passionate about Kenya's wildlife.

YOU ARE AN AGENT — you have tools. Use them proactively:
- When a user mentions dates, group size, budget or destination → call search_safaris immediately
- When a user picks a safari → call check_availability immediately
- When a user is ready to book → call create_enquiry immediately — don't ask them to do it manually
- When you need full details about a safari → call get_safari_details

YOUR PERSONALITY:
- Warm, knowledgeable friend who loves Kenya
- Honest — if July is better than April, say so
- Specific — "lions are most active at 6am in the Mara" not "you might see lions"
- Concise — short paragraphs, easy to read on mobile
- Action-oriented — always move the conversation toward a booking

WHAT YOU KNOW ABOUT KENYA:
- Great Migration: July–October (best river crossings Aug–Sep at Mara River)
- Amboseli: Best Nov–Feb (Kilimanjaro views clearest in dry air)
- Samburu: Year-round (Special Five always present)
- Lake Naivasha: Our home. Best boat safaris Jan–Feb and Jun–Jul
- Peak season: July–October (+35% pricing)
- Green season: April–May (-25% pricing, newborn animals, no crowds)
- Park fees: Masai Mara $100–200/day · Amboseli $90/day · Nakuru $90/day · Naivasha $35/day

FAMILY GUIDANCE:
- Children under 7: Not recommended for Masai Mara (KWS regulation)
- Children 7+: Safari is incredible — Junior Ranger programme available
- Families: Lake Naivasha is perfect (walking safari, boat safari, no age restriction)

HONESTY RULES:
- April–May are long rains: parks are muddy, wildlife dispersed. Say so.
- Migration river crossings cannot be guaranteed
- If budget is too low, say so and suggest the closest fit
- Never discuss competitors by name

FLOW:
1. Ask 1-2 questions to understand needs (dates, group size, budget, interests)
2. Call search_safaris with what you know — show results immediately
3. When user picks one, call check_availability
4. When user confirms — collect name, email, phone then call create_enquiry
5. Confirm the booking reference"""

TOOLS = [
    {
        "name": "search_safaris",
        "description": "Search available safari packages by filters. Call this as soon as you know any of: destination, duration, budget, group size, or category.",
        "input_schema": {
            "type": "object",
            "properties": {
                "category": {"type": "string", "description": "One of: classic, luxury, adventures, cultural, photography, corporate", "enum": ["classic", "luxury", "adventures", "cultural", "photography", "corporate"]},
                "max_price_usd": {"type": "number", "description": "Maximum price per person in USD"},
                "min_days": {"type": "integer", "description": "Minimum duration in days"},
                "max_days": {"type": "integer", "description": "Maximum duration in days"},
                "keyword": {"type": "string", "description": "Keyword to search in safari name or tagline (e.g. 'mara', 'amboseli', 'beach')"},
            },
            "required": [],
        },
    },
    {
        "name": "get_safari_details",
        "description": "Get full details about a specific safari including itinerary, inclusions, and pricing for all group sizes.",
        "input_schema": {
            "type": "object",
            "properties": {
                "slug": {"type": "string", "description": "The safari slug identifier"},
            },
            "required": ["slug"],
        },
    },
    {
        "name": "check_availability",
        "description": "Check if a safari has availability for specific dates.",
        "input_schema": {
            "type": "object",
            "properties": {
                "safari_slug": {"type": "string", "description": "The safari slug"},
                "travel_date": {"type": "string", "description": "Travel date in YYYY-MM-DD format"},
            },
            "required": ["safari_slug", "travel_date"],
        },
    },
    {
        "name": "create_enquiry",
        "description": "Create a booking enquiry on behalf of the user. Call this when the user confirms they want to book. Requires name, email, and safari slug.",
        "input_schema": {
            "type": "object",
            "properties": {
                "safari_slug": {"type": "string", "description": "The safari slug"},
                "customer_name": {"type": "string", "description": "Customer full name"},
                "customer_email": {"type": "string", "description": "Customer email address"},
                "customer_phone": {"type": "string", "description": "Customer phone number (optional)"},
                "travel_date": {"type": "string", "description": "Preferred travel date YYYY-MM-DD (optional)"},
                "group_size": {"type": "integer", "description": "Number of people"},
                "special_requests": {"type": "string", "description": "Any special requests or notes from the conversation"},
            },
            "required": ["safari_slug", "customer_name", "customer_email"],
        },
    },
]


async def _execute_tool(tool_name: str, tool_input: dict, db: AsyncSession) -> dict:
    """Execute a tool call and return the result."""
    if tool_name == "search_safaris":
        q = select(Safari).where(Safari.is_active == True)
        if tool_input.get("category"):
            q = q.where(Safari.category == tool_input["category"])
        if tool_input.get("max_price_usd"):
            q = q.where(Safari.price_usd_2pax <= tool_input["max_price_usd"] * 2)
        if tool_input.get("min_days"):
            q = q.where(Safari.duration_days >= tool_input["min_days"])
        if tool_input.get("max_days"):
            q = q.where(Safari.duration_days <= tool_input["max_days"])
        q = q.order_by(Safari.sort_order).limit(6)
        result = await db.execute(q)
        safaris = result.scalars().all()
        keyword = tool_input.get("keyword", "").lower()
        if keyword:
            safaris = [s for s in safaris if keyword in s.name.lower() or keyword in (s.tagline or "").lower()]
        return {
            "safaris": [
                {
                    "slug": s.slug,
                    "name": s.name,
                    "tagline": s.tagline,
                    "category": s.category,
                    "duration_days": s.duration_days,
                    "price_usd_2pax": float(s.price_usd_2pax) if s.price_usd_2pax else None,
                    "price_usd_4pax": float(s.price_usd_4pax) if s.price_usd_4pax else None,
                    "cover_image": s.cover_image,
                    "highlights": s.highlights[:3] if s.highlights else [],
                }
                for s in safaris
            ],
            "count": len(safaris),
        }

    elif tool_name == "get_safari_details":
        result = await db.execute(select(Safari).where(Safari.slug == tool_input["slug"]))
        s = result.scalar_one_or_none()
        if not s:
            return {"error": "Safari not found"}
        return {
            "slug": s.slug, "name": s.name, "tagline": s.tagline,
            "duration_days": s.duration_days, "category": s.category,
            "price_usd_solo": float(s.price_usd_solo) if s.price_usd_solo else None,
            "price_usd_2pax": float(s.price_usd_2pax) if s.price_usd_2pax else None,
            "price_usd_4pax": float(s.price_usd_4pax) if s.price_usd_4pax else None,
            "price_usd_6pax": float(s.price_usd_6pax) if s.price_usd_6pax else None,
            "highlights": s.highlights, "inclusions": s.inclusions, "exclusions": s.exclusions,
            "deposit_pct": s.deposit_pct, "installments_ok": s.installments_ok,
        }

    elif tool_name == "check_availability":
        from datetime import date
        try:
            travel_date = date.fromisoformat(tool_input["travel_date"])
        except Exception:
            return {"available": True, "note": "Date format invalid — assuming available, team will confirm"}
        result = await db.execute(
            select(SafariAvailability).where(
                and_(
                    SafariAvailability.date == travel_date,
                )
            )
        )
        block = result.scalar_one_or_none()
        if block and block.status == "blocked":
            return {"available": False, "note": block.note or "This date is unavailable. Please choose another date."}
        return {"available": True, "note": "Date looks available — team will confirm within 4 hours."}

    elif tool_name == "create_enquiry":
        ref = "ENG-" + "".join(random.choices(string.digits, k=6))
        result = await db.execute(select(Safari).where(Safari.slug == tool_input["safari_slug"]))
        safari = result.scalar_one_or_none()
        enquiry = Enquiry(
            reference=ref,
            customer_name=tool_input["customer_name"],
            customer_email=tool_input["customer_email"],
            customer_phone=tool_input.get("customer_phone"),
            source="ai_agent",
            status="new",
            group_size=tool_input.get("group_size"),
            special_requests=tool_input.get("special_requests"),
            safari_id=safari.id if safari else None,
            notes=f"Booked via AI Agent. Safari: {tool_input['safari_slug']}. Date: {tool_input.get('travel_date', 'TBD')}",
        )
        db.add(enquiry)
        await db.commit()
        return {
            "success": True,
            "reference": ref,
            "message": f"Enquiry {ref} created successfully. The team will contact {tool_input['customer_email']} within 4 hours with a confirmed quote and payment link.",
            "safari_slug": tool_input["safari_slug"],
        }

    return {"error": f"Unknown tool: {tool_name}"}


async def stream_agentic_chat(conversation: list[dict], db: AsyncSession) -> AsyncIterator[str]:
    """Agentic streaming chat with tool use."""
    messages = list(conversation)

    while True:
        full_text = ""
        tool_calls = []
        stop_reason = None
        current_tool = None
        current_tool_input_str = ""

        async with _async_client.messages.stream(
            model="claude-opus-4-5",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages,
        ) as stream:
            async for event in stream:
                event_type = type(event).__name__

                if event_type == "RawContentBlockStartEvent":
                    block = event.content_block
                    if block.type == "text":
                        pass
                    elif block.type == "tool_use":
                        current_tool = {"id": block.id, "name": block.name, "input": {}}
                        current_tool_input_str = ""
                        yield f"\x01{json.dumps({'tool_start': block.name})}\n"

                elif event_type == "RawContentBlockDeltaEvent":
                    delta = event.delta
                    if delta.type == "text_delta":
                        full_text += delta.text
                        yield f"\x00{json.dumps({'chunk': delta.text})}\n"
                    elif delta.type == "input_json_delta":
                        current_tool_input_str += delta.partial_json

                elif event_type == "RawContentBlockStopEvent":
                    if current_tool:
                        try:
                            current_tool["input"] = json.loads(current_tool_input_str) if current_tool_input_str else {}
                        except Exception:
                            current_tool["input"] = {}
                        tool_calls.append(current_tool)
                        current_tool = None
                        current_tool_input_str = ""

                elif event_type == "RawMessageStopEvent":
                    stop_reason = stream.get_final_message().stop_reason

        if stop_reason != "tool_use" or not tool_calls:
            yield f"\x02{json.dumps({'done': True})}\n"
            break

        # Build assistant message with all content blocks
        assistant_content = []
        if full_text:
            assistant_content.append({"type": "text", "text": full_text})
        for tc in tool_calls:
            assistant_content.append({"type": "tool_use", "id": tc["id"], "name": tc["name"], "input": tc["input"]})
        messages.append({"role": "assistant", "content": assistant_content})

        # Execute tools and collect results
        tool_results = []
        for tc in tool_calls:
            logger.info("Executing tool: %s with input: %s", tc["name"], tc["input"])
            result = await _execute_tool(tc["name"], tc["input"], db)
            logger.info("Tool result: %s", result)
            yield f"\x01{json.dumps({'tool_result': tc['name'], 'data': result})}\n"
            tool_results.append({"type": "tool_result", "tool_use_id": tc["id"], "content": json.dumps(result)})

        messages.append({"role": "user", "content": tool_results})


# ── Legacy functions kept for backward compatibility ──────────────────────────

async def get_safari_catalogue(db: AsyncSession) -> tuple[str, dict[str, str]]:
    result = await db.execute(select(Safari).where(Safari.is_active == True))
    safaris = result.scalars().all()
    lines: list[str] = []
    slug_map: dict[str, str] = {}
    for s in safaris:
        price = f"${s.price_usd_2pax:.0f}" if s.price_usd_2pax else "POA"
        lines.append(f"- **{s.name}** ({s.duration_days} days, from {price}/pp): {s.tagline}")
        slug_map[s.name.lower()] = s.slug
        slug_map[s.slug.replace("-", " ")] = s.slug
    return "\n".join(lines), slug_map


def find_safari_slugs(text: str, slug_map: dict[str, str]) -> list[str]:
    found: set[str] = set()
    text_lower = text.lower()
    for key, slug in slug_map.items():
        if key in text_lower:
            found.add(slug)
        if len(found) >= 3:
            break
    return list(found)


async def stream_chat(conversation: list[dict], db: AsyncSession) -> AsyncIterator[str]:
    catalogue, slug_map = await get_safari_catalogue(db)
    system = SYSTEM_PROMPT + f"\n\nAVAILABLE PACKAGES:\n{catalogue}"
    full_text = ""
    async with _async_client.messages.stream(
        model="claude-opus-4-5",
        max_tokens=700,
        system=system,
        messages=conversation,
    ) as stream:
        async for chunk in stream.text_stream:
            full_text += chunk
            yield chunk
    slugs = find_safari_slugs(full_text, slug_map)
    yield "\x00" + json.dumps({"safari_slugs": slugs})


async def chat(conversation: list[dict], db: AsyncSession) -> str:
    catalogue, _ = await get_safari_catalogue(db)
    system = SYSTEM_PROMPT + f"\n\nAVAILABLE PACKAGES:\n{catalogue}"
    response = _client.messages.create(
        model="claude-opus-4-5",
        max_tokens=700,
        system=system,
        messages=conversation,
    )
    return response.content[0].text


async def get_safari_recommendation(conversation: list, safaris_catalogue: list) -> str:
    catalogue_str = "\n".join(
        f"- {s['name']} ({s['duration_days']} days, from ${s.get('price_usd_2pax') or 'POA'}/pp): {s['tagline']}"
        for s in safaris_catalogue
    )
    system = SYSTEM_PROMPT + f"\n\nAVAILABLE PACKAGES:\n{catalogue_str}"
    response = _client.messages.create(
        model="claude-opus-4-5",
        max_tokens=700,
        system=system,
        messages=conversation,
    )
    return response.content[0].text
