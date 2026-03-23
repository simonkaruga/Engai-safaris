"""
Price update — March 2026.
Sets market-rate prices based on real cost analysis:
  - Park fees (KWS/Narok Oct 2025 rates)
  - Vehicle + driver costs
  - Accommodation at budget-mid tier
  - 35-40% gross margin target

price_usd_Npax = GROUP TOTAL for that tier (what N people pay combined).
solo  = 1 person (single supplement baked in — pays ~75% of 2pax total)
2pax  = base group price (2 people sharing)
4pax  = group of 4 (each pays ~82% of 2pax per-person rate)
6pax  = group of 6 (each pays ~72% of 2pax per-person rate)
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.safari import Safari
from sqlalchemy import select

# fmt: off
# name → (solo, 2pax, 4pax, 6pax)  — all USD group totals
PRICES = {
    # ── Day trips ──────────────────────────────────────────────────────────
    "Nairobi National Park Half-Day":                   (245,   320,   525,   690),
    "Nairobi Park + Sheldrick Elephants":               (315,   420,   690,   905),
    "Nairobi Park + Giraffe Centre":                    (285,   380,   625,   820),
    "Nairobi Full Day — Park + Sheldrick + Giraffe Centre": (405, 540,  885, 1165),
    "Hell's Gate Cycling Day Trip":                     (285,   380,   625,   820),
    "Lake Naivasha Day Trip":                           (270,   360,   590,   775),
    "Naivasha + Hell's Gate Combo":                     (330,   440,   720,   950),
    "Lake Nakuru Day Trip":                             (345,   460,   755,   990),
    # ── 2-day ──────────────────────────────────────────────────────────────
    "Naivasha Weekend Escape — 2 Days":                 (420,   560,   920,  1210),
    "2-Day Naivasha + Nakuru Circuit":                  (900,  1200,  1970,  2590),
    # ── 3-day ──────────────────────────────────────────────────────────────
    "3-Day Masai Mara Safari":                          (1350, 1800,  2950,  3890),
    "3-Day Masai Mara + Lake Nakuru":                   (1650, 2200,  3610,  4750),
    "Maasai Cultural Immersion — 3 Days":               (1050, 1400,  2295,  3025),
    "Diani Beach — 3 Nights":                           (825,  1100,  1805,  2375),
    "Corporate Team Safari — Mara & Naivasha":          (1350, 1800,  2950,  3890),
    # ── 4-day ──────────────────────────────────────────────────────────────
    "Masai Mara & Lake Nakuru — 4 Days":                (1500, 2000,  3280,  4320),
    "Luxury Masai Mara — Private Camp":                 (2400, 3200,  5250,  6910),
    # ── 5-day ──────────────────────────────────────────────────────────────
    "5-Day Mara & Amboseli":                            (2850, 3800,  6230,  8210),
    "Rift Valley Circuit — 5 Days":                     (1950, 2600,  4265,  5615),
    "Photography Safari — Masai Mara":                  (3450, 4600,  7545,  9935),
    "Mount Kenya Trekking — Sirimon Route":             (1650, 2200,  3610,  4750),
    # ── 6-day ──────────────────────────────────────────────────────────────
    "Big Three Safari — 6 Days":                        (3150, 4200,  6885,  9070),
    "3-Day Masai Mara + 3 Nights Diani Beach":          (2100, 2800,  4590,  6050),
    # ── 7-day ──────────────────────────────────────────────────────────────
    "Classic Kenya — 7 Days":                           (4050, 5400,  8855, 11665),
    # ── 8-day ──────────────────────────────────────────────────────────────
    "5-Day Mara & Amboseli + 3 Nights Diani":           (3600, 4800,  7870, 10370),
}
# fmt: on


async def main():
    async with SessionLocal() as db:
        result = await db.execute(select(Safari))
        safaris = result.scalars().all()

        updated = 0
        skipped = 0

        for safari in safaris:
            if safari.name not in PRICES:
                print(f"  skip  {safari.name!r} — not in price list")
                skipped += 1
                continue

            solo, two, four, six = PRICES[safari.name]
            safari.price_usd_solo = solo
            safari.price_usd_2pax = two
            safari.price_usd_4pax = four
            safari.price_usd_6pax = six

            pp = two / 2
            print(f"  ✓  {safari.name}")
            print(f"       solo=${solo}  2pax=${two} (${pp:.0f}pp)  4pax=${four}  6pax=${six}")
            updated += 1

        await db.commit()
        print(f"\nDone: {updated} updated, {skipped} skipped.")


asyncio.run(main())
