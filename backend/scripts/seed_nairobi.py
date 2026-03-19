"""
Run: python scripts/seed_nairobi.py
Upserts Nairobi destination with full content + 4 packages covering every tourist's first/last day.
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.database import SessionLocal
from app.models.destination import Destination
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay

NAIROBI = {
    "slug": "nairobi",
    "name": "Nairobi National Park",
    "tagline": "Safari 30 Minutes from JKIA — Kenya's Most Visited Park",
    "description": (
        "Nairobi National Park is the only national park in the world that shares a fence with "
        "a capital city. The Nairobi skyline rises above the northern boundary while lions, "
        "leopards, rhinos, buffalo, and hundreds of bird species roam the 117 km² of open "
        "grassland and acacia forest below. It is Kenya's most visited park — 345,000 visitors "
        "per year — and the most logical first or last stop for every international tourist "
        "landing at JKIA, 30 minutes away.\n\n"
        "The park holds the Big Five minus elephant (elephants migrate through but are not "
        "resident). Black rhinos are present in significant numbers — Nairobi NP is one of "
        "Kenya's most important rhino sanctuaries. Lions are resident and frequently spotted "
        "near the Athi River. Leopards are elusive but present. The park's proximity to the "
        "city means it can be done as a half-day — depart your hotel at 6am, complete a full "
        "game drive, and be back at JKIA for a noon flight.\n\n"
        "Adjacent to the park are two of Kenya's most emotionally powerful wildlife experiences: "
        "the David Sheldrick Wildlife Trust elephant orphanage (120,000+ visitors/year, the most "
        "shared wildlife content from Kenya on social media) and the African Fund for Endangered "
        "Wildlife Giraffe Centre, where you hand-feed Rothschild giraffes from a raised platform. "
        "Together, these three form the definitive Nairobi wildlife day — and the perfect "
        "introduction to Kenya for any first-time visitor."
    ),
    "country": "Kenya",
    "region": "Nairobi",
    "latitude": -1.3667,
    "longitude": 36.8333,
    "best_months": ["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "highlights": [
        "30 minutes from JKIA — perfect arrival/departure day",
        "Big Five (no elephant) in 117 km²",
        "Black rhino sanctuary — reliable sightings",
        "Nairobi skyline backdrop for photos",
        "David Sheldrick elephant orphanage",
        "Giraffe Centre — hand-feed Rothschild giraffes",
        "345,000 visitors/year — Kenya's #1 park by volume",
        "Half-day option — back at airport by noon",
    ],
    "wildlife_list": [
        "Black Rhino", "Lion", "Leopard", "African Buffalo", "Cheetah",
        "Hippo", "Maasai Giraffe", "Plains Zebra", "Wildebeest",
        "Eland", "Kongoni (Hartebeest)", "Ostrich", "Warthog",
        "African Fish Eagle", "Secretary Bird", "Crowned Crane",
    ],
    "peak_fee_usd": 60,
    "low_fee_usd": 60,
    "meta_title": "Nairobi National Park Safari + Sheldrick Elephants | Engai Safaris Kenya",
    "meta_desc": (
        "Safari 30 minutes from JKIA. Big Five (no elephant), black rhinos, lions. "
        "Combine with David Sheldrick elephant orphanage and Giraffe Centre. "
        "Half-day or full-day. Book with Engai Safaris."
    ),
}

NEW_SAFARIS = [
    {
        "slug": "nairobi-national-park-half-day",
        "name": "Nairobi National Park Half-Day",
        "tagline": "Big Five 30 minutes from JKIA — back at the airport by noon",
        "description": (
            "The most time-efficient safari in Kenya. Nairobi National Park sits 30 minutes "
            "from JKIA — close enough to do a full game drive before a noon flight, or as a "
            "first-morning activity after landing the night before.\n\n"
            "We depart your Nairobi hotel at 6am, enter the park at sunrise, and spend 3 hours "
            "on game drives covering the main circuit: the Athi River (hippos, crocodiles, "
            "lions at the water), the open grassland (rhinos, cheetah, zebra, wildebeest), "
            "and the forest edge (leopard, buffalo). Back at your hotel or JKIA by 10:30am.\n\n"
            "This is the package for every tourist with a connection day, an early arrival, "
            "or a late departure. It is also the most affordable Big Five experience in Kenya."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 7,
        "price_usd_solo": 120,
        "price_usd_2pax": 95,
        "price_usd_4pax": 75,
        "price_usd_6pax": 65,
        "price_kes_solo": 15600,
        "price_kes_2pax": 12350,
        "price_kes_4pax": 9750,
        "price_kes_6pax": 8450,
        "wholesale_usd": 55,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 1,
        "highlights": [
            "Depart 6am — back by 10:30am",
            "Black rhino on open grassland",
            "Lions near the Athi River",
            "Nairobi skyline backdrop",
            "Perfect for connection days",
            "Most affordable Big Five in Kenya",
        ],
        "inclusions": [
            "Hotel/JKIA pickup and drop-off",
            "4x4 vehicle with pop-up roof",
            "Professional guide",
            "Nairobi NP park fees ($60pp)",
            "Bottled water",
        ],
        "exclusions": [
            "Breakfast (can arrange on request)",
            "Personal items",
            "Tips",
        ],
        "what_to_bring": [
            "Camera with zoom lens",
            "Binoculars",
            "Light jacket (6am is cool)",
            "Sunscreen",
        ],
        "cancellation_policy": (
            "Free cancellation up to 24 hours before departure. "
            "Within 24 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Nairobi National Park Half-Day Safari from JKIA | Engai Safaris",
        "meta_desc": (
            "Big Five safari 30 minutes from JKIA. Depart 6am, back by 10:30am. "
            "Black rhinos, lions, cheetah. From $65pp. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi National Park — Sunrise Game Drive",
                "description": (
                    "6:00am — Pickup from your Nairobi hotel or JKIA arrivals.\n"
                    "6:30am — Enter Nairobi National Park at the main gate. The city skyline "
                    "glows behind you as the sun rises over the Athi plains.\n"
                    "6:45am — Athi River circuit. Hippos in the pools. Crocodiles on the banks. "
                    "Lions frequently rest near the river at dawn after the night hunt.\n"
                    "8:00am — Open grassland drive. Black rhinos graze the open plain — "
                    "Nairobi NP is one of Kenya's most important rhino sanctuaries. "
                    "Cheetah on the termite mounds. Zebra and wildebeest herds.\n"
                    "9:00am — Forest edge. Buffalo in the shade. Leopard territory — "
                    "elusive but present. Secretary birds stalking the grass.\n"
                    "9:45am — Exit park.\n"
                    "10:30am — Drop-off at hotel or JKIA."
                ),
                "meals": {},
                "activities": [
                    "Sunrise game drive",
                    "Athi River hippo & lion circuit",
                    "Black rhino open grassland",
                    "Forest edge leopard & buffalo",
                ],
                "distance_km": 30,
                "drive_hours": 0.5,
            }
        ],
    },
    {
        "slug": "nairobi-park-sheldrick",
        "name": "Nairobi Park + Sheldrick Elephants",
        "tagline": "Game drive at dawn. Baby elephants at 11am. Kenya's most emotional morning.",
        "description": (
            "This is Kenya's most shareable half-day. Two experiences back to back — "
            "a sunrise game drive in Nairobi National Park, followed by the 11am elephant "
            "feeding at the David Sheldrick Wildlife Trust.\n\n"
            "The Sheldrick Trust is the world's most successful elephant orphan rescue programme. "
            "Every morning at 11am, the orphaned baby elephants are brought out to feed in front "
            "of visitors. They are 6 months to 3 years old. They play in the mud, chase each "
            "other, and climb on the keepers. It is the most emotionally powerful wildlife "
            "experience in Kenya — and the most photographed. 120,000 visitors per year. "
            "The content from this visit goes viral every week.\n\n"
            "We depart at 6am, complete the park game drive, and arrive at Sheldrick at 10:45am "
            "for the 11am feeding. Back at your hotel or JKIA by 1pm."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 7,
        "price_usd_solo": 175,
        "price_usd_2pax": 140,
        "price_usd_4pax": 115,
        "price_usd_6pax": 98,
        "price_kes_solo": 22750,
        "price_kes_2pax": 18200,
        "price_kes_4pax": 14950,
        "price_kes_6pax": 12740,
        "wholesale_usd": 85,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 2,
        "highlights": [
            "Sunrise game drive — Big Five",
            "11am Sheldrick elephant feeding",
            "Baby elephants 6 months–3 years old",
            "World's most successful orphan rescue",
            "Most photographed Kenya experience",
            "Back at JKIA by 1pm",
        ],
        "inclusions": [
            "Hotel/JKIA pickup and drop-off",
            "4x4 vehicle with pop-up roof",
            "Professional guide",
            "Nairobi NP park fees ($60pp)",
            "Sheldrick Trust entry ($15pp)",
            "Bottled water",
        ],
        "exclusions": [
            "Lunch",
            "Personal items",
            "Tips",
            "Sheldrick adoption certificate (optional, $50)",
        ],
        "what_to_bring": [
            "Camera — you will use every shot",
            "Light jacket (6am is cool)",
            "Sunscreen",
            "Closed-toe shoes (Sheldrick is muddy)",
        ],
        "cancellation_policy": (
            "Free cancellation up to 24 hours before departure. "
            "Within 24 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Nairobi National Park + Sheldrick Elephant Orphanage | Engai Safaris",
        "meta_desc": (
            "Sunrise game drive + 11am baby elephant feeding at Sheldrick Trust. "
            "Kenya's most emotional half-day. From $98pp. Back at JKIA by 1pm. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi NP Sunrise + Sheldrick 11am Feeding",
                "description": (
                    "6:00am — Pickup from hotel or JKIA.\n"
                    "6:30am — Enter Nairobi National Park. Sunrise over the Athi plains. "
                    "City skyline behind you.\n"
                    "6:45am — Athi River circuit. Hippos, crocodiles, lions at the water.\n"
                    "8:00am — Open grassland. Black rhinos. Cheetah. Zebra herds.\n"
                    "9:30am — Exit park. Drive to the David Sheldrick Wildlife Trust "
                    "(15 minutes from the park gate).\n"
                    "10:45am — Arrive Sheldrick. Briefing from the keepers on the orphans "
                    "currently in care — their names, ages, and rescue stories.\n"
                    "11:00am — The feeding begins. Baby elephants pour out of the forest. "
                    "They drink from bottles held by keepers, play in the mud wallow, "
                    "and interact with visitors. Some will lean against you.\n"
                    "12:00pm — Visit ends. Drive back to hotel or JKIA.\n"
                    "1:00pm — Drop-off."
                ),
                "meals": {},
                "activities": [
                    "Sunrise game drive",
                    "Black rhino & lion sightings",
                    "Sheldrick 11am elephant feeding",
                    "Keeper talks on rescue stories",
                ],
                "distance_km": 35,
                "drive_hours": 0.75,
            }
        ],
    },
    {
        "slug": "nairobi-park-giraffe-centre",
        "name": "Nairobi Park + Giraffe Centre",
        "tagline": "Game drive at dawn. Hand-feed Rothschild giraffes at 9am.",
        "description": (
            "Two of Nairobi's best wildlife experiences in one morning. A sunrise game drive "
            "in Nairobi National Park, followed by the African Fund for Endangered Wildlife "
            "Giraffe Centre — where you stand on a raised platform and hand-feed Rothschild "
            "giraffes at eye level.\n\n"
            "The Rothschild giraffe is one of the world's most endangered giraffe subspecies — "
            "fewer than 3,000 remain in the wild. The Giraffe Centre has been breeding and "
            "releasing them since 1979. Visitors feed them from a raised wooden platform, "
            "bringing the giraffe's head to your level. They take pellets from your hand, "
            "your lips, or your forehead. It is one of the most photographed experiences in "
            "Kenya and a guaranteed highlight for families and first-time visitors.\n\n"
            "Depart 6am. Game drive complete by 9am. Giraffe Centre by 9:30am. "
            "Back at hotel or JKIA by 11:30am."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 7,
        "price_usd_solo": 160,
        "price_usd_2pax": 130,
        "price_usd_4pax": 105,
        "price_usd_6pax": 90,
        "price_kes_solo": 20800,
        "price_kes_2pax": 16900,
        "price_kes_4pax": 13650,
        "price_kes_6pax": 11700,
        "wholesale_usd": 78,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": False,
        "is_active": True,
        "sort_order": 3,
        "highlights": [
            "Sunrise game drive — Big Five",
            "Hand-feed Rothschild giraffes at eye level",
            "Fewer than 3,000 Rothschild giraffes remain",
            "Perfect for families & first-time visitors",
            "Back at JKIA by 11:30am",
        ],
        "inclusions": [
            "Hotel/JKIA pickup and drop-off",
            "4x4 vehicle with pop-up roof",
            "Professional guide",
            "Nairobi NP park fees ($60pp)",
            "Giraffe Centre entry ($15pp)",
            "Bottled water",
        ],
        "exclusions": [
            "Breakfast",
            "Personal items",
            "Tips",
        ],
        "what_to_bring": [
            "Camera",
            "Light jacket",
            "Sunscreen",
        ],
        "cancellation_policy": (
            "Free cancellation up to 24 hours before departure. "
            "Within 24 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Nairobi National Park + Giraffe Centre | Engai Safaris Kenya",
        "meta_desc": (
            "Sunrise game drive + hand-feed Rothschild giraffes at the Giraffe Centre. "
            "From $90pp. Back at JKIA by 11:30am. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi NP Sunrise + Giraffe Centre",
                "description": (
                    "6:00am — Pickup from hotel or JKIA.\n"
                    "6:30am — Enter Nairobi National Park. Sunrise game drive.\n"
                    "6:45am — Athi River. Hippos, crocodiles, lions.\n"
                    "8:00am — Open grassland. Black rhinos. Cheetah. Zebra.\n"
                    "9:00am — Exit park. Drive to the Giraffe Centre (20 minutes).\n"
                    "9:30am — Arrive Giraffe Centre. Step onto the raised feeding platform. "
                    "Rothschild giraffes approach at eye level — 5.5 metres tall, "
                    "completely calm. Feed them pellets from your hand or your lips. "
                    "The giraffe's tongue is 45cm long and dark purple.\n"
                    "10:30am — Visit ends. Drive back to hotel or JKIA.\n"
                    "11:30am — Drop-off."
                ),
                "meals": {},
                "activities": [
                    "Sunrise game drive",
                    "Black rhino & lion sightings",
                    "Giraffe Centre feeding platform",
                ],
                "distance_km": 35,
                "drive_hours": 0.5,
            }
        ],
    },
    {
        "slug": "nairobi-full-day",
        "name": "Nairobi Full Day — Park + Sheldrick + Giraffe Centre",
        "tagline": "The complete Nairobi wildlife day — three iconic experiences in one",
        "description": (
            "The definitive Nairobi day. Three of Kenya's most iconic wildlife experiences "
            "back to back — designed for tourists with a full day in Nairobi before or after "
            "their main safari, or for visitors who want to experience Kenya's wildlife "
            "without leaving the city.\n\n"
            "Morning: Nairobi National Park sunrise game drive. Big Five (no elephant), "
            "black rhinos on the open plain, lions near the Athi River, the Nairobi skyline "
            "as your backdrop.\n\n"
            "Mid-morning: David Sheldrick Wildlife Trust. The 11am elephant feeding — "
            "baby elephants 6 months to 3 years old, mud wallow, keeper talks. "
            "The most emotionally powerful wildlife experience in Kenya.\n\n"
            "Afternoon: African Fund for Endangered Wildlife Giraffe Centre. "
            "Hand-feed Rothschild giraffes from a raised platform at eye level. "
            "Lunch at the Giraffe Centre café with giraffes walking past the window.\n\n"
            "Back at your hotel by 3pm. The most complete single-day Kenya wildlife "
            "experience available anywhere."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 7,
        "price_usd_solo": 260,
        "price_usd_2pax": 210,
        "price_usd_4pax": 170,
        "price_usd_6pax": 148,
        "price_kes_solo": 33800,
        "price_kes_2pax": 27300,
        "price_kes_4pax": 22100,
        "price_kes_6pax": 19240,
        "wholesale_usd": 130,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 2,
        "highlights": [
            "Nairobi NP sunrise game drive",
            "11am Sheldrick baby elephant feeding",
            "Hand-feed Rothschild giraffes",
            "Three iconic experiences in one day",
            "Perfect pre/post-safari Nairobi day",
            "Back at hotel by 3pm",
        ],
        "inclusions": [
            "Hotel pickup and drop-off",
            "4x4 vehicle with pop-up roof",
            "Professional guide (full day)",
            "Nairobi NP park fees ($60pp)",
            "Sheldrick Trust entry ($15pp)",
            "Giraffe Centre entry ($15pp)",
            "Lunch at Giraffe Centre café",
            "Bottled water throughout",
        ],
        "exclusions": [
            "Breakfast",
            "Personal items",
            "Tips",
            "Sheldrick adoption certificate (optional, $50)",
        ],
        "what_to_bring": [
            "Camera — you will fill your memory card",
            "Light jacket (6am is cool)",
            "Sunscreen",
            "Closed-toe shoes (Sheldrick is muddy)",
        ],
        "cancellation_policy": (
            "Free cancellation up to 24 hours before departure. "
            "Within 24 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Nairobi Full Day — National Park + Sheldrick + Giraffe Centre | Engai Safaris",
        "meta_desc": (
            "The complete Nairobi wildlife day. Sunrise game drive + Sheldrick baby elephants "
            "+ Giraffe Centre. From $148pp. Perfect pre/post-safari day. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi NP + Sheldrick + Giraffe Centre",
                "description": (
                    "6:00am — Pickup from hotel.\n"
                    "6:30am — Enter Nairobi National Park. The city skyline glows behind you "
                    "as the sun rises over the Athi plains.\n"
                    "6:45am — Athi River circuit. Hippos surface. Crocodiles on the banks. "
                    "Lions rest near the water after the night hunt.\n"
                    "8:00am — Open grassland. Black rhinos on the plain. Cheetah on the "
                    "termite mounds. Zebra and wildebeest herds with the city behind them.\n"
                    "9:30am — Exit park. Drive to the David Sheldrick Wildlife Trust.\n"
                    "10:45am — Arrive Sheldrick. Keeper briefing — names, ages, rescue stories "
                    "of the orphans currently in care.\n"
                    "11:00am — Elephant feeding. Baby elephants pour from the forest. "
                    "Mud wallow. Bottle feeding. They will lean against you.\n"
                    "12:00pm — Drive to the Giraffe Centre (10 minutes).\n"
                    "12:30pm — Lunch at the Giraffe Centre café. Giraffes walk past the window.\n"
                    "1:30pm — Feeding platform. Rothschild giraffes at eye level. "
                    "Feed from your hand, your lips, or your forehead.\n"
                    "2:30pm — Visit ends. Drive back to hotel.\n"
                    "3:00pm — Drop-off."
                ),
                "meals": {"lunch": "Giraffe Centre café (included)"},
                "activities": [
                    "Sunrise game drive",
                    "Black rhino & lion sightings",
                    "Sheldrick 11am elephant feeding",
                    "Giraffe Centre feeding platform",
                ],
                "distance_km": 40,
                "drive_hours": 1.0,
            }
        ],
    },
]


async def seed():
    async with SessionLocal() as db:
        result = await db.execute(select(Destination).where(Destination.slug == "nairobi"))
        dest = result.scalar_one_or_none()
        if dest:
            for k, v in NAIROBI.items():
                setattr(dest, k, v)
            print("✅ Updated Nairobi destination")
        else:
            db.add(Destination(**NAIROBI))
            print("✅ Created Nairobi destination")

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
