"""
Run: python scripts/seed_blog.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from datetime import datetime, timezone
from app.database import SessionLocal
from app.models.blog import BlogPost
from app.models.destination import Destination  # register FK table in metadata
from sqlalchemy import select

POSTS = [
    {
        "slug": "great-migration-explained",
        "title": "The Great Migration Explained: When, Where and How to See It",
        "excerpt": "Two million wildebeest. One river. The greatest wildlife show on Earth. Here is exactly when to go, where to stand, and what nobody tells you about Kenya's most spectacular event.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "wildlife",
        "author": "James Ole Nkarai",
        "read_time_min": 8,
        "tags": ["migration", "masai mara", "wildebeest", "big five"],
        "is_published": True,
        "published_at": datetime(2026, 1, 15, 8, 0, tzinfo=timezone.utc),
        "meta_title": "The Great Migration: Complete Guide (2026)",
        "meta_desc": "When to see the Great Migration river crossings in Kenya. Exact months, locations, and what nobody tells you.",
        "content": """
<h2>What Is the Great Migration?</h2>
<p>Every year, approximately 1.5 million wildebeest, 200,000 zebra, and 350,000 gazelle travel in a continuous loop between Tanzania's Serengeti and Kenya's Masai Mara. They follow the rains and the grass. They have been doing this for millions of years. They will not stop for you — which is part of what makes witnessing it so humbling.</p>
<p>The migration is not an event. It is a cycle. The animals move constantly throughout the year. But there are specific windows when what you see is genuinely extraordinary — and specific windows when the spectacle is quieter.</p>

<h2>The Calendar You Actually Need</h2>
<h3>July — October: The River Crossings (Kenya)</h3>
<p>This is what everyone comes for. The wildebeest reach the Mara River, which separates Tanzania from Kenya, and must cross. The crocodiles know they are coming. They have been waiting.</p>
<p>A crossing is not guaranteed on any given day. The wildebeest gather on the bank in their hundreds of thousands, hesitate, scatter, regroup, and eventually one animal goes in and the stampede follows. It can take four hours of waiting. It can happen in the first twenty minutes. This is wildlife, not theatre.</p>
<blockquote><strong>Best single month:</strong> August and early September, when numbers at the river are highest and crossings happen most frequently.</blockquote>
<h3>November — December: Calving Season (Tanzania)</h3>
<p>The herd moves south. If you want to see 8,000 calves born in a single day, this is when to go to the Serengeti's southern plains. It is extraordinary, but it is a different kind of extraordinary.</p>
<h3>January — March: Southern Serengeti (Tanzania)</h3>
<p>The herds remain in Tanzania. Kenya's Mara is quiet. This is excellent value for a Kenya safari — fewer tourists, lower prices — but the migration spectacle is not here.</p>
<h3>April — May: Long Rains</h3>
<p>The herds are dispersed across both countries. Parks are muddy. This is Kenya's off-season. We are honest with you about this: the river crossings do not happen in April or May.</p>

<h2>Where to Be in Kenya</h2>
<p>The Mara River crossings happen at specific points — most famously at <strong>Musiara Marsh</strong> and the <strong>Serena crossing point</strong>. Your guide will know where the herds were the previous day and position accordingly. This is not a bus tour with a fixed viewpoint. It is a dynamic, reactive experience.</p>
<p>The best camps for migration season are north of the Mara — the Mara Triangle — because this is where the wildebeest enter Kenya first and the densities are highest.</p>

<h2>What Nobody Tells You</h2>
<ul>
<li><strong>The smell arrives first.</strong> When a million wildebeest are 3 kilometres away, you smell them before you see them. It is the smell of Africa at full volume.</li>
<li><strong>Patience is the game.</strong> Some guests wait three hours at the river and see nothing. They come back the next morning and see 40,000 cross in 25 minutes. Stay an extra day.</li>
<li><strong>Peak season means peak prices.</strong> July–October costs 35% more than the rest of the year. It is worth every shilling. But budget accordingly.</li>
<li><strong>The wildebeest have a death wish.</strong> They cross at the same points every year, where the crocodiles wait. They know the crocodiles are there. They go anyway. Nobody knows why.</li>
</ul>

<h2>How to Book</h2>
<p>A Mara migration safari requires a minimum of 3 nights in camp to give you meaningful time at the river. Our <strong>3-Day Masai Mara</strong> package starts from $495/pp and includes full-day game drives timed around river crossing activity.</p>
<p>Book at least 3 months ahead for July–September. The best camps sell out faster than flights.</p>
""",
    },
    {
        "slug": "masai-mara-vs-amboseli",
        "title": "Masai Mara vs Amboseli: Which Kenya Safari Is Right for You?",
        "excerpt": "Two iconic parks. Completely different experiences. One has the greatest wildlife spectacle on Earth. The other has elephants under Kilimanjaro at dawn. Here is how to choose.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "destinations",
        "author": "Grace Wanjiru Kamau",
        "read_time_min": 7,
        "tags": ["masai mara", "amboseli", "destinations", "planning"],
        "is_published": True,
        "published_at": datetime(2026, 1, 28, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Masai Mara vs Amboseli: Which Is Better? (2026 Guide)",
        "meta_desc": "Masai Mara or Amboseli — which Kenya safari park should you choose? An honest comparison from a guide who knows both.",
        "content": """
<h2>The Short Answer</h2>
<p>Go to the <strong>Masai Mara</strong> if you want volume — a landscape so full of wildlife that you stop counting lions after the first morning. Go to <strong>Amboseli</strong> if you want a single, unforgettable image — an elephant family moving beneath a snow-capped Kilimanjaro at sunrise.</p>
<p>Both are extraordinary. They are not the same experience.</p>

<h2>The Masai Mara</h2>
<h3>What it is</h3>
<p>1,510 square kilometres of open savannah on Kenya's southwestern border with Tanzania. The Mara is the northern extension of the Serengeti ecosystem — the same grass, the same predators, the same prey animals, continuous across the border.</p>
<h3>What you will see</h3>
<ul>
<li>Lions everywhere. The Mara has one of the highest lion densities in Africa.</li>
<li>The Great Migration river crossings (July–October) — two million wildebeest</li>
<li>Leopard, cheetah, hyena, elephant, buffalo, giraffe, zebra in abundance</li>
<li>Hot air balloon safaris at sunrise (we recommend them highly)</li>
</ul>
<h3>The honest downside</h3>
<p>The Mara is Kenya's most visited park. In peak season (August–September), you will share sightings with other vehicles. A good guide manages this — positioning early, knowing secondary sightings — but it is not the solitary wilderness experience of Samburu or Tsavo.</p>

<h2>Amboseli National Park</h2>
<h3>What it is</h3>
<p>392 square kilometres at the foot of Mount Kilimanjaro. Much smaller than the Mara. Famous for its large, relaxed elephant herds and — on clear mornings — a view that will make you forget every other view you have ever seen.</p>
<h3>What you will see</h3>
<ul>
<li>The best elephant viewing in Africa. Amboseli's herds are large, habituated, and easy to approach.</li>
<li>Kilimanjaro as your backdrop — on clear mornings (November–February is best)</li>
<li>Large flocks of flamingos and birds around the swamps</li>
<li>Predators — but fewer than the Mara. This is elephant country.</li>
</ul>
<h3>The honest downside</h3>
<p>Kilimanjaro is cloud-covered about 50% of the time, even in good seasons. If you visit and it stays hidden, you will still have an outstanding elephant safari — but the signature image you came for may not appear. This is Kenya. We cannot move mountains.</p>

<h2>Side by Side</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
<tr style="border-bottom:2px solid #e5e7eb"><th style="text-align:left;padding:8px;font-weight:600"> </th><th style="text-align:left;padding:8px;font-weight:600">Masai Mara</th><th style="text-align:left;padding:8px;font-weight:600">Amboseli</th></tr>
<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px;color:#6b7280">Best for</td><td style="padding:8px">Big Five, Migration</td><td style="padding:8px">Elephants, Kilimanjaro</td></tr>
<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px;color:#6b7280">Best season</td><td style="padding:8px">Jul–Oct, Jan–Feb</td><td style="padding:8px">Nov–Feb, Jun–Jul</td></tr>
<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px;color:#6b7280">Size</td><td style="padding:8px">1,510 km²</td><td style="padding:8px">392 km²</td></tr>
<tr style="border-bottom:1px solid #f3f4f6"><td style="padding:8px;color:#6b7280">Drive from Nairobi</td><td style="padding:8px">5–6 hours</td><td style="padding:8px">4 hours</td></tr>
<tr><td style="padding:8px;color:#6b7280">Crowd level</td><td style="padding:8px">High (peak season)</td><td style="padding:8px">Moderate</td></tr>
</table>

<h2>Can You Do Both?</h2>
<p>Yes — and we recommend it. Our <strong>5-Day Mara + Amboseli</strong> package covers both parks in one trip, with a bush flight between them. Five days is not enough to exhaust either park. It is enough to understand why people come back every year.</p>
""",
    },
    {
        "slug": "what-to-pack-kenya-safari",
        "title": "What to Pack for a Kenya Safari: The Complete 2026 Guide",
        "excerpt": "The packing list that every guide wishes their guests had read. What to bring, what to leave behind, and the one item that ruins more safaris than anything else.",
        "cover_image": "/images/destinations/samburu.jpg",
        "category": "tips",
        "author": "Engai Safaris Team",
        "read_time_min": 10,
        "tags": ["packing", "tips", "planning", "gear"],
        "is_published": True,
        "published_at": datetime(2026, 2, 5, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Safari Packing List 2026 — What Guides Actually Recommend",
        "meta_desc": "The complete Kenya safari packing list, written by guides. What to wear, what camera gear to bring, and what to leave at home.",
        "content": """
<h2>The One Rule Above All Others</h2>
<p>Pack less than you think you need. You will be in a vehicle for 6 hours a day. You will not need four pairs of shoes. Every extra kilogram you pack is a kilogram your guide lifts into the vehicle roof rack, and a kilogram less space for the binoculars and field guides that actually matter.</p>
<p>If you are flying between parks (we recommend it), baggage limits are strict: typically 15kg total in a soft bag. No hard-shell suitcases on bush flights. This is a real constraint, not a suggestion.</p>

<h2>Clothing</h2>
<h3>Colours: neutral, always</h3>
<p>Khaki, olive, tan, brown, grey. Wildlife uses colour vision differently from humans, but bright colours — especially white — can startle animals and make you visible from a distance you don't want to be visible from. Leave the neon running gear at home.</p>
<h3>Layers are everything</h3>
<p>A 6am game drive in the Mara in July can be 10°C. By 11am it is 28°C. You will be in an open vehicle or one with the roof popped. The temperature swings are dramatic. Bring:</p>
<ul>
<li>A midlayer fleece or light down jacket (packable)</li>
<li>A light waterproof shell for the short rains (October–November)</li>
<li>3–4 lightweight shirts (linen or technical fabric, not cotton which stays damp)</li>
<li>2 pairs of lightweight trousers — convertible zip-offs are practical</li>
<li>One set of smart casual for dinner at camp</li>
</ul>
<h3>Do not bring</h3>
<ul>
<li>Camouflage — it is illegal in Kenya and will create problems at park gates</li>
<li>Denim — heavy, slow to dry, uncomfortable in heat</li>
<li>More than 2 pairs of shoes (trail shoes + sandals is enough)</li>
</ul>

<h2>The Item That Ruins More Safaris Than Anything Else</h2>
<p>Inadequate sun protection. Not inadequate bug spray (though that matters). The equatorial sun in Kenya is vertical and relentless. In an open vehicle you are exposed for hours. A proper wide-brimmed hat — not a baseball cap — and SPF 50+ sunscreen applied before you leave camp are non-negotiable. More guests have had their safari experience diminished by sunburn and heat headache than by any missing piece of camera gear.</p>

<h2>Optics</h2>
<p><strong>Binoculars are essential.</strong> Your guide has eyes calibrated to African distance — they will spot a lion sleeping under a distant acacia at 800 metres. You cannot see it without binoculars. 8x42 is the ideal safari specification: compact, bright in low light, wide field of view. Bring your own or ask us about rental.</p>

<h2>Camera Gear</h2>
<p>A long lens makes a dramatic difference — a 400mm gives you frame-filling cheetah shots from 30 metres. But the best camera is the one you have. Modern smartphone cameras produce excellent results in good light. Bring a portable charger — camp power is sometimes limited, and you will drain your phone faster than expected.</p>
<blockquote>Do not spend your entire game drive looking through a viewfinder. Some of the best wildlife moments — a cheetah playing with its cub, a lion giving a massive yawn — last three seconds and are more powerful as a memory than a photograph.</blockquote>

<h2>Health and Essentials</h2>
<ul>
<li><strong>Malaria prophylaxis</strong> — consult your doctor 6 weeks before travel. Malarone or doxycycline are commonly prescribed. The Mara, Samburu and coastal areas are higher risk than Nairobi.</li>
<li><strong>Insect repellent</strong> — DEET 30%+ for evenings. Not needed in a moving vehicle during the day.</li>
<li><strong>Personal medications</strong> — bring more than you need. Village pharmacies in game-adjacent towns have limited stock.</li>
<li><strong>Hand sanitiser</strong> — always useful, especially at picnic sites</li>
<li><strong>Small day bag or camera bag</strong> — for the vehicle. Keep it accessible on the seat.</li>
</ul>

<h2>What You Can Buy in Kenya</h2>
<p>Nairobi is a well-supplied city. You can buy sunscreen, insect repellent, basic medications, and most toiletries at Nairobi supermarkets (Carrefour, Chandarana) at reasonable prices. You cannot always buy these things at your lodge once you are in the bush. Stock up before you leave Nairobi.</p>
""",
    },
    {
        "slug": "green-season-safari-kenya",
        "title": "Green Season Safaris: Why April and May Are Kenya's Best-Kept Secret",
        "excerpt": "Everyone tells you to avoid April and May. They are wrong — or at least, not entirely right. Here is the honest truth about Kenya's green season, and who it is perfect for.",
        "cover_image": "/images/destinations/lake-naivasha.png",
        "category": "tips",
        "author": "Engai Safaris Team",
        "read_time_min": 6,
        "tags": ["green season", "budget", "planning", "off peak"],
        "is_published": True,
        "published_at": datetime(2026, 2, 18, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Green Season Safari: Is April or May Worth It?",
        "meta_desc": "The honest guide to Kenya's green season. Lower prices, fewer tourists, lush landscapes — and what you actually give up.",
        "content": """
<h2>What 'Green Season' Actually Means</h2>
<p>Kenya has two rainy seasons: the long rains (April–May) and the short rains (October–November). The long rains are longer, heavier, and more consistent. The short rains are patchier and often don't feel like 'rain season' at all.</p>
<p>April and May are the months most safari operators describe as 'low season' or 'avoid'. The parks are muddy. Some tracks become impassable. The Great Migration river crossings are not happening. Wildlife disperses across a greener, wetter landscape.</p>
<p>All of this is true. It is also only half the story.</p>

<h2>What Green Season Gives You</h2>
<h3>Price</h3>
<p>April–May prices are 25–35% lower than peak season. A safari that costs $650/pp in August costs $430/pp in April. This is a meaningful saving on a significant purchase. For a couple, that saving can pay for an extra two nights at a beautiful camp.</p>
<h3>Solitude</h3>
<p>The Masai Mara in August has multiple vehicles at every lion sighting. In April, you may be the only vehicle in the area for an hour. Your guide has space to position properly, to kill the engine, to wait. The experience is quieter and often more intimate.</p>
<h3>Newborn animals</h3>
<p>January–March is peak calving season for wildebeest. By April, the calves are a few months old — still young, still learning, still making the mistakes that attract predators. Cheetah hunts are more frequent in green season because there is more prey that is easier to catch.</p>
<h3>The landscape</h3>
<p>The Mara in August is golden-brown and dusty. The Mara in April is a vivid, almost violent green. Acacia trees are in flower. The light after rain has a quality that photographers spend years chasing. If you want to photograph Kenya rather than just see it, green season light is extraordinary.</p>

<h2>What Green Season Takes Away</h2>
<p>We will be direct with you, because we think honesty is more important than a sale:</p>
<ul>
<li>The Great Migration river crossings do not happen in April or May. If this is your primary goal, go in July–October.</li>
<li>Some tracks in the Mara become impassable after heavy rain. A good 4WD vehicle and an experienced driver manage this, but it can limit access to certain areas.</li>
<li>Wildlife is more dispersed on a greener landscape. Sightings are not worse, but animals are harder to spot from a distance. This is where a great guide makes all the difference.</li>
</ul>

<h2>Who Should Go in Green Season</h2>
<ul>
<li>Travellers with flexible dates who have seen the Mara before and want a different experience</li>
<li>First-time visitors on a tighter budget who still want a serious wildlife experience</li>
<li>Photographers chasing green landscapes and dramatic skies</li>
<li>Anyone who values solitude over spectacle</li>
</ul>

<h2>Who Should Not Go in Green Season</h2>
<ul>
<li>Anyone whose primary goal is the Great Migration river crossings</li>
<li>Travellers who find uncertainty stressful — green season requires flexibility</li>
<li>First-time safari visitors who want guaranteed, abundant wildlife sightings — the dry season delivers this more reliably</li>
</ul>
<blockquote>Our view: green season is genuinely excellent for the right traveller. It is not a compromise version of a 'real' safari. It is a different safari with real advantages. We can help you decide which is right for you.</blockquote>
""",
    },
    {
        "slug": "lake-naivasha-guide",
        "title": "Lake Naivasha: The Safari Destination Nobody Talks About Enough",
        "excerpt": "Two hours from Nairobi, Kenya's most underrated safari destination has hippos, fish eagles, Hell's Gate cycling, and some of the most beautiful camp settings in East Africa.",
        "cover_image": "/images/destinations/lake-naivasha.png",
        "category": "destinations",
        "author": "James Ole Nkarai",
        "read_time_min": 6,
        "tags": ["naivasha", "day trip", "rift valley", "budget safari"],
        "is_published": True,
        "published_at": datetime(2026, 3, 4, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Lake Naivasha Safari Guide 2026: What To Do, See and Stay",
        "meta_desc": "The complete Lake Naivasha guide — boat safaris, Hell's Gate cycling, hippo walks, and the best camps. Two hours from Nairobi.",
        "content": """
<h2>Lake Naivasha Is Home</h2>
<p>I was born near Naivasha. My grandfather fished this lake. I have been guiding here for 14 years, and I still find new things — a new hippo pod, a different heron nesting site, a corner of Hell's Gate I had not noticed before. The lake rewards people who look carefully.</p>
<p>Most tourists rush through Naivasha on their way to the Mara or Nakuru. They see the lake from the main road and keep driving. This is a mistake. Naivasha deserves at least two nights. One night and a day is enough to fall in love with it.</p>

<h2>What Makes Naivasha Different</h2>
<p>Naivasha is a freshwater lake in the floor of the Great Rift Valley, 1,884 metres above sea level. It is surrounded by yellow fever acacia trees and backed by the Aberdare Range. The climate is gentle — 20–25°C year round — because of the altitude.</p>
<p>Unlike the Mara or Amboseli, you can walk here. Wildlife authorities permit guided walking and cycling safaris because there are no lions or leopards in the main lake area. This changes the experience completely. You are not watching Africa through a vehicle window. You are in it.</p>

<h2>The Boat Safari</h2>
<p>The boat safari is the heart of any Naivasha visit. A flat-bottomed boat, a guide who knows every pod of hippos by name, and the extraordinary spectacle of African fish eagles diving for fish at close range.</p>
<p>The lake has approximately 600 hippos. They are predictably located in the eastern channels, visible year-round. The best time is 6am — the light is golden, the hippos are active before the heat drives them deeper into the water, and the birds are extraordinary. African spoonbills, yellow-billed storks, cormorants, herons.</p>
<blockquote>I have been on the Naivasha boat hundreds of times. I still watch the fish eagle dive every single time. It never gets ordinary.</blockquote>

<h2>Hell's Gate National Park</h2>
<p>Kenya's most unique safari experience is 12 kilometres from Naivasha town. Hell's Gate is a spectacular gorge — red volcanic rock, hot springs, geothermal vents — through which you cycle or walk among giraffe, zebra, buffalo, and warthog with no fence between you.</p>
<p>The gorge walk inside Hell's Gate takes 2–3 hours and requires a guide. You drop into a narrow canyon where steam vents rise from the rock and the walls turn orange and rust. It feels prehistoric. It is extraordinary.</p>

<h2>Crescent Island</h2>
<p>A floating wildlife sanctuary in the lake's eastern corner. Walking safaris among giraffe, wildebeest, zebra and waterbuck — no lions, no fences, no vehicles. This is where several films have been shot, including parts of Out of Africa. On a clear morning, Kilimanjaro is visible across the Rift to the south.</p>

<h2>When to Go</h2>
<p>Naivasha is excellent year-round because of its altitude. The best months for boat safaris are <strong>January–February</strong> and <strong>June–July</strong>, when water levels are more stable and the bird life is at its most diverse. Avoid late April and May when the long rains can make some tracks muddy.</p>

<h2>How to Combine Naivasha</h2>
<p>Naivasha works perfectly as:</p>
<ul>
<li>A standalone 2-night destination from Nairobi</li>
<li>The first stop on a longer Rift Valley circuit (Naivasha → Nakuru → Bogoria)</li>
<li>A rest day between longer parks (Mara on the way to the coast)</li>
</ul>
<p>Our <strong>Naivasha Day Trip</strong> from Nairobi is the perfect introduction for first-time visitors. Our <strong>Naivasha + Hell's Gate 2-Day</strong> package gives you enough time to properly explore both experiences.</p>
""",
    },
    {
        "slug": "big-five-kenya-guide",
        "title": "Kenya's Big Five: Where to Find Them, When and What to Know",
        "excerpt": "Lion, leopard, elephant, buffalo, rhino. The most famous list in wildlife travel. Here is where each one lives in Kenya, when your chances are best, and the honest truth about guarantees.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "wildlife",
        "author": "Samuel Kiprop Rotich",
        "read_time_min": 8,
        "tags": ["big five", "wildlife", "lion", "elephant", "rhino"],
        "is_published": True,
        "published_at": datetime(2026, 3, 15, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Big Five Guide 2026: Where to See Lion, Leopard, Elephant, Buffalo, Rhino",
        "meta_desc": "Where and when to see Kenya's Big Five. An honest guide from a TRA-certified safari guide with 12 years of experience.",
        "content": """
<h2>Why 'Big Five'?</h2>
<p>The term was coined by big-game hunters in the colonial era, referring to the five most dangerous animals to hunt on foot. Today it describes the five animals that guests most want to photograph. The combination of iconic status, genuine difficulty to spot (especially leopard and rhino), and the dramatic landscapes they inhabit makes the Big Five a meaningful goal rather than a tourist cliché.</p>
<p>Kenya offers the best Big Five viewing on the continent — particularly for lion, elephant and buffalo. Leopard requires patience. Rhino requires knowing where to look.</p>

<h2>Lion</h2>
<h3>Where: Masai Mara, Amboseli, Tsavo</h3>
<p>The Mara has the highest lion density in Kenya — likely in Africa. The open savannah means lions are visible in daylight, not hidden in dense bush. A typical Mara game drive encounters lions two or three times.</p>
<p>Tsavo lions are the famous 'maneless males' — larger bodied, darker skinned, and with reduced or absent manes due to the heat. The Tsavo East lions that killed 135 railway workers in 1898 were from this population. Their descendants are here today.</p>
<h3>Best time: Year-round, but July–October in the Mara is peak</h3>

<h2>Leopard</h2>
<h3>Where: Masai Mara (riverine forest), Laikipia, Samburu</h3>
<p>Leopard is the most difficult of the Big Five to find. They are solitary, mostly nocturnal, and spend significant time hidden in trees or dense bush. A good guide knows leopard territories — the same female uses the same trees, the same kopjes, year after year.</p>
<p>Your best chance is 6am and 6pm — the brief windows when light is good and leopards are moving. In 12 years of guiding, I have had days when I found a leopard in the first hour. I have had three-day stretches without a sighting. This is leopard. Do not make it the sole focus of your safari — if you do, you will either be delighted or disappointed, with nothing in between.</p>
<h3>Best time: Year-round. Dry season (July–Oct, Jan–Feb) is better as cover is reduced</h3>

<h2>Elephant</h2>
<h3>Where: Amboseli (best), Tsavo, Samburu, Masai Mara</h3>
<p>Kenya has approximately 34,000 elephants. You will see them on almost any safari. Amboseli has the best viewing — the herds are large, relaxed, and accustomed to vehicles. The bulls in Amboseli are among the largest-tusked individuals left in Africa.</p>
<p>What makes an elephant sighting extraordinary is not the first elephant, but watching family dynamics — the matriarch directing movement, young calves learning, bulls sparring during musth. This takes time and patience in the vehicle. Sit quietly. Watch the group, not just the nearest individual.</p>
<h3>Best time: Year-round. Dry season concentrates herds at waterholes</h3>

<h2>Buffalo</h2>
<h3>Where: Masai Mara, Aberdares, Tsavo</h3>
<p>Cape buffalo are the most underrated of the Big Five. Large herds — sometimes thousands of animals — move in a remarkably coordinated mass. Old bulls ('dagga boys') are typically expelled from the herd and live in small bachelor groups in denser bush. These are the most dangerous individuals: experienced, unpredictable, and with nothing to lose.</p>
<p>A buffalo sighting in migration season, with wildebeest crossing in the background and lions watching from a kopje, is one of the great African tableaux.</p>
<h3>Best time: Year-round</h3>

<h2>Rhino</h2>
<h3>Where: Lake Nakuru, Ol Pejeta Conservancy, Lewa Wildlife Conservancy</h3>
<p>This is the hardest of the Big Five to see in Kenya. Rhino populations were decimated by poaching in the 1970s–90s. The animals that survive are protected in specific conservancies and parks with intensive anti-poaching operations.</p>
<p><strong>Lake Nakuru National Park</strong> is the most reliable location for both black and white rhino — it is fenced, which concentrates the animals. <strong>Ol Pejeta Conservancy</strong> in Laikipia has the highest concentration of black rhino in East Africa and is home to Najin and Fatu, the last two northern white rhinos on Earth.</p>
<blockquote>Standing 20 metres from the last two northern white rhinos is one of the most profound wildlife experiences possible. It is a privilege and a grief simultaneously.</blockquote>
<h3>Best time: Year-round at Nakuru and Ol Pejeta. Dry season makes spotting easier</h3>

<h2>The Honest Truth About Guarantees</h2>
<p>No responsible guide guarantees specific animals. We can maximise your chances through timing, positioning, park selection and local knowledge. We cannot control animals. A guest who spends 5 days in the Mara during August and does not see a cheetah is having an unlikely experience, but not an impossible one.</p>
<p>What we guarantee is effort, knowledge and honesty. We will tell you when conditions are poor and suggest alternatives. We will not take you to a spot with no recent activity and pretend the odds are good.</p>
""",
    },
    {
        "slug": "samburu-national-reserve-guide",
        "title": "Samburu National Reserve: Kenya's Untouched Northern Wilderness",
        "excerpt": "While everyone heads to the Mara, Samburu sits quietly in Kenya's north — drier, wilder, and home to rare species found nowhere else in Kenya. Here's why serious wildlife lovers choose Samburu.",
        "cover_image": "/images/destinations/samburu.jpg",
        "category": "destinations",
        "author": "Engai Safaris Team",
        "read_time_min": 7,
        "tags": ["samburu", "northern kenya", "rare species", "wildlife", "off the beaten track"],
        "is_published": True,
        "published_at": datetime(2026, 1, 20, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Samburu National Reserve: Kenya's Northern Wilderness | Engai Safaris",
        "meta_desc": "Complete guide to Samburu National Reserve — the Samburu Special Five, best time to visit, lodges, and how it compares to the Masai Mara.",
        "content": """<h2>Why Samburu is Different</h2>
<p>Samburu sits at 900 metres in Kenya's arid north — a completely different ecosystem to the Masai Mara's lush grasslands. The Ewaso Nyiro river cuts through a landscape of doum palms, dry riverbed acacia woodland and termite-mound dotted plains. It feels remote. It is remote. And that's exactly the point.</p>
<p>While the Mara has improved road networks and dozens of camps, Samburu receives a fraction of the visitors. Game drives here feel genuinely exploratory — you're more likely to be the only vehicle at a sighting than in a scrum with fifteen others.</p>

<h2>The Samburu Special Five</h2>
<p>Samburu's greatest distinction: five species found here but rarely anywhere else in Kenya. Wildlife photographers and serious safari goers travel specifically for these.</p>
<p><strong>Reticulated Giraffe</strong> — The most beautiful giraffe subspecies. Larger patches, cleaner white grid lines. Common in Samburu, rare in the south.</p>
<p><strong>Grevy's Zebra</strong> — The world's largest zebra and one of its most endangered. Narrower stripes and large rounded ears distinguish it from the common plains zebra.</p>
<p><strong>Beisa Oryx</strong> — Long straight horns, geometric face markings, perfectly adapted to the arid conditions. Striking in the dry landscape.</p>
<p><strong>Somali Ostrich</strong> — The blue-necked subspecies, distinct from the common ostrich. Males have vivid blue-grey skin on neck and legs.</p>
<p><strong>Gerenuk</strong> — The "giraffe-necked antelope". Extraordinarily long neck that allows it to browse standing upright on its hind legs. Unmistakable.</p>

<h2>Lions and Elephants</h2>
<p>Beyond the Special Five, Samburu has excellent resident lion prides and one of Kenya's most studied elephant populations — the Samburu elephants monitored by Save the Elephants since the 1990s. Many elephants are individually named and researchers can tell you their life histories.</p>
<p>Leopard sightings are excellent along the riverbank, particularly at dusk when they come to drink.</p>

<h2>Best Time to Visit</h2>
<p>Samburu is a year-round destination because it receives little rain. The short rains (November) and occasional long rains (April-May) are lighter here than in the south.</p>
<p><strong>Best months</strong>: January-February and July-October. October is excellent — wildlife concentrates at the river as the dry season peaks.</p>

<h2>Combining Samburu with the Mara</h2>
<p>The classic northern circuit pairs Samburu (2-3 nights) with either Laikipia (Ol Pejeta for rhinos) or the Masai Mara. Bush flights connect these easily — Samburu to Wilson Airport Nairobi is under an hour, allowing a Nairobi connection to the Mara.</p>""",
    },
    {
        "slug": "nairobi-day-trips-from-city",
        "title": "5 Incredible Day Trips from Nairobi (No Long Drive Required)",
        "excerpt": "Most visitors treat Nairobi as a transit point. That's a mistake. Within 1-3 hours of the city centre are some of East Africa's most extraordinary wildlife experiences.",
        "cover_image": "/images/destinations/nairobi.jpg",
        "category": "destinations",
        "author": "Engai Safaris Team",
        "read_time_min": 6,
        "tags": ["nairobi", "day trips", "city safari", "elephant orphanage", "giraffe centre"],
        "is_published": True,
        "published_at": datetime(2026, 2, 1, 8, 0, tzinfo=timezone.utc),
        "meta_title": "5 Best Day Trips from Nairobi | Safari Day Trips | Engai Safaris",
        "meta_desc": "The best day trips from Nairobi — Nairobi National Park, elephant orphanage, Giraffe Centre, Lake Naivasha and Hell's Gate. No long drives required.",
        "content": """<h2>1. Nairobi National Park — Lions 7km from the CBD</h2>
<p>The only national park in the world bordering a capital city. From Nairobi's central business district to a game drive with lions in the background, the city skyline visible behind them — it takes 20 minutes.</p>
<p>The park hosts lions, leopards, cheetahs, rhinos (black and white), buffaloes, giraffes, zebras, hippos, and hundreds of bird species. It's small (117 km²) but perfectly managed. Early morning game drives regularly produce big cat sightings.</p>
<p><strong>Duration</strong>: Half day (4-5 hours) or full day. Our morning park drive + afternoon Giraffe Centre + David Sheldrick combination is our most popular Nairobi experience.</p>

<h2>2. David Sheldrick Wildlife Trust — Baby Elephant Orphanage</h2>
<p>The world's most successful elephant orphanage, operating since 1977. Every morning at 11am, orphaned baby elephants are brought to a mud wallow for public viewing. The elephants are wild — they will one day be returned to the wilderness — but at this stage their keepers sleep alongside them and bottle-feed them every three hours.</p>
<p>It's one hour from central Nairobi on the edge of Nairobi National Park. Witnessing a three-month-old elephant learn to use its trunk is genuinely moving.</p>
<p><strong>Duration</strong>: 1 hour viewing window (arrive by 10:45am). Combine with Giraffe Centre and Karen Blixen Museum for a full Nairobi cultural day.</p>

<h2>3. Giraffe Centre — Hand-Feed Rothschild's Giraffes</h2>
<p>The African Fund for Endangered Wildlife runs this breeding centre for the critically endangered Rothschild's giraffe. Unlike seeing giraffes at distance in a game reserve, here you can hand-feed them from a raised platform — nose to nose, eye level with these extraordinary animals.</p>
<p>Rothschild's giraffes have no markings below the knee (appearing to wear white socks) and only 5 ossicones (horn-like protrusions). Fewer than 1,600 remain in the wild.</p>
<p><strong>Duration</strong>: 45 minutes. Located in the upscale Karen suburb, 20 minutes from city centre.</p>

<h2>4. Lake Naivasha — Hippos, Birds and Hell's Gate</h2>
<p>90 minutes northwest of Nairobi, Lake Naivasha is a freshwater lake in the Great Rift Valley. A boat ride gives close hippo encounters (the lake has the densest hippo population in Kenya per square kilometre). The lakeshore has extraordinary bird life — fish eagles, pelicans, kingfishers, cormorants.</p>
<p>Adjacent Hell's Gate National Park offers something unique in Kenya: you walk and cycle through wildlife. Zebras, buffaloes and gazelles wander past as you explore on foot or bike. A geothermal gorge adds dramatic geology. No lions or elephants — hence the walking.</p>
<p><strong>Duration</strong>: Full day. Leave Nairobi by 7am, back by 6pm comfortably.</p>

<h2>5. Ol Pejeta Conservancy — Last Northern White Rhinos on Earth</h2>
<p>Three hours north of Nairobi, Ol Pejeta is Kenya's finest rhino sanctuary and the only place on Earth where you can see the last two northern white rhinos — Najin and Fatu. Their species cannot recover: all males are dead. Visiting is both extraordinary and sobering.</p>
<p>Beyond rhinos: chimpanzee sanctuary, excellent black rhino population, lions, and the densest mammal population per square kilometre of any Kenyan park.</p>
<p><strong>Duration</strong>: Full day or stay overnight. We can arrange same-day return from Nairobi.</p>""",
    },
    {
        "slug": "family-safari-kenya-guide",
        "title": "Kenya Family Safari Guide: Ages, Parks and Practical Tips",
        "excerpt": "Safari with children is one of the most transformative family experiences possible. Here's the honest guide to ages, suitable parks, accommodation and how to keep kids engaged on game drives.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "tips",
        "author": "Engai Safaris Team",
        "read_time_min": 8,
        "tags": ["family safari", "kids", "children", "family travel", "planning"],
        "is_published": True,
        "published_at": datetime(2026, 2, 10, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Family Safari Guide: Tips for Travelling with Children | Engai Safaris",
        "meta_desc": "Complete guide to Kenya family safaris — what age is too young, which parks work for families, how to keep children engaged, and accommodation recommendations.",
        "content": """<h2>What Age is Right for a Safari?</h2>
<p>The honest answer: it depends on the family. Some parks have minimum age requirements (private conservancies sometimes require 7+, some lodges require 12+). But beyond rules, consider temperament.</p>
<p>Children who can sit quietly for 2-3 hours, follow guide instructions, and handle early mornings (5:30am wake-ups are real) will thrive. Children who struggle with these things at home will struggle more in a vehicle in the bush.</p>
<p><strong>Our recommendation by age</strong>:</p>
<p><em>Under 5</em>: Nairobi day experiences (Elephant Orphanage, Giraffe Centre, National Park) are excellent. Full bush safari is challenging due to variable schedules and heat.</p>
<p><em>5-8 years</em>: Naivasha, Nairobi National Park, and shorter Amboseli trips work well. Elephants captivate this age group. Choose family-friendly lodges with swimming pools.</p>
<p><em>8+ years</em>: Ready for the full Mara experience. Children this age often become the most enthusiastic spotters in the vehicle — their eyesight beats adults.</p>
<p><em>Teenagers</em>: Often the most rewarding safari companions. Give them binoculars and a field guide. Many leave Kenya with wildlife photography as a serious hobby.</p>

<h2>Best Parks for Families</h2>
<p><strong>Amboseli</strong>: Elephant herds with calves are spellbinding for children. Open, flat terrain makes spotting easy. Not as dense as the Mara but consistently excellent.</p>
<p><strong>Lake Naivasha</strong>: Boat rides, hippos, cycling in Hell's Gate — active and varied. Short drives from Nairobi make it ideal for younger children.</p>
<p><strong>Masai Mara</strong>: Best for older children (8+). Big Five, migration, dramatic landscapes. Choose private conservancy camps over the main reserve for fewer vehicles.</p>
<p><strong>Ol Pejeta</strong>: Rhino sanctuary, chimp sanctuary, excellent all-round. Good roads, accessible.</p>

<h2>Keeping Children Engaged on Game Drives</h2>
<p>The secret experienced guides know: give children a job. They become the vehicle's official counter (how many zebras?), the spotter (who sees the impala first?), the photographer (even a phone camera works).</p>
<p>Pack: field guide with pictures, binoculars, notebook for a "wildlife diary", snacks (game drives are hungry work), sun hat, and a cuddly animal for very young children.</p>
<p>Skip the 4-hour drives for young families. Two shorter 2-hour drives (dawn and dusk) work better than one exhausting half-day.</p>

<h2>Health and Safety</h2>
<p><strong>Malaria prevention</strong>: Consult your doctor about antimalarial medication for children before travel. Dosing is weight-based. Malarone and Doxycycline are not suitable for young children — alternatives exist.</p>
<p><strong>Sun protection</strong>: Equatorial sun is intense. SPF 50+ sunscreen, hats, and long sleeves during peak hours (11am-3pm).</p>
<p><strong>Vaccinations</strong>: Standard childhood vaccines should be up to date. Yellow fever may be required depending on your departure country and routing.</p>
<p><strong>Food and water</strong>: Safari lodges and camps serve filtered/bottled water. Camp food is generally excellent and varied. Inform lodges of any allergies or dietary restrictions when booking.</p>

<h2>Family-Friendly Accommodation</h2>
<p>Not all safari lodges welcome children equally. Look for:</p>
<ul>
<li>Interconnecting rooms or family cottages</li>
<li>Swimming pool (essential for midday downtime)</li>
<li>Junior ranger or wildlife education programmes</li>
<li>Bush walks suitable for families</li>
<li>Flexible meal times (children eat earlier than typical lodge dinner service)</li>
</ul>
<p>We always specify family accommodation and age-appropriate activities when building family itineraries. Mention your children's ages when enquiring and we'll match you with the right lodges.</p>""",
    },
    {
        "slug": "kenya-conservation-community-tourism",
        "title": "Why Kenya Safari Tourism is One of the World's Most Effective Conservation Tools",
        "excerpt": "Every safari booking funds Kenya's wildlife conservation. Here's how the money flows, why community-based tourism is transforming wildlife protection, and how to ensure your trip has maximum positive impact.",
        "cover_image": "/images/destinations/masai-mara.png",
        "category": "cultural",
        "author": "Engai Safaris Team",
        "read_time_min": 8,
        "tags": ["conservation", "community tourism", "responsible travel", "wildlife protection", "Kenya"],
        "is_published": True,
        "published_at": datetime(2026, 2, 20, 8, 0, tzinfo=timezone.utc),
        "meta_title": "Kenya Safari and Conservation: How Tourism Protects Wildlife | Engai Safaris",
        "meta_desc": "How safari tourism funds Kenya's wildlife conservation, the community conservancy model, and how to choose a safari operator that maximises conservation impact.",
        "content": """<h2>The Economics of Wildlife Conservation</h2>
<p>Kenya has approximately 17,000 lions. When those lions roam onto community land outside protected areas, they kill livestock. A single lion can kill cattle worth a year's income to a Maasai family in one night.</p>
<p>Without economic incentive to tolerate predators, the rational choice for communities is elimination. Lion poisoning — using cheap agricultural poisons on carcasses — is devastatingly effective and historically widespread.</p>
<p>This is the fundamental challenge of African wildlife conservation: wildlife and people compete for the same land, and people need to eat today. Conservation only works when it's economically rational to protect wildlife.</p>

<h2>The Community Conservancy Revolution</h2>
<p>The solution Kenya pioneered — and which has transformed wildlife conservation across East Africa — is the community conservancy model.</p>
<p>Communities lease their land to tourism operators in exchange for guaranteed income per acre. The more wildlife on the land, the more tourists, the more income. Suddenly the lion is worth more alive than dead — it drives tourism revenue that builds schools, pays salaries, and funds healthcare.</p>
<p>The results have been extraordinary. The Maasai Mara ecosystem's lion population has increased by 40% in areas with community conservancies. Elephants that were poached to local extinction in the 1990s have returned. The economic logic works.</p>

<h2>How Your Safari Booking Contributes</h2>
<p>When you book with a responsible operator using community-linked camps:</p>
<ul>
<li><strong>Community fee</strong>: A portion of camp fees goes directly to the community owning the land — typically $30-80 per person per night</li>
<li><strong>Conservation levy</strong>: Park fees (KWS) fund anti-poaching rangers, veterinary care, and wildlife research</li>
<li><strong>Employment</strong>: Every camp employs local guides, rangers, cooks, lodge staff — often 30-50 people from surrounding communities</li>
<li><strong>Education</strong>: Many operators fund local school bursaries from tourism revenue</li>
</ul>

<h2>What to Look for in an Operator</h2>
<p>Not all safari operators contribute equally to conservation. Ask these questions:</p>
<p><strong>Which conservancies do you use?</strong> Community conservancies (like Olare Motorogi, Naboisho, Mara North) direct money to Maasai landowners. The main reserve doesn't have this direct community link.</p>
<p><strong>What percentage of staff are from local communities?</strong> Operations that employ primarily local people circulate money into communities rather than importing labour.</p>
<p><strong>Do you support any conservation projects?</strong> Some operators partner with specific conservation programmes — Lion Guardians, Space for Giants, Save the Elephants.</p>

<h2>Our Commitments at Engai Safaris</h2>
<p>We prioritise community conservancy camps across all our itineraries. We are Kenya-owned — our revenue stays in Kenya. Our guides are Kenyan, trained in Kenya, paid above industry rates.</p>
<p>We believe the best conservation argument is also the best business argument: wildlife-rich, community-supported destinations create better safari experiences than overcrowded park lodges. Better for guests, better for wildlife, better for communities.</p>
<p>When you book with Engai, you're not just buying a holiday. You're voting with your money for a model of tourism that makes wildlife worth more alive.</p>""",
    },
]


async def seed():
    async with SessionLocal() as db:
        ok = 0
        for p in POSTS:
            try:
                from sqlalchemy import select
                result = await db.execute(select(BlogPost).where(BlogPost.slug == p["slug"]))
                post = result.scalar_one_or_none()
                if post:
                    for k, v in p.items():
                        setattr(post, k, v)
                    print(f"✅ Updated: {p['slug']}")
                else:
                    post = BlogPost(**p)
                    db.add(post)
                    print(f"✅ Created: {p['slug']}")
                ok += 1
            except Exception as exc:
                await db.rollback()
                print(f"❌ Failed [{p.get('slug')}]: {exc}")
                continue
        await db.commit()
        print(f"\nDone — {ok}/{len(POSTS)} blog posts seeded.")


asyncio.run(seed())
