import base64
import json
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import anthropic
from app.config import settings

router = APIRouter(prefix="/api/wildlife-id", tags=["wildlife-id"])

_client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

WILDLIFE_PROMPT = """You are a Kenya wildlife expert and naturalist guide. Analyse this photo and identify the animal.

Return ONLY a valid JSON object — no markdown, no explanation, no code fences. Just raw JSON.

If the photo clearly shows a recognisable animal, return:
{
  "found": true,
  "common_name": "African Elephant",
  "scientific_name": "Loxodonta africana",
  "swahili_name": "Tembo",
  "tagline": "The largest land animal on Earth",
  "description": "2-3 sentence vivid description of this animal and what makes it special",
  "habitat": "Savanna, forests, and bushland across sub-Saharan Africa",
  "diet": "Herbivore — grasses, leaves, bark, fruit",
  "social": "Lives in matriarchal herds of 10–20 females led by the eldest cow",
  "conservation_status": "Vulnerable",
  "conservation_code": "VU",
  "lifespan": "60–70 years in the wild",
  "fun_facts": [
    "An elephant drinks up to 200 litres of water per day",
    "They communicate through infrasound — vibrations too low for humans to hear",
    "Elephants mourn their dead and revisit bones of deceased family members"
  ],
  "kenya_parks": ["Amboseli", "Tsavo East", "Tsavo West", "Samburu"],
  "best_time_to_see": "Year-round at Amboseli — Kilimanjaro as backdrop is iconic Nov–Feb",
  "danger_level": "High — maintain 20m distance, never between mother and calf",
  "interesting_behaviour": "What behaviour or feature is visible in this specific photo"
}

If the photo does NOT show a wildlife animal (e.g. person, car, building, blurry image, pet), return:
{
  "found": false,
  "message": "I can only identify wild animals. Try a clear photo of an animal in the wild."
}

Be specific and accurate. If you can see details from the specific photo (posture, age, herd behaviour, lighting), mention them in interesting_behaviour."""


class WildlifeIDRequest(BaseModel):
    image_base64: str
    media_type: str = "image/jpeg"  # image/jpeg, image/png, image/webp


@router.post("")
async def identify_wildlife(req: WildlifeIDRequest):
    # Validate media type
    allowed = {"image/jpeg", "image/png", "image/webp", "image/gif"}
    if req.media_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported image type")

    # Strip data URL prefix if present
    image_data = req.image_base64
    if "," in image_data:
        image_data = image_data.split(",", 1)[1]

    # Validate it's valid base64
    try:
        base64.b64decode(image_data, validate=True)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image data")

    try:
        response = _client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1200,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": req.media_type,
                                "data": image_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": WILDLIFE_PROMPT,
                        },
                    ],
                }
            ],
        )

        raw = response.content[0].text.strip()

        # Strip code fences if model wrapped it anyway
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)

        result = json.loads(raw)
        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned unexpected format — try again")
    except anthropic.AuthenticationError:
        raise HTTPException(status_code=503, detail="AI service not configured")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Too many requests — try again in a moment")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Identification failed — please try again")
