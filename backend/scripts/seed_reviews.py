"""
Run: python scripts/seed_reviews.py
Seeds 20 realistic reviews across safaris.
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models import safari as _safari_mod, destination, guide, booking, review as _review_mod, agent, affiliate, availability  # noqa: F401
from app.models.review import Review
from app.models.safari import Safari
from sqlalchemy import select

REVIEWS = [
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Sarah Thompson",
        "author_country": "United Kingdom",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "The best three days of my life",
        "body": "I've done safaris in Tanzania and South Africa. This was better. James knew exactly where every lion pride was sleeping before we even left camp. We saw all Big Five by day two. The transparent pricing meant no surprises — what I paid online was exactly what I paid. I'll never use another company for Kenya.",
        "trip_month": "August 2025", "is_approved": True, "is_featured": True,
    },
    {
        "safari_slug": "5-day-mara-amboseli",
        "author_name": "Marcus Weber",
        "author_country": "Germany",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Elephants under Kilimanjaro — I cried",
        "body": "Day four, 6am, Amboseli. A herd of 40 elephants moving across the plain with Kilimanjaro perfectly clear behind them. I am not an emotional person. I cried. Samuel positioned the vehicle perfectly and killed the engine. We sat in silence for 20 minutes. No other vehicles. Just us and the elephants and the mountain. Worth every shilling.",
        "trip_month": "January 2025", "is_approved": True, "is_featured": True,
    },
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Priya Nair",
        "author_country": "India",
        "rating": 5, "guide_rating": 5, "value_rating": 4,
        "title": "River crossing on day two — unbelievable",
        "body": "We waited at the Mara River for two hours. Our guide Grace kept saying 'they are coming, be patient.' Then 15,000 wildebeest came over the hill at once. The sound alone was extraordinary. The crossing lasted 40 minutes. Crocodiles took three. It was brutal and magnificent and I will never forget it. Grace is exceptional — her knowledge of animal behaviour is encyclopaedic.",
        "trip_month": "September 2025", "is_approved": True, "is_featured": True,
    },
    {
        "safari_slug": "naivasha-hells-gate-combo",
        "author_name": "Emma Johansson",
        "author_country": "Sweden",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Cycling among giraffes — nothing else like it",
        "body": "Hell's Gate is unlike any safari experience I've had. You cycle through the gorge with giraffe and zebra walking alongside you. No fence. No vehicle. Just you and the animals. The gorge walk afterwards was spectacular — steam vents, orange rock walls, hot springs. James made the whole day feel like an adventure rather than a tour. Booked again for next year.",
        "trip_month": "June 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "naivasha-day-trip",
        "author_name": "David Chen",
        "author_country": "Singapore",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Perfect day trip from Nairobi",
        "body": "We only had one day before our flight. Engai organised a Naivasha day trip that packed in more than I thought possible — boat safari with hippos and fish eagles at 6am, Crescent Island walking safari, Hell's Gate gorge walk. Back in Nairobi by 7pm. The booking was instant, the price was exactly as shown, and our guide was extraordinary. This is how safari should work.",
        "trip_month": "March 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "5-day-mara-amboseli",
        "author_name": "Fatima Al-Rashid",
        "author_country": "UAE",
        "rating": 5, "guide_rating": 5, "value_rating": 4,
        "title": "Exceeded every expectation",
        "body": "I was nervous about booking online without speaking to someone first. The AI planner helped me choose the right package and the booking was seamless. On the ground, everything was exactly as described. Our guide David was extraordinary — patient, knowledgeable, and genuinely passionate about the wildlife. The Amboseli elephant sightings were the highlight of my year.",
        "trip_month": "February 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "3-day-mara-3-night-diani",
        "author_name": "James O'Brien",
        "author_country": "Ireland",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Safari to beach — the perfect Kenya trip",
        "body": "Three days in the Mara — saw lions, cheetah, leopard, elephant, buffalo. Then three nights at Diani Beach. The combination is perfect. Engai handled the transfer between parks seamlessly. The beach camp was beautiful. Amina met us at the coast and her knowledge of the marine life was as impressive as our Mara guide's wildlife knowledge. Kenya in one trip.",
        "trip_month": "October 2025", "is_approved": True, "is_featured": True,
    },
    {
        "safari_slug": "naivasha-nakuru-2-day",
        "author_name": "Yuki Tanaka",
        "author_country": "Japan",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Flamingos at Nakuru — a pink horizon",
        "body": "Lake Nakuru in the morning light with thousands of flamingos turning the water pink. I have seen this in photographs for years. The reality is better. Samuel knew exactly where the rhinos were — we found two white rhinos within 20 minutes of entering the park. The two-day circuit from Naivasha to Nakuru is perfectly paced. Not rushed. Not slow. Just right.",
        "trip_month": "July 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Amelia Foster",
        "author_country": "Australia",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Solo female traveller — felt completely safe",
        "body": "I travelled alone and was slightly nervous. Grace was my guide and she made me feel completely safe and genuinely looked after from the moment she picked me up. The Mara was extraordinary — cheetah hunt on day one, lion cubs on day two, leopard in a tree on day three. Grace's knowledge of animal behaviour turned every sighting into a story. I cannot recommend her highly enough.",
        "trip_month": "August 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "5-day-mara-amboseli",
        "author_name": "Roberto Esposito",
        "author_country": "Italy",
        "rating": 5, "guide_rating": 5, "value_rating": 4,
        "title": "Photography safari — every shot was perfect",
        "body": "I came specifically for photography. Fatuma understood immediately — she positioned the vehicle for the light, not just the animal. Golden hour at Amboseli with elephants and Kilimanjaro. A cheetah on a termite mound at sunrise. A leopard descending from a tree at dusk. I have 3,000 photographs from five days. About 200 of them are genuinely extraordinary. Fatuma made that possible.",
        "trip_month": "November 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "nairobi-full-day",
        "author_name": "Linda Okonkwo",
        "author_country": "Nigeria",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Nairobi in one day — lions and baby elephants",
        "body": "I had one day in Nairobi between flights. Engai organised the full day — Nairobi National Park in the morning (saw lions, rhino, giraffe), Sheldrick Elephant Orphanage at 11am (the baby elephants are extraordinary), Giraffe Centre in the afternoon. Back at the hotel by 5pm. The booking took 3 minutes online. The day was unforgettable. This is exactly what technology should do for travel.",
        "trip_month": "April 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Charlotte Dubois",
        "author_country": "France",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "James is the best guide in Kenya",
        "body": "I have been on safari four times in three countries. James Ole Nkarai is the best guide I have ever had. His knowledge of the Mara is extraordinary — he knows individual animals, their territories, their habits. He found a leopard that three other vehicles had been searching for all morning in under 15 minutes. He explained everything without being a lecturer. He made us feel like we were discovering the Mara ourselves.",
        "trip_month": "September 2025", "is_approved": True, "is_featured": True,
    },
    {
        "safari_slug": "naivasha-nakuru-2-day",
        "author_name": "Michael Oduya",
        "author_country": "Kenya",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Finally explored my own country properly",
        "body": "I am Kenyan and I had never done a proper safari. Engai made it easy — the pricing was clear, the booking was instant, and the experience was world-class. Samuel showed me things in Nakuru I had never seen despite living 2 hours away. The rhino sighting was extraordinary. I am embarrassed it took me this long. Booking the Mara next.",
        "trip_month": "May 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "5-day-mara-amboseli",
        "author_name": "Hannah Schmidt",
        "author_country": "Germany",
        "rating": 4, "guide_rating": 5, "value_rating": 4,
        "title": "Kilimanjaro was hidden but the elephants were extraordinary",
        "body": "Kilimanjaro was cloud-covered for most of our Amboseli days — Engai had warned us this was possible, which I appreciated. The elephants more than compensated. We spent three hours with a family of 30 elephants including a newborn calf. The matriarch walked within 8 metres of our vehicle. Our guide David's knowledge of the individual families was remarkable. Four stars only because of the mountain — not Engai's fault.",
        "trip_month": "March 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Aisha Mwangi",
        "author_country": "Kenya",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Honeymoon safari — absolutely perfect",
        "body": "My husband surprised me with this for our honeymoon. The camp was beautiful, the food was extraordinary, and Grace made the whole experience feel personal. She found us a cheetah with three cubs on our first morning. On the last evening she arranged a sundowner on a kopje overlooking the Mara. I have no words for how beautiful it was. We are coming back for our first anniversary.",
        "trip_month": "December 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "naivasha-hells-gate-combo",
        "author_name": "Tom Blackwell",
        "author_country": "United States",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Best value safari experience in Africa",
        "body": "I've done expensive safaris in Botswana and Tanzania. This Naivasha + Hell's Gate combo at a fraction of the price delivered more genuine adventure than either. Cycling through a gorge with giraffe walking alongside you is something no amount of money can replicate in a vehicle. James was brilliant — funny, knowledgeable, and clearly loves what he does. Engai has figured out something the big operators haven't.",
        "trip_month": "July 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "5-day-mara-amboseli",
        "author_name": "Mei Lin",
        "author_country": "China",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "The AI planner recommended perfectly",
        "body": "I used the Engai AI planner and described what I wanted — elephants, Kilimanjaro, and the migration if possible. It recommended the 5-Day Mara + Amboseli and explained exactly why. It was right. The migration river crossing on day two was the most dramatic thing I have ever witnessed. The Amboseli elephants on day four were the most moving. Fatuma guided both parks and was extraordinary throughout.",
        "trip_month": "August 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "nairobi-national-park-half-day",
        "author_name": "Sophie Martin",
        "author_country": "France",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Lions with Nairobi skyscrapers behind them",
        "body": "The image of a lion sleeping in the grass with Nairobi's skyline visible behind it is one of the most surreal and beautiful things I have ever seen. Half a day, 45 minutes from the city centre. We also saw rhino, giraffe, zebra, and buffalo. Samuel was our guide and his knowledge of the park was extraordinary. For anyone with limited time in Nairobi, this is essential.",
        "trip_month": "June 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "3-day-masai-mara",
        "author_name": "Carlos Mendoza",
        "author_country": "Mexico",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Came for the migration, stayed for everything else",
        "body": "I booked specifically for the Great Migration. The river crossing on day two was everything I hoped for — 20,000 wildebeest, three crocodile attacks, absolute chaos and beauty. But what surprised me was everything else: a cheetah hunt at dawn, a leopard with a kill in a tree, a lion pride with eight cubs. The Mara in August is extraordinary. James made it extraordinary. I am already planning my return.",
        "trip_month": "August 2025", "is_approved": True, "is_featured": False,
    },
    {
        "safari_slug": "naivasha-nakuru-2-day",
        "author_name": "Ingrid Larsen",
        "author_country": "Norway",
        "rating": 5, "guide_rating": 5, "value_rating": 5,
        "title": "Two days, two lakes, two completely different worlds",
        "body": "Naivasha and Nakuru are only 60km apart but feel like different planets. Naivasha is lush, green, intimate — hippos and fish eagles and the smell of yellow fever acacias. Nakuru is dramatic — a soda lake turning pink with flamingos, rhinos on the hillside, baboons everywhere. Samuel connected the two perfectly, explaining the geology of the Rift Valley as we drove. I learned more in two days than in a year of reading.",
        "trip_month": "October 2025", "is_approved": True, "is_featured": False,
    },
]


async def seed():
    async with SessionLocal() as db:
        # Build slug → id map
        result = await db.execute(select(Safari.id, Safari.slug))
        safari_map = {row.slug: row.id for row in result.all()}

        ok = 0
        for r in REVIEWS:
            slug = r.pop("safari_slug")
            safari_id = safari_map.get(slug)
            try:
                review = Review(safari_id=safari_id, **r)
                db.add(review)
                ok += 1
                print(f"✅ {r['author_name']} ({r['author_country']}) — {r['rating']}★")
            except Exception as exc:
                await db.rollback()
                print(f"❌ Failed [{r.get('author_name')}]: {exc}")
                continue
        await db.commit()
        print(f"\nDone — {ok}/{len(REVIEWS)} reviews seeded.")


asyncio.run(seed())
