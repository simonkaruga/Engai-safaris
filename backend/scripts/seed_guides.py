"""
Run: python scripts/seed_guides.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.guide import Guide
from sqlalchemy import select

GUIDES = [
    {
        "slug": "james-ole-nkarai",
        "name": "James Ole Nkarai",
        "title": "Senior Safari Guide & Naturalist",
        "bio": "Born in a Maasai manyatta on the edge of Lake Naivasha, James has spent 14 years guiding in East Africa's most iconic parks. He speaks fluent Maasai, Swahili, English and basic French. His knowledge of animal behaviour — particularly big cats — is extraordinary. When James says 'turn left here', you turn left. The leopard is always exactly where he said it would be.",
        "photo_url": None,
        "specialities": ["Big cats", "Bird watching", "Maasai culture", "Lake Naivasha"],
        "languages": ["English", "Swahili", "Maasai", "French (basic)"],
        "years_exp": 14,
        "home_region": "Lake Naivasha / Masai Mara",
        "is_featured": True,
        "avg_rating": 4.97,
        "review_count": 184,
        "certifications": ["TRA Class A Guide", "Kenya Wildlife Service", "Wilderness First Aid"],
        "fun_fact": "Has named over 40 individual hippos in Lake Naivasha and can identify each one on sight.",
    },
    {
        "slug": "grace-wanjiru-kamau",
        "name": "Grace Wanjiru Kamau",
        "title": "Wildlife Guide & Cultural Interpreter",
        "bio": "Grace grew up in Nanyuki on the slopes of Mount Kenya and has been guiding for 9 years. Her botanical knowledge is unmatched — she can identify 300+ plant species by leaf alone. She specialises in cultural experiences: Maasai beadwork, traditional cooking, and community visits. Female travellers particularly request Grace by name. She makes every guest feel safe, seen, and utterly fascinated.",
        "photo_url": None,
        "specialities": ["Botany", "Cultural experiences", "Amboseli", "Mount Kenya"],
        "languages": ["English", "Swahili", "Kikuyu"],
        "years_exp": 9,
        "home_region": "Mount Kenya / Amboseli",
        "is_featured": True,
        "avg_rating": 4.95,
        "review_count": 127,
        "certifications": ["TRA Class A Guide", "First Aid Certified", "Cultural Tourism Guide"],
        "fun_fact": "Completed the Sirimon Route on Mount Kenya in record time as a teenager — barefoot.",
    },
    {
        "slug": "samuel-kiprop-rotich",
        "name": "Samuel Kiprop Rotich",
        "title": "Senior Driver-Guide & Bush Mechanic",
        "bio": "Samuel is from Kericho and has been navigating Kenya's roads and bush tracks for 12 years. He holds a mechanic's certificate alongside his guiding license — if the Land Cruiser breaks down in the Mara, Samuel has it running again in 20 minutes. His wildlife tracking instincts are exceptional: he follows spoor, reads grass disturbance, and has found rhinos that other guides spent hours searching for. Clients call him 'the bush GPS'.",
        "photo_url": None,
        "specialities": ["Vehicle mechanics", "Wildlife tracking", "Lake Nakuru", "Samburu"],
        "languages": ["English", "Swahili", "Kalenjin"],
        "years_exp": 12,
        "home_region": "Lake Nakuru / Samburu",
        "is_featured": True,
        "avg_rating": 4.93,
        "review_count": 201,
        "certifications": ["TRA Class A Guide", "Motor Vehicle Mechanic Certificate", "Kenya Red Cross First Aid"],
        "fun_fact": "Once changed a Land Cruiser gearbox in the bush in 90 minutes using only the tools he carries.",
    },
    {
        "slug": "amina-hassan-omar",
        "name": "Amina Hassan Omar",
        "title": "Coastal & Marine Guide",
        "bio": "Amina is from Lamu and specialises in the Kenyan coast — Diani Beach, Mombasa Old Town, Lamu Island, and Malindi. She holds a marine biology certificate and leads snorkelling excursions in the Watamu Marine Reserve. Her knowledge of Swahili culture, coastal food, and dhow sailing is extraordinary. When your safari ends at the beach, Amina ensures it ends perfectly.",
        "photo_url": None,
        "specialities": ["Coastal Kenya", "Marine life", "Swahili culture", "Diani Beach"],
        "languages": ["English", "Swahili", "Arabic (conversational)"],
        "years_exp": 7,
        "home_region": "Diani Beach / Lamu",
        "is_featured": False,
        "avg_rating": 4.91,
        "review_count": 89,
        "certifications": ["TRA Class A Guide", "Marine Biology Certificate", "PADI Rescue Diver"],
        "fun_fact": "Can navigate a traditional Swahili dhow from Lamu to Malindi using only the stars.",
    },
    {
        "slug": "david-mutua-kioko",
        "name": "David Mutua Kioko",
        "title": "Tsavo & Amboseli Specialist",
        "bio": "David grew up in Machakos, 90 minutes from Tsavo East, and has been guiding in Kenya's largest national park for 11 years. He knows Tsavo like most people know their own neighbourhood — every seasonal waterhole, every resident elephant family, every lion coalition. His patience is legendary: he will sit at a waterhole at 5am for two hours because he knows the cheetah family comes at sunrise. They always do.",
        "photo_url": None,
        "specialities": ["Tsavo East", "Amboseli elephants", "Predator tracking", "Red elephants"],
        "languages": ["English", "Swahili", "Kamba"],
        "years_exp": 11,
        "home_region": "Tsavo / Amboseli",
        "is_featured": False,
        "avg_rating": 4.92,
        "review_count": 156,
        "certifications": ["TRA Class A Guide", "KWS Ranger Training", "Wilderness First Responder"],
        "fun_fact": "Has documented 14 lion cubs born in Tsavo East over 6 years — he knows their names and lineage.",
    },
    {
        "slug": "fatuma-wanjiku-ngatia",
        "name": "Fatuma Wanjiku Ngatia",
        "title": "Photography Safari Specialist",
        "bio": "Fatuma trained as a professional photographer before becoming a guide, which means she thinks in light, composition, and decisive moments. She knows exactly where to position the vehicle for the best angle on a cheetah kill, when the golden hour hits Amboseli with Kilimanjaro behind, and how to help non-photographers get stunning shots on a phone. She has guided for National Geographic contributors and first-time safari guests with equal enthusiasm.",
        "photo_url": None,
        "specialities": ["Photography lighting", "Masai Mara", "Amboseli", "Bird photography"],
        "languages": ["English", "Swahili", "Kikuyu"],
        "years_exp": 8,
        "home_region": "Masai Mara / Amboseli",
        "is_featured": False,
        "avg_rating": 4.96,
        "review_count": 112,
        "certifications": ["TRA Class A Guide", "Professional Photographer (CPK)", "First Aid Certified"],
        "fun_fact": "One of her guest photos — taken under her direction — was published in BBC Wildlife Magazine.",
    },
]


async def seed():
    async with SessionLocal() as db:
        ok = 0
        for g in GUIDES:
            try:
                result = await db.execute(select(Guide).where(Guide.slug == g["slug"]))
                guide = result.scalar_one_or_none()
                if guide:
                    for k, v in g.items():
                        setattr(guide, k, v)
                    print(f"✅ Updated: {guide.slug}")
                else:
                    guide = Guide(**g)
                    db.add(guide)
                    print(f"✅ Created: {g['slug']}")
                ok += 1
            except Exception as exc:
                await db.rollback()
                print(f"❌ Failed [{g.get('slug', '?')}]: {exc}")
                continue
        await db.commit()
        print(f"\nDone — {ok}/{len(GUIDES)} guides seeded.")


asyncio.run(seed())
