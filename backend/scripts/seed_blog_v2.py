"""
20 additional high-traffic SEO blog posts targeting top Kenya safari search queries.
Run: python scripts/seed_blog_v2.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from datetime import datetime, timezone
from app.database import SessionLocal
# Import all models so SQLAlchemy can resolve FK table references
from app.models import safari, destination, guide, booking, review, blog, agent, affiliate, availability  # noqa: F401
from app.models.blog import BlogPost
from sqlalchemy import select

POSTS = [
    {
        "slug": "kenya-safari-cost-guide-2026",
        "title": "Kenya Safari Cost Guide 2026: What Does a Safari Actually Cost?",
        "excerpt": "The honest breakdown of what a Kenya safari costs — from budget camping to luxury tented camps. No vague 'contact us for pricing'. Real numbers.",
        "cover_image": "/images/safaris/3-day-masai-mara.png",
        "category": "tips",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 10,
        "tags": ["cost", "budget", "planning", "pricing"],
        "is_published": True,
        "published_at": datetime(2026, 2, 1, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Safari Cost 2026: Real Prices, No Vague Quotes",
        "meta_desc": "What does a Kenya safari cost in 2026? Full price breakdown from budget to luxury — park fees, accommodation, guides, transport. Real numbers.",
        "content": """
<h2>Why Safari Pricing Is So Confusing</h2>
<p>Type "Kenya safari cost" into Google and you will find articles that say "from $150 to $1,500 per day" — a range so wide it tells you nothing. The reason most safari companies hide prices is simple: they want to talk to you first, understand your budget, and price accordingly.</p>
<p>We don't do that. Here are real numbers.</p>

<h2>The Main Cost Components</h2>
<h3>1. Park Entry Fees</h3>
<p>Kenya Wildlife Service charges non-residents:</p>
<ul>
<li><strong>Masai Mara:</strong> $80–$100 per adult per day (conservancy fees add $50–$120 depending on the conservancy)</li>
<li><strong>Amboseli:</strong> $90 per adult per day</li>
<li><strong>Lake Nakuru:</strong> $60 per adult per day</li>
<li><strong>Nairobi National Park:</strong> $60 per adult per day</li>
</ul>
<p>These fees are set by the government and are the same for everyone. They are included in all Engai Safaris packages.</p>

<h3>2. Accommodation</h3>
<p>This is where costs vary most:</p>
<ul>
<li><strong>Budget camping:</strong> $40–$80 per person per night (tents, shared facilities)</li>
<li><strong>Mid-range tented camp:</strong> $150–$350 per person per night (en-suite, meals included)</li>
<li><strong>Luxury lodge:</strong> $400–$800+ per person per night (private butler, pool, gourmet meals)</li>
</ul>

<h3>3. Transport</h3>
<p>A 4x4 safari vehicle seats 6–8 and costs $150–$250 per day to hire with a driver-guide. Divided among a group of 4, that's $40–$60 per person per day.</p>

<h3>4. Guide Fees</h3>
<p>Your driver is typically also your guide. Tip: KES 1,500–3,000 per day ($12–$23) is appropriate for an excellent guide.</p>

<h2>Real Package Costs (2026)</h2>
<table>
<tr><th>Package</th><th>Duration</th><th>Per Person (2 people)</th><th>Per Person (4 people)</th></tr>
<tr><td>Nairobi National Park Half-Day</td><td>4 hours</td><td>$95</td><td>$65</td></tr>
<tr><td>Lake Nakuru Day Trip</td><td>1 day</td><td>$185</td><td>$125</td></tr>
<tr><td>3-Day Masai Mara</td><td>3 nights</td><td>$695</td><td>$495</td></tr>
<tr><td>5-Day Mara + Amboseli</td><td>5 nights</td><td>$1,195</td><td>$875</td></tr>
<tr><td>3-Night Diani Beach</td><td>3 nights</td><td>$495</td><td>$365</td></tr>
</table>

<h2>How to Get the Best Value</h2>
<ul>
<li><strong>Travel in a group of 4+:</strong> Vehicle costs are shared, dropping per-person cost by 30–40%.</li>
<li><strong>Avoid July–October peak:</strong> Green season (April–June) costs 25–30% less. Wildlife is still excellent, just wetter.</li>
<li><strong>Book direct:</strong> Safari brokers add 20–35% commission. When you book with a direct operator like Engai, that margin stays in Kenya and in your pocket.</li>
<li><strong>Lipa Polepole:</strong> Pay in 4 monthly M-Pesa instalments. A 3-Day Mara from KES 43,750/month.</li>
</ul>

<h2>What Is Not Included (Usually)</h2>
<p>Watch for these extras when comparing packages:</p>
<ul>
<li>International flights</li>
<li>Kenya e-Visa ($51 single entry)</li>
<li>Travel insurance (required — budget $50–$80 for 2 weeks)</li>
<li>Tips for guides and camp staff</li>
<li>Premium drinks at camps</li>
<li>Hot air balloon (Masai Mara) — $450–$550/person, worth every cent</li>
</ul>

<h2>The Bottom Line</h2>
<p>A genuinely good Kenya safari — 3 nights in the Masai Mara with a knowledgeable guide, good camp, all meals, and park fees — costs <strong>$495–$700 per person</strong> for a couple travelling together. That is the real number. Everything below that is a compromise. Everything above $1,000/person adds comfort, not more wildlife.</p>
""",
    },
    {
        "slug": "best-time-to-visit-kenya-safari",
        "title": "Best Time to Visit Kenya for a Safari: Month-by-Month Guide",
        "excerpt": "Dry season or green season? Peak or off-peak? The honest month-by-month breakdown of Kenya's weather, wildlife, and prices — so you can plan with your eyes open.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "tips",
        "author": "James Ole Nkarai",
        "read_time_min": 9,
        "tags": ["planning", "weather", "seasons", "timing"],
        "is_published": True,
        "published_at": datetime(2026, 2, 5, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Best Time to Visit Kenya for a Safari 2026 (Month by Month)",
        "meta_desc": "When is the best time to go on safari in Kenya? Month-by-month guide covering weather, migration timing, wildlife, and prices.",
        "content": """
<h2>Kenya Has Two Safari Seasons — Not One</h2>
<p>Most articles tell you "July to October is best." That is true for the Great Migration river crossings. It is not the whole story. Kenya has excellent wildlife year-round. The question is: what do you want to see, and what is your budget?</p>

<h2>Month-by-Month Breakdown</h2>

<h3>January – February: Dry, Clear, Excellent</h3>
<p><strong>Weather:</strong> Hot and dry. Clear skies. Low humidity. Excellent photography light.</p>
<p><strong>Wildlife:</strong> Animals concentrate around waterholes — easy sightings. Amboseli and Masai Mara are both superb.</p>
<p><strong>Migration:</strong> Herds are in Tanzania's southern Serengeti.</p>
<p><strong>Prices:</strong> Mid-range. 10–15% below peak season.</p>
<p><strong>Verdict:</strong> Underrated. Clear skies, fewer tourists, good prices. ✓</p>

<h3>March: Transition — Short Rains Begin</h3>
<p><strong>Weather:</strong> Short rains start mid-March. Roads can get muddy.</p>
<p><strong>Wildlife:</strong> Still good. Landscape starts greening up.</p>
<p><strong>Prices:</strong> Dropping as tourists avoid rain.</p>
<p><strong>Verdict:</strong> Fine if flexible with rain showers. OK for budget travellers.</p>

<h3>April – May: Long Rains — Low Season</h3>
<p><strong>Weather:</strong> Kenya's wettest months. Heavy daily rain. Some roads impassable.</p>
<p><strong>Wildlife:</strong> Animals dispersed. Harder to spot in tall green grass.</p>
<p><strong>Prices:</strong> 25–35% lower than peak. Some camps close entirely.</p>
<p><strong>Verdict:</strong> Not recommended unless on a very tight budget and flexible. ✗</p>

<h3>June: Green Season — Hidden Gem</h3>
<p><strong>Weather:</strong> Rains ease. Landscape lush and green. Morning mist burns off by 9am.</p>
<p><strong>Wildlife:</strong> Excellent. Predators active. Calves and young animals everywhere.</p>
<p><strong>Migration:</strong> Wildebeest beginning to move north toward Kenya.</p>
<p><strong>Prices:</strong> 20% below July–October.</p>
<p><strong>Verdict:</strong> One of the best kept secrets in Kenya safari. ✓✓</p>

<h3>July – October: Peak — The River Crossings</h3>
<p><strong>Weather:</strong> Dry and cool (16–25°C). Perfect.</p>
<p><strong>Wildlife:</strong> Extraordinary. The Masai Mara is at full capacity with wildebeest, lion, cheetah, leopard.</p>
<p><strong>Migration:</strong> River crossings happening — August/September at peak frequency.</p>
<p><strong>Prices:</strong> 30–40% premium. Book 3–6 months ahead for best camps.</p>
<p><strong>Verdict:</strong> Worth every extra shilling if river crossings are your goal. ✓✓✓</p>

<h3>November – December: Short Rains Then Sun</h3>
<p><strong>Weather:</strong> Short rains in November. December turns dry and clear.</p>
<p><strong>Wildlife:</strong> Good. Fewer tourists. Prices drop again.</p>
<p><strong>Migration:</strong> Herds moving south back into Tanzania.</p>
<p><strong>Prices:</strong> November low. December rising toward Christmas peak.</p>
<p><strong>Verdict:</strong> December excellent value. November for the budget-conscious. ✓</p>

<h2>The Honest Recommendation by Goal</h2>
<ul>
<li><strong>See the river crossings:</strong> August–September. No substitute.</li>
<li><strong>Best value for money:</strong> June or January–February.</li>
<li><strong>Avoid crowds:</strong> January, February, June.</li>
<li><strong>Photography:</strong> January (dry, clear light) or June (green, dramatic skies).</li>
<li><strong>Family with school holidays:</strong> July or December — plan well ahead.</li>
</ul>

<h2>A Note on "Off-Season" Misconceptions</h2>
<p>Kenya's wildlife does not migrate elsewhere in low season — only the wildebeest do that. Lions, cheetahs, elephants, giraffes, hippos and most of the Big Five are present year-round. A June safari in the Masai Mara will still show you predator kills, herds of elephant, and more birds than you can name. It just costs 20% less and you have the park to yourself.</p>
""",
    },
    {
        "slug": "kenya-safari-packing-list",
        "title": "Kenya Safari Packing List: What to Bring (and What to Leave Home)",
        "excerpt": "A guide who has driven 10,000+ safari kilometres tells you exactly what to pack. Spoiler: you need less than you think, and the wrong shoes will ruin your trip.",
        "cover_image": "/images/safaris/5-day-mara-amboseli.png",
        "category": "tips",
        "author": "James Ole Nkarai",
        "read_time_min": 7,
        "tags": ["packing", "tips", "preparation", "gear"],
        "is_published": True,
        "published_at": datetime(2026, 2, 8, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Safari Packing List 2026: What a Guide Says to Bring",
        "meta_desc": "Complete Kenya safari packing list from an expert guide. Clothing, gear, medicine, photography tips. What to bring and what to leave at home.",
        "content": """
<h2>The Golden Rule: Pack Light</h2>
<p>Bush planes have strict 15kg luggage limits. A safari vehicle is not a bus. You will be living out of your bag, and every unnecessary kilogram is something you carry. The guests who pack three suitcases regret it by day two.</p>

<h2>Clothing</h2>
<h3>Colours: Neutral, Not White</h3>
<p>Khaki, olive, tan, light brown, grey. Not white (shows dirt instantly), not black (attracts tsetse flies in some areas), not bright colours (disturbs wildlife and your fellow guests).</p>

<h3>The Core Wardrobe</h3>
<ul>
<li>3–4 lightweight, long-sleeved shirts (sun protection + cool evenings)</li>
<li>2 pairs of safari trousers (zip-off legs are genuinely useful)</li>
<li>1 pair of shorts (for camp, not game drives)</li>
<li>1 warm fleece or light down jacket (mornings can be 12°C in the Mara)</li>
<li>1 waterproof layer (even in dry season, afternoon showers happen)</li>
<li>Comfortable walking shoes or boots (not heels — ever)</li>
<li>Sandals for camp</li>
<li>Wide-brimmed hat (non-negotiable)</li>
<li>Swimwear (many camps have pools)</li>
</ul>

<h2>Health and Essentials</h2>
<ul>
<li><strong>Malaria prophylaxis:</strong> Start before travel. Consult your doctor. Most of Kenya's safari areas have malaria risk.</li>
<li><strong>DEET insect repellent:</strong> 50% concentration for evenings.</li>
<li><strong>Sunscreen SPF50+:</strong> African equatorial sun at altitude is brutal.</li>
<li><strong>Hand sanitiser:</strong> Especially for bush picnics.</li>
<li><strong>Prescription medicines:</strong> Bring more than you need. Nairobi pharmacies are good; remote camp pharmacies are not.</li>
<li><strong>Antihistamines:</strong> Dust, grass, and unfamiliar flora trigger reactions.</li>
</ul>

<h2>Photography</h2>
<ul>
<li><strong>Camera with zoom lens:</strong> Minimum 300mm equivalent for wildlife. 400–600mm ideal.</li>
<li><strong>Bean bag or window mount:</strong> Your best friend in the vehicle. Tripods are impractical.</li>
<li><strong>Extra memory cards:</strong> You will shoot more than you think.</li>
<li><strong>Backup batteries:</strong> Solar charging is available at most camps but not always reliable.</li>
<li><strong>Dust-proof bag or dry bag:</strong> Dust on game drives is extraordinary.</li>
</ul>

<h2>Documents and Money</h2>
<ul>
<li>Passport (valid 6+ months beyond travel date)</li>
<li>Kenya e-Visa confirmation (apply at evisa.go.ke — costs $51)</li>
<li>Travel insurance (with medical evacuation cover — essential)</li>
<li>USD cash in small bills ($1, $5, $10) for tips and small purchases</li>
<li>Engai Safaris booking confirmation</li>
</ul>

<h2>What to Leave Home</h2>
<ul>
<li>Camouflage clothing (not permitted in Kenyan national parks)</li>
<li>Expensive jewellery</li>
<li>More than one pair of dress shoes</li>
<li>A hair dryer (most camps have them; they are too heavy)</li>
<li>Anything you would be devastated to lose</li>
</ul>

<h2>The One Thing Most People Forget</h2>
<p>Dust. The Masai Mara in dry season generates dust that gets into everything. A microfibre cloth to clean your camera lens and a small zip-lock bag for your phone will save you frustration. Also: lip balm. The dry air at altitude cracks lips fast.</p>
""",
    },
    {
        "slug": "big-five-kenya-where-to-see-them",
        "title": "The Big Five in Kenya: Where to See Lion, Leopard, Elephant, Buffalo and Rhino",
        "excerpt": "Not every park has all five. Here is exactly where to go for each of the Big Five — and which parks give you the best chance of seeing all of them on a single trip.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "wildlife",
        "author": "James Ole Nkarai",
        "read_time_min": 8,
        "tags": ["big five", "wildlife", "lion", "elephant", "leopard"],
        "is_published": True,
        "published_at": datetime(2026, 2, 12, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Big Five Kenya: Where to See All 5 in One Safari (2026)",
        "meta_desc": "Where to see Kenya's Big Five — lion, leopard, elephant, buffalo and rhino. Best parks, best times, and what a real sighting looks like.",
        "content": """
<h2>Why "Big Five"?</h2>
<p>The term was coined by big-game hunters in the colonial era — these were the five most dangerous animals to hunt on foot. Today the Big Five are the most sought-after wildlife sightings on a Kenya safari, not because they are the most common, but because each one is an event.</p>

<h2>Lion</h2>
<p><strong>Best park:</strong> Masai Mara<br>
<strong>Second best:</strong> Amboseli, Tsavo</p>
<p>The Masai Mara has one of the highest lion densities in Africa. On a 3-day safari, you will almost certainly see lions — often multiple times. The Mara's open grassland makes spotting straightforward. Lions here have never been hunted and show no fear of vehicles. You can be three metres from a sleeping pride.</p>
<p>Look for lions in the early morning (they hunt at dawn) and late afternoon. At midday, they sleep under acacia trees and are hard to find unless you know where to look — which is where your guide earns their fee.</p>

<h2>Leopard</h2>
<p><strong>Best park:</strong> Masai Mara (especially the Mara Triangle)<br>
<strong>Second best:</strong> Nairobi National Park (surprisingly good)</p>
<p>Leopard are the hardest of the Big Five to find. They are solitary, nocturnal, and masters of camouflage. A guide who knows the territory will watch specific trees — leopards hoist kills into branches to keep them away from lions and hyenas.</p>
<p>When you find a leopard, the sighting is often extraordinary. They stare directly at you with complete indifference. Budget at least 4 full days in the Mara for a strong chance of a leopard sighting.</p>

<h2>Elephant</h2>
<p><strong>Best park:</strong> Amboseli (largest elephants in Kenya, Kilimanjaro backdrop)<br>
<strong>Second best:</strong> Masai Mara, Tsavo</p>
<p>Amboseli's elephants are Kenya's most famous — large tuskers from families that have been studied and named for 50 years. The park's open terrain and swamp edges mean you find them easily. At sunset, elephant silhouettes against Kilimanjaro is the most photographed image in all of African wildlife.</p>
<p>Tsavo East and West hold the largest elephant population in Kenya — over 14,000 individuals — but the terrain is denser and sightings require more patience.</p>

<h2>Cape Buffalo</h2>
<p><strong>Best park:</strong> Masai Mara<br>
<strong>Second best:</strong> Tsavo, Lake Nakuru</p>
<p>Buffalo are the most underrated of the Big Five. Old males — called "dagga boys" or "black death" by old-school hunters — are genuinely dangerous. Herds of 500+ buffalo moving across the Mara plains are a sight that rivals any predator encounter.</p>
<p>The Mara regularly hosts herds of 1,000+ during the migration. Even outside migration season, buffalo are abundant and accessible.</p>

<h2>Rhino</h2>
<p><strong>Best park:</strong> Ol Pejeta Conservancy (both black and white rhino)<br>
<strong>Second best:</strong> Lake Nakuru, Nairobi National Park</p>
<p>Rhino are the rarest of the Big Five in Kenya due to decades of poaching. They do not naturally occur in the Masai Mara. If rhino is on your must-see list, build in a day at Ol Pejeta Conservancy — home to the world's last two northern white rhinos and a significant black rhino population.</p>
<p>Lake Nakuru also has a fenced rhino sanctuary with both species, easily combinable with a Mara trip.</p>

<h2>Best Park for All Five in One Safari</h2>
<p>No single park contains all five naturally. The best combination:</p>
<ol>
<li>Start at <strong>Ol Pejeta or Lake Nakuru</strong> for rhino — 1 day</li>
<li>Move to <strong>Masai Mara</strong> for lion, leopard, buffalo, elephant — 3 nights</li>
</ol>
<p>This itinerary gives you a realistic chance of all five in 4 days. Our <strong>Masai Mara + Nakuru 3-Day package</strong> is built around exactly this combination.</p>
""",
    },
    {
        "slug": "family-safari-kenya-with-kids",
        "title": "Family Safari Kenya: Everything You Need to Know Before Bringing Kids",
        "excerpt": "Age limits, malaria, vehicle safety, what holds children's attention and what doesn't — an honest guide for parents planning Kenya's most memorable family holiday.",
        "cover_image": "/images/safaris/nairobi-full-day.jpg",
        "category": "tips",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 9,
        "tags": ["family", "kids", "children", "planning"],
        "is_published": True,
        "published_at": datetime(2026, 2, 15, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Family Safari Kenya with Kids: Complete 2026 Guide",
        "meta_desc": "Planning a Kenya safari with children? Age minimums, safety, malaria, best parks for families, and tips from guides who do this every week.",
        "content": """
<h2>Is Kenya Safe for Children on Safari?</h2>
<p>Yes — with the right planning. Kenya receives tens of thousands of family safari visitors every year. The main considerations are not danger in the parks, but health (malaria), age-appropriate expectations, and choosing the right style of safari.</p>

<h2>Age Minimums</h2>
<p>Most Kenyan safari camps and lodges set a minimum age of <strong>5–6 years</strong> for standard game drives, and some luxury camps have minimum ages of 8 or 12. The reason is not safety — it is that children under 5 often cannot sit still for 3-hour game drives, which is unfair to them, to you, and to the other guests in the vehicle.</p>
<p>For very young children, <strong>Nairobi National Park</strong> is ideal — 30 minutes from the city, short drives, and the David Sheldrick Elephant Orphanage next door is among the best wildlife experiences on earth for small children.</p>

<h2>Health: Malaria</h2>
<p>All major Kenyan safari destinations are malaria zones. Children are more vulnerable than adults. Before travel:</p>
<ul>
<li>Consult your paediatric doctor for appropriate prophylaxis (dosage varies by weight)</li>
<li>Pack DEET-based repellent (child-safe formulations)</li>
<li>Long sleeves and trousers after sunset — non-negotiable</li>
<li>Most camps provide mosquito nets; check this before booking</li>
</ul>

<h2>Best Parks for Families</h2>
<h3>1. Nairobi National Park</h3>
<p>The world's only national park within a capital city. 30 minutes from Nairobi hotels. Short drives, dense wildlife (lion, rhino, giraffe, buffalo). Combine with the Giraffe Centre and Elephant Orphanage for a perfect family day.</p>

<h3>2. Masai Mara (5+ years)</h3>
<p>The Mara's open plains and abundance of wildlife keep children genuinely engaged. Seeing a lion is unforgettable at any age. Key: choose a camp with a pool for midday breaks.</p>

<h3>3. Ol Pejeta Conservancy</h3>
<p>Home to chimpanzees (unique in Kenya), rhinos, and excellent family-friendly accommodation. The chimpanzee sanctuary is a highlight for children who have never seen great apes.</p>

<h2>Practical Tips from Our Guides</h2>
<ul>
<li><strong>Private vehicle:</strong> With children, book a private safari vehicle. You set the pace, stop when children need a break, and don't worry about disturbing other guests.</li>
<li><strong>Timing game drives:</strong> Early morning (6–10am) and late afternoon (4–7pm) have the best sightings. Schedule pool time or rest during the hot midday hours.</li>
<li><strong>Binoculars:</strong> Every child should have their own pair. It transforms the game drive — suddenly they are doing the spotting, not just watching adults point at things.</li>
<li><strong>Safari journals:</strong> Give children a notebook to draw animals and write what they saw. Guides can help with animal names and facts. This has kept 7-year-olds engaged for 4 hours.</li>
<li><strong>Snacks:</strong> Pack more than you think. Dusty, exciting mornings make children hungry.</li>
</ul>

<h2>What Will Actually Excite Your Children</h2>
<p>In order of guaranteed child interest: baby animals (especially elephants), predator action (lion eating, cheetah sprinting), giraffes at close range (they are enormous and strange), hippos, and zebras. Cheetahs in a sprint are universally thrilling at any age.</p>
<p>What needs explanation: more complex ecological stories, bird identification, subtle tracking signs. Save these for 10+ years old.</p>

<h2>Our Recommended Family Itinerary</h2>
<p><strong>Day 1:</strong> Nairobi — Giraffe Centre, Elephant Orphanage (morning), Nairobi National Park (afternoon)<br>
<strong>Days 2–4:</strong> Masai Mara — full-day game drives with pool breaks<br>
<strong>Day 5:</strong> Return to Nairobi or Diani Beach for coastal wind-down</p>
<p>This gives children variety — city wildlife, savannah wildlife, and a beach reward at the end. It is the most common family itinerary we run and it works every time.</p>
""",
    },
    {
        "slug": "honeymoon-safari-kenya",
        "title": "Honeymoon Safari Kenya: The Complete Romantic Guide",
        "excerpt": "Sundowners on the Mara plains. A private tent with an outdoor bath under the stars. Elephants at breakfast. Kenya is one of the world's great honeymoon destinations — here is how to do it properly.",
        "cover_image": "/images/safaris/luxury-mara-private-camp.png",
        "category": "tips",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 8,
        "tags": ["honeymoon", "romantic", "luxury", "couples"],
        "is_published": True,
        "published_at": datetime(2026, 2, 18, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Honeymoon Safari Kenya 2026: The Romantic Couple's Guide",
        "meta_desc": "Planning a honeymoon in Kenya? Best romantic safari packages, luxury camps, beach combinations, and exactly what to expect.",
        "content": """
<h2>Why Kenya for a Honeymoon?</h2>
<p>There are more dramatic ways to begin a marriage than watching a lion hunt at golden hour from a private vehicle, then returning to a candlelit dinner in the bush. Not many.</p>
<p>Kenya combines two things that no other single destination can match: the world's greatest wildlife experience in the Masai Mara, and the Indian Ocean's most beautiful beaches at Diani. A 7–10 day honeymoon safari-and-beach combination is Kenya's signature offering, and it remains one of the most sought-after honeymoon itineraries in the world.</p>

<h2>The Classic Kenya Honeymoon Structure</h2>
<h3>Days 1–4: Masai Mara Safari</h3>
<p>Choose a camp with a private tent, a standalone bath, and a view. The Mara has camps where you sleep 50 metres from grazing elephants and wake to lions calling. This is your opening act.</p>
<p>Honeymoon add-ons worth having:</p>
<ul>
<li>Private game drive vehicle (just the two of you, your guide, and the wildlife)</li>
<li>Bush breakfast — your guide sets a table in the bush while the morning burns off</li>
<li>Sundowner stop — gin and tonic at a riverside viewpoint as the sun drops</li>
<li>Hot air balloon (optional, $500/person — spectacular but not essential)</li>
</ul>

<h3>Days 5–7: Diani Beach</h3>
<p>Diani, 30km south of Mombasa, is Kenya's most beautiful beach — white sand, warm blue water, no jellyfish, excellent food, and good but not overcrowded resort options. After the dust and excitement of the Mara, lying on a sunbed listening to the ocean is exactly the decompression a honeymoon needs.</p>

<h2>What to Tell Us When Booking</h2>
<p>Tell us it's your honeymoon. Every time. Camps and lodges prepare private setups — rose petals, champagne, special dinners — at no extra cost for honeymooners. Your guide will know not to rush you. The kitchen will know you want a private table.</p>
<p>We note honeymoon bookings on our system and brief the relevant camps. This one small disclosure consistently produces upgrades and touches that guests describe as the highlight of their trip.</p>

<h2>Best Months for a Kenya Honeymoon</h2>
<ul>
<li><strong>January–February:</strong> Clear skies, good wildlife, pleasant weather, mid-range prices. Excellent.</li>
<li><strong>June:</strong> Green and lush, fewer tourists, 20% cheaper than peak. Underrated for couples.</li>
<li><strong>August–September:</strong> Peak migration season — if river crossings are on your list, this is when. Plan 6 months ahead.</li>
<li><strong>December:</strong> Festive, Diani beach at its best, warm Mara weather. Book very early.</li>
</ul>

<h2>Honeymoon Budgeting</h2>
<p>A genuine honeymoon-quality Kenya trip — private vehicle, good camp, 3 Mara nights + 3 Diani nights — costs between <strong>$2,400 and $4,000 per couple total</strong> (excluding international flights). This is significantly cheaper than equivalent-quality honeymoons in the Maldives, Bali, or the Seychelles, with a more extraordinary experience.</p>

<h2>One Thing We Always Say</h2>
<p>Your honeymoon is not the time to economise on the safari accommodation. The difference between a mid-range camp and a good camp is not just a fancier bed — it is the private outdoor bath, the guide who takes you out before sunrise for the light, and the chef who knows you arrived last night and prepares something special for breakfast. These things matter on a honeymoon.</p>
<p>Our 3-Night Mara + 3-Night Diani honeymoon package starts from $2,199 per couple. Tell us it's your honeymoon and we take care of the rest.</p>
""",
    },
    {
        "slug": "nairobi-to-masai-mara-guide",
        "title": "Nairobi to Masai Mara: Every Way to Get There (Fly vs Drive)",
        "excerpt": "The road is 270km. The flight is 45 minutes. The choice affects your experience more than almost any other decision. Here is the honest comparison.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 7,
        "tags": ["masai mara", "transport", "nairobi", "planning"],
        "is_published": True,
        "published_at": datetime(2026, 2, 22, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Nairobi to Masai Mara: Drive or Fly? Complete 2026 Guide",
        "meta_desc": "Should you drive or fly from Nairobi to Masai Mara? Time, cost, experience, road conditions — the complete comparison.",
        "content": """
<h2>The Distance</h2>
<p>Nairobi to the Masai Mara (Sekenani Gate) is approximately 270km by road. On paper that sounds manageable. In practice, the last 100km is on dirt roads that take 2–3 hours in dry season and longer in the rains. Door-to-door driving time: 5–7 hours. A flight takes 45 minutes.</p>

<h2>Option 1: Fly (Recommended for 3-Night Safaris)</h2>
<p>Scheduled flights operate from Wilson Airport (small aircraft airport 6km from Nairobi CBD) to airstrips inside or adjacent to the Mara. Operators include Safarilink, AirKenya, and Fly540.</p>
<ul>
<li><strong>Flight time:</strong> 40–55 minutes</li>
<li><strong>Cost:</strong> $140–$220 per person one-way</li>
<li><strong>Luggage limit:</strong> 15kg (soft bags only — no hard suitcases)</li>
<li><strong>Experience:</strong> Aerial views of the Rift Valley, often wildebeest visible from the air</li>
</ul>
<p><strong>Best for:</strong> Anyone with 3 nights or fewer, those who find long drives draining, and all honeymoon couples.</p>

<h2>Option 2: Drive in a Safari Vehicle</h2>
<p>All Engai Safaris overland packages use customised 4x4 safari vehicles with pop-up roofs — so the drive itself becomes part of the safari experience. You stop for giraffe on the Rift Valley floor, arrive at the park already in game-drive mode.</p>
<ul>
<li><strong>Drive time:</strong> 5–7 hours (Nairobi CBD to camp)</li>
<li><strong>Cost:</strong> Included in overland safari packages (no additional charge)</li>
<li><strong>Route highlights:</strong> Nairobi suburbs → Naivasha escarpment → Rift Valley floor → Mara plains</li>
<li><strong>Comfort:</strong> Good roads until Mai Mahiu, then corrugated dirt for 2 hours</li>
</ul>
<p><strong>Best for:</strong> 4+ night safaris, guests who want to experience Kenya's landscapes, and anyone combining Naivasha or Nakuru on the way.</p>

<h2>Option 3: Shared Shuttle Bus</h2>
<p>Several companies run shared shuttles from Nairobi to Mara for $40–$60 per person. We do not recommend these for first-time visitors. They are slow (often 8+ hours with stops), uncomfortable for long distances, and you cannot stop for wildlife sightings on the way.</p>

<h2>Road Conditions: What to Expect</h2>
<p>The Nairobi–Narok road (B3) was recently upgraded and is now well-tarmacked to Narok town. The dirt road from Narok to Sekenani Gate is the variable: in dry season (June–October, January–February) it is rough but passable in 2–3 hours. In long rains (April–May) sections can be deeply rutted and require a high-clearance 4x4.</p>
<p>All Engai Safaris vehicles are purpose-built 4x4 Land Cruisers or modified Safari Landcruisers. The road has never stopped us from reaching the Mara.</p>

<h2>Our Recommendation</h2>
<ul>
<li>3 nights or fewer: <strong>Fly in, fly out</strong>. The extra cost is worth it for maximum time in the park.</li>
<li>4+ nights: <strong>Fly in, drive out</strong> (or vice versa). Best of both — you see the aerial view and the landscape.</li>
<li>Combining Naivasha/Nakuru: <strong>Drive both ways</strong>. The route connects naturally.</li>
</ul>
""",
    },
    {
        "slug": "diani-beach-kenya-guide",
        "title": "Diani Beach Kenya: The Complete Guide to Kenya's Best Coast",
        "excerpt": "White sand. Warm turquoise water. Colobus monkeys in the trees above your sunbed. Diani is Kenya's finest beach — here is everything you need to know.",
        "cover_image": "/images/safaris/diani-beach-3-nights.jpg",
        "category": "destinations",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 7,
        "tags": ["diani", "beach", "coast", "mombasa"],
        "is_published": True,
        "published_at": datetime(2026, 2, 25, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Diani Beach Kenya Guide 2026: Hotels, Activities, When to Go",
        "meta_desc": "Everything about Diani Beach — Kenya's best coastal destination. Where to stay, what to do, when to visit, and how to combine with a safari.",
        "content": """
<h2>Why Diani?</h2>
<p>Kenya has several beach destinations — Malindi, Lamu, Watamu, Mombasa — but Diani consistently earns the top slot for overall quality. The beach is 20km of white powder sand with reef-protected, jellyfish-free swimming. The water temperature hovers between 24–28°C year-round. And unlike Mombasa's crowded beaches, Diani still feels spacious.</p>

<h2>Location and Getting There</h2>
<p>Diani is 30km south of Mombasa, across the Likoni ferry. From Nairobi, fly to Ukunda airstrip (25-minute flight from Wilson Airport) or take the 1-hour Kenya Airways flight to Mombasa Moi Airport, then a 45-minute taxi.</p>
<p>From the Masai Mara: fly directly Mara → Nairobi (45 min) → Ukunda (25 min). Total transfer time: under 2.5 hours.</p>

<h2>Where to Stay</h2>
<h3>Budget (Under $80/night)</h3>
<p>Several beachfront bandas and guesthouses, particularly in the Galu Beach area. Diani Backpackers is popular with solo travellers.</p>

<h3>Mid-Range ($80–$200/night)</h3>
<p>Bahari Beach Hotel and Leopard Beach Resort consistently deliver good value — direct beach access, pools, reliable air conditioning.</p>

<h3>Luxury ($200+/night)</h3>
<p>Alfajiri Villas (private villa, butler included), Pinewood Beach Resort, The Sands at Nomad. These represent genuine luxury at prices 40–60% cheaper than Maldives equivalents.</p>

<h2>What to Do</h2>
<ul>
<li><strong>Snorkelling and diving:</strong> Kisite-Mpunguti Marine Park, 30 minutes by boat. Dolphins common year-round. Sea turtles regularly sighted.</li>
<li><strong>Kitesurf:</strong> Diani has consistent Indian Ocean trade winds. Several schools operate on the beach.</li>
<li><strong>Colobus Conservation:</strong> Free sanctuary protecting Angola Colobus monkeys — the black-and-white primates that live in the coastal forest above the beach.</li>
<li><strong>Shimba Hills:</strong> A short drive inland — Kenya's second-largest elephant population and the only Kenyan habitat of sable antelope.</li>
<li><strong>Seafood:</strong> Ali Barbour's Cave Restaurant is carved into a 180,000-year-old coral cave. Book ahead.</li>
</ul>

<h2>When to Go</h2>
<ul>
<li><strong>Best weather:</strong> January–March and July–October</li>
<li><strong>Avoid:</strong> April–June (heavy rains, sea can be rough)</li>
<li><strong>Warmest water:</strong> February–April</li>
</ul>

<h2>Combining Diani with a Safari</h2>
<p>The classic 7-day Kenya itinerary:</p>
<ol>
<li>Arrive Nairobi</li>
<li>Fly to Mara → 3 nights safari</li>
<li>Fly Mara → Ukunda → 3 nights Diani beach</li>
<li>Fly home from Mombasa</li>
</ol>
<p>This is Kenya's most popular itinerary for a reason. You get the savannah and the sea, and neither feels rushed. Our 3-Day Mara + 3-Night Diani package combines both with shared or private transfers.</p>
""",
    },
    {
        "slug": "ol-pejeta-conservancy-guide",
        "title": "Ol Pejeta Conservancy: Kenya's Most Important Wildlife Sanctuary",
        "excerpt": "Home to the world's last two northern white rhinos. Over 100 black rhino. Chimpanzees. Lions. And 90,000 acres of conservancy that does everything right. Here is why Ol Pejeta belongs on your Kenya itinerary.",
        "cover_image": "/images/destinations/ol-pejeta.webp",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 7,
        "tags": ["ol pejeta", "rhino", "conservancy", "laikipia"],
        "is_published": True,
        "published_at": datetime(2026, 3, 1, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Ol Pejeta Conservancy Guide 2026: Rhinos, Chimps & What to Expect",
        "meta_desc": "Everything about Ol Pejeta Conservancy — home to Kenya's best rhino viewing, last northern white rhinos, and chimpanzees. How to visit.",
        "content": """
<h2>What Is Ol Pejeta?</h2>
<p>Ol Pejeta Conservancy is a 90,000-acre private wildlife conservancy in the Laikipia region of central Kenya, at the foot of Mount Kenya. It is not a national park — it is a privately managed conservation area, and the difference matters: the management is nimble, the anti-poaching protection is among the best in Africa, and the revenue directly funds conservation rather than government budgets.</p>

<h2>The Northern White Rhino</h2>
<p>Ol Pejeta is home to <strong>Najin and Fatu</strong> — the world's last two living northern white rhinos, both female. The northern white rhino subspecies is functionally extinct as a wild breeding population. Scientists are working on IVF programmes using frozen genetic material. You can visit Najin and Fatu in their dedicated enclosure. It is one of the most sobering wildlife encounters you will have — two animals representing the end of a lineage.</p>

<h2>Black Rhino</h2>
<p>Ol Pejeta has Kenya's largest population of <strong>black rhino</strong> — over 100 individuals in a fenced conservancy, well-protected against poaching. Black rhino sightings here are more reliable than almost anywhere else in Kenya. They are smaller and more aggressive than white rhino, browser rather than grazers, and seeing one in the bush is a genuinely thrilling encounter.</p>

<h2>Other Wildlife</h2>
<p>Despite the rhino fame, Ol Pejeta is also outstanding for:</p>
<ul>
<li><strong>Lion:</strong> A healthy pride system with regular sightings</li>
<li><strong>Cheetah:</strong> Open plains ideal for cheetah — Ol Pejeta has one of Kenya's better cheetah populations</li>
<li><strong>Elephant:</strong> Large herds, particularly around the Ewaso Nyiro River</li>
<li><strong>Chimpanzees:</strong> The Sweetwaters Chimpanzee Sanctuary — the only place in Kenya to see great apes. These are rescued chimps, not wild, but the encounter is extraordinary</li>
</ul>

<h2>How to Visit</h2>
<p>Ol Pejeta is 4 hours drive north of Nairobi (A2 highway toward Nanyuki). It is commonly combined with Mount Kenya or a Laikipia plains safari.</p>
<ul>
<li><strong>Day trip from Nairobi:</strong> Possible but long. Better as an overnight.</li>
<li><strong>Entry fees:</strong> $120 per adult per day (includes conservancy and rhino sanctuary)</li>
<li><strong>Best camps:</strong> Sweetwaters Serena Camp (on the conservancy), Ol Pejeta Bush Camp</li>
</ul>

<h2>Why Include It on Your Kenya Safari</h2>
<p>If rhino is on your Big Five list — and for most visitors, it is the hardest to see — Ol Pejeta resolves that problem with certainty. A one-night addition to a Masai Mara trip transforms a good safari into a complete Big Five experience. The chimp sanctuary adds something genuinely unique that no national park in Kenya can offer.</p>
<p>Our Mount Kenya + Ol Pejeta combination is available as a 2-day add-on to any Engai Safaris package.</p>
""",
    },
    {
        "slug": "lake-naivasha-guide",
        "title": "Lake Naivasha: Kenya's Most Underrated Safari Destination",
        "excerpt": "Two hours from Nairobi. Hippos from a boat. Hell's Gate cycling. A landscape so beautiful the Out of Africa film crew used it as a stand-in for the Mara. Here is what most visitors miss.",
        "cover_image": "/images/destinations/lake-naivasha.png",
        "category": "destinations",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 6,
        "tags": ["lake naivasha", "hell's gate", "day trip", "rift valley"],
        "is_published": True,
        "published_at": datetime(2026, 3, 4, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Lake Naivasha Guide 2026: Hippos, Hell's Gate & Day Trips",
        "meta_desc": "Lake Naivasha safari guide — hippo boat rides, cycling Hell's Gate with giraffes, best camps, day trip from Nairobi. Everything you need.",
        "content": """
<h2>Why Naivasha Is Underrated</h2>
<p>The Masai Mara gets the headlines. Lake Naivasha quietly delivers one of Kenya's most varied wildlife experiences two hours from Nairobi on a paved road. It is the only major wildlife destination in Kenya where you can cycle — through Hell's Gate National Park — alongside zebra, giraffe, and buffalo without a vehicle.</p>
<p>Naivasha is where many first-time visitors wish they had spent more time, and where returnees spend a night on every Kenya trip.</p>

<h2>The Lake</h2>
<p>Lake Naivasha is a freshwater lake sitting at 1,884m altitude in the Rift Valley — the highest of Kenya's Rift Valley lakes. It is about 145 km² and ringed by papyrus reeds, acacia woodland, and flower farms (Kenya's flower industry is massive here). The lake surface is covered with yellow-billed storks, African fish eagles, and lily-trotter (African jacana) pads.</p>
<p>The hippo population — over 1,000 individuals — is the lake's most famous feature. Boat rides to see hippos from the water are available at several lakeside lodges and last 45–90 minutes.</p>

<h2>Hell's Gate National Park</h2>
<p>Hell's Gate is the only Kenyan park where self-guided cycling and walking is permitted — no vehicle required. The gorge landscape (think Jurassic Park — it was an inspiration for the film) is dramatic: 25-metre red cliffs, geothermal steam vents, and wildlife walking freely beside you.</p>
<p>Typical wildlife seen: zebra, giraffe, buffalo, warthog, impala, and baboon. Predators are occasionally seen but attacks on cyclists are extremely rare — guides are recommended for the gorge section.</p>
<p>Bike hire costs KES 500–800 ($4–6) and the park entry is $25 per adult.</p>

<h2>How to Combine Naivasha</h2>
<ul>
<li><strong>Nairobi day trip:</strong> Leave Nairobi at 7am, boat ride + Hell's Gate cycling, back by 6pm. Excellent value.</li>
<li><strong>Naivasha + Nakuru 2-day:</strong> Overnight at Naivasha, morning boat ride, drive to Nakuru for flamingos and rhino, return Nairobi. Our most popular Rift Valley package.</li>
<li><strong>On the way to/from Mara:</strong> Naivasha falls naturally on the Nairobi–Mara route. Add a hippo boat ride morning, then continue to the Mara in the afternoon.</li>
</ul>

<h2>Where to Stay</h2>
<ul>
<li><strong>Elsamere Conservation Centre:</strong> Former home of Joy Adamson (Born Free). Colobus monkeys visit at tea time. Budget-mid range.</li>
<li><strong>Olerai House:</strong> Private house rental, directly on the lake, hippos in the garden at night. Mid-luxury.</li>
<li><strong>Sanctuary Farm:</strong> Private conservancy, walking safaris, excellent birding.</li>
</ul>
""",
    },
    {
        "slug": "lamu-island-kenya-guide",
        "title": "Lamu Island Kenya: The Old Town, Dhow Trips and Why It Stays With You",
        "excerpt": "No cars. Donkeys and boats. A Swahili old town that UNESCO protects. The most authentic coastal experience left in Kenya — and still largely undiscovered by mass tourism.",
        "cover_image": "/images/destinations/lamu.webp",
        "category": "destinations",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 7,
        "tags": ["lamu", "coast", "swahili", "island"],
        "is_published": True,
        "published_at": datetime(2026, 3, 7, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Lamu Island Kenya Guide 2026: Old Town, Beaches & Dhow Safaris",
        "meta_desc": "Lamu Island travel guide — UNESCO Old Town, dhow trips, Shela Beach, where to stay, how to get there. Kenya's most authentic island experience.",
        "content": """
<h2>What Makes Lamu Different</h2>
<p>Lamu Old Town is over 700 years old and is East Africa's oldest living Swahili settlement. It was declared a UNESCO World Heritage Site in 2001. There are no cars — the narrow coral stone lanes are too narrow. Transport is by foot, donkey, or wooden dhow. The town's architecture — carved wooden doors, inner courtyards, rooftop terraces — has barely changed in centuries.</p>
<p>This is not a resort beach destination. It is something rarer: an authentic place that happens to have beautiful beaches nearby.</p>

<h2>Getting There</h2>
<p>Lamu has its own airstrip on Manda Island (LAU), with flights from Nairobi Wilson Airport (1h15m, ~$120 one-way) via AirKenya and Safarilink. From the airstrip, a short boat ride takes you to Lamu or Shela village. No boats, no Lamu.</p>

<h2>Where to Stay</h2>
<h3>Lamu Old Town</h3>
<p>Boutique guesthouses in restored Swahili houses — Lamu House Hotel and Jannat House are consistently excellent. You sleep in a building that is 200 years old with a rooftop terrace overlooking the dhow harbour. Budget from $60/night to $200/night for the best suites.</p>

<h3>Shela Village</h3>
<p>A 20-minute walk (or 5-minute boat) from the old town. Quieter, beach-facing, and slightly more resort-like. Peponi Hotel is the classic choice — owned by the same family for 50 years, legendary sundowners on the terrace.</p>

<h2>What to Do</h2>
<ul>
<li><strong>Dhow sailing trip:</strong> Arrange through your hotel. A full-day dhow sailing to Manda Island or the Takwa ruins with a fresh seafood lunch is the defining Lamu experience.</li>
<li><strong>Lamu Museum:</strong> Small but genuinely excellent maritime and Swahili cultural museum in the Old Town.</li>
<li><strong>Shela Beach:</strong> A 10km stretch of deserted beach backed by sand dunes. You can walk for an hour and meet almost nobody.</li>
<li><strong>Donkey Sanctuary:</strong> Lamu's working donkeys are looked after by an NGO sanctuary. Worth a visit.</li>
<li><strong>Sunset from a rooftop:</strong> Every evening. Every time.</li>
</ul>

<h2>Practical Matters</h2>
<ul>
<li>Dress modestly in the old town — Lamu is a Muslim community. Shoulders and knees covered when not on the beach.</li>
<li>Cash only in most places — bring enough KES or USD.</li>
<li>No alcohol in the old town (Peponi Hotel and a few Shela spots have licences).</li>
<li>Mosquitoes in the evening — bring repellent.</li>
</ul>

<h2>How to Combine with a Safari</h2>
<p>Lamu + Safari works best as a 10-day itinerary: fly Nairobi → Lamu for 3 nights (decompress, explore), then fly Lamu → Nairobi → Mara for 4 nights of safari. Or reverse it. The contrast between the ancient Swahili coast and the open savannah is one of Kenya's great travel contrasts.</p>
""",
    },
    {
        "slug": "photography-safari-kenya-tips",
        "title": "Photography Safari Kenya: A Guide to Getting the Shot",
        "excerpt": "Golden hour on the Mara. A cheetah at full sprint. Elephants reflected in a Amboseli swamp at dawn. Kenya is a photographer's paradise — here is how to not come home disappointed.",
        "cover_image": "/images/safaris/photography-safari-mara.png",
        "category": "tips",
        "author": "James Ole Nkarai",
        "read_time_min": 9,
        "tags": ["photography", "camera", "tips", "wildlife photography"],
        "is_published": True,
        "published_at": datetime(2026, 3, 10, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Wildlife Photography Safari Guide 2026",
        "meta_desc": "Kenya wildlife photography tips — best parks, gear, timing, guide communication, and how to get images that do the experience justice.",
        "content": """
<h2>The Most Important Piece of Gear</h2>
<p>Your guide. Seriously. A guide who understands what you want photographically — and positions the vehicle correctly, cuts the engine at the right moment, reads animal behaviour — is worth more than any lens.</p>
<p>When booking, tell us you are a serious photographer. We match photography-focused clients with guides who have worked with photographers before, who understand light direction, and who know that waiting 20 minutes for an animal to turn its head is not wasted time.</p>

<h2>The Essential Gear List</h2>
<h3>Camera Body</h3>
<p>Any modern mirrorless or DSLR performs well. For wildlife: you want fast autofocus (eye/animal detection is now standard on Sony, Canon R-series, Nikon Z-series) and burst shooting capability. Low-light performance matters — morning and evening are the best shooting times and the light is dim.</p>

<h3>Lenses</h3>
<ul>
<li><strong>Primary:</strong> 100–500mm zoom or 400mm prime (with or without extender). This covers 90% of your shots.</li>
<li><strong>Secondary:</strong> 24–70mm f/2.8 for landscapes, wide camp shots, and intimate animal portrait moments when subjects are close.</li>
<li><strong>Leave at home:</strong> Ultra-wide (mostly useless for wildlife), heavy tripods (impractical in a vehicle)</li>
</ul>

<h3>Support</h3>
<p>A <strong>beanbag</strong> is the safari photographer's best friend. It drapes over the open vehicle window and provides a stable, vibration-dampening rest for long lenses. Bring your own — most camps have them but quality varies. A small ball-head on the beanbag gives you directional flexibility.</p>

<h2>Light: When to Shoot</h2>
<p>Golden hour is not a cliché — it is the difference between an ordinary image and something remarkable. The Mara's morning light (6–8am) and evening light (5–7pm) is soft, warm, and directional. The midday sun (10am–3pm) is harsh, flat, and creates images that look like snapshots.</p>
<p>Structure your game drives around light: early morning drive (depart 6am, back by noon), rest during midday, afternoon drive (3pm until dark). Most camps operate on this schedule automatically.</p>

<h2>Kenya's Best Photographic Scenarios</h2>
<ul>
<li><strong>Cheetah sprint:</strong> The Mara and Amboseli both have good cheetah populations. A sprint lasts 15–20 seconds and reaches 110km/h. Set your camera to burst and let it run.</li>
<li><strong>River crossing:</strong> The most dramatic wildlife photography scenario in Africa. Shoot wide first (to capture the scale), then switch to tele for individual animal expressions.</li>
<li><strong>Elephant at dawn, Amboseli:</strong> The classic — elephants walking with Kilimanjaro behind. This shot requires clear skies (Kilimanjaro is often clouded by 9am) and an early start.</li>
<li><strong>Lion on a termite mound:</strong> Lions survey territory from elevated positions. A lion silhouetted against an orange horizon is one of Kenya's signature images.</li>
<li><strong>Flamingos, Lake Nakuru:</strong> At peak, over a million flamingos create a pink horizon. Shoot from elevated viewpoints on the lake's eastern shore.</li>
</ul>

<h2>Talking to Your Guide</h2>
<p>Tell your guide the day before what you are hoping to photograph. "I really want a cheetah hunting, ideally in morning light." "I want to be at the river by 7am and stay until we see a crossing attempt." Guides who know your priorities can position around them. Guides who don't know will follow a standard itinerary.</p>
<p>Also: learn the word "mbele" (ahead) and "kushoto/kulia" (left/right) in Swahili. Communication during a fast-moving animal encounter is faster in a shared language.</p>
""",
    },
    {
        "slug": "kenya-budget-safari-guide",
        "title": "Kenya Budget Safari: How to See the Mara for Less",
        "excerpt": "A Kenya safari does not have to cost $500 per night. Here is how real travellers do it on a budget — without camping in a field or missing the wildlife.",
        "cover_image": "/images/safaris/3-day-masai-mara.png",
        "category": "tips",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 8,
        "tags": ["budget", "cost", "affordable", "planning"],
        "is_published": True,
        "published_at": datetime(2026, 3, 13, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Budget Safari Guide 2026: See the Mara for Less",
        "meta_desc": "How to do a Kenya safari on a budget. Affordable accommodation, park combinations, group savings, and real prices — no $500/night luxury required.",
        "content": """
<h2>What "Budget Safari" Actually Means</h2>
<p>A budget Kenya safari is not roughing it in a leaking tent while eating beans from a tin. It means making smart choices about accommodation, timing, and group size to see the same wildlife at a fraction of the cost.</p>
<p>The wildlife — the lions, cheetah, elephants, river crossings — does not change based on how much you paid for your tent. The animals do not perform better for guests staying in a $800/night lodge.</p>

<h2>The Four Budget Levers</h2>

<h3>1. Group Size</h3>
<p>Safari vehicle costs are fixed regardless of occupancy. A vehicle that costs $200/day divided by 2 people = $100/person/day. Divided by 4 people = $50/person/day. <strong>Travel in a group of 4 and you cut vehicle costs in half immediately.</strong></p>
<p>If you are travelling as a couple, ask us about joining a small shared group vehicle — you pay your share of the vehicle and get the same guide and game drive experience.</p>

<h3>2. Timing</h3>
<p>Green season (April–June) accommodation costs 25–35% less. The parks are quieter. The landscape is more dramatic — vivid green after the rains. For budget travellers, June is the sweet spot: rains have eased, prices are still low, and the migration is beginning to move toward Kenya.</p>

<h3>3. Accommodation Level</h3>
<p>Kenya's accommodation ranges from basic camping ($30–$50/person/night) to mid-range tented camps with en-suite facilities ($120–$250/person/night including meals) to luxury lodges ($400–$800+). The wildlife sightings are identical. The comfort differs.</p>
<p>Our 3-Day Masai Mara package starts at $495/person (group of 2) using mid-range accommodation. For budget camping, we can build a bespoke package from $320/person.</p>

<h3>4. Park Selection</h3>
<p>Some parks are significantly cheaper than others:</p>
<ul>
<li><strong>Nairobi National Park:</strong> $60 entry vs $80–100 for Masai Mara. 30 minutes from CBD. Excellent wildlife.</li>
<li><strong>Hell's Gate:</strong> $25 entry, cycling allowed. Dramatic landscapes, good wildlife.</li>
<li><strong>Naivasha:</strong> $20 entry plus boat hire. Hippos, excellent birding, beautiful lake.</li>
</ul>
<p>A Nairobi + Naivasha + Nakuru 3-day combination costs less than one night in a Mara luxury camp and sees far more variety.</p>

<h2>What Budget Travellers Often Overspend On</h2>
<ul>
<li><strong>Safari brokers:</strong> International safari booking companies add 25–40% commission. Book directly with a Kenya-based operator and pay Kenyan prices.</li>
<li><strong>Single occupancy:</strong> Solo travellers pay vehicle surcharges. Share a vehicle or travel in a pair.</li>
<li><strong>Peak season:</strong> The river crossings are spectacular, but July–September commands a 35% premium. June is 90% of the experience at 80% of the cost.</li>
</ul>

<h2>Instalment Option</h2>
<p>Engai's <strong>Lipa Polepole</strong> option allows you to pay for your safari in 4 monthly M-Pesa instalments. A 3-Day Masai Mara package becomes KES 43,750 per month for 4 months rather than a single lump sum — making Kenya's best safari genuinely accessible.</p>
""",
    },
    {
        "slug": "hells-gate-cycling-guide",
        "title": "Cycling Hell's Gate National Park: The Complete Guide",
        "excerpt": "The only Kenyan park where you pedal past giraffe and buffalo without a vehicle. The gorge that inspired The Lion King. Two hours from Nairobi. Here is everything you need to know.",
        "cover_image": "/images/destinations/hells-gate.png",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 6,
        "tags": ["hell's gate", "cycling", "naivasha", "day trip"],
        "is_published": True,
        "published_at": datetime(2026, 3, 16, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Cycling Hell's Gate Kenya 2026: Complete Guide",
        "meta_desc": "Everything about cycling Hell's Gate National Park — routes, bike hire, gorge walk, wildlife, entry fees, and how to get there from Nairobi.",
        "content": """
<h2>Why Hell's Gate Is Unique</h2>
<p>Kenya has 60+ national parks and reserves. Hell's Gate is the only one that lets you explore on foot and bicycle without a guide vehicle. You pedal past zebra grazing 10 metres away. You cycle between giraffe that barely notice you. You walk into a gorge with walls carved by ancient geothermal activity while steam vents hiss beside the path.</p>
<p>The Lion King's animators visited Hell's Gate in the 1990s as inspiration for Pride Rock. You can decide for yourself how accurate they were.</p>

<h2>Getting There</h2>
<p>Hell's Gate is 90km from Nairobi (about 1h45m drive), adjacent to Lake Naivasha. Most visitors combine a morning at Hell's Gate with an afternoon hippo boat ride on Naivasha. Our Naivasha Day Trip includes both.</p>

<h2>Park Entry and Bike Hire</h2>
<ul>
<li><strong>Entry fee:</strong> $25 per adult (non-resident)</li>
<li><strong>Bike hire:</strong> Available at the main gate and from several operators in Naivasha town — KES 500–800 ($4–6) for a half-day</li>
<li><strong>Gorge walk guide:</strong> Required for the gorge section — KES 1,500 ($12) for a local guide. Worth it for safety and interpretation.</li>
</ul>

<h2>The Main Cycling Loop</h2>
<p>The main circuit is approximately 22km of mostly flat dirt roads through the park. Allow 3–4 hours including stops. The route passes:</p>
<ul>
<li><strong>Ol Njorowa Gorge:</strong> The park's most dramatic feature — a narrow canyon with smooth rock walls 25m high. The gorge walk takes 1–2 hours.</li>
<li><strong>Fischer's Tower:</strong> A 25m volcanic column named after the German explorer.</li>
<li><strong>Geothermal power plant:</strong> The KenGen geothermal plant visible from the road — the steam rising from the earth is visible for kilometres.</li>
</ul>

<h2>Wildlife to Expect</h2>
<p>Hell's Gate is enclosed but not fenced for predators — there are no lions or leopards within the cycling zone. This is why cycling is permitted. Expect: zebra, giraffe, Thomson's gazelle, impala, warthog, baboon, hyrax (at Fischer's Tower), and excellent raptor populations (lammergeier, augur buzzard, Verreaux's eagle).</p>

<h2>Practical Tips</h2>
<ul>
<li>Start early — by 10am the track is busy and the heat builds</li>
<li>Bring at least 2 litres of water per person (no water in the park)</li>
<li>Closed-toe shoes are essential for the gorge (no sandals — the rocks are slippery)</li>
<li>The gorge closes at 4pm — begin the gorge walk by 2pm at the latest</li>
<li>Check the bike's brakes before paying — quality varies</li>
</ul>
""",
    },
    {
        "slug": "kenya-e-visa-guide",
        "title": "Kenya e-Visa Guide 2026: How to Apply, What It Costs, and Common Mistakes",
        "excerpt": "Kenya moved to a digital e-Visa system. The process takes 15 minutes online. But a wrong document or a wrong entry type has stranded visitors at the airport. Here is exactly how to do it correctly.",
        "cover_image": "/images/destinations/nairobi.jpg",
        "category": "tips",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 6,
        "tags": ["visa", "planning", "travel", "entry requirements"],
        "is_published": True,
        "published_at": datetime(2026, 3, 18, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya e-Visa Guide 2026: Apply Online, Costs & Requirements",
        "meta_desc": "How to get a Kenya e-Visa in 2026. Step-by-step application guide, fees ($51), processing time, required documents, and common mistakes to avoid.",
        "content": """
<h2>Who Needs a Kenya e-Visa?</h2>
<p>Most non-African nationalities require a visa to enter Kenya. Since 2023, Kenya operates an online e-Visa system — you apply before travel and receive a digital approval to show at immigration. There are no sticker visas issued at embassies or on arrival for most nationalities.</p>
<p><strong>Citizens of East African Community countries</strong> (Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC) enter without a visa. Citizens of most other African nations, plus some Commonwealth countries, may have simplified access — check the KRA website for your specific passport.</p>

<h2>How to Apply</h2>
<ol>
<li>Go to <strong>evisa.go.ke</strong> — the official Kenya Immigration Service portal. Beware of copycat sites that charge higher fees.</li>
<li>Create an account with your email address.</li>
<li>Select visa type: <strong>Single Entry ($51)</strong>, <strong>East Africa Tourist Visa ($100)</strong> (covers Kenya, Uganda, Rwanda — recommended for multi-country trips), or <strong>Transit ($21)</strong>.</li>
<li>Upload documents (see below).</li>
<li>Pay the fee online (Visa, Mastercard, or M-Pesa).</li>
<li>Receive approval by email — typically within 1–3 business days.</li>
</ol>

<h2>Required Documents</h2>
<ul>
<li>Passport scan (valid for at least 6 months beyond your return date)</li>
<li>Passport-size photograph (digital, white background, recent)</li>
<li>Return or onward flight booking confirmation</li>
<li>Accommodation confirmation (hotel booking or letter from host)</li>
<li>Yellow fever vaccination certificate (required if arriving from a yellow fever endemic country — check WHO list)</li>
<li>Bank statement or proof of funds (not always asked, but have it ready)</li>
</ul>

<h2>Common Mistakes That Delay or Deny Applications</h2>
<ul>
<li><strong>Wrong photo:</strong> Must be recent, white background, face clearly visible. Selfies are routinely rejected.</li>
<li><strong>Expired passport:</strong> Must have 6+ months validity beyond your travel dates. Not 3 months — 6.</li>
<li><strong>No return flight:</strong> The system expects proof you plan to leave. A one-way ticket without onward booking is a common reason for delays.</li>
<li><strong>Copycat websites:</strong> Multiple fraudulent sites charge $100+ for a service that costs $51. Always use evisa.go.ke.</li>
<li><strong>Wrong visa type:</strong> If visiting Uganda and Rwanda on the same trip, the East Africa Tourist Visa ($100) is far cheaper than three separate visas.</li>
</ul>

<h2>Processing Time</h2>
<p>Standard processing: 1–3 business days. In practice, most applications are approved within 24 hours during weekdays. Apply at least 5 business days before departure to avoid stress. Do not apply more than 3 months in advance — approvals are date-specific.</p>

<h2>At the Airport</h2>
<p>Print your e-Visa approval or have it accessible on your phone. Immigration at JKIA is generally efficient. Arrivals with valid e-Visas typically clear immigration in 20–40 minutes. Health declaration cards are completed digitally before arrival at jkia.go.ke.</p>
""",
    },
    {
        "slug": "lake-nakuru-flamingos-guide",
        "title": "Lake Nakuru: Pink Flamingos, Rhinos and Why This Park Surprises Everyone",
        "excerpt": "A million flamingos making the lake look pink from the air. Kenya's highest rhino density in a fenced sanctuary. And lions, leopards, and Rothschild's giraffe thrown in for good measure.",
        "cover_image": "/images/destinations/lake-nakuru.jpg",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 6,
        "tags": ["lake nakuru", "flamingos", "rhino", "rift valley"],
        "is_published": True,
        "published_at": datetime(2026, 3, 20, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Lake Nakuru Guide 2026: Flamingos, Rhinos & What to Expect",
        "meta_desc": "Lake Nakuru National Park guide — flamingos, rhino sanctuary, lion, leopard, giraffe. Entry fees, best time to visit, and day trip from Nairobi.",
        "content": """
<h2>The Flamingo Lake</h2>
<p>Lake Nakuru is an alkaline soda lake — high pH, no fish, ideal conditions for blue-green algae that flamingos feed on. At peak, over a million lesser flamingos turn the lake's edges pink. Viewed from Baboon Cliff on the lake's western shore, the sight is one of Africa's most photographed.</p>
<p>One caveat: flamingo numbers fluctuate with lake levels, which fluctuate with rainfall. In drought years, numbers drop significantly. In good years, you need a wide-angle lens to fit them all in frame.</p>

<h2>The Rhino Sanctuary</h2>
<p>Lake Nakuru National Park is Kenya's original rhino sanctuary — a 188km fence encircles the entire park, making it predator-proof for rhino movement. Both black and white rhino are present. The white rhino population — over 60 individuals — is the most accessible in Kenya. You will almost certainly see rhino at Nakuru, often at close range.</p>

<h2>The Rest of the Wildlife</h2>
<p>Nakuru surprises most first-time visitors. Beyond flamingos and rhino, the park holds:</p>
<ul>
<li><strong>Lion:</strong> A strong pride system, often visible near the lake's southern shore</li>
<li><strong>Leopard:</strong> The Euphorbia forest on the western ridge has a reliable leopard population — one of Kenya's better spots for daylight sightings</li>
<li><strong>Rothschild's Giraffe:</strong> One of the rarest giraffe subspecies, introduced to Nakuru — 80–100 individuals, easily spotted</li>
<li><strong>Buffalo:</strong> Herds of 200–400 common in the open grassland</li>
<li><strong>Waterbuck:</strong> In extraordinary numbers — the lakeside grass is prime waterbuck habitat</li>
</ul>

<h2>Park Logistics</h2>
<ul>
<li><strong>Entry fee:</strong> $60 per adult per day (non-resident)</li>
<li><strong>From Nairobi:</strong> 2.5 hours drive on the B3 highway through Naivasha</li>
<li><strong>Day trip or overnight?</strong> Day trip works but is long. One overnight at Sarova Lion Hill Lodge (inside the park) gives you evening and morning drives when wildlife is most active.</li>
</ul>

<h2>Best Combination</h2>
<p>Nakuru pairs naturally with Lake Naivasha (1 hour away) and the Masai Mara (3 hours). Our most popular Rift Valley circuit:</p>
<ol>
<li>Nairobi → Naivasha (hippo boat, Hell's Gate) — 1 night</li>
<li>Naivasha → Nakuru (flamingos, rhino) — 1 night</li>
<li>Nakuru → Masai Mara (3 nights game drives)</li>
<li>Fly Mara → Nairobi</li>
</ol>
<p>This itinerary (6 nights) is the most comprehensive Kenya wildlife circuit available at a mid-range price point.</p>
""",
    },
    {
        "slug": "mount-kenya-trekking-guide",
        "title": "Mount Kenya Trekking: Routes, Difficulty and What to Expect",
        "excerpt": "Africa's second-highest mountain. Three main routes. A summit that requires no technical climbing. And the most underrated alpine wildlife experience on the continent.",
        "cover_image": "/images/safaris/mount-kenya-trekking.jpg",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 9,
        "tags": ["mount kenya", "trekking", "hiking", "adventure"],
        "is_published": True,
        "published_at": datetime(2026, 3, 22, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Mount Kenya Trekking Guide 2026: Routes, Tips & Costs",
        "meta_desc": "Complete guide to trekking Mount Kenya — Sirimon, Naro Moru, and Chogoria routes, difficulty, acclimatisation, what to pack, and costs.",
        "content": """
<h2>What Is Mount Kenya?</h2>
<p>Mount Kenya is Africa's second-highest mountain (5,199m at Batian, the highest technical peak) and the only mountain on the continent that sits exactly on the equator. It is an extinct volcanic plug with multiple rocky summits, glaciers, Afro-alpine moorland, and forests that shelter elephant, buffalo, and leopard.</p>
<p>Point Lenana (4,985m) is the highest point accessible to non-technical trekkers — no ropes or technical skills required. Most trekkers summit Lenana on a 4–5 day circuit and describe it as one of the most rewarding hikes they have ever done.</p>

<h2>The Three Main Routes</h2>

<h3>Naro Moru (West — Most Popular)</h3>
<p><strong>Duration:</strong> 4 days minimum<br>
<strong>Character:</strong> Steep, direct, physically demanding. The infamous "Vertical Bog" section is genuinely muddy and tiring. Fast ascent increases altitude sickness risk.<br>
<strong>Best for:</strong> Physically fit hikers comfortable with a challenging pace<br>
<strong>Summit success rate:</strong> High for fit trekkers with guide support</p>

<h3>Sirimon (North — Most Scenic)</h3>
<p><strong>Duration:</strong> 5–6 days<br>
<strong>Character:</strong> Gradual ascent, beautiful moorland, excellent for acclimatisation. The best route for wildlife — elephant and buffalo often seen in the lower forest zone.<br>
<strong>Best for:</strong> First-time high-altitude trekkers, those prioritising scenery over speed<br>
<strong>Summit success rate:</strong> Highest of the three routes due to gradual acclimatisation</p>

<h3>Chogoria (East — Most Beautiful)</h3>
<p><strong>Duration:</strong> 5–7 days<br>
<strong>Character:</strong> The most spectacular scenery, including Lake Michaelson (one of the most beautiful alpine lakes in Africa) and the dramatic Gorges Valley. Longer approach through bamboo forest.<br>
<strong>Best for:</strong> Experienced trekkers who want the full alpine experience<br>
<strong>Summit success rate:</strong> Good with proper acclimatisation days</p>

<h2>Altitude Sickness: The Main Risk</h2>
<p>Acute Mountain Sickness (AMS) is the primary reason treks fail. Symptoms begin at 2,500m and worsen above 4,000m: headache, nausea, dizziness, poor sleep. The rule is simple: ascend slowly, hydrate aggressively, descend if symptoms worsen.</p>
<ul>
<li>Never ascend more than 300–400m per day above 3,000m</li>
<li>Diamox (acetazolamide) is available in Nairobi pharmacies and reduces AMS risk — consult your doctor</li>
<li>If symptoms worsen with rest, descend immediately. No summit is worth a hospital visit.</li>
</ul>

<h2>What You Need</h2>
<ul>
<li>Warm gear (summit temperatures drop to -10°C at night)</li>
<li>Waterproofs (the mountain creates its own weather)</li>
<li>Trekking poles (essential for the rocky summit terrain)</li>
<li>Headlamp (summit attempts leave at 2–3am)</li>
<li>Snacks and 3+ litres of water capacity</li>
</ul>

<h2>Costs</h2>
<ul>
<li><strong>Park entry:</strong> $70/day (non-resident)</li>
<li><strong>Guide (required):</strong> $25–40/day</li>
<li><strong>Porter (recommended):</strong> $15–25/day</li>
<li><strong>Hut fees:</strong> $20–30/night</li>
<li><strong>All-inclusive 5-day package from Nairobi:</strong> $650–$900 per person</li>
</ul>
""",
    },
    {
        "slug": "samburu-vs-masai-mara",
        "title": "Samburu vs Masai Mara: Two Kenya Safaris, Two Completely Different Worlds",
        "excerpt": "The Mara has wildebeest and world-class predators. Samburu has the Samburu Five — animals found nowhere else in Kenya — and one of the most dramatic river systems on earth. Here is how to choose.",
        "cover_image": "/images/destinations/samburu.jpg",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 7,
        "tags": ["samburu", "masai mara", "comparison", "northern kenya"],
        "is_published": True,
        "published_at": datetime(2026, 3, 24, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Samburu vs Masai Mara Kenya: Which Safari Should You Choose?",
        "meta_desc": "Samburu National Reserve vs Masai Mara — a direct comparison of Kenya's two most iconic safari destinations. Wildlife, costs, best time to visit.",
        "content": """
<h2>The Fundamental Difference</h2>
<p>The Masai Mara is Kenya's most famous park — open grassland, horizon-to-horizon wildlife, the Great Migration. It is deservedly celebrated.</p>
<p>Samburu is different in almost every way: semi-arid thornbush country in Kenya's north, defined by the Ewaso Nyiro River, and home to species you simply cannot see anywhere else in Kenya. If the Mara is Kenya's greatest show, Samburu is Kenya's most interesting secret.</p>

<h2>The Samburu Five</h2>
<p>Samburu's defining wildlife are five species restricted to northern Kenya's arid zones:</p>
<ul>
<li><strong>Reticulated Giraffe:</strong> More boldly patterned than the Mara's Maasai Giraffe — the most strikingly beautiful of all giraffe subspecies</li>
<li><strong>Grevy's Zebra:</strong> Larger than the common plains zebra, with narrower stripes — critically endangered</li>
<li><strong>Beisa Oryx:</strong> Striking black-and-white face markings, long straight horns — a desert antelope built for dry heat</li>
<li><strong>Gerenuk:</strong> The "giraffe-necked antelope" — stands on its hind legs to browse from tall bushes</li>
<li><strong>Somali Ostrich:</strong> Blue-necked male (vs red-necked in the south) — distinctive and easily spotted</li>
</ul>
<p>None of these five species occur in the Masai Mara. If you have already done a Mara safari, Samburu gives you an entirely new wildlife list.</p>

<h2>The Predators</h2>
<p>Samburu's predators are abundant and easily seen: lion prides along the Ewaso River, leopard at higher densities than almost anywhere in Kenya (the riverine habitat suits them perfectly), wild dog (rare but present — Samburu has some of Kenya's best wild dog sightings), and cheetah in the open areas north of the reserve.</p>

<h2>The River</h2>
<p>The Ewaso Nyiro River is Samburu's spine. At the water's edge, crocodile and hippo share the banks with elephant herds that come to drink at dawn and dusk. The contrast between the lush riverside and the dry thornbush behind it creates the defining visual of northern Kenya.</p>

<h2>Practical Comparison</h2>
<table>
<tr><th></th><th>Masai Mara</th><th>Samburu</th></tr>
<tr><td>From Nairobi</td><td>5–7hr drive / 45min flight</td><td>6hr drive / 50min flight</td></tr>
<tr><td>Best time</td><td>Jul–Oct (migration), Jan–Feb</td><td>Jan–Feb, Jun–Sep (dry)</td></tr>
<tr><td>Entry fee</td><td>$80–100/day</td><td>$60/day</td></tr>
<tr><td>Tourists</td><td>High Jul–Oct</td><td>Low year-round</td></tr>
<tr><td>Unique wildlife</td><td>Wildebeest, migration</td><td>Samburu Five, wild dog</td></tr>
</table>

<h2>Our Recommendation</h2>
<p><strong>First Kenya safari:</strong> Masai Mara. There is a reason it is famous.</p>
<p><strong>Second Kenya safari or more days:</strong> Combine Mara and Samburu — 3 nights each gives you the full spectrum of Kenya wildlife. Our 6-night Mara + Samburu combination is our most comprehensive package.</p>
<p><strong>Returning visitor, done the Mara already:</strong> Samburu only. Different landscape, different animals, significantly fewer tourists.</p>
""",
    },
    {
        "slug": "nairobi-best-restaurants-guide",
        "title": "Nairobi Restaurants: Where Safari Guides Actually Eat (and Where You Should Too)",
        "excerpt": "Nairobi has one of the best restaurant scenes in sub-Saharan Africa. Before or after your safari, here are the places worth your evening — from nyama choma to rooftop cocktails.",
        "cover_image": "/images/destinations/nairobi.jpg",
        "category": "destinations",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 6,
        "tags": ["nairobi", "food", "restaurants", "travel tips"],
        "is_published": True,
        "published_at": datetime(2026, 3, 26, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Nairobi Restaurants 2026: Best Places to Eat Before & After Safari",
        "meta_desc": "Best restaurants in Nairobi before or after a Kenya safari. Local spots, rooftops, nyama choma, Indian Ocean seafood — where guides and travellers eat.",
        "content": """
<h2>Nairobi's Food Scene</h2>
<p>Most safari visitors give Nairobi 24 hours at the start and end of their trip — treating it as a transit point. This is a mistake. Nairobi has one of the most sophisticated restaurant scenes in Africa, driven by a young, internationally educated local population and a diverse culinary heritage (Swahili, South Asian, Ethiopian, European, modern African).</p>

<h2>Essential Nairobi Experiences</h2>

<h3>Nyama Choma — Roasted Meat</h3>
<p>Kenya's national food institution. Goat or beef, slow-roasted over charcoal, eaten with ugali (maize cake) and kachumbari (fresh tomato and onion salsa). <strong>Carnivore Restaurant</strong> (Lang'ata area) is the famous version — a tourist experience worth doing once. For where locals actually eat: <strong>Nyama Mama</strong> in Westlands does elevated Kenyan comfort food in a setting that doesn't feel like a themed restaurant.</p>

<h3>Kenyan Breakfast</h3>
<p>Mandazi (fried dough) and chai (milky, spiced tea) is the fuel of every safari guide. <strong>Java House</strong> (multiple locations) is a local chain that has been serving good espresso and breakfast since before Nairobi had a Starbucks. The Westlands branch is excellent.</p>

<h3>Indian Ocean Seafood</h3>
<p>Kenya's Swahili coast cuisine — coconut curries, grilled tilapia, crab pilau — is exceptional. In Nairobi, <strong>Habesha</strong> (Ethiopian, not seafood, but worth noting) and <strong>Tamarind Restaurant</strong> (Haile Selassie Avenue) have been doing Indian Ocean cuisine for 40+ years. Tamarind's prawn dishes are the standard by which all other Nairobi seafood is measured.</p>

<h3>Modern Nairobi</h3>
<p><strong>About Thyme</strong> (Karen suburb) is the long-standing gold standard for a special meal. <strong>The Talisman</strong> (Karen) is beloved for its garden setting and reliable quality. For rooftop cocktails before departure: <strong>MÖVENPICK Hotel Nairobi</strong> has views across the city skyline.</p>

<h2>Nairobi Neighbourhoods Worth Knowing</h2>
<ul>
<li><strong>Westlands:</strong> Most international restaurants, liveliest bar scene, good coffee shops for remote workers</li>
<li><strong>Karen:</strong> Quiet, garden suburbs, best for a relaxed lunch before or after a safari</li>
<li><strong>Kilimani:</strong> Mid-range restaurants, good local spots, less tourist-oriented</li>
<li><strong>CBD:</strong> The Kenyatta Avenue area for local food — eateries serving workers' lunches, cheaper and more authentic</li>
</ul>

<h2>Practical Notes</h2>
<ul>
<li>Tipping: 10% is standard at sit-down restaurants. Not expected at casual cafes.</li>
<li>M-Pesa accepted almost everywhere — also Visa/Mastercard at most Westlands and Karen spots</li>
<li>Traffic: Book dinner reservations in Karen or Westlands for after 7pm — rush hour makes pre-7pm travel impractical</li>
<li>Safety: Stick to restaurant areas and use taxis/Uber after dark. Nairobi is a normal city with normal urban cautions.</li>
</ul>
""",
    },
    {
        "slug": "maasai-culture-kenya-guide",
        "title": "Maasai Culture: What to Know Before Your Cultural Safari Visit",
        "excerpt": "The Maasai are Kenya's most recognisable people — red shukas, ochre-stained hair, elaborate beadwork. Here is how to visit a Maasai community with genuine respect and curiosity, not as a spectacle.",
        "cover_image": "/images/safaris/maasai-cultural-immersion.png",
        "category": "cultural",
        "author": "James Ole Nkarai",
        "read_time_min": 8,
        "tags": ["maasai", "culture", "community", "responsible tourism"],
        "is_published": True,
        "published_at": datetime(2026, 3, 28, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Maasai Culture Kenya: A Respectful Visitor's Guide 2026",
        "meta_desc": "How to visit a Maasai community in Kenya respectfully. Culture, customs, what to expect, responsible tourism, and the Maasai connection to the Mara.",
        "content": """
<h2>Who Are the Maasai?</h2>
<p>The Maasai are a semi-nomadic pastoralist people who inhabit southern Kenya and northern Tanzania. They are Kenya's most widely known ethnic group internationally, partly because their territory overlaps with East Africa's most famous wildlife areas — the Maasai Mara is named for them.</p>
<p>The Mara ecosystem's wildlife exists partly because the Maasai's pastoral way of life created the open grassland that wildebeest and lion depend on. This is not a coincidence or a fortunate accident. It is a land management outcome 1,000 years in the making.</p>

<h2>Key Cultural Concepts</h2>
<h3>Cattle as Wealth</h3>
<p>Maasai wealth is measured in cattle, not cash. A man's social standing — including his eligibility for marriage — is tied directly to his herd size. This is not a metaphor. When you see Maasai men walking with cattle through the Mara buffer zones at dawn, they are doing what their great-great-grandparents did, in the same landscape, with the same animals.</p>

<h3>Age Sets (Ilkiama)</h3>
<p>Maasai society is organised by age sets — cohorts of men initiated together who move through life stages as a group. The moran (warrior) age set — young men of roughly 15–30 years — are the most visibly striking: red shukas, long hair braided with ochre, and a confident bearing that comes from knowing exactly who you are and where you fit.</p>

<h3>Beadwork</h3>
<p>Maasai beadwork is one of East Africa's great art forms. Colours are not arbitrary — red represents bravery and blood, white represents purity and cattle's milk, blue represents water and the sky. Each community and family has its own patterns. A woman's beaded necklaces record her marital and social status.</p>

<h2>How to Visit a Maasai Community Respectfully</h2>
<h3>Go with an Introduction, Not as a Drop-In</h3>
<p>The most meaningful community visits are arranged through your safari guide or through a community-owned enterprise. These visits involve genuine interaction — not performance — and the fees go directly to the community, not to a middleman.</p>
<p>Our <strong>Maasai Cultural Immersion</strong> day involves meeting with village elders, a guided walk, a cooking demonstration, and a discussion of land rights and wildlife conservation with community members who manage the conservancy you drove through that morning.</p>

<h3>Ask Before Photographing</h3>
<p>This should be universal but bears repeating. Always ask before pointing a camera at anyone. Most Maasai will say yes. Many will ask for a small payment — this is normal and reasonable. Pay it without negotiating it down.</p>

<h3>Engage Genuinely</h3>
<p>Ask about land. Ask about cattle prices and how drought affects livelihoods. Ask what Maasai youth are choosing to study. These conversations are more interesting than watching a staged jumping dance, and you will leave understanding something real about Kenya.</p>

<h2>The Maasai and Wildlife Conservation</h2>
<p>The community conservancies surrounding the Masai Mara — Naboisho, Olare Motorogi, Ol Kinyei — are managed by Maasai landowners who have converted cattle land to wildlife habitat and receive lease fees from safari camps. This model — paying communities directly for the land wildlife lives on — is the most successful conservation model in East Africa.</p>
<p>When you stay in a conservancy camp, your fees fund land leases to Maasai families. This is conservation that works because it makes economic sense for the people who own the land.</p>
""",
    },
]


async def main():
    async with SessionLocal() as db:
        created = 0
        skipped = 0
        for p in POSTS:
            existing = await db.execute(select(BlogPost).where(BlogPost.slug == p["slug"]))
            if existing.scalar_one_or_none():
                print(f"  skip  {p['slug']}")
                skipped += 1
                continue
            db.add(BlogPost(**p))
            print(f"  +     {p['slug']}")
            created += 1
        await db.commit()
        print(f"\nDone: {created} created, {skipped} already existed. Total posts now: {created + skipped} new + previous.")


if __name__ == "__main__":
    asyncio.run(main())
