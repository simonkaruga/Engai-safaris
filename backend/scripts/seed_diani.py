"""
Run: python scripts/seed_diani.py
Seeds: 3 Diani partner lodges + 4 beach/combo safari packages
       + adds beach extension add-on to existing safari packages
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.database import SessionLocal
from app.models.partner_lodge import PartnerLodge
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay

# ── Partner Hotels ────────────────────────────────────────────────────────────

PARTNER_LODGES = [
    {
        "slug": "baobab-beach-resort",
        "name": "Baobab Beach Resort & Spa",
        "location": "Diani Beach, Kenya",
        "destination_slug": "diani-beach",
        "tier": "luxury",
        "description": (
            "Diani's most iconic resort. 300 metres of private white sand beach, "
            "5 pools, 4 restaurants, full spa, and direct coral reef snorkelling. "
            "The gold standard for safari + beach combinations in Kenya."
        ),
        "amenities": [
            "Private beach", "5 swimming pools", "Full spa", "4 restaurants",
            "Water sports centre", "Snorkelling & diving", "Kids club",
            "Airport transfers", "Free WiFi",
        ],
        "price_usd_per_night": 280,
        "commission_pct": 12,
        "booking_email": "reservations@baobabbeach.com",
        "website_url": "https://www.baobabbeach.com",
        "is_featured": True,
    },
    {
        "slug": "leopard-beach-resort",
        "name": "Leopard Beach Resort & Spa",
        "location": "Diani Beach, Kenya",
        "destination_slug": "diani-beach",
        "tier": "luxury",
        "description": (
            "Set on a cliff above the Indian Ocean with panoramic views of the coral reef. "
            "Renowned for its dive centre, sunset bar, and the best seafood on the coast. "
            "Preferred by honeymooners and couples extending their Kenya safari."
        ),
        "amenities": [
            "Cliff-top ocean views", "PADI dive centre", "3 pools",
            "Sunset cocktail bar", "Seafood restaurant", "Spa",
            "Snorkelling reef access", "Free WiFi",
        ],
        "price_usd_per_night": 240,
        "commission_pct": 12,
        "booking_email": "reservations@leopardbeach.com",
        "website_url": "https://www.leopardbeachresort.com",
        "is_featured": True,
    },
    {
        "slug": "diani-reef-beach-resort",
        "name": "Diani Reef Beach Resort & Spa",
        "location": "Diani Beach, Kenya",
        "destination_slug": "diani-beach",
        "tier": "standard",
        "description": (
            "The best value luxury resort on Diani Beach. "
            "Award-winning all-inclusive option with direct beach access, "
            "large pool, and excellent buffet. Popular with families and groups."
        ),
        "amenities": [
            "Direct beach access", "Large pool", "All-inclusive option",
            "Buffet restaurant", "Beach bar", "Water sports",
            "Children's pool", "Free WiFi",
        ],
        "price_usd_per_night": 160,
        "commission_pct": 10,
        "booking_email": "reservations@dianireef.com",
        "website_url": "https://www.dianireef.com",
        "is_featured": False,
    },
]

# ── Safari Packages ───────────────────────────────────────────────────────────

BEACH_EXTENSION_DESC = (
    "Extend your safari with 3 nights at Diani Beach — Kenya's finest white sand coast. "
    "Direct flights Nairobi → Mombasa (45 min, ~$80pp) or overnight train. "
    "We handle all transfers and hotel booking at our partner resorts. "
    "Prices shown are per person based on 2 sharing at Diani Reef Beach Resort (standard). "
    "Upgrade to Baobab Beach Resort or Leopard Beach Resort available on request."
)

NEW_SAFARIS = [
    {
        "slug": "diani-beach-3-nights",
        "name": "Diani Beach — 3 Nights",
        "tagline": "Africa's finest beach. White sand, coral reef, Indian Ocean.",
        "description": (
            "Diani Beach is consistently rated one of Africa's best beaches — "
            "and one of the world's top 10. 17 kilometres of unbroken white sand, "
            "a coral reef 200 metres offshore, warm Indian Ocean water year-round, "
            "and a string of world-class resorts.\n\n"
            "This standalone beach package is designed as either a holiday in itself "
            "or the perfect ending to any Kenya safari. Fly Nairobi → Mombasa in 45 minutes "
            "(flights from $80pp), transfer to Diani (45 min south of Mombasa), "
            "and spend 3 nights doing absolutely nothing — or everything.\n\n"
            "Snorkelling on the coral reef. Dolphin watching at Kisite Marine Park. "
            "Colobus monkey walks. Kite surfing. Fort Jesus UNESCO World Heritage Site. "
            "Swahili cooking class. Or just the beach, a book, and a cold Tusker."
        ),
        "category": "classic",
        "duration_days": 3,
        "group_size_max": 8,
        "price_usd_solo": 420,
        "price_usd_2pax": 320,
        "price_usd_4pax": 280,
        "price_usd_6pax": 250,
        "price_kes_solo": 54600,
        "price_kes_2pax": 41600,
        "price_kes_4pax": 36400,
        "price_kes_6pax": 32500,
        "wholesale_usd": 220,
        "deposit_pct": 30,
        "installments_ok": True,
        "is_featured": False,
        "is_active": True,
        "sort_order": 20,
        "has_beach_extension": False,
        "highlights": [
            "17km of white sand beach",
            "Coral reef snorkelling",
            "Kisite Marine Park dolphins",
            "Colobus monkey sanctuary",
            "Fort Jesus UNESCO site",
            "Swahili cuisine & culture",
            "Kite surfing & water sports",
            "45-min flight from Nairobi",
        ],
        "inclusions": [
            "3 nights at Diani Reef Beach Resort (standard)",
            "Daily breakfast",
            "Mombasa airport → Diani transfer",
            "Diani → Mombasa airport transfer",
            "Welcome drink on arrival",
        ],
        "exclusions": [
            "Flights Nairobi ↔ Mombasa (~$80pp — we can book)",
            "Lunch & dinner (restaurants on-site)",
            "Activities (snorkelling, dolphin trip, etc.)",
            "Travel insurance",
            "Tips",
        ],
        "what_to_bring": [
            "Swimwear & beach towel",
            "Reef-safe sunscreen",
            "Light cotton clothing",
            "Snorkelling mask (or hire on-site)",
            "Waterproof camera",
        ],
        "cancellation_policy": (
            "60+ days: full refund. 31–60 days: 50% refund. "
            "Under 30 days: no refund. Hotel cancellation policies apply."
        ),
        "meta_title": "Diani Beach Kenya — 3 Night Beach Holiday | Engai Safaris",
        "meta_desc": (
            "3 nights at Diani Beach — Africa's finest white sand coast. "
            "Coral reef, dolphins, Swahili culture. From $250pp. "
            "Perfect safari + beach extension. Book with Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Arrival — Mombasa → Diani Beach",
                "description": (
                    "Fly Nairobi → Mombasa (45 min). Our driver meets you at arrivals. "
                    "45-minute transfer south along the coast road to Diani. "
                    "Check in, welcome drink, first swim. "
                    "Sunset at the beach bar. Dinner at the resort."
                ),
                "meals": {"dinner": "Resort restaurant"},
                "accommodation": "Diani Reef Beach Resort",
                "accommodation_type": "beach_resort",
                "activities": ["Beach arrival", "Swimming", "Sunset"],
                "distance_km": 45,
                "drive_hours": 0.75,
            },
            {
                "day_number": 2,
                "title": "Full Day — Coral Reef & Kisite Marine Park",
                "description": (
                    "Morning: boat trip to Kisite-Mpunguti Marine Park (1.5 hrs south). "
                    "Snorkel the coral reef — parrotfish, angelfish, sea turtles. "
                    "Dolphin watching in the open ocean — spinner dolphins are resident year-round. "
                    "Lunch on Wasini Island — fresh crab and lobster. "
                    "Afternoon: return to Diani. Optional kite surfing lesson or beach walk."
                ),
                "meals": {"breakfast": "Resort", "lunch": "Wasini Island seafood"},
                "accommodation": "Diani Reef Beach Resort",
                "accommodation_type": "beach_resort",
                "activities": ["Kisite Marine Park", "Coral reef snorkelling", "Dolphin watching", "Wasini Island lunch"],
            },
            {
                "day_number": 3,
                "title": "Colobus Monkeys + Fort Jesus → Departure",
                "description": (
                    "Morning: Colobus Conservation Centre — the only place in Kenya to see "
                    "the endangered Angolan colobus monkey up close. "
                    "Drive to Mombasa Old Town: Fort Jesus UNESCO World Heritage Site, "
                    "the Old Harbour, and the spice market. "
                    "Swahili lunch at a local restaurant. "
                    "Transfer to Mombasa airport for your flight back to Nairobi."
                ),
                "meals": {"breakfast": "Resort", "lunch": "Mombasa Old Town"},
                "activities": ["Colobus Conservation", "Fort Jesus", "Mombasa Old Town", "Spice market"],
                "distance_km": 45,
                "drive_hours": 0.75,
            },
        ],
    },
    {
        "slug": "3-day-mara-3-night-diani",
        "name": "3-Day Masai Mara + 3 Nights Diani Beach",
        "tagline": "Lions at dawn. Indian Ocean by sunset. Kenya's classic combination.",
        "description": (
            "This is the itinerary 60% of international tourists ask for — "
            "and the one no Kenya operator has made easy to book online. Until now.\n\n"
            "Three days in the Masai Mara: Big Five game drives, Maasai village, "
            "sunrise on the plains. Then fly to Mombasa (45 minutes) and transfer "
            "to Diani Beach for three nights of white sand, coral reef, and Indian Ocean.\n\n"
            "Total: 6 days. Two completely different Kenyas. One seamless booking."
        ),
        "category": "classic",
        "duration_days": 6,
        "group_size_max": 6,
        "price_usd_solo": 1450,
        "price_usd_2pax": 1150,
        "price_usd_4pax": 950,
        "price_usd_6pax": 850,
        "price_kes_solo": 188500,
        "price_kes_2pax": 149500,
        "price_kes_4pax": 123500,
        "price_kes_6pax": 110500,
        "wholesale_usd": 820,
        "deposit_pct": 30,
        "installments_ok": True,
        "is_featured": True,
        "is_active": True,
        "sort_order": 6,
        "has_beach_extension": True,
        "beach_extension_days": 3,
        "beach_extension_price_usd": 320,
        "beach_extension_price_kes": 41600,
        "beach_extension_desc": BEACH_EXTENSION_DESC,
        "highlights": [
            "Big Five in the Masai Mara",
            "Maasai village visit",
            "Sunrise game drive",
            "45-min flight to Mombasa",
            "3 nights Diani Beach",
            "Coral reef snorkelling",
            "Dolphin watching",
            "Kenya's most popular itinerary",
        ],
        "inclusions": [
            "Return transport Nairobi ↔ Masai Mara",
            "2 nights Mara Sopa Lodge (full board)",
            "All Mara game drives",
            "Masai Mara park fees",
            "Nairobi → Mombasa flight (~$80pp — we book)",
            "Mombasa airport → Diani transfer",
            "3 nights Diani Reef Beach Resort (B&B)",
            "Diani → Mombasa airport transfer",
            "Professional guide throughout",
        ],
        "exclusions": [
            "Nairobi → Mombasa flights (booked separately, ~$80pp)",
            "Lunch & dinner at Diani",
            "Beach activities",
            "Travel insurance",
            "Tips",
        ],
        "what_to_bring": [
            "Safari clothing (neutral colours)",
            "Swimwear & beach towel",
            "Reef-safe sunscreen",
            "Light jacket (Mara mornings are cold)",
            "Camera with zoom lens",
        ],
        "cancellation_policy": (
            "60+ days: full refund. 31–60 days: 50% refund. "
            "Under 30 days: no refund."
        ),
        "meta_title": "Masai Mara + Diani Beach Kenya — 6 Day Safari & Beach | Engai Safaris",
        "meta_desc": (
            "Kenya's most popular itinerary — 3 days Masai Mara Big Five safari + "
            "3 nights Diani Beach. From $850pp. One seamless booking. Engai Safaris."
        ),
        "days": [
            {
                "day_number": 1,
                "title": "Nairobi → Masai Mara",
                "description": "Depart Nairobi 7am. Drive through the Great Rift Valley. Arrive Mara 1pm. Afternoon game drive. Sundowner on the plains.",
                "meals": {"lunch": "En route", "dinner": "Lodge"},
                "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
                "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 270, "drive_hours": 5.5,
            },
            {
                "day_number": 2,
                "title": "Full Day Masai Mara — Big Five",
                "description": "6am sunrise game drive. Big Five tracking. Bush picnic lunch. Maasai village visit. Afternoon drive to Mara River.",
                "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"},
                "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
                "activities": ["Sunrise game drive", "Big Five tracking", "Maasai village", "Mara River"],
            },
            {
                "day_number": 3,
                "title": "Masai Mara → Nairobi → Mombasa",
                "description": "Final sunrise game drive 6–9am. Drive back to Nairobi (arrive 3pm). Evening flight to Mombasa (45 min). Transfer to Diani Beach.",
                "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Resort"},
                "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort",
                "activities": ["Sunrise game drive", "Flight to Mombasa", "Diani arrival"],
                "distance_km": 270, "drive_hours": 5.5,
            },
            {
                "day_number": 4,
                "title": "Diani Beach — Coral Reef & Kisite Marine Park",
                "description": "Full day at sea. Kisite Marine Park snorkelling. Dolphin watching. Wasini Island seafood lunch. Afternoon beach.",
                "meals": {"breakfast": "Resort", "lunch": "Wasini Island"},
                "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort",
                "activities": ["Kisite Marine Park", "Snorkelling", "Dolphin watching", "Wasini Island"],
            },
            {
                "day_number": 5,
                "title": "Diani Beach — Free Day",
                "description": "Your day. Kite surfing, paddleboarding, beach walk to Colobus Conservation, or simply the sun and the sea.",
                "meals": {"breakfast": "Resort"},
                "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort",
                "activities": ["Free beach day", "Optional kite surfing", "Colobus Conservation"],
            },
            {
                "day_number": 6,
                "title": "Diani → Mombasa → Nairobi",
                "description": "Morning: Fort Jesus and Mombasa Old Town. Swahili lunch. Transfer to Mombasa airport. Flight back to Nairobi.",
                "meals": {"breakfast": "Resort", "lunch": "Mombasa Old Town"},
                "activities": ["Fort Jesus", "Mombasa Old Town", "Departure flight"],
                "distance_km": 45, "drive_hours": 0.75,
            },
        ],
    },
    {
        "slug": "5-day-mara-amboseli-3-night-diani",
        "name": "5-Day Mara & Amboseli + 3 Nights Diani",
        "tagline": "The complete Kenya — lions, elephants, Kilimanjaro, and the Indian Ocean.",
        "description": (
            "The definitive Kenya itinerary. Eight days covering the country's three greatest experiences: "
            "the Masai Mara (Big Five, Great Migration), Amboseli (elephant herds under Kilimanjaro), "
            "and Diani Beach (coral reef, Indian Ocean, Swahili culture).\n\n"
            "This is what Kenya is. All of it. In one trip."
        ),
        "category": "classic",
        "duration_days": 8,
        "group_size_max": 6,
        "price_usd_solo": 1950,
        "price_usd_2pax": 1650,
        "price_usd_4pax": 1380,
        "price_usd_6pax": 1250,
        "price_kes_solo": 253500,
        "price_kes_2pax": 214500,
        "price_kes_4pax": 179400,
        "price_kes_6pax": 162500,
        "wholesale_usd": 1150,
        "deposit_pct": 30,
        "installments_ok": True,
        "is_featured": True,
        "is_active": True,
        "sort_order": 7,
        "has_beach_extension": True,
        "beach_extension_days": 3,
        "beach_extension_price_usd": 320,
        "beach_extension_price_kes": 41600,
        "beach_extension_desc": BEACH_EXTENSION_DESC,
        "highlights": [
            "Big Five in the Masai Mara",
            "Elephant herds under Kilimanjaro",
            "Great Migration (seasonal)",
            "3 nights Diani Beach",
            "Coral reef & dolphins",
            "The complete Kenya experience",
        ],
        "inclusions": [
            "Return transport Nairobi ↔ Masai Mara ↔ Amboseli",
            "4 nights lodges (full board)",
            "All game drives & park fees",
            "Nairobi → Mombasa flight (~$80pp)",
            "3 nights Diani Reef Beach Resort (B&B)",
            "All transfers",
            "Professional guide throughout",
        ],
        "exclusions": [
            "Nairobi → Mombasa flights (~$80pp)",
            "Lunch & dinner at Diani",
            "Beach activities",
            "Travel insurance",
            "Tips",
        ],
        "what_to_bring": [
            "Safari clothing (neutral colours)",
            "Swimwear & beach towel",
            "Reef-safe sunscreen",
            "Light jacket (Mara & Amboseli mornings are cold)",
            "Camera with zoom lens",
        ],
        "cancellation_policy": "60+ days: full refund. 31–60 days: 50% refund. Under 30 days: no refund.",
        "meta_title": "Masai Mara + Amboseli + Diani Beach — 8 Day Kenya | Engai Safaris",
        "meta_desc": (
            "The complete Kenya — Masai Mara Big Five + Amboseli elephants + Diani Beach. "
            "8 days from $1,250pp. One booking. Engai Safaris."
        ),
        "days": [
            {"day_number": 1, "title": "Nairobi → Masai Mara", "description": "Depart 7am. Arrive Mara 1pm. Afternoon game drive.", "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge", "activities": ["Afternoon game drive"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara", "description": "Sunrise drive. Big Five. Bush picnic. Maasai village. Mara River.", "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge", "activities": ["Sunrise game drive", "Big Five", "Maasai village"]},
            {"day_number": 3, "title": "Masai Mara → Amboseli", "description": "Morning drive. Drive to Amboseli via Narok. Arrive 5pm.", "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge", "distance_km": 320, "drive_hours": 6},
            {"day_number": 4, "title": "Full Day Amboseli", "description": "Sunrise drive with Kilimanjaro. Elephant herds. Swamp drive.", "meals": {"breakfast": "Lodge", "lunch": "Lodge", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge"},
            {"day_number": 5, "title": "Amboseli → Nairobi → Mombasa", "description": "Morning drive. Drive to Nairobi. Evening flight to Mombasa. Transfer to Diani.", "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Resort"}, "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort", "activities": ["Morning drive", "Flight to Mombasa"], "distance_km": 240, "drive_hours": 4},
            {"day_number": 6, "title": "Diani — Kisite Marine Park", "description": "Snorkelling, dolphins, Wasini Island seafood lunch.", "meals": {"breakfast": "Resort", "lunch": "Wasini Island"}, "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort", "activities": ["Kisite Marine Park", "Snorkelling", "Dolphins"]},
            {"day_number": 7, "title": "Diani — Free Day", "description": "Beach, kite surfing, Colobus Conservation, or total rest.", "meals": {"breakfast": "Resort"}, "accommodation": "Diani Reef Beach Resort", "accommodation_type": "beach_resort", "activities": ["Free beach day"]},
            {"day_number": 8, "title": "Diani → Mombasa → Nairobi", "description": "Fort Jesus. Mombasa Old Town. Swahili lunch. Departure flight.", "meals": {"breakfast": "Resort", "lunch": "Mombasa Old Town"}, "activities": ["Fort Jesus", "Mombasa Old Town", "Departure"], "distance_km": 45, "drive_hours": 0.75},
        ],
    },
]

# Existing safaris to add beach extension offer to
BEACH_EXTENSION_UPDATES = [
    "3-day-masai-mara",
    "5-day-mara-amboseli",
    "naivasha-day-trip",
    "naivasha-hells-gate-combo",
]


async def seed():
    async with SessionLocal() as db:
        # Partner lodges
        for lodge in PARTNER_LODGES:
            result = await db.execute(select(PartnerLodge).where(PartnerLodge.slug == lodge["slug"]))
            existing = result.scalar_one_or_none()
            if existing:
                for k, v in lodge.items():
                    setattr(existing, k, v)
                print(f"✅ Updated lodge: {lodge['name']}")
            else:
                db.add(PartnerLodge(**lodge))
                print(f"✅ Created lodge: {lodge['name']}")

        # New safari packages
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

        # Add beach extension flag to existing safaris
        for slug in BEACH_EXTENSION_UPDATES:
            result = await db.execute(select(Safari).where(Safari.slug == slug))
            safari = result.scalar_one_or_none()
            if safari:
                safari.has_beach_extension = True
                safari.beach_extension_days = 3
                safari.beach_extension_price_usd = 320
                safari.beach_extension_price_kes = 41600
                safari.beach_extension_desc = BEACH_EXTENSION_DESC
                print(f"✅ Added beach extension to: {slug}")

        await db.commit()
        print(f"\n✅ Done — {len(PARTNER_LODGES)} lodges, {len(NEW_SAFARIS)} new safaris, {len(BEACH_EXTENSION_UPDATES)} updated")


asyncio.run(seed())
