"""
Run: python scripts/seed_destinations.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from sqlalchemy import select
from app.database import SessionLocal
from app.models.destination import Destination

MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

DESTINATIONS = [
  {
    "slug": "masai-mara",
    "name": "Masai Mara National Reserve",
    "tagline": "The Greatest Wildlife Show on Earth",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": -1.5021, "longitude": 35.1438,
    "best_months": [7, 8, 9, 10],
    "highlights": ["Great Migration", "Big Five", "Private Conservancies",
                   "Night Drives", "Maasai Culture", "Balloon Safari"],
    "peak_fee_usd": 200, "low_fee_usd": 100,
  },
  {
    "slug": "amboseli",
    "name": "Amboseli National Park",
    "tagline": "Elephants Against Kilimanjaro",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": -2.6527, "longitude": 37.2606,
    "best_months": [6, 7, 8, 9, 10],
    "highlights": ["Elephant Herds", "Kilimanjaro Views", "Photography", "Maasai Culture"],
    "peak_fee_usd": 90, "low_fee_usd": 90,
  },
  {
    "slug": "lake-naivasha",
    "name": "Lake Naivasha",
    "tagline": "Hippos, Flamingos & Crescent Island",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": -0.7820, "longitude": 36.3590,
    "best_months": [1, 2, 6, 7],
    "highlights": ["Boat Safari", "Crescent Island Walk", "Hippos", "Flamingos", "Hell's Gate Adjacent"],
    "peak_fee_usd": 35, "low_fee_usd": 35,
  },
  {
    "slug": "samburu",
    "name": "Samburu National Reserve",
    "tagline": "The Samburu Special Five — Found Nowhere Else",
    "country": "Kenya", "region": "Northern Kenya",
    "latitude": 0.6167, "longitude": 37.5333,
    "best_months": [1, 2, 3, 4, 6, 7, 8, 9, 10],
    "highlights": ["Reticulated Giraffe", "Grevy's Zebra", "Beisa Oryx", "Gerenuk", "Somali Ostrich"],
    "peak_fee_usd": 85, "low_fee_usd": 85,
  },
  {
    "slug": "nairobi",
    "name": "Nairobi National Park",
    "tagline": "Safari in the City — Wildlife 30 Minutes from JKIA",
    "country": "Kenya", "region": "Nairobi",
    "latitude": -1.3667, "longitude": 36.8333,
    "best_months": [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
    "highlights": ["Big Five (no elephant)", "City Backdrop", "Sheldrick Elephant Orphanage", "Giraffe Centre"],
    "peak_fee_usd": 80, "low_fee_usd": 80,
  },
  {
    "slug": "lake-nakuru",
    "name": "Lake Nakuru National Park",
    "tagline": "White Rhinos, Black Rhinos & a Million Flamingos",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": -0.3568, "longitude": 36.0836,
    "best_months": [1, 2, 6, 7, 8, 9, 10, 12],
    "highlights": ["White Rhino", "Black Rhino", "Flamingos", "Lions", "Leopards", "Rothschild Giraffe"],
    "peak_fee_usd": 90, "low_fee_usd": 90,
  },
  {
    "slug": "tsavo",
    "name": "Tsavo East + Tsavo West National Parks",
    "tagline": "Kenya's Largest Wilderness — Red Elephants & Mzima Springs",
    "country": "Kenya", "region": "Coast",
    "latitude": -2.9833, "longitude": 38.5000,
    "best_months": [6, 7, 8, 9, 10],
    "highlights": ["Red Elephants", "Mzima Springs", "Yatta Plateau", "Budget Friendly", "Safari + Beach Gateway"],
    "peak_fee_usd": 80, "low_fee_usd": 80,
  },
  {
    "slug": "diani-beach",
    "name": "Diani Beach + Mombasa Coast",
    "tagline": "Africa's Best Beach — White Sand, Coral Reef, Swahili Culture",
    "country": "Kenya", "region": "Coast",
    "latitude": -4.2833, "longitude": 39.5667,
    "best_months": [10, 11, 12, 1, 2, 3],
    "highlights": ["White Sand Beach", "Coral Reef Diving", "Fort Jesus UNESCO", "Colobus Monkeys", "Water Sports"],
    "peak_fee_usd": 0, "low_fee_usd": 0,
  },
  {
    "slug": "hells-gate",
    "name": "Hell's Gate National Park",
    "tagline": "Cycle Among Wildlife in Africa's Most Dramatic Gorge",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": -0.9167, "longitude": 36.3167,
    "best_months": [1, 2, 6, 7, 8, 9, 10, 11, 12],
    "highlights": ["Cycling Safari", "Gorge Walk", "Geothermal Spa", "Fischer's Tower", "Lion King Inspiration"],
    "peak_fee_usd": 50, "low_fee_usd": 50,
  },
  {
    "slug": "ol-pejeta",
    "name": "Ol Pejeta Conservancy",
    "tagline": "Home of the Last Two Northern White Rhinos on Earth",
    "country": "Kenya", "region": "Laikipia",
    "latitude": 0.0167, "longitude": 36.9000,
    "best_months": [1, 2, 3, 6, 7, 8, 9, 10],
    "highlights": ["Last 2 Northern White Rhinos", "African Wild Dogs", "Chimpanzee Sanctuary", "All Big Five", "Night Drives"],
    "peak_fee_usd": 120, "low_fee_usd": 120,
  },
  {
    "slug": "lake-bogoria",
    "name": "Lake Bogoria + Lake Baringo",
    "tagline": "Two Million Flamingos Turn the Lake Pink",
    "country": "Kenya", "region": "Rift Valley",
    "latitude": 0.2167, "longitude": 36.1000,
    "best_months": [11, 12, 1, 2, 3],
    "highlights": ["2 Million Flamingos", "Hot Springs", "Hippos", "470 Bird Species", "No Crowds"],
    "peak_fee_usd": 35, "low_fee_usd": 35,
  },
  {
    "slug": "mount-kenya",
    "name": "Mount Kenya National Park",
    "tagline": "Africa's Second Highest Peak — Trekking + Wildlife",
    "country": "Kenya", "region": "Central Kenya",
    "latitude": -0.1521, "longitude": 37.3084,
    "best_months": [1, 2, 7, 8, 9, 10],
    "highlights": ["UNESCO World Heritage", "Point Lenana Summit", "Afroalpine Wildlife", "Colobus Monkeys", "Giant Lobelia"],
    "peak_fee_usd": 80, "low_fee_usd": 80,
  },
  {
    "slug": "kakamega",
    "name": "Kakamega Forest",
    "tagline": "Kenya's Only Rainforest — 400 Birds + Rare Primates",
    "country": "Kenya", "region": "Western Kenya",
    "latitude": 0.2833, "longitude": 34.8667,
    "best_months": [6, 7, 8, 9],
    "highlights": ["400+ Bird Species", "De Brazza's Monkey", "Tropical Rainforest", "Congo Basin Remnant"],
    "peak_fee_usd": 50, "low_fee_usd": 50,
  },
  {
    "slug": "lamu",
    "name": "Lamu Island + Archipelago",
    "tagline": "UNESCO Old Town — Africa's Most Authentic Swahili Culture",
    "country": "Kenya", "region": "Coast",
    "latitude": -2.2692, "longitude": 40.9022,
    "best_months": [10, 11, 12, 1, 2, 3],
    "highlights": ["UNESCO World Heritage", "No Cars — Donkeys Only", "700 Year Old Town", "Dhow Sailing", "Indian Ocean"],
    "peak_fee_usd": 0, "low_fee_usd": 0,
  },
]


_IMAGES = {
    "masai-mara":    "/images/destinations/masai-mara.jpg",
    "amboseli":      "/images/destinations/amboseli.jpg",
    "lake-naivasha": "/images/destinations/lake-naivasha.jpg",
    "samburu":       "/images/destinations/samburu.jpg",
    "nairobi":       "/images/destinations/nairobi.jpg",
    "lake-nakuru":   "/images/destinations/lake-nakuru.jpg",
    "tsavo":         "/images/destinations/tsavo.jpg",
    "diani-beach":   "/images/destinations/diani-beach.jpg",
    "hells-gate":    "/images/destinations/hells-gate.jpg",
    "ol-pejeta":     "/images/destinations/ol-pejeta.jpg",
    "lake-bogoria":  "/images/destinations/lake-bogoria.jpg",
    "mount-kenya":   "/images/destinations/mount-kenya.jpg",
    "kakamega":      "/images/destinations/kakamega.jpg",
    "lamu":          "/images/destinations/lamu.jpg",
}


async def seed():
    async with SessionLocal() as db:
        count = 0
        for d in DESTINATIONS:
            # Convert month numbers to names for display
            d["best_months"] = [MONTH_NAMES[m - 1] for m in d["best_months"]]
            d.setdefault("cover_image", _IMAGES.get(d["slug"]))
            result = await db.execute(select(Destination).where(Destination.slug == d["slug"]))
            existing = result.scalar_one_or_none()
            if existing:
                for k, v in d.items():
                    setattr(existing, k, v)
            else:
                db.add(Destination(**d))
                count += 1
        await db.commit()
        print(f"✅ Seeded {count} new destinations ({len(DESTINATIONS)} total)")


asyncio.run(seed())
