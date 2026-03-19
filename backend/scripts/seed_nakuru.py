"""
Run: python scripts/seed_nakuru.py
Upserts Lake Nakuru destination with full content + 3 safari packages.
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.database import SessionLocal
from app.models.destination import Destination
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay

NAKURU = {
    "slug": "lake-nakuru",
    "name": "Lake Nakuru National Park",
    "tagline": "White Rhinos, Black Rhinos & a Million Flamingos",
    "description": (
        "Lake Nakuru is Kenya's second most visited game reserve — and one of the most "
        "underrated safari destinations in East Africa. The park wraps entirely around a "
        "shallow alkaline lake in the floor of the Great Rift Valley, 160km northwest of "
        "Nairobi. The lake's algae blooms attract up to two million lesser flamingos, turning "
        "the shoreline a vivid pink. When the flamingos are present, it is one of the greatest "
        "wildlife spectacles on the planet.\n\n"
        "Nakuru is one of the few parks in Kenya where you are virtually guaranteed to see both "
        "white and black rhinos. The park is a designated rhino sanctuary — fenced and intensively "
        "managed — with over 25 black rhinos and 70+ white rhinos. For travellers completing the "
        "Big Five, Nakuru is the most reliable rhino sighting in Kenya. Lions and leopards are "
        "resident, and the park also holds Rothschild giraffes, one of the world's rarest giraffe "
        "subspecies, relocated here for protection.\n\n"
        "The strategic advantage for Engai Safaris: Nakuru is 45 minutes from Lake Naivasha. "
        "The Naivasha–Nakuru circuit is one of the most natural and popular Kenya itineraries — "
        "two completely different ecosystems, both in the Rift Valley, both within 2 hours of "
        "Nairobi. A 2-day circuit covering boat safari, Hell's Gate cycling, and Nakuru rhino "
        "tracking is the most complete short safari in Kenya."
    ),
    "country": "Kenya",
    "region": "Rift Valley",
    "latitude": -0.3568,
    "longitude": 36.0836,
    "best_months": ["Jan", "Feb", "Jun", "Jul", "Aug", "Sep", "Oct", "Dec"],
    "highlights": [
        "Both white & black rhinos — guaranteed sightings",
        "Up to 2 million flamingos on the lake",
        "Rothschild giraffe — one of world's rarest",
        "Lions & leopards resident year-round",
        "45 minutes from Lake Naivasha",
        "Fenced rhino sanctuary — most reliable in Kenya",
        "Baboon Cliff panoramic viewpoint",
        "160km from Nairobi — easy 2-hour drive",
    ],
    "wildlife_list": [
        "White Rhino", "Black Rhino", "Lesser Flamingo", "Greater Flamingo",
        "Lion", "Leopard", "Rothschild Giraffe", "African Buffalo",
        "Waterbuck", "Reedbuck", "Hippo", "Olive Baboon",
        "African Fish Eagle", "Pelican", "Cormorant",
    ],
    "peak_fee_usd": 90,
    "low_fee_usd": 90,
    "meta_title": "Lake Nakuru National Park — Rhinos & Flamingos | Engai Safaris Kenya",
    "meta_desc": (
        "See both white and black rhinos at Lake Nakuru — Kenya's most reliable rhino sanctuary. "
        "2 million flamingos, lions, leopards, Rothschild giraffe. 160km from Nairobi. "
        "Combine with Naivasha for Kenya's best 2-day circuit. Book with Engai Safaris."
    ),
}

NEW_SAFARIS = [
    {
        "slug": "lake-nakuru-day-trip",
        "name": "Lake Nakuru Day Trip",
        "tagline": "Both rhino species + a million flamingos — 160km from Nairobi",
        "description": (
            "Lake Nakuru is Kenya's most reliable Big Five destination for rhinos. "
            "In a single day from Nairobi you can see white rhinos grazing the open grassland, "
            "black rhinos in the acacia thicket, flamingos lining the lake shore, and lions "
            "resting in the fever trees — all within a compact, fenced park that makes sightings "
            "almost guaranteed.\n\n"
            "We depart Nairobi at 6am, arrive at the park by 8:30am, and spend the full morning "
            "and afternoon on game drives. The route covers the lake shore (flamingos + pelicans), "
            "the rhino sanctuary (white rhino on open grassland), Baboon Cliff viewpoint "
            "(panoramic lake view), and the acacia woodland (leopard + black rhino territory). "
            "Back in Nairobi by 7pm."
        ),
        "category": "classic",
        "duration_days": 1,
        "group_size_max": 7,
        "price_usd_solo": 220,
        "price_usd_2pax": 180,
        "price_usd_4pax": 145,
        "price_usd_6pax": 125,
        "price_kes_solo": 28600,
        "price_kes_2pax": 23400,
        "price_kes_4pax": 18850,
        "price_kes_6pax": 16250,
        "wholesale_usd": 110,
        "deposit_pct": 30,
        "installments_ok": False,
        "is_featured": True,
        "is_active": True,
        "sort_order": 12,
        "highlights": [
            "White rhino on open grassland",
            "Black rhino in acacia woodland",
            "Flamingos lining the lake shore",
            "Baboon Cliff panoramic viewpoint",
            "Lions & leopards resident",
            "Back in Nairobi by 7pm",
        ],
        "inclusions": [
            "Return transport from Nairobi in 4x4",
            "Professional guide",
            "Lake Nakuru park fees ($90pp)",
            "Full-day game drives",
            "Packed lunch & water",
        ],
        "exclusions": [
            "Personal items",
            "Tips",
            "Drinks beyond water",
        ],
        "what_to_bring": [
            "Binoculars",
            "Camera with zoom lens",
            "Sunscreen & hat",
            "Light jacket (early morning)",
            "Neutral-coloured clothing",
        ],
        "cancellation_policy": (
            "Free cancellation up to 48 hours before departure. "
            "Within 48 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "Lake Nakuru Day Trip from Nairobi — Rhinos & Flamingos | Engai Safaris",
        "meta_desc": (
            "See white rhinos, black rhinos and flamingos at Lake Nakuru in one day from Nairobi. "
            "From $125pp. Full-day game drives. Book instantly with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Lake Nakuru → Nairobi",
                "description": (
                    "6:00am — Depart Nairobi. Drive north through the Rift Valley escarpment.\n"
                    "8:30am — Enter Lake Nakuru National Park at the main gate.\n"
                    "9:00am — Lake shore drive. Flamingos line the water's edge — pink as far as "
                    "the eye can see. Pelicans, cormorants, and African fish eagles overhead.\n"
                    "10:30am — Rhino sanctuary. White rhinos graze the open grassland in groups. "
                    "These are the largest land animals you will see at close range — 2,300kg, "
                    "completely calm, 30 metres from the vehicle.\n"
                    "12:00pm — Baboon Cliff viewpoint. The entire lake spreads below — pink "
                    "shoreline, fever tree forest, Rift Valley walls.\n"
                    "1:00pm — Packed lunch at the picnic site.\n"
                    "2:00pm — Acacia woodland drive. Black rhino territory. Leopard in the trees. "
                    "Rothschild giraffe — taller than any giraffe you've seen, with no spots below "
                    "the knee.\n"
                    "4:30pm — Final lake shore loop. Lion pride near the water at dusk.\n"
                    "5:00pm — Exit park. Drive back to Nairobi.\n"
                    "7:00pm — Arrive Nairobi."
                ),
                "meals": {"lunch": "Packed lunch included"},
                "activities": [
                    "Lake shore flamingo drive",
                    "White rhino tracking",
                    "Baboon Cliff viewpoint",
                    "Black rhino woodland drive",
                    "Rothschild giraffe sighting",
                ],
                "distance_km": 320,
                "drive_hours": 4.0,
            }
        ],
    },
    {
        "slug": "naivasha-nakuru-2-day",
        "name": "2-Day Naivasha + Nakuru Circuit",
        "tagline": "Kenya's best 2-day safari — hippos, cycling, rhinos & flamingos",
        "description": (
            "This is the most complete short safari in Kenya. Two nights, two parks, four "
            "completely different wildlife experiences — all within 160km of Nairobi.\n\n"
            "Day 1: Lake Naivasha. Morning boat safari with hippos surfacing beside the hull. "
            "Crescent Island walking safari — the only place in Kenya where you walk freely "
            "among giraffes and zebras. Afternoon: Hell's Gate National Park. Cycle the 22km "
            "circuit among zebras and giraffes. Descend into the gorge. Overnight at a "
            "Naivasha lakeside camp.\n\n"
            "Day 2: Lake Nakuru National Park. 45 minutes from Naivasha. Full-day game drives "
            "covering the flamingo lake shore, white rhino sanctuary, Baboon Cliff viewpoint, "
            "and acacia woodland for black rhino and leopard. Back in Nairobi by 6pm.\n\n"
            "Four parks. Both rhino species. Hippos. Flamingos. Cycling. Walking. The most "
            "diverse 2-day itinerary in East Africa."
        ),
        "category": "classic",
        "duration_days": 2,
        "group_size_max": 6,
        "price_usd_solo": 480,
        "price_usd_2pax": 380,
        "price_usd_4pax": 310,
        "price_usd_6pax": 270,
        "price_kes_solo": 62400,
        "price_kes_2pax": 49400,
        "price_kes_4pax": 40300,
        "price_kes_6pax": 35100,
        "wholesale_usd": 240,
        "deposit_pct": 30,
        "installments_ok": True,
        "is_featured": True,
        "is_active": True,
        "sort_order": 4,
        "highlights": [
            "Hippos at 3 metres — boat safari",
            "Crescent Island walking safari",
            "Hell's Gate cycling among zebras",
            "White & black rhinos at Nakuru",
            "2 million flamingos",
            "4 parks in 2 days",
        ],
        "inclusions": [
            "Return transport from Nairobi in 4x4",
            "Professional guide (both days)",
            "1 night accommodation (Naivasha lakeside)",
            "Boat safari (1 hour)",
            "Crescent Island entry",
            "Bicycle hire at Hell's Gate",
            "All park fees (Naivasha + Hell's Gate + Nakuru)",
            "All meals (Day 1 lunch → Day 2 lunch)",
        ],
        "exclusions": [
            "Dinner Day 2 (return to Nairobi)",
            "Personal items",
            "Tips",
            "Geothermal spa (optional, KES 500)",
        ],
        "what_to_bring": [
            "Closed-toe shoes (required for cycling)",
            "Light jacket (lake mornings are cool)",
            "Binoculars",
            "Camera with zoom lens",
            "Sunscreen",
        ],
        "cancellation_policy": (
            "Free cancellation up to 72 hours before departure. "
            "Within 72 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "2-Day Naivasha + Nakuru Safari Circuit from Nairobi | Engai Safaris",
        "meta_desc": (
            "Kenya's best 2-day safari — Lake Naivasha boat safari, Hell's Gate cycling, "
            "Lake Nakuru rhinos and flamingos. From $270pp. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Lake Naivasha → Hell's Gate",
                "description": (
                    "5:30am — Depart Nairobi.\n"
                    "7:30am — Lake Naivasha boat safari. Hippos surface beside the hull. "
                    "Fish eagles dive. Pelicans drift past.\n"
                    "9:00am — Crescent Island walking safari. Walk freely among giraffes, "
                    "zebras, and wildebeest. No fence. No vehicle.\n"
                    "10:30am — Drive 20 minutes to Hell's Gate National Park.\n"
                    "11:00am — Collect bicycles. Cycle the 22km circuit. Fischer's Tower. "
                    "Zebras on the track. Giraffes crossing ahead.\n"
                    "1:00pm — Lunch at Fisherman's Camp.\n"
                    "2:30pm — Gorge walk. Geothermal steam vents at the base.\n"
                    "4:30pm — Check in at Naivasha lakeside camp.\n"
                    "7:00pm — Dinner at camp."
                ),
                "meals": {"lunch": "Fisherman's Camp", "dinner": "Camp included"},
                "accommodation": "Naivasha Sopa Lodge",
                "accommodation_type": "lodge",
                "activities": [
                    "Lake Naivasha boat safari",
                    "Crescent Island walking safari",
                    "Hell's Gate cycling circuit",
                    "Gorge walk",
                ],
                "distance_km": 100,
                "drive_hours": 2.0,
            },
            {
                "day_number": 2,
                "title": "Lake Nakuru → Nairobi",
                "description": (
                    "6:30am — Breakfast at camp.\n"
                    "7:30am — Drive 45 minutes to Lake Nakuru National Park.\n"
                    "8:30am — Enter park. Lake shore drive — flamingos, pelicans, fish eagles.\n"
                    "10:00am — White rhino sanctuary. Groups of white rhinos on open grassland.\n"
                    "12:00pm — Baboon Cliff viewpoint. Panoramic view of the entire lake.\n"
                    "1:00pm — Packed lunch at the picnic site.\n"
                    "2:00pm — Acacia woodland drive. Black rhino territory. Leopard sightings. "
                    "Rothschild giraffe.\n"
                    "4:00pm — Exit park. Drive back to Nairobi.\n"
                    "6:00pm — Arrive Nairobi."
                ),
                "meals": {"breakfast": "Camp included", "lunch": "Packed lunch"},
                "activities": [
                    "Flamingo lake shore drive",
                    "White rhino sanctuary",
                    "Baboon Cliff viewpoint",
                    "Black rhino woodland drive",
                ],
                "distance_km": 220,
                "drive_hours": 3.5,
            },
        ],
    },
    {
        "slug": "3-day-mara-nakuru",
        "name": "3-Day Masai Mara + Lake Nakuru",
        "tagline": "Big Five in the Mara. Both rhinos at Nakuru. The complete Kenya circuit.",
        "description": (
            "This is the most efficient Big Five circuit in Kenya. Three days, two of the "
            "country's most iconic parks, and a near-certain chance of seeing all five of the "
            "Big Five — including both rhino species.\n\n"
            "Day 1–2: Masai Mara. Lions, leopards, elephants, and buffalo on the open plains. "
            "The Mara is the best park in Kenya for predator sightings — cheetah, lion, and "
            "leopard are all resident. During July–October, the Great Migration adds wildebeest "
            "river crossings to the mix.\n\n"
            "Day 3: Lake Nakuru. On the return drive to Nairobi, we stop at Nakuru for a "
            "half-day game drive. White rhinos on the open grassland. Black rhinos in the "
            "acacia woodland. Flamingos on the lake. Back in Nairobi by 6pm.\n\n"
            "Three days. Two parks. Five species. The most complete short safari in Kenya."
        ),
        "category": "classic",
        "duration_days": 3,
        "group_size_max": 7,
        "price_usd_solo": 1050,
        "price_usd_2pax": 850,
        "price_usd_4pax": 700,
        "price_usd_6pax": 620,
        "price_kes_solo": 136500,
        "price_kes_2pax": 110500,
        "price_kes_4pax": 91000,
        "price_kes_6pax": 80600,
        "wholesale_usd": 620,
        "deposit_pct": 30,
        "installments_ok": True,
        "is_featured": True,
        "is_active": True,
        "sort_order": 6,
        "highlights": [
            "Big Five in Masai Mara",
            "Both white & black rhinos at Nakuru",
            "Flamingos on the return drive",
            "Great Migration (Jul–Oct)",
            "3 days — most efficient Kenya circuit",
            "Back in Nairobi Day 3 evening",
        ],
        "inclusions": [
            "Return transport from Nairobi in 4x4",
            "Professional guide",
            "2 nights lodge (Masai Mara)",
            "All meals (Day 1 lunch → Day 3 lunch)",
            "All park fees (Mara + Nakuru)",
            "Airport transfers",
        ],
        "exclusions": [
            "Flights",
            "Travel insurance",
            "Tips",
            "Personal items",
            "Dinner Day 3",
        ],
        "what_to_bring": [
            "Binoculars",
            "Camera with zoom lens",
            "Neutral-coloured clothing",
            "Light jacket (Mara mornings are cold)",
            "Sunscreen",
        ],
        "cancellation_policy": (
            "Free cancellation up to 72 hours before departure. "
            "Within 72 hours: 50% refund. No-show: no refund."
        ),
        "meta_title": "3-Day Masai Mara + Lake Nakuru Safari | Engai Safaris Kenya",
        "meta_desc": (
            "Big Five in the Masai Mara + both rhino species at Lake Nakuru. "
            "Kenya's most complete 3-day circuit. From $620pp. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Masai Mara",
                "description": (
                    "7:00am — Depart Nairobi. Drive through the Great Rift Valley escarpment. "
                    "Narok town for fuel and supplies.\n"
                    "1:00pm — Arrive Masai Mara. Check in at lodge. Lunch.\n"
                    "3:00pm — Afternoon game drive. Lions on the open plains. Elephant herds "
                    "moving to the river. Cheetah on the termite mounds.\n"
                    "6:30pm — Sundowner on the Mara plains. Return to lodge.\n"
                    "7:30pm — Dinner at lodge."
                ),
                "meals": {"lunch": "Lodge", "dinner": "Lodge"},
                "accommodation": "Mara Sopa Lodge",
                "accommodation_type": "lodge",
                "activities": ["Afternoon game drive", "Sundowner"],
                "distance_km": 270,
                "drive_hours": 5.5,
            },
            {
                "day_number": 2,
                "title": "Full Day Masai Mara",
                "description": (
                    "6:00am — Sunrise game drive. The Mara at dawn — lions returning from the "
                    "night hunt, cheetah scanning the plains, hippos leaving the river.\n"
                    "10:00am — Bush picnic breakfast on the plains.\n"
                    "11:00am — Mara River drive. Crocodiles on the banks. During Jul–Oct: "
                    "wildebeest crossing points.\n"
                    "1:00pm — Return to lodge for lunch.\n"
                    "3:00pm — Afternoon game drive. Leopard in the fig trees. Buffalo herds. "
                    "Optional Maasai village visit.\n"
                    "6:30pm — Return to lodge. Dinner."
                ),
                "meals": {"breakfast": "Bush picnic", "lunch": "Lodge", "dinner": "Lodge"},
                "accommodation": "Mara Sopa Lodge",
                "accommodation_type": "lodge",
                "activities": [
                    "Sunrise game drive",
                    "Bush picnic",
                    "Mara River drive",
                    "Afternoon game drive",
                    "Optional Maasai village",
                ],
            },
            {
                "day_number": 3,
                "title": "Masai Mara → Lake Nakuru → Nairobi",
                "description": (
                    "6:00am — Final sunrise game drive in the Mara.\n"
                    "9:00am — Breakfast at lodge. Check out.\n"
                    "10:00am — Drive north toward Nairobi via Narok.\n"
                    "12:30pm — Enter Lake Nakuru National Park.\n"
                    "1:00pm — Packed lunch at the picnic site.\n"
                    "1:30pm — Lake shore drive. Flamingos. Pelicans. Fish eagles.\n"
                    "2:30pm — White rhino sanctuary. Groups of white rhinos on open grassland.\n"
                    "3:30pm — Baboon Cliff viewpoint. Panoramic lake view.\n"
                    "4:00pm — Exit Nakuru. Drive to Nairobi.\n"
                    "6:00pm — Arrive Nairobi."
                ),
                "meals": {"breakfast": "Lodge", "lunch": "Packed lunch"},
                "activities": [
                    "Final Mara sunrise drive",
                    "Nakuru flamingo lake shore",
                    "White rhino sanctuary",
                    "Baboon Cliff viewpoint",
                ],
                "distance_km": 380,
                "drive_hours": 6.0,
            },
        ],
    },
]


async def seed():
    async with SessionLocal() as db:
        # Upsert Lake Nakuru destination
        result = await db.execute(select(Destination).where(Destination.slug == "lake-nakuru"))
        dest = result.scalar_one_or_none()
        if dest:
            for k, v in NAKURU.items():
                setattr(dest, k, v)
            print("✅ Updated Lake Nakuru destination")
        else:
            db.add(Destination(**NAKURU))
            print("✅ Created Lake Nakuru destination")

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
