"""
Run: python scripts/seed_safaris.py

Pricing methodology (all prices are per person):
- Park fees use current KWS non-resident rates (2024/25)
  Masai Mara: $80/pp/day | Amboseli: $90/pp/day | Nakuru: $60/pp/day
  Hell's Gate: $26/pp | Crescent Island boat: $30/pp | Mt Kenya: $52/pp/day
- Vehicle hire: $180/day all-in (4x4 Land Cruiser + driver/guide)
- Lodge net rate (tour operator contract): ~$80-90/pp/night full board
- Insurance: vehicle + passenger liability ~$25/pp/trip
- AMREF evacuation: ~$35/pp/trip
- Target gross margin: 25% on 4pax group (most common booking)
- KES prices = USD x 130 (update monthly via admin when rate shifts)
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.safari import Safari
from app.models.itinerary_day import ItineraryDay
from sqlalchemy import select, delete

# Standard inclusions/exclusions templates
_EVAC = "AMREF emergency evacuation cover"
_INS_EXC = "Personal travel insurance (we recommend World Nomads or AXA)"
_FLIGHTS_EXC = "International flights to/from Nairobi"
_TIPS_EXC = "Tips and gratuities (guide: $10-15/day, driver: $5-10/day)"
_PERSONAL_EXC = "Personal items and laundry"

SAFARIS = [
    # ── Luxury ────────────────────────────────────────────────────────────────
    {
        "slug": "luxury-mara-private-camp",
        "name": "Luxury Masai Mara — Private Camp",
        "tagline": "Exclusive tented camp, private game drives, champagne sundowners",
        "category": "luxury",
        "duration_days": 4,
        # Costs (4pax baseline): Park $80x2d=$160 | Lodge $200pp/night x3=$600 | Vehicle $180x4d=$720/4=$180pp | Insurance $40 | Evac $35 = $1,015pp
        # Luxury commands premium — priced at $2,200 for 4pax (54% margin).
        "price_usd_solo": 3200, "price_usd_2pax": 2600, "price_usd_4pax": 2200, "price_usd_6pax": 1950,
        "price_kes_solo": 416000, "price_kes_2pax": 338000, "price_kes_4pax": 286000, "price_kes_6pax": 253500,
        "wholesale_usd": 1900,
        "cost_park_fees_usd": 160, "cost_accommodation_usd": 200, "cost_vehicle_usd": 180, "cost_insurance_usd": 40, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 10,
        "highlights": ["Private tented camp", "Exclusive game drives", "Bush breakfast", "Champagne sundowners", "Maasai warrior experience"],
        "inclusions": ["Private 4x4 Land Cruiser", "Expert TRA-certified guide", "3 nights luxury tented camp (full board)", "All meals and premium drinks", "All park and conservancy fees", _EVAC, "Vehicle and passenger liability insurance", "Helicopter transfer option"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, "Hot air balloon ($450/person — bookable at camp)"],
        "days": [
            {"day_number": 1, "title": "Nairobi to Private Mara Camp",
             "description": "Fly or drive to the Mara. Private camp check-in. Afternoon game drive in exclusive conservancy. Champagne sundowner on the plains.",
             "meals": {"lunch": "En route", "dinner": "Camp"}, "accommodation": "Angama Mara / Mahali Mzuri", "accommodation_type": "luxury_camp",
             "activities": ["Private game drive", "Sundowner"]},
            {"day_number": 2, "title": "Full Day Private Conservancy",
             "description": "6am game drive. Bush breakfast in the wild. Afternoon drive. Optional hot air balloon (extra cost). Maasai warrior experience at sunset.",
             "meals": {"breakfast": "Bush", "lunch": "Camp", "dinner": "Camp"}, "accommodation": "Angama Mara / Mahali Mzuri", "accommodation_type": "luxury_camp",
             "activities": ["Sunrise game drive", "Bush breakfast", "Hot air balloon (optional)", "Maasai experience"]},
            {"day_number": 3, "title": "Mara River and Big Five",
             "description": "Full day tracking the Big Five. Mara River crossing (seasonal). Private picnic lunch by the river.",
             "meals": {"breakfast": "Camp", "lunch": "River picnic", "dinner": "Camp"}, "accommodation": "Angama Mara / Mahali Mzuri", "accommodation_type": "luxury_camp",
             "activities": ["Big Five tracking", "River crossing", "Private picnic"]},
            {"day_number": 4, "title": "Final Drive to Nairobi",
             "description": "Sunrise game drive. Gourmet bush breakfast. Transfer to airstrip or drive back to Nairobi.",
             "meals": {"breakfast": "Bush"}, "activities": ["Sunrise game drive", "Bush breakfast"]},
        ],
    },
    # ── Adventures ────────────────────────────────────────────────────────────
    {
        "slug": "mount-kenya-trekking",
        "name": "Mount Kenya Trekking — Sirimon Route",
        "tagline": "Summit Point Lenana at 4,985m — Africa's second highest peak",
        "category": "adventures",
        "duration_days": 5,
        # Costs (4pax): Park $52x4d=$208 | Mountain huts $60pp/night x4=$240 | Vehicle $180x2d/4=$90 | Guide/porters $80 | Insurance $35 | Evac $50 = $703pp
        # At 25% margin: $937. Priced at $720 (4pax) — competitive for adventure market.
        "price_usd_solo": 1100, "price_usd_2pax": 850, "price_usd_4pax": 720, "price_usd_6pax": 650,
        "price_kes_solo": 143000, "price_kes_2pax": 110500, "price_kes_4pax": 93600, "price_kes_6pax": 84500,
        "wholesale_usd": 620,
        "cost_park_fees_usd": 208, "cost_accommodation_usd": 60, "cost_vehicle_usd": 180, "cost_insurance_usd": 35, "cost_evac_usd": 50,
        "is_featured": True,
        "sort_order": 11,
        "highlights": ["Point Lenana summit (4,985m)", "Afro-alpine moorland", "Glaciers and tarns", "Wildlife on the mountain"],
        "inclusions": ["KWS-certified mountain guide", "Porters (1 per 2 guests)", "4 nights mountain huts/camping (full board on mountain)", "All meals on mountain", "Mount Kenya National Park fees", _EVAC, "Vehicle and passenger liability insurance", "Transfer from Nairobi"],
        "exclusions": ["Personal trekking gear", _INS_EXC, _TIPS_EXC, "Sleeping bag (hire available KES 500/night)"],
        "days": [
            {"day_number": 1, "title": "Nairobi to Sirimon Gate (2,650m)",
             "description": "Drive to Sirimon Gate. Register. Trek to Old Moses Camp (3,300m). 3-4 hours hiking through montane forest.",
             "meals": {"lunch": "En route", "dinner": "Camp"}, "accommodation": "Old Moses Hut", "accommodation_type": "mountain_hut",
             "activities": ["Forest trek"], "distance_km": 9, "drive_hours": 4},
            {"day_number": 2, "title": "Old Moses to Shipton's Camp (4,200m)",
             "description": "Trek through moorland and giant heather. Arrive Shipton's Camp. Acclimatisation walk to Hausberg Col.",
             "meals": {"breakfast": "Camp", "lunch": "Trail", "dinner": "Camp"}, "accommodation": "Shipton's Camp", "accommodation_type": "mountain_hut",
             "activities": ["Moorland trek", "Acclimatisation walk"], "distance_km": 14},
            {"day_number": 3, "title": "Acclimatisation Day at Shipton's",
             "description": "Rest and acclimatise. Optional hike to Kami Hut or Hausberg Tarn. Early dinner and sleep by 7pm for summit push.",
             "meals": {"breakfast": "Camp", "lunch": "Camp", "dinner": "Camp"}, "accommodation": "Shipton's Camp", "accommodation_type": "mountain_hut",
             "activities": ["Acclimatisation hike", "Rest"]},
            {"day_number": 4, "title": "Summit Day — Point Lenana (4,985m)",
             "description": "2am start. Summit Point Lenana at sunrise. Descend to Mintos Hut or Mackinder's Camp. Celebrate with hot drinks.",
             "meals": {"breakfast": "Camp", "lunch": "Trail", "dinner": "Camp"}, "accommodation": "Mackinder's Camp", "accommodation_type": "mountain_hut",
             "activities": ["Summit push", "Sunrise at 4,985m"]},
            {"day_number": 5, "title": "Descent to Nairobi",
             "description": "Descend via Chogoria or Sirimon. Exit park. Drive back to Nairobi. Arrive evening.",
             "meals": {"breakfast": "Camp", "lunch": "En route"}, "activities": ["Descent"], "distance_km": 20, "drive_hours": 4},
        ],
    },
    # ── Cultural ──────────────────────────────────────────────────────────────
    {
        "slug": "maasai-cultural-immersion",
        "name": "Maasai Cultural Immersion — 3 Days",
        "tagline": "Live with the Maasai. Learn the warrior way.",
        "category": "cultural",
        "duration_days": 3,
        # Costs (4pax): No park fee | Manyatta $40pp/night x2=$80 | Vehicle $180x3d/4=$135 | Cultural guide $50 | Insurance $30 | Evac $35 = $330pp
        # At 25% margin: $440. Priced at $520 for 4pax — premium for unique experience (36% margin).
        "price_usd_solo": 780, "price_usd_2pax": 620, "price_usd_4pax": 520, "price_usd_6pax": 460,
        "price_kes_solo": 101400, "price_kes_2pax": 80600, "price_kes_4pax": 67600, "price_kes_6pax": 59800,
        "wholesale_usd": 420,
        "cost_park_fees_usd": 0, "cost_accommodation_usd": 40, "cost_vehicle_usd": 180, "cost_insurance_usd": 30, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 12,
        "highlights": ["Stay in authentic Maasai manyatta", "Warrior training and spear throwing", "Beadwork with Maasai women", "Cattle herding at dawn", "Traditional food and storytelling"],
        "inclusions": ["Maasai cultural guide", "2 nights authentic manyatta (full board)", "All meals (traditional Maasai cuisine)", "Beadwork workshop", "Warrior training experience", _EVAC, "Vehicle and passenger liability insurance", "Transfer from Nairobi"],
        "exclusions": [_INS_EXC, _TIPS_EXC, "Souvenirs", _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Maasai Manyatta",
             "description": "Drive to Kajiado or Narok region. Meet your Maasai host family. Afternoon cattle herding. Evening storytelling around the fire.",
             "meals": {"lunch": "En route", "dinner": "Traditional"}, "accommodation": "Maasai Manyatta", "accommodation_type": "cultural",
             "activities": ["Cattle herding", "Storytelling", "Fire making"]},
            {"day_number": 2, "title": "Full Cultural Immersion",
             "description": "Dawn cattle walk. Warrior training — spear throwing, jumping. Beadwork with women's cooperative. Traditional lunch. Afternoon visit to local market.",
             "meals": {"breakfast": "Traditional", "lunch": "Traditional", "dinner": "Traditional"}, "accommodation": "Maasai Manyatta", "accommodation_type": "cultural",
             "activities": ["Warrior training", "Spear throwing", "Beadwork", "Market visit"]},
            {"day_number": 3, "title": "Morning Rituals to Nairobi",
             "description": "Sunrise blessing ceremony. Farewell breakfast. Drive back to Nairobi with your handmade beadwork.",
             "meals": {"breakfast": "Traditional", "lunch": "En route"}, "activities": ["Blessing ceremony", "Farewell"]},
        ],
    },
    # ── Photography ───────────────────────────────────────────────────────────
    {
        "slug": "photography-safari-mara",
        "name": "Photography Safari — Masai Mara",
        "tagline": "Golden hour game drives. Expert photography guide. Unforgettable shots.",
        "category": "photography",
        "duration_days": 5,
        # Costs (4pax): Park $80x4d=$320 | Lodge $120pp/night x4=$480 | Vehicle $180x5d/4=$225 | Photo guide $100 | Insurance $40 | Evac $35 = $1,200pp
        # At 25% margin: $1,600. Priced at $1,500 for 4pax — competitive for specialist photography.
        "price_usd_solo": 2100, "price_usd_2pax": 1750, "price_usd_4pax": 1500, "price_usd_6pax": 1350,
        "price_kes_solo": 273000, "price_kes_2pax": 227500, "price_kes_4pax": 195000, "price_kes_6pax": 175500,
        "wholesale_usd": 1300,
        "cost_park_fees_usd": 320, "cost_accommodation_usd": 120, "cost_vehicle_usd": 180, "cost_insurance_usd": 40, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 13,
        "highlights": ["Expert wildlife photographer guide", "Pop-up roof for 360 degree shooting", "Golden hour and blue hour drives", "Small group max 4", "Evening post-processing workshop"],
        "inclusions": ["Professional photography guide", "Modified pop-up roof 4x4", "4 nights lodge (full board)", "All meals", "All park fees", _EVAC, "Vehicle and passenger liability insurance", "Evening editing workshop"],
        "exclusions": ["Camera equipment", _FLIGHTS_EXC, _INS_EXC, _TIPS_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Mara — Gear Check",
             "description": "Drive to Mara. Afternoon gear check and briefing with your photography guide. Sunset drive — golden hour on the plains.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Intrepids", "accommodation_type": "lodge",
             "activities": ["Gear briefing", "Sunset drive"]},
            {"day_number": 2, "title": "Predator Focus Day",
             "description": "5:30am drive — lions at dawn. Track cheetah. Afternoon drive for elephant and buffalo. Evening editing workshop.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush", "dinner": "Lodge"}, "accommodation": "Mara Intrepids", "accommodation_type": "lodge",
             "activities": ["Dawn predator drive", "Cheetah tracking", "Editing workshop"]},
            {"day_number": 3, "title": "Mara River — Migration Action",
             "description": "Full day at Mara River (Jul-Oct: wildebeest crossings). Dramatic action shots. Blue hour drive back.",
             "meals": {"breakfast": "Lodge", "lunch": "River picnic", "dinner": "Lodge"}, "accommodation": "Mara Intrepids", "accommodation_type": "lodge",
             "activities": ["River crossing photography", "Blue hour drive"]},
            {"day_number": 4, "title": "Birds and Landscape Day",
             "description": "Lilac-breasted rollers, secretary birds, crowned cranes. Landscape compositions at Oloololo Escarpment.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush", "dinner": "Lodge"}, "accommodation": "Mara Intrepids", "accommodation_type": "lodge",
             "activities": ["Bird photography", "Landscape compositions", "Editing workshop"]},
            {"day_number": 5, "title": "Final Golden Hour to Nairobi",
             "description": "Sunrise drive. Final shots. Drive back to Nairobi. Arrive 4pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise drive"]},
        ],
    },
    # ── Corporate ─────────────────────────────────────────────────────────────
    {
        "slug": "corporate-team-safari",
        "name": "Corporate Team Safari — Mara & Naivasha",
        "tagline": "Team building in the wild. Reward your team with Africa.",
        "category": "corporate",
        "duration_days": 3,
        # Costs (4pax): Park Naivasha $56 + Mara $80 = $136 | Lodge $100pp/night x2=$200 | Vehicle $180x3d/4=$135 | Coordinator $60 | Insurance $35 | Evac $35 = $601pp
        # At 25% margin: $801. Corporate commands premium — priced at $650 for 4pax.
        "price_usd_solo": 950, "price_usd_2pax": 780, "price_usd_4pax": 650, "price_usd_6pax": 580,
        "price_kes_solo": 123500, "price_kes_2pax": 101400, "price_kes_4pax": 84500, "price_kes_6pax": 75400,
        "wholesale_usd": 520,
        "cost_park_fees_usd": 136, "cost_accommodation_usd": 100, "cost_vehicle_usd": 180, "cost_insurance_usd": 35, "cost_evac_usd": 35,
        "is_featured": False,
        "sort_order": 14,
        "highlights": ["Private game drives", "Bush boardroom session", "Team building activities", "Gala dinner under the stars", "Custom branding available"],
        "inclusions": ["Dedicated corporate coordinator", "Private 4x4 fleet", "2 nights lodge (full board)", "All meals", "All park fees", _EVAC, "Vehicle and passenger liability insurance", "Team building facilitation", "Branded materials"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, "AV equipment", _TIPS_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Naivasha — Team Arrival",
             "description": "Drive to Lake Naivasha. Team check-in. Boat safari — hippos and fish eagles. Evening team building: Maasai fire challenge. Gala dinner.",
             "meals": {"lunch": "En route", "dinner": "Gala"}, "accommodation": "Enashipai Resort", "accommodation_type": "resort",
             "activities": ["Boat safari", "Team building", "Gala dinner"]},
            {"day_number": 2, "title": "Masai Mara — Bush Boardroom",
             "description": "Drive to Mara. Morning game drive. Bush boardroom session (2 hours). Afternoon game drive. Sundowner with team awards ceremony.",
             "meals": {"breakfast": "Resort", "lunch": "Bush", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Game drive", "Bush boardroom", "Awards ceremony"]},
            {"day_number": 3, "title": "Final Drive to Nairobi",
             "description": "Sunrise game drive. Breakfast. Drive back to Nairobi. Arrive 3pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise game drive"]},
        ],
    },
    # ── Classic ───────────────────────────────────────────────────────────────
    {
        "slug": "naivasha-day-trip",
        "name": "Lake Naivasha Day Trip",
        "tagline": "Hippos, Crescent Island & Hell's Gate — all in one day",
        "category": "classic",
        "duration_days": 1,
        # Costs (4pax): Hell's Gate $26 + Crescent Island boat $30 = $56pp | No lodge | Vehicle $180/4=$45 | Lunch $15 | Insurance $20 | Evac $0 = $136pp
        # At 25% margin: $181. Priced at $180 for 4pax. Was $120 — park fees alone cost more than that.
        "price_usd_solo": 280, "price_usd_2pax": 220, "price_usd_4pax": 180, "price_usd_6pax": 150,
        "price_kes_solo": 36400, "price_kes_2pax": 28600, "price_kes_4pax": 23400, "price_kes_6pax": 19500,
        "wholesale_usd": 130,
        "cost_park_fees_usd": 56, "cost_accommodation_usd": 0, "cost_vehicle_usd": 180, "cost_insurance_usd": 20, "cost_evac_usd": 0,
        "is_featured": True,
        "sort_order": 1,
        "highlights": ["Boat safari with hippos", "Crescent Island walking safari", "Hell's Gate cycling"],
        "inclusions": ["4x4 Land Cruiser", "Professional TRA-certified guide", "Boat hire (Crescent Island)", "All park and entry fees", "Lunch", "Vehicle and passenger liability insurance"],
        "exclusions": [_INS_EXC, _TIPS_EXC, "Accommodation"],
        "days": [
            {"day_number": 1, "title": "Naivasha Full Day",
             "description": "Depart Nairobi at 6am. Arrive Naivasha 8am. Boat safari — hippos at 3 metres. Crescent Island walking safari with giraffe and zebra. Hell's Gate cycling. Return Nairobi by 7pm.",
             "meals": {"lunch": "Fisherman's Camp restaurant"}, "activities": ["Boat safari", "Walking safari", "Cycling"]}
        ],
    },
    {
        "slug": "naivasha-weekend",
        "name": "Naivasha Weekend Escape — 2 Days",
        "tagline": "Hell's Gate cycling · Crescent Island · Sunset boat safari",
        "category": "classic",
        "duration_days": 2,
        # Costs (4pax): Parks $56pp | Lodge 1 night $80pp | Vehicle $180x2/4=$90 | Meals beyond lodge $20 | Insurance $25 | Evac $35 = $306pp
        # At 25% margin: $408. Previous price of $85/pp was a massive loss — didn't even cover park fees.
        # New 4pax: $290 — market competitive (Naivasha 2-day market: $250-400pp), ~5% margin.
        "price_usd_solo": 450, "price_usd_2pax": 360, "price_usd_4pax": 290, "price_usd_6pax": 240,
        "price_kes_solo": 58500, "price_kes_2pax": 46800, "price_kes_4pax": 37700, "price_kes_6pax": 31200,
        "wholesale_usd": 210,
        "cost_park_fees_usd": 56, "cost_accommodation_usd": 80, "cost_vehicle_usd": 180, "cost_insurance_usd": 25, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 21,
        "highlights": ["Hell's Gate cycling safari", "Crescent Island walking safari", "Sunset boat safari with hippos", "Hot springs at Ol Njorowa gorge", "Naivasha is our HOME — we know every hippo"],
        "inclusions": ["4x4 Land Cruiser", "Professional TRA-certified guide", "1 night lodge (bed and breakfast)", "Lunch Day 1", "Boat hire", "Cycling", "All park fees", _EVAC, "Vehicle and passenger liability insurance"],
        "exclusions": [_INS_EXC, _TIPS_EXC, "Drinks at lodge", _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Hell's Gate to Sunset Boat",
             "description": "Depart Nairobi 8am. Arrive Naivasha 9:30am. Hell's Gate cycling (2 hrs) — the only cycling safari park in Kenya. Walk Ol Njorowa gorge. Late lunch at Fisherman's Camp. Sunset boat safari — hippos surface 3 metres away, fish eagles call across the water.",
             "meals": {"lunch": "Fisherman's Camp", "dinner": "Lodge"}, "accommodation": "Lake Naivasha Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Hell's Gate cycling", "Gorge walk", "Sunset boat safari"], "distance_km": 90, "drive_hours": 1.5},
            {"day_number": 2, "title": "Sunrise Boat to Crescent Island to Nairobi",
             "description": "6:30am sunrise boat — the lake at dawn, Kilimanjaro visible on clear days. Crescent Island walking safari — giraffe, zebra, wildebeest with no fence and no vehicle. Drive back to Nairobi. Arrive 1pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise boat safari", "Crescent Island walk"], "distance_km": 90, "drive_hours": 1.5},
        ],
    },
    {
        "slug": "3-day-masai-mara",
        "name": "3-Day Masai Mara Safari",
        "tagline": "The classic Mara experience — Big Five in 72 hours",
        "category": "classic",
        "duration_days": 3,
        # Costs (4pax): Mara park $80x2d=$160 | Lodge $85pp/night x2=$170 | Vehicle $180x3d/4=$135 | Insurance $35 | Evac $35 | Misc $30 = $565pp
        # At 25% margin: $753. Priced at $750 (4pax) — on target. Was $620 — unsustainable.
        "price_usd_solo": 1100, "price_usd_2pax": 880, "price_usd_4pax": 750, "price_usd_6pax": 650,
        "price_kes_solo": 143000, "price_kes_2pax": 114400, "price_kes_4pax": 97500, "price_kes_6pax": 84500,
        "wholesale_usd": 600,
        "cost_park_fees_usd": 160, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 35, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 2,
        "highlights": ["Big Five", "Maasai village visit", "Sunrise game drive", "Mara River crossing (seasonal)"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "2 nights lodge (full board)", "All meals", "All park fees", _EVAC, "Vehicle and passenger liability insurance", "Airport transfers"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Masai Mara",
             "description": "Depart Nairobi 7am. Drive through the Great Rift Valley. Arrive Mara 1pm. Afternoon game drive. Sundowner on the plains.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara",
             "description": "6am sunrise game drive. Big Five tracking. Optional Maasai village visit (KES 1,000pp). Afternoon game drive to Mara River.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Bush picnic", "Maasai village", "Mara River drive"]},
            {"day_number": 3, "title": "Masai Mara to Nairobi",
             "description": "Final sunrise game drive 6-9am. Breakfast. Drive back to Nairobi. Arrive 4pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise game drive"], "distance_km": 270, "drive_hours": 5.5},
        ],
    },
    # ── 6 Core Packages ───────────────────────────────────────────────────────
    {
        "slug": "big-three-safari",
        "name": "Big Three Safari — 6 Days",
        "tagline": "Masai Mara · Lake Nakuru · Amboseli — Kenya's greatest trio",
        "category": "classic",
        "duration_days": 6,
        # Costs (4pax): Mara $160 + Nakuru $60 + Naivasha $56 + Amboseli $180 = $456pp
        # Lodge 5 nights $85pp = $425 | Vehicle $180x6/4=$270 | Insurance $40 | Evac $35 | Misc $30 = $1,256pp
        # At 25% margin: $1,675. Was $700 — deeply unprofitable. New 4pax: $1,380 (9% margin, competitive).
        "price_usd_solo": 2000, "price_usd_2pax": 1600, "price_usd_4pax": 1380, "price_usd_6pax": 1150,
        "price_kes_solo": 260000, "price_kes_2pax": 208000, "price_kes_4pax": 179400, "price_kes_6pax": 149500,
        "wholesale_usd": 1050,
        "cost_park_fees_usd": 456, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 40, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 20,
        "highlights": ["Big Five", "Rhinos and flamingos at Nakuru", "Elephants under Kilimanjaro", "Great Migration Jul-Oct", "Boat safari at Naivasha"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "5 nights lodges (full board)", "All meals", "All park fees (Mara, Nakuru, Naivasha, Amboseli)", _EVAC, "Vehicle and passenger liability insurance", "Airport transfers"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Masai Mara",
             "description": "Depart Nairobi at 7:30am via the Great Rift Valley escarpment. Arrive Mara 1pm. Afternoon game drive — your first lions.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara",
             "description": "6am sunrise game drive. Big Five tracking. Optional Maasai village visit KES 1,000pp. Afternoon drive to Mara River — possible crossing Jul-Oct.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Bush picnic", "Maasai village", "Mara River"]},
            {"day_number": 3, "title": "Mara to Lake Nakuru",
             "description": "8:30am depart Mara via Narok. Arrive Lake Nakuru NP at 1:30pm. Afternoon drive — black and white rhinos, flamingos, Rothschild giraffe.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Sarova Lion Hill Lodge", "accommodation_type": "lodge",
             "activities": ["Rhino tracking", "Flamingo viewing", "Giraffe walk"], "distance_km": 250, "drive_hours": 5},
            {"day_number": 4, "title": "Nakuru to Lake Naivasha",
             "description": "6:30am drive to Lake Naivasha (45 min). Morning boat safari — hippos at 3 metres, fish eagles, pelicans. Crescent Island walking safari with giraffe and zebra. Afternoon drive to Amboseli.",
             "meals": {"breakfast": "Lodge", "lunch": "Fisherman's Camp", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge",
             "activities": ["Boat safari", "Crescent Island walk", "Hippo watching"], "distance_km": 350, "drive_hours": 6},
            {"day_number": 5, "title": "Full Day Amboseli",
             "description": "Sunrise game drive — elephant herds with Kilimanjaro behind them. The iconic shot. Afternoon swamp drive — more elephants, buffalo herds, birds.",
             "meals": {"breakfast": "Lodge", "lunch": "Lodge", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge",
             "activities": ["Sunrise Kilimanjaro drive", "Elephant herds", "Swamp drive"]},
            {"day_number": 6, "title": "Amboseli to Nairobi",
             "description": "6am final sunrise drive — last chance for elephants under Kilimanjaro. Drive back to Nairobi. Arrive 2pm. Drop at JKIA or hotel.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise game drive"], "distance_km": 240, "drive_hours": 4},
        ],
    },
    {
        "slug": "naivasha-weekend-2day",
        "name": "Naivasha Weekend Escape — 2 Days",
        "tagline": "Hell's Gate cycling · Crescent Island · Sunset boat safari",
        "category": "classic",
        "duration_days": 2,
        # Same as naivasha-weekend above — keeping both slugs in sync.
        "price_usd_solo": 450, "price_usd_2pax": 360, "price_usd_4pax": 290, "price_usd_6pax": 240,
        "price_kes_solo": 58500, "price_kes_2pax": 46800, "price_kes_4pax": 37700, "price_kes_6pax": 31200,
        "wholesale_usd": 210,
        "cost_park_fees_usd": 56, "cost_accommodation_usd": 80, "cost_vehicle_usd": 180, "cost_insurance_usd": 25, "cost_evac_usd": 35,
        "is_featured": False,
        "sort_order": 25,
        "highlights": ["Hell's Gate cycling safari", "Crescent Island walking safari", "Sunset boat safari with hippos", "Naivasha is our HOME — we know every hippo"],
        "inclusions": ["4x4 Land Cruiser", "Professional TRA-certified guide", "1 night lodge (bed and breakfast)", "Lunch Day 1", "Boat hire", "Cycling", "All park fees", _EVAC, "Vehicle and passenger liability insurance"],
        "exclusions": [_INS_EXC, _TIPS_EXC, "Drinks at lodge", _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Hell's Gate to Sunset Boat",
             "description": "Depart Nairobi 8am. Hell's Gate cycling. Gorge walk. Lunch at Fisherman's Camp. Sunset boat safari.",
             "meals": {"lunch": "Fisherman's Camp", "dinner": "Lodge"}, "accommodation": "Lake Naivasha Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Hell's Gate cycling", "Gorge walk", "Sunset boat safari"], "distance_km": 90, "drive_hours": 1.5},
            {"day_number": 2, "title": "Sunrise Boat to Crescent Island to Nairobi",
             "description": "6:30am sunrise boat. Crescent Island walking safari. Drive back to Nairobi. Arrive 1pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise boat safari", "Crescent Island walk"], "distance_km": 90, "drive_hours": 1.5},
        ],
    },
    {
        "slug": "mara-nakuru-4-day",
        "name": "Masai Mara & Lake Nakuru — 4 Days",
        "tagline": "Big cats in the Mara · Rhinos and flamingos at Nakuru",
        "category": "classic",
        "duration_days": 4,
        # Costs (4pax): Mara $160 + Nakuru $120 (2 days) = $280pp | Lodge 3 nights $85=$255 | Vehicle $180x4/4=$180 | Insurance $35 | Evac $35 | Misc $25 = $810pp
        # At 25% margin: $1,080. Was $460 — deeply unprofitable. New 4pax: $820 (market: $700-950pp).
        "price_usd_solo": 1200, "price_usd_2pax": 980, "price_usd_4pax": 820, "price_usd_6pax": 700,
        "price_kes_solo": 156000, "price_kes_2pax": 127400, "price_kes_4pax": 106600, "price_kes_6pax": 91000,
        "wholesale_usd": 650,
        "cost_park_fees_usd": 280, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 35, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 22,
        "highlights": ["Big Five in Masai Mara", "Black and white rhinos at Nakuru", "Flamingo lake", "Rothschild giraffe", "Great Migration Jul-Oct"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "3 nights lodges (full board)", "All meals", "All park fees (Mara and Nakuru)", _EVAC, "Vehicle and passenger liability insurance"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Masai Mara",
             "description": "7am depart Nairobi. Drive the Great Rift Valley. Arrive 1pm. Check in. Afternoon game drive — first lion sighting.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara",
             "description": "6am sunrise drive. Big Five tracking. Mara River (Jul-Oct: wildebeest crossing). Bush picnic lunch. Afternoon drive.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Big Five tracking", "Mara River"]},
            {"day_number": 3, "title": "Mara to Lake Nakuru",
             "description": "8:30am depart. Arrive Nakuru 2pm. Afternoon drive — rhinos, flamingos, baboons, Rothschild giraffe. Sunset at the lake.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Sarova Lion Hill Lodge", "accommodation_type": "lodge",
             "activities": ["Rhino tracking", "Flamingo viewing"], "distance_km": 250, "drive_hours": 5},
            {"day_number": 4, "title": "Nakuru to Nairobi",
             "description": "6:30am morning drive — early rhinos in the golden light. Drive back to Nairobi. Arrive 11am.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Morning game drive"], "distance_km": 175, "drive_hours": 2.5},
        ],
    },
    {
        "slug": "rift-valley-circuit",
        "name": "Rift Valley Circuit — 5 Days",
        "tagline": "Naivasha · Nakuru · Masai Mara — Starting from our home lake",
        "category": "classic",
        "duration_days": 5,
        # Costs (4pax): Naivasha $56 + Nakuru $120 + Mara $160 = $336pp | Lodge 4 nights $85=$340 | Vehicle $180x5/4=$225 | Insurance $40 | Evac $35 | Misc $30 = $1,006pp
        # At 25% margin: $1,341. New 4pax: $1,000. Was $600 — 40% below cost.
        "price_usd_solo": 1500, "price_usd_2pax": 1220, "price_usd_4pax": 1000, "price_usd_6pax": 850,
        "price_kes_solo": 195000, "price_kes_2pax": 158600, "price_kes_4pax": 130000, "price_kes_6pax": 110500,
        "wholesale_usd": 790,
        "cost_park_fees_usd": 336, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 40, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 23,
        "highlights": ["Lake Naivasha — our home advantage", "Rhinos and flamingos at Nakuru", "Big Five in Masai Mara", "Only major circuit starting at Naivasha", "Hell's Gate and Crescent Island bonus"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "4 nights lodges (full board)", "All meals", "All park fees (Naivasha, Nakuru, Mara)", _EVAC, "Vehicle and passenger liability insurance", "Boat safari at Naivasha"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Lake Naivasha",
             "description": "Depart Nairobi 8am. 1.5 hrs to Lake Naivasha. Hell's Gate cycling. Crescent Island walking safari. Sunset boat safari — hippos at 3m, fish eagles. Our home lake. We know every hippo by name.",
             "meals": {"lunch": "Fisherman's Camp", "dinner": "Lodge"}, "accommodation": "Lake Naivasha Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Hell's Gate cycling", "Crescent Island walk", "Sunset boat safari"], "distance_km": 90, "drive_hours": 1.5},
            {"day_number": 2, "title": "Naivasha to Lake Nakuru",
             "description": "6:30am sunrise boat on Naivasha. Drive 45 min to Lake Nakuru NP. Full day — black and white rhinos, 1-2 million flamingos (seasonal), Rothschild giraffe, leopards in the trees.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Sarova Lion Hill Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise boat", "Rhino tracking", "Flamingo viewing"], "distance_km": 60, "drive_hours": 1.5},
            {"day_number": 3, "title": "Nakuru to Masai Mara",
             "description": "8:30am depart Nakuru via Narok. 5.5 hours through the Rift Valley. Arrive Mara 2pm. Afternoon first game drive — your first lion encounter.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive", "Sundowner"], "distance_km": 290, "drive_hours": 5.5},
            {"day_number": 4, "title": "Full Day Masai Mara",
             "description": "6am sunrise game drive. Big Five focus — lions, leopards, cheetah. Mara River (Jul-Oct: greatest wildlife spectacle on earth). Bush picnic lunch in the wild.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Big Five tracking", "Mara River crossing"]},
            {"day_number": 5, "title": "Masai Mara to Nairobi",
             "description": "6am final sunrise game drive. Breakfast. Drive back to Nairobi. Arrive 3pm. Drop at JKIA or CBD.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Final sunrise drive"], "distance_km": 270, "drive_hours": 5},
        ],
    },
    {
        "slug": "classic-kenya-7-day",
        "name": "Classic Kenya — 7 Days",
        "tagline": "The complete Kenya bucket list · Mara · Nakuru · Naivasha · Amboseli",
        "category": "classic",
        "duration_days": 7,
        # Costs (4pax): Mara $240 (3d) + Nakuru $60 + Naivasha $56 + Amboseli $180 = $536pp
        # Lodge 6 nights $85=$510 | Vehicle $180x7/4=$315 | Insurance $50 | Evac $35 | Misc $40 = $1,486pp
        # At 25% margin: $1,981. New 4pax: $1,650. Was $950 — 36% below cost.
        "price_usd_solo": 2400, "price_usd_2pax": 1950, "price_usd_4pax": 1650, "price_usd_6pax": 1380,
        "price_kes_solo": 312000, "price_kes_2pax": 253500, "price_kes_4pax": 214500, "price_kes_6pax": 179400,
        "wholesale_usd": 1280,
        "cost_park_fees_usd": 536, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 50, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 24,
        "highlights": ["The full Kenya experience", "Big Five guaranteed", "Elephants under Kilimanjaro", "Rhinos at Nakuru", "Hippos at Naivasha", "Great Migration possible Jul-Oct"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "6 nights lodges (full board)", "All meals", "All park fees (Mara, Nakuru, Naivasha, Amboseli)", _EVAC, "Vehicle and passenger liability insurance", "Boat safari at Naivasha", "Airport transfers"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Masai Mara",
             "description": "7:30am depart. Great Rift Valley views. Arrive Mara 1pm. Afternoon game drive.",
             "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Afternoon game drive"], "distance_km": 270, "drive_hours": 5.5},
            {"day_number": 2, "title": "Full Day Masai Mara — Big Cats",
             "description": "6am sunrise drive. Pride of lions. Cheetah family. Leopard in a tree. Bush picnic lunch. Afternoon Mara River drive.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Sunrise game drive", "Big cat tracking", "Bush picnic", "Mara River"]},
            {"day_number": 3, "title": "Masai Mara — Big Five Day",
             "description": "Full second day in Mara. Buffalo herds, rhino, elephant. Optional Maasai village. Sundowner on the plains.",
             "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Big Five tracking", "Maasai village", "Sundowner"]},
            {"day_number": 4, "title": "Mara to Lake Nakuru",
             "description": "8:30am depart. Arrive Nakuru 2pm. Afternoon drive — rhino, flamingos, Rothschild giraffe.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Sarova Lion Hill Lodge", "accommodation_type": "lodge",
             "activities": ["Rhino tracking", "Flamingo viewing", "Giraffe"], "distance_km": 250, "drive_hours": 5},
            {"day_number": 5, "title": "Nakuru to Lake Naivasha",
             "description": "Morning game drive at Nakuru. Drive to Naivasha. Boat safari — hippos, fish eagles. Crescent Island walking safari.",
             "meals": {"breakfast": "Lodge", "lunch": "Fisherman's Camp", "dinner": "Lodge"}, "accommodation": "Lake Naivasha Sopa Lodge", "accommodation_type": "lodge",
             "activities": ["Morning game drive", "Boat safari", "Crescent Island walk"]},
            {"day_number": 6, "title": "Naivasha to Amboseli",
             "description": "7am depart Naivasha. Drive to Amboseli via Nairobi bypass (4 hrs). Arrive 11am. Afternoon sunset elephant drive — hundreds of elephants silhouetted against Kilimanjaro.",
             "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge",
             "activities": ["Elephant sunset drive", "Kilimanjaro views"], "distance_km": 280, "drive_hours": 4},
            {"day_number": 7, "title": "Amboseli — Final Morning to Nairobi",
             "description": "6am sunrise drive — the iconic elephants under Kilimanjaro at dawn. Breakfast. Drive back to Nairobi. Arrive 2pm.",
             "meals": {"breakfast": "Lodge", "lunch": "En route"}, "activities": ["Sunrise elephant drive", "Kilimanjaro at dawn"], "distance_km": 240, "drive_hours": 4},
        ],
    },
    {
        "slug": "5-day-mara-amboseli",
        "name": "5-Day Mara & Amboseli",
        "tagline": "Lions in the Mara. Elephants under Kilimanjaro.",
        "category": "classic",
        "duration_days": 5,
        # Costs (4pax): Mara $160 + Amboseli $180 = $340pp | Lodge 4 nights $85=$340 | Vehicle $180x5/4=$225 | Insurance $40 | Evac $35 | Misc $30 = $1,010pp
        # At 25% margin: $1,347. New 4pax: $1,300. Was $1,100 — improvement to ~22% margin.
        "price_usd_solo": 1900, "price_usd_2pax": 1550, "price_usd_4pax": 1300, "price_usd_6pax": 1100,
        "price_kes_solo": 247000, "price_kes_2pax": 201500, "price_kes_4pax": 169000, "price_kes_6pax": 143000,
        "wholesale_usd": 1020,
        "cost_park_fees_usd": 340, "cost_accommodation_usd": 85, "cost_vehicle_usd": 180, "cost_insurance_usd": 40, "cost_evac_usd": 35,
        "is_featured": True,
        "sort_order": 3,
        "highlights": ["Big Five", "Kilimanjaro views", "Elephant herds", "Great Migration (seasonal)"],
        "inclusions": ["4x4 Land Cruiser with pop-up roof", "Professional TRA-certified guide", "4 nights lodges (full board)", "All meals", "All park fees (Mara and Amboseli)", _EVAC, "Vehicle and passenger liability insurance"],
        "exclusions": [_FLIGHTS_EXC, _INS_EXC, _TIPS_EXC, _PERSONAL_EXC],
        "days": [
            {"day_number": 1, "title": "Nairobi to Masai Mara", "description": "Depart 7am. Arrive Mara 1pm. Afternoon game drive.", "meals": {"lunch": "En route", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge"},
            {"day_number": 2, "title": "Full Day Masai Mara", "description": "Full day game drives. Big Five tracking. Mara River.", "meals": {"breakfast": "Lodge", "lunch": "Bush picnic", "dinner": "Lodge"}, "accommodation": "Mara Sopa Lodge", "accommodation_type": "lodge"},
            {"day_number": 3, "title": "Masai Mara to Amboseli", "description": "Morning game drive. Drive to Amboseli via Narok. Arrive 5pm.", "meals": {"breakfast": "Lodge", "lunch": "En route", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge", "distance_km": 320, "drive_hours": 6},
            {"day_number": 4, "title": "Full Day Amboseli", "description": "Sunrise drive with Kilimanjaro. Elephant herds. Afternoon swamp drive.", "meals": {"breakfast": "Lodge", "lunch": "Lodge", "dinner": "Lodge"}, "accommodation": "Amboseli Serena", "accommodation_type": "lodge"},
            {"day_number": 5, "title": "Amboseli to Nairobi", "description": "Final morning drive. Drive back to Nairobi. Arrive 2pm.", "meals": {"breakfast": "Lodge", "lunch": "En route"}, "distance_km": 240, "drive_hours": 4},
        ],
    },
]


async def seed():
    async with SessionLocal() as db:
        ok = 0
        for entry in SAFARIS:
            # Work on a copy so the module-level list is never mutated
            s = {k: v for k, v in entry.items() if k != "days"}
            days = entry["days"]
            try:
                result = await db.execute(select(Safari).where(Safari.slug == s["slug"]))
                safari = result.scalar_one_or_none()
                if safari:
                    for k, v in s.items():
                        setattr(safari, k, v)
                    # Delete and re-insert itinerary days so updates are reflected
                    await db.execute(delete(ItineraryDay).where(ItineraryDay.safari_id == safari.id))
                    await db.flush()
                    for day in days:
                        db.add(ItineraryDay(safari_id=safari.id, **day))
                    print(f"Updated: {safari.slug}")
                else:
                    safari = Safari(**s)
                    db.add(safari)
                    await db.flush()
                    for day in days:
                        db.add(ItineraryDay(safari_id=safari.id, **day))
                    print(f"Created: {safari.slug}")
                ok += 1
            except Exception as exc:
                await db.rollback()
                print(f"Failed [{s.get('slug', '?')}]: {exc}")
                continue
        await db.commit()
        print(f"\nDone — {ok}/{len(SAFARIS)} safaris seeded.")


asyncio.run(seed())
