"""
Run: python scripts/seed_destinations.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.destination import Destination

DESTINATIONS = [
    {
        "slug": "masai-mara",
        "name": "Masai Mara National Reserve",
        "tagline": "The Greatest Wildlife Show on Earth",
        "description": "Home to the Great Migration and Africa's highest density of big cats.",
        "region": "Rift Valley",
        "best_months": ["July", "August", "September", "October"],
        "highlights": ["Great Migration", "Big Five", "Maasai Culture", "Hot Air Balloon"],
        "wildlife_list": ["Lion", "Leopard", "Cheetah", "Elephant", "Buffalo", "Wildebeest"],
        "latitude": -1.5021, "longitude": 35.1438,
    },
    {
        "slug": "amboseli",
        "name": "Amboseli National Park",
        "tagline": "Elephants Against Kilimanjaro",
        "description": "Africa's most iconic view — elephant herds with Kilimanjaro as backdrop.",
        "region": "Rift Valley",
        "best_months": ["June", "July", "August", "September", "October"],
        "highlights": ["Elephant Herds", "Kilimanjaro Views", "Big Five", "Maasai Villages"],
        "wildlife_list": ["Elephant", "Lion", "Cheetah", "Giraffe", "Zebra"],
        "latitude": -2.6527, "longitude": 37.2606,
    },
    {
        "slug": "lake-naivasha",
        "name": "Lake Naivasha",
        "tagline": "Hippos, Flamingos & Crescent Island",
        "description": "A freshwater lake 90 minutes from Nairobi — perfect for day trips and weekend escapes.",
        "region": "Rift Valley",
        "best_months": ["January", "February", "June", "July", "August"],
        "highlights": ["Boat Safari", "Crescent Island Walk", "Hell's Gate", "Hippos"],
        "wildlife_list": ["Hippo", "Flamingo", "Giraffe", "Zebra", "Waterbuck"],
        "latitude": -0.7667, "longitude": 36.3500,
    },
    {
        "slug": "samburu",
        "name": "Samburu National Reserve",
        "tagline": "Kenya's Hidden Gem",
        "description": "Remote northern Kenya — home to rare species found nowhere else in the country.",
        "region": "Northern Kenya",
        "best_months": ["January", "February", "June", "July", "August", "September"],
        "highlights": ["Samburu Special Five", "Ewaso Nyiro River", "Samburu Culture"],
        "wildlife_list": ["Grevy's Zebra", "Reticulated Giraffe", "Gerenuk", "Beisa Oryx", "Somali Ostrich"],
        "latitude": 0.5833, "longitude": 37.5333,
    },
]


async def seed():
    async with SessionLocal() as db:
        for d in DESTINATIONS:
            existing = await db.execute(__import__("sqlalchemy", fromlist=["select"]).select(Destination).where(Destination.slug == d["slug"]))
            if not existing.scalar_one_or_none():
                db.add(Destination(**d))
        await db.commit()
        print(f"✅ Seeded {len(DESTINATIONS)} destinations")


asyncio.run(seed())
