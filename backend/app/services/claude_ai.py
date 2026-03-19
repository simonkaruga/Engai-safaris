import anthropic
from app.config import settings

_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

SYSTEM_PROMPT = """You are Engai, the AI safari planner for Engai Safaris Kenya.
You help tourists plan their perfect Kenya safari.
Ask about: travel dates, group size, budget, interests
(Big Five, Migration, Culture, Photography, Adventure, Honeymoon),
and experience level. Recommend 1–3 specific Engai Safaris packages.
Always end with: "Shall I send this recommendation to our team
so they can prepare a personalised quote for you?"
Be warm, knowledgeable, and specific. Never be generic."""


async def get_safari_recommendation(conversation: list, safaris_catalogue: list) -> str:
    response = _client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        system=SYSTEM_PROMPT + f"\n\nAvailable safaris: {safaris_catalogue}",
        messages=conversation,
    )
    return response.content[0].text
