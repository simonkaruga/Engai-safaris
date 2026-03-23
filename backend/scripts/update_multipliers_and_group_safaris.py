"""
1. Update peak_multiplier to 1.60 for all safaris (was 1.35 — didn't cover
   Masai Mara fee doubling Jul–Oct from $100 to $200/person/day).
2. Seed 3 "Join a Group" shared departure safaris at lower per-person rates.
   These let solo travellers / couples join a group vehicle at the 6pax rate,
   making safaris accessible without paying the private vehicle premium.
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.safari import Safari
from sqlalchemy import select, update

# Group join per-person rates (flat fee — same regardless of party size)
# Derived from the 6pax group total / 6
GROUP_SAFARIS = [
    {
        "slug":         "join-group-3-day-masai-mara",
        "name":         "Join a Group — 3-Day Masai Mara",
        "tagline":      "Mara's Big Five with a small group. $650/person — same parks, same guides, lower price.",
        "description":  (
            "<p>Travel with a small group of up to 6 guests in a shared 4x4. "
            "You get the same TRA-certified driver-guide, the same Masai Mara access, "
            "and the same full-board camps — at a fraction of the private vehicle cost.</p>"
            "<p><strong>Who it's for:</strong> Solo travellers, couples, and anyone who "
            "wants the full Engai experience without paying for an empty vehicle.</p>"
            "<p>Departures every Friday from Nairobi. Fixed price per person — no surprises.</p>"
        ),
        "category":     "group",
        "duration_days": 3,
        "group_size_max": 6,
        # Flat per-person price × tier (all tiers same per-person rate)
        "price_usd_solo": 650,
        "price_usd_2pax": 1300,   # 2 × 650
        "price_usd_4pax": 2600,   # 4 × 650
        "price_usd_6pax": 3900,   # 6 × 650
        "peak_multiplier": 1.60,
        "low_multiplier":  0.75,
        "deposit_pct":     30,
        "installments_ok": True,
        "is_shared":       True,
        "is_active":       True,
        "is_featured":     False,
        "cover_image":     "/images/safaris/3-day-masai-mara.png",
        "inclusions":      ["Shared 4x4 Land Cruiser", "TRA-certified driver-guide", "Full-board accommodation", "All park fees", "Nairobi pickup & drop-off"],
        "exclusions":      ["International flights", "Travel insurance", "Personal expenses", "Tips (optional)"],
        "highlights":      ["Big Five game drives", "Masai Mara National Reserve", "Guided bush walks (where permitted)", "Sunrise & sunset drives"],
    },
    {
        "slug":         "join-group-5-day-mara-amboseli",
        "name":         "Join a Group — 5-Day Mara & Amboseli",
        "tagline":      "Masai Mara + Amboseli + Kilimanjaro views. $1,370/person shared.",
        "description":  (
            "<p>Kenya's two most iconic parks in one trip — shared with a small group of up to 6. "
            "Masai Mara for the Big Five and migration, Amboseli for the elephant herds "
            "with Kilimanjaro rising behind them.</p>"
            "<p>Departures every other Monday from Nairobi. Fixed price per person.</p>"
        ),
        "category":     "group",
        "duration_days": 5,
        "group_size_max": 6,
        "price_usd_solo": 1370,
        "price_usd_2pax": 2740,
        "price_usd_4pax": 5480,
        "price_usd_6pax": 8220,
        "peak_multiplier": 1.60,
        "low_multiplier":  0.75,
        "deposit_pct":     30,
        "installments_ok": True,
        "is_shared":       True,
        "is_active":       True,
        "is_featured":     False,
        "cover_image":     "/images/safaris/5-day-mara-amboseli.png",
        "inclusions":      ["Shared 4x4 Land Cruiser", "TRA-certified driver-guide", "Full-board accommodation (4 nights)", "All park fees — Mara & Amboseli", "Nairobi pickup & drop-off"],
        "exclusions":      ["International flights", "Travel insurance", "Personal expenses", "Tips (optional)"],
        "highlights":      ["Masai Mara Big Five", "Amboseli elephant herds", "Kilimanjaro views", "Mara River crossings (seasonal Jul–Oct)"],
    },
    {
        "slug":         "join-group-7-day-classic-kenya",
        "name":         "Join a Group — 7-Day Classic Kenya",
        "tagline":      "The complete Kenya: Mara, Nakuru, Naivasha, Amboseli. $1,950/person shared.",
        "description":  (
            "<p>Kenya's full circuit in a shared 4x4 — Masai Mara, Lake Nakuru flamingos, "
            "Lake Naivasha hippos, and Amboseli elephants under Kilimanjaro. "
            "Seven days, four parks, one seamless journey with a single guide throughout.</p>"
            "<p>Departures every other Sunday from Nairobi. Fixed price per person.</p>"
        ),
        "category":     "group",
        "duration_days": 7,
        "group_size_max": 6,
        "price_usd_solo": 1950,
        "price_usd_2pax": 3900,
        "price_usd_4pax": 7800,
        "price_usd_6pax": 11700,
        "peak_multiplier": 1.60,
        "low_multiplier":  0.75,
        "deposit_pct":     30,
        "installments_ok": True,
        "is_shared":       True,
        "is_active":       True,
        "is_featured":     False,
        "cover_image":     "/images/safaris/7-day-classic-kenya.png",
        "inclusions":      ["Shared 4x4 Land Cruiser", "TRA-certified driver-guide", "Full-board accommodation (6 nights)", "All park fees", "Nairobi pickup & drop-off"],
        "exclusions":      ["International flights", "Travel insurance", "Personal expenses", "Tips (optional)"],
        "highlights":      ["Masai Mara", "Lake Nakuru flamingos", "Lake Naivasha boat ride", "Amboseli & Kilimanjaro", "Hell's Gate cycling (optional add-on)"],
    },
]


async def main():
    async with SessionLocal() as db:
        # 1. Update peak_multiplier on all existing safaris
        result = await db.execute(select(Safari))
        safaris = result.scalars().all()
        for s in safaris:
            if not s.is_shared:  # don't touch group safaris
                s.peak_multiplier = 1.60
        print(f"  ✓  Updated peak_multiplier → 1.60 on {sum(1 for s in safaris if not s.is_shared)} safaris")

        # 2. Upsert group join safaris
        created = 0
        updated = 0
        for data in GROUP_SAFARIS:
            existing = await db.execute(select(Safari).where(Safari.slug == data["slug"]))
            safari = existing.scalar_one_or_none()
            if safari:
                for k, v in data.items():
                    setattr(safari, k, v)
                updated += 1
                print(f"  ↺  Updated  {data['name']}")
            else:
                safari = Safari(**data)
                db.add(safari)
                created += 1
                print(f"  +  Created  {data['name']}")
            pp = data["price_usd_solo"]
            print(f"       ${pp}/person solo | ${data['price_usd_2pax']/2:.0f}/person in group of 2")

        await db.commit()
        print(f"\nDone: peak_multiplier updated, {created} group safaris created, {updated} updated.")


asyncio.run(main())
