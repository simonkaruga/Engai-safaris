"""
Run: python scripts/seed_safaris.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay
from sqlalchemy import select

SAFARIS = [
    {
        "slug": "naivasha-day-trip",
        "name": "Lake Naivasha Day Trip",
        "tagline": "Hippos, Crescent Island & Hell's Gate — all in one day",
        "category": "classic",
        "duration_days": 1,
        "price_usd_solo": 180, "price_usd_2pax": 150, "price_usd_4pax": 120, "price_usd_6pax": 100,
        "price_kes_solo": 23400, "price_kes_2pax": 19500, "price_kes_4pax": 15600, "price_kes_6pax": 13000,
        "wholesale_usd": 100,
        "is_featured": True,
        "sort_order": 1,
        "highlights": ["Boat safari with hippos", "Crescent Island walking safari", "Hell's Gate cycling"],
        "inclusions": ["4x4 Land Cruiser", "Professional guide", "Boat hire", "Park fees", "Lunch"],
        "exclusions": ["Accommodation", "Personal items", "Tips"],
        "days": [
            {"day_number": 1, "title": "Naivasha Full Day",
             "description": "Depart Nairobi at 6am. Arrive Naivasha 8am. Boat safari — hippos at 3 metres. Crescent Island walking safari with giraffe and zebra. Hell's Gate cycling. Return Nairobi by 7pm.",
             "meals": {"lunch": "Fisherman's Camp restaurant"}, "activities": ["Boat safari", "Walking safari", "Cycling"]}
        ],
    },
    {
        "slug": "3-day-masai-mara",
        "name": "3-Day Masai Mara Safari",
        "tagline": "The classic Mara experience — Big Five in 72 hours",
        "category": "classic",
        "duration_days": 3,
        "price_usd_solo": 950, "price_usd_2pax": 750, "price_usd_4pax": 620, "price_usd_6pax": 550,
        "price_kes_solo": 123500, "price_kes_2pax": 97500, "price_kes_4pax": 80600, "price_kes_6pax": 71500,
        "wholesale_usd": 580,
        "is_featured": True,
        "sort_order": 2,
        "highlights": ["Big Five", "Maasai village visit", "Sunrise game drive", "Mara River crossing (seasonal)"],
        "inclusions": ["4x4 Land Cruiser", "Professional guide", "2 nights lodge", "All meals", "Park fees", "Airport transfers"],
        "exclusions": ["Flights", "Travel insurance", "Tips", "Personal items"],
        "days": [
            {"day_number": 1, "title": "Nairobi → Masai Mara",
             "description": "Depart Nairobi 7am. Drive through the Great Rift Valley. Arrive Mara 1pm. Afternoon game drive. Sundowner on the plains.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara",
             "description": "6am sunrise game drive. Big Five tracking. Optional Maasai village visit. Afternoon game drive to Mara River.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Bush picnic", "Maasai village", "Mara River drive"]},
            {"day_number": 3, "title": "Masai Mara → Nairobi",
             "description": "Final sunrise game drive 6–9am. Breakfast. Drive back to Nairobi. Arrive 4pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise game drive"], "distance_km": 270, "drive_hours": 5.5},
        ],
    },
    {
        "slug": "5-day-mara-amboseli",
        "name": "5-Day Mara & Amboseli",
        "tagline": "Lions in the Mara. Elephants under Kilimanjaro.",
        "category": "classic",
        "duration_days": 5,
        "price_usd_solo": 1650, "price_usd_2pax": 1350, "price_usd_4pax": 1100, "price_usd_6pax": 980,
        "price_kes_solo": 214500, "price_kes_2pax": 175500, "price_kes_4pax": 143000, "price_kes_6pax": 127400,
        "wholesale_usd": 1050,
        "is_featured": True,
        "sort_order": 3,
        "highlights": ["Big Five", "Kilimanjaro views", "Elephant herds", "Great Migration (seasonal)"],
        "inclusions": ["4x4 Land Cruiser", "Professional guide", "4 nights lodges", "All meals", "Park fees"],
        "exclusions": ["Flights", "Travel insurance", "Tips"],
        "days": [
            {"day_number": 1, "title": "Nairobi → Masai Mara", "description": "Depart 7am. Arrive Mara 1pm. Afternoon game drive.", "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge"},
            {"day_number": 2, "title": "Full Day Masai Mara", "description": "Full day game drives. Big Five tracking. Mara River.", "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge"},
            {"day_number": 3, "title": "Masai Mara → Amboseli", "description": "Morning game drive. Drive to Amboseli via Narok. Arrive 5pm.", "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge", "distance_km": 320, "drive_hours": 6},
            {"day_number": 4, "title": "Full Day Amboseli", "description": "Sunrise drive with Kilimanjaro. Elephant herds. Afternoon swamp drive.", "meals": {"breakfast": "Lodge", "lunch": "Lodge", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge"},
            {"day_number": 5, "title": "Amboseli → Nairobi", "description": "Final morning drive. Drive back to Nairobi. Arrive 2pm.", "meals": {"breakfast": "Lodge", "lunch": "En route"}, "distance_km": 240, "drive_hours": 4},
        ],
    },
]


async def seed():
    async with SessionLocal() as db:
        for s in SAFARIS:
            days = s.pop("days")
            result = await db.execute(select(Safari).where(Safari.slug == s["slug"]))
            safari = result.scalar_one_or_none()
            if safari:
                for k, v in s.items():
                    setattr(safari, k, v)
                print(f"✅ Updated safari: {safari.slug}")
            else:
                safari = Safari(**s)
                db.add(safari)
                await db.flush()
                for day in days:
                    db.add(ItineraryDay(safari_id=safari.id, **day))
                print(f"✅ Created safari: {safari.slug}")
        await db.commit()


asyncio.run(seed())
