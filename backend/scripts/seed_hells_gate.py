"""
Run: python scripts/seed_hells_gate.py
Upserts Hell's Gate destination with full content + adds cycling safari packages.
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.database import SessionLocal
from app.models.destination import Destination
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay

HELLS_GATE = {
    "slug": "hells-gate",
    "name": "Hell's Gate National Park",
    "tagline": "Cycle Among Zebras & Giraffes in Africa's Most Dramatic Gorge",
    "description": (
        "Hell's Gate is unlike any other park in Kenya — and unlike any other park in Africa. "
        "It is the only national park where you are allowed to walk and cycle freely among wildlife. "
        "No vehicle required. No cage. Just you, a bicycle, and zebras grazing 10 metres away.\n\n"
        "The park sits 20 minutes south of Lake Naivasha in the Great Rift Valley. "
        "Two towering volcanic rock towers — Fischer's Tower and Central Tower — frame the entrance. "
        "Beyond them, a 200-metre deep gorge carved by ancient rivers drops into geothermal hot springs "
        "that feed the Olkaria geothermal plant — the largest in Africa.\n\n"
        "At $26 per person per day, Hell's Gate has the lowest park fees in Kenya. "
        "Combined with Lake Naivasha's boat safari (hippos at 3 metres), it is the most searched "
        "day-trip pairing from Nairobi on Google — and the best value wildlife day in East Africa."
    ),
    "country": "Kenya",
    "region": "Rift Valley",
    "latitude": -0.9167,
    "longitude": 36.3167,
    "best_months": ["Jan", "Feb", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "highlights": [
        "Cycle freely among zebras & giraffes",
        "Walk the gorge — no guide required",
        "Fischer's Tower volcanic rock climb",
        "Geothermal hot springs & spa",
        "Lowest park fees in Kenya ($26/day)",
        "Lion King & Tomb Raider filming location",
        "20 minutes from Lake Naivasha",
        "Combine with boat safari for perfect day",
    ],
    "wildlife_list": [
        "Plains Zebra", "Maasai Giraffe", "African Buffalo", "Eland",
        "Hartebeest", "Thomson's Gazelle", "Cheetah", "Leopard",
        "Hyrax", "Augur Buzzard", "Lammergeier (Bearded Vulture)",
        "Egyptian Vulture", "Verreaux's Eagle",
    ],
    "peak_fee_usd": 26,
    "low_fee_usd": 26,
    "meta_title": "Hell's Gate National Park — Cycling Safari Kenya | Engai Safaris",
    "meta_desc": (
        "Cycle among zebras and giraffes at Hell's Gate — Kenya's only walk-in park. "
        "$26 park fee. Gorge walk, geothermal springs, Fischer's Tower. "
        "20 minutes from Lake Naivasha. Book with Engai Safaris."
    ),
}

NEW_SAFARIS = [
    {
        "slug": "hells-gate-cycling-day",
        "name": "Hell's Gate Cycling Day Trip",
        "tagline": "Cycle among zebras & giraffes — Kenya's most unique wildlife experience",
        "description": (
            "This is the safari nobody expects — and the one they never forget. "
            "Hell's Gate is the only park in Kenya where you cycle freely among wildlife. "
            "No vehicle. No cage. Just a bicycle, open savannah, and zebras grazing beside the path.\n\n"
            "We depart Nairobi at 6am, arrive at the park by 8:30am, and spend the morning cycling "
            "the 22km main circuit through Fischer's Tower, the Central Tower, and the gorge viewpoints. "
            "After lunch at the Elsa Gate picnic site, we descend into the gorge — a 200-metre deep "
            "canyon with geothermal hot springs at the base. Optional geothermal spa (KES 500 extra).\n\n"
            "Back in Nairobi by 6pm. The cheapest, most unique wildlife day in East Africa."
        ),
        "category": "adventures",
        "duration_days": 1,
        "group_size_max": 8,
        "price_usd_solo": 95,
        "price_usd_2pax": 75,
        "price_usd_4pax": 60,
        "price_usd_6pax": 50,
        "price_kes_solo": 12350,
        "price_kes_2pax": 9750,
        "price_kes_4pax": 7800,
        "price_kes_6pax": 6500,
        "wholesale_usd": 45,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 10,
        "highlights": [
            "Cycle the 22km wildlife circuit",
            "Fischer's Tower & Central Tower",
            "Gorge walk to geothermal springs",
            "Zebras & giraffes at arm's length",
            "Lowest park fees in Kenya ($26)",
            "Back in Nairobi by 6pm",
        ],
        "inclusions": [
            "Return transport from Nairobi",
            "Professional guide",
            "Bicycle hire (mountain bike)",
            "Hell's Gate park fees ($26pp)",
            "Gorge entry fee",
            "Packed lunch & water",
        ],
        "exclusions": [
            "Geothermal spa (KES 500 — optional)",
            "Personal items",
            "Tips",
        ],
        "what_to_bring": [
            "Closed-toe shoes (mandatory for cycling)",
            "Sunscreen & hat",
            "Light jacket (gorge is cool)",
            "Camera",
            "Small backpack",
        ],
        "cancellation_policy": (
            "Free cancellation up to 48 hours before departure. "
            "Within 48 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Hell's Gate Cycling Safari Day Trip from Nairobi | Engai Safaris",
        "meta_desc": (
            "Cycle among zebras and giraffes at Hell's Gate National Park. "
            "From $50pp. Gorge walk, Fischer's Tower, geothermal springs. "
            "Day trip from Nairobi. Book instantly with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Hell's Gate → Gorge → Nairobi",
                "description": (
                    "6:00am — Depart Nairobi. Drive through the Great Rift Valley escarpment.\n"
                    "8:30am — Arrive Hell's Gate. Collect bicycles at the main gate.\n"
                    "9:00am — Begin the 22km cycling circuit. Fischer's Tower on your left — "
                    "a 25-metre volcanic plug that inspired Pride Rock in The Lion King. "
                    "Zebras graze the verge. Giraffes cross the track ahead. Buffalo watch from the shade.\n"
                    "11:30am — Reach the gorge viewpoint. Lock bikes. Descend on foot into the 200m gorge. "
                    "Geothermal steam vents. Ancient rock formations. Hot springs at the base.\n"
                    "1:00pm — Packed lunch at Elsa Gate picnic site (named after Elsa the lioness from Born Free).\n"
                    "2:00pm — Optional: geothermal spa at Olkaria (KES 500).\n"
                    "3:00pm — Return drive to Nairobi.\n"
                    "6:00pm — Arrive Nairobi."
                ),
                "meals": {"lunch": "Packed lunch included"},
                "activities": [
                    "22km cycling circuit",
                    "Fischer's Tower viewpoint",
                    "Gorge walk",
                    "Geothermal springs",
                    "Wildlife spotting on bicycle",
                ],
                "distance_km": 160,
                "drive_hours": 2.5,
            }
        ],
    },
    {
        "slug": "naivasha-hells-gate-combo",
        "name": "Naivasha + Hell's Gate Combo",
        "tagline": "Kenya's best value day — hippos at dawn, cycling at noon",
        "description": (
            "This is the most searched Naivasha activity pairing on Google — and for good reason. "
            "Two completely different wildlife experiences, back to back, in one day.\n\n"
            "Morning: Lake Naivasha boat safari. Hippos surface 3 metres from the boat. "
            "Crescent Island walking safari — the only place in Kenya where you walk among "
            "giraffes, zebras, and wildebeest with no fence and no vehicle.\n\n"
            "Afternoon: Hell's Gate National Park. Collect bicycles and cycle the 22km circuit "
            "among zebras and giraffes. Descend into the gorge. Geothermal springs.\n\n"
            "Two parks. Two completely different ecosystems. One unforgettable day. "
            "Back in Nairobi by 7pm."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 6,
        "price_usd_solo": 210,
        "price_usd_2pax": 175,
        "price_usd_4pax": 145,
        "price_usd_6pax": 125,
        "price_kes_solo": 27300,
        "price_kes_2pax": 22750,
        "price_kes_4pax": 18850,
        "price_kes_6pax": 16250,
        "wholesale_usd": 120,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 5,
        "highlights": [
            "Hippos at 3 metres — boat safari",
            "Crescent Island walking safari",
            "Cycle among zebras & giraffes",
            "Hell's Gate gorge walk",
            "Two parks in one day",
            "Kenya's best value wildlife day",
        ],
        "inclusions": [
            "Return transport from Nairobi",
            "Professional guide",
            "Boat safari (1 hour)",
            "Crescent Island entry",
            "Bicycle hire at Hell's Gate",
            "Both park fees (Naivasha + Hell's Gate)",
            "Lunch at Fisherman's Camp",
        ],
        "exclusions": [
            "Geothermal spa (optional, KES 500)",
            "Personal items",
            "Tips",
        ],
        "what_to_bring": [
            "Closed-toe shoes (required for cycling)",
            "Light jacket (early morning on the lake is cool)",
            "Sunscreen",
            "Camera with zoom lens",
            "Small backpack",
        ],
        "cancellation_policy": (
            "Free cancellation up to 48 hours before departure. "
            "Within 48 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Naivasha + Hell's Gate Day Trip from Nairobi | Engai Safaris",
        "meta_desc": (
            "Kenya's best value day trip — Lake Naivasha boat safari with hippos + "
            "Hell's Gate cycling safari. From $125pp. Book instantly with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Naivasha Boat → Hell's Gate Cycling → Nairobi",
                "description": (
                    "5:30am — Depart Nairobi. Early start to beat the Naivasha traffic.\n"
                    "7:30am — Arrive Lake Naivasha. Board the boat. "
                    "Hippos surface beside the hull — close enough to hear them breathe. "
                    "Fish eagles dive. Pelicans drift. Kingfishers flash electric blue.\n"
                    "9:00am — Crescent Island. Disembark and walk freely among giraffes, "
                    "zebras, wildebeest, and waterbuck. No fence. No vehicle. Just you and the animals.\n"
                    "10:30am — Drive 20 minutes south to Hell's Gate National Park.\n"
                    "11:00am — Collect bicycles. Begin the 22km cycling circuit. "
                    "Fischer's Tower. Zebras on the track. Giraffes crossing ahead.\n"
                    "1:00pm — Lunch at Fisherman's Camp on the lake shore.\n"
                    "2:30pm — Gorge walk. Descend into the 200m canyon. Geothermal steam vents.\n"
                    "4:00pm — Return drive to Nairobi.\n"
                    "7:00pm — Arrive Nairobi."
                ),
                "meals": {"lunch": "Fisherman's Camp restaurant"},
                "activities": [
                    "Lake Naivasha boat safari",
                    "Crescent Island walking safari",
                    "Hell's Gate cycling circuit",
                    "Gorge walk",
                    "Geothermal springs",
                ],
                "distance_km": 180,
                "drive_hours": 3.0,
            }
        ],
    },
]


async def seed():
    async with SessionLocal() as db:
        # Upsert Hell's Gate destination
        result = await db.execute(select(Destination).where(Destination.slug == "hells-gate"))
        dest = result.scalar_one_or_none()
        if dest:
            for k, v in HELLS_GATE.items():
                setattr(dest, k, v)
            print("✅ Updated Hell's Gate destination")
        else:
            db.add(Destination(**HELLS_GATE))
            print("✅ Created Hell's Gate destination")

        # Upsert safaris
        for s in NEW_SAFARIS:
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
