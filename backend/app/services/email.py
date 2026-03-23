import resend
from app.config import settings

resend.api_key = settings.RESEND_API_KEY

FROM = "Engai Safaris <hello@engaisafaris.com>"
_WA = settings.WHATSAPP_NUMBER
_SITE = settings.FRONTEND_URL


# ─── ENQUIRY NURTURE ──────────────────────────────────────────────────────────

async def send_enquiry_confirmation(to: str, name: str, reference: str) -> None:
    """Day 0 — Immediate enquiry confirmation"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"We received your enquiry [{reference}] — Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>Thank you for reaching out to Engai Safaris — <em>Where the Sky Meets the Wild.</em></p>
        <p>Your enquiry reference is <strong style="font-size:18px;color:#0D7A5F">{reference}</strong></p>
        <p>Our team reviews every enquiry personally and will send you a tailored quote within <strong>4 hours</strong> (often much sooner).</p>
        <p>While you wait, explore our safaris: <a href="{_SITE}/safaris" style="color:#0D7A5F">engaisafaris.com/safaris</a></p>
        <p>Questions right now? WhatsApp us: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_meet_your_guide(to: str, name: str, guide_name: str, guide_bio: str, guide_image: str, guide_speciality: str) -> None:
    """Day 1 — Meet your likely guide"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Meet {guide_name} — your Engai guide | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>While our team finalises your quote, we'd love you to meet one of our expert guides.</p>
        {"<img src='" + guide_image + "' style='width:120px;height:120px;border-radius:60px;object-fit:cover;margin:16px 0' />" if guide_image else ""}
        <h3 style="color:#0D7A5F;margin-bottom:4px">{guide_name}</h3>
        <p style="color:#666;font-style:italic">{guide_speciality}</p>
        <p>{guide_bio}</p>
        <p>Every Engai guide: TRA-certified · 10+ years experience · One guide, your entire trip.</p>
        <p>Questions? WhatsApp us: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_destination_guide(to: str, name: str, destination: str, highlights: list[str], best_months: str) -> None:
    """Day 3 — Destination guide for their chosen safari"""
    highlights_html = "".join(f"<li>{h}</li>" for h in highlights)
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Everything you need to know about {destination} | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>Here's our complete insider guide to <strong>{destination}</strong> — the destination in your safari enquiry.</p>
        <h3 style="color:#0D7A5F">Top Highlights</h3>
        <ul>{highlights_html}</ul>
        <h3 style="color:#0D7A5F">Best Time to Visit</h3>
        <p>{best_months}</p>
        <p>Read the full guide: <a href="{_SITE}/destinations" style="color:#0D7A5F">engaisafaris.com/destinations</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_guest_story(to: str, name: str) -> None:
    """Day 5 — Past guest testimonial"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": "What Sarah from London said after her Engai Safari | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>We thought you'd enjoy hearing from a recent guest:</p>
        <blockquote style="border-left:4px solid #0D7A5F;padding-left:16px;margin:24px 0;font-style:italic;color:#444">
        "I've done safaris in Tanzania and South Africa — Engai was the best by far. Our guide James knew
        exactly where every lion pride was. We saw all Big Five by day two. The transparent pricing meant
        no surprises, and the booking was instant. I'll never use another company for Kenya."
        <br/><strong style="font-style:normal">— Sarah T., London · 5-Day Mara &amp; Amboseli</strong>
        </blockquote>
        <p>Read all our reviews: <a href="{_SITE}/reviews" style="color:#0D7A5F">engaisafaris.com/reviews</a></p>
        <p style="color:#666">Your personalised quote is being prepared. You'll hear from us very soon.</p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_wildlife_calendar(to: str, name: str, travel_month: str) -> None:
    """Day 7 — Wildlife calendar for their travel dates"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"What wildlife you'll see in {travel_month} | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>You mentioned travelling in <strong>{travel_month}</strong>. Here's exactly what wildlife you can expect:</p>
        <p>See our full interactive wildlife calendar:
        <a href="{_SITE}/wildlife-calendar" style="color:#0D7A5F">engaisafaris.com/wildlife-calendar</a></p>
        <p>We'll always be honest — if a month isn't ideal for a specific park, we'll tell you which is better.</p>
        <p>Questions? WhatsApp us: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_faq_and_whatsapp(to: str, name: str, reference: str) -> None:
    """Day 10 — WhatsApp link + FAQ"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Common questions before booking your Kenya safari | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>Your enquiry {reference} is still with us. Before you decide, here are the questions we get most:</p>
        <p><strong>Is Kenya safe for tourists?</strong><br/>Yes. The tourist areas — Mara, Naivasha, Amboseli, Nakuru — are very safe. Read our full safety guide.</p>
        <p><strong>Do I need vaccinations?</strong><br/>Yellow fever cert is required if arriving from endemic countries. Malaria prophylaxis is recommended. Read our <a href="{_SITE}/health-vaccinations" style="color:#0D7A5F">health guide</a>.</p>
        <p><strong>What's included?</strong><br/>All our prices include: guide, 4x4, accommodation, meals, park fees. No hidden extras.</p>
        <p>See all 50 FAQs: <a href="{_SITE}/faq" style="color:#0D7A5F">engaisafaris.com/faq</a></p>
        <p>Ready to talk? <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">WhatsApp us now</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_urgency_followup(to: str, name: str, reference: str, safari_name: str) -> None:
    """Day 14 — Gentle urgency / last nudge"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Your safari dates — a quick note | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>We wanted to follow up on your enquiry for <strong>{safari_name}</strong> (Ref: {reference}).</p>
        <p>Peak season dates fill quickly — especially July–October during the Great Migration. We'd hate for you to miss your preferred dates.</p>
        <p>If you'd like to hold your dates with a <strong>30% deposit</strong>, we can confirm your booking today.</p>
        <p>Reply to this email, or WhatsApp us directly: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p>If your plans have changed, no problem at all — just let us know and we'll close the enquiry.</p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


# ─── POST-BOOKING ─────────────────────────────────────────────────────────────

async def send_booking_confirmation(to: str, name: str, reference: str, itinerary_pdf_url: str) -> None:
    """Immediately after booking — confirmation + itinerary"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Booking Confirmed — {reference} | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Your safari is confirmed, {name}!</h2>
        <p>Booking reference: <strong style="font-size:18px;color:#0D7A5F">{reference}</strong></p>
        <p>Your deposit has been received. Here's everything you need:</p>
        <ul>
        <li><a href="{itinerary_pdf_url}" style="color:#0D7A5F">Download your full itinerary PDF</a></li>
        <li><a href="{_SITE}/health-vaccinations" style="color:#0D7A5F">Health &amp; vaccination guide</a></li>
        <li><a href="{_SITE}/faq" style="color:#0D7A5F">Pre-trip FAQ</a></li>
        </ul>
        <p>What to pack: light neutral clothing, good walking shoes, binoculars, sunscreen SPF 50+, power bank.</p>
        <p>Your guide introduction is coming in a separate email. Any questions — WhatsApp us: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_one_week_reminder(to: str, name: str, reference: str, guide_name: str, guide_phone: str, travel_date: str) -> None:
    """T-7 days — one week to go"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"One week until your safari! | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">One week to go, {name}!</h2>
        <p>Your safari (Ref: {reference}) departs on <strong>{travel_date}</strong>.</p>
        <p>Your guide is <strong>{guide_name}</strong>. Their direct number: <strong>{guide_phone}</strong>. Save it now.</p>
        <p><strong>Pre-departure checklist:</strong></p>
        <ul>
        <li>&#x2705; Passport valid 6+ months beyond travel date</li>
        <li>&#x2705; Kenya eVisa / visa on arrival confirmed</li>
        <li>&#x2705; Yellow fever certificate (if required)</li>
        <li>&#x2705; Travel insurance active</li>
        <li>&#x2705; USD/KES cash for tips (~$10–15/day for guide)</li>
        <li>&#x2705; Camera charged, memory cards cleared</li>
        </ul>
        <p>Final pickup time and meeting point will be confirmed in 3 days.</p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_three_day_reminder(to: str, name: str, travel_date: str, pickup_location: str, weather: str) -> None:
    """T-3 days — weather + final reminder"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"3 days to go — final prep for your safari | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">3 days, {name}!</h2>
        <p>Travel date: <strong>{travel_date}</strong></p>
        <p>Pickup location: <strong>{pickup_location}</strong></p>
        <p>Expected weather: {weather}</p>
        <p><strong>Pack light, pack right:</strong> 1–2 neutral-coloured layers (mornings are cold in the bush), fleece, hat, sunscreen.</p>
        <p>Any last questions? Reply here or WhatsApp: <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_day_before_reminder(to: str, name: str, guide_name: str, guide_phone: str, pickup_time: str, pickup_location: str) -> None:
    """T-1 day — exact pickup details"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Tomorrow! Your pickup details inside | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Tomorrow is the day, {name}!</h2>
        <p>Here are your final logistics:</p>
        <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;color:#666">Pickup time:</td><td style="padding:8px;font-weight:bold">{pickup_time}</td></tr>
        <tr><td style="padding:8px;color:#666">Pickup location:</td><td style="padding:8px;font-weight:bold">{pickup_location}</td></tr>
        <tr><td style="padding:8px;color:#666">Your guide:</td><td style="padding:8px;font-weight:bold">{guide_name}</td></tr>
        <tr><td style="padding:8px;color:#666">Guide's mobile:</td><td style="padding:8px;font-weight:bold">{guide_phone}</td></tr>
        <tr><td style="padding:8px;color:#666">Emergency line:</td><td style="padding:8px;font-weight:bold">{_WA}</td></tr>
        </table>
        <p style="margin-top:16px">Sleep well tonight. Tomorrow, Africa waits.</p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_departure_day(to: str, name: str, guide_name: str, emergency_number: str) -> None:
    """T+0 — departure day message"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Have an incredible safari, {name}! | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Today is the day, {name}!</h2>
        <p>{guide_name} is on their way to meet you.</p>
        <p>Emergency contact (24/7): <strong>{emergency_number}</strong></p>
        <p>Tip for the first game drive: switch your phone to silent. The bush rewards patience and silence.</p>
        <p>We cannot wait to hear about your experience. See you on the other side of an unforgettable adventure.</p>
        <p style="margin-top:32px;color:#0D7A5F;font-style:italic">— Where the Sky Meets the Wild</p>
        </div>
        """,
    })


# ─── POST-TRIP ────────────────────────────────────────────────────────────────

async def send_review_request(to: str, name: str, review_link: str) -> None:
    """T+1 day — review request"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"How was your Engai Safari? (2 minutes) | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Welcome back, {name}!</h2>
        <p>We hope your safari was everything you dreamed of — and more.</p>
        <p>Your honest review helps other travellers discover Kenya and helps our guides get the recognition they deserve. It takes 2 minutes.</p>
        <p style="text-align:center;margin:24px 0">
        <a href="{review_link}" style="background:#0D7A5F;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">
        Leave a Review &#x2192;
        </a>
        </p>
        <p>As a thank you: <strong>10% off your next Engai Safari.</strong> Quote your booking reference when enquiring.</p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_photo_album_ready(to: str, name: str, memories_url: str) -> None:
    """T+7 days — photo album is ready"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Your safari photo album is ready | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Your memories are ready, {name}!</h2>
        <p>Our team has curated your safari photo album. Every photo is yours to keep and share.</p>
        <p style="text-align:center;margin:24px 0">
        <a href="{memories_url}" style="background:#C8860A;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">
        View Your Photo Album &#x2192;
        </a>
        </p>
        <p>Share it with friends and family — and tag us: <strong>@engaisafaris</strong></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_balance_payment_email(
    to: str,
    name: str,
    reference: str,
    safari_name: str,
    travel_date: str,
    balance_kes: int,
    payment_url: str,
) -> None:
    """Admin triggered — balance payment link"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"Balance payment for your {safari_name} — {reference} | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>Your safari is confirmed and your travel date is approaching!</p>
        <p>This is a reminder to settle the balance for:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px 0;color:#666">Safari:</td><td style="padding:8px 0;font-weight:bold">{safari_name}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Travel date:</td><td style="padding:8px 0;font-weight:bold">{travel_date}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Balance due:</td><td style="padding:8px 0;font-weight:bold;font-size:18px;color:#0D7A5F">KES {balance_kes:,}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Reference:</td><td style="padding:8px 0;font-weight:bold">{reference}</td></tr>
        </table>
        <p style="text-align:center;margin:28px 0">
        <a href="{payment_url}" style="background:#0D7A5F;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">
        Pay Balance Now &#x2192;
        </a>
        </p>
        <p style="font-size:13px;color:#888">This link expires in 48 hours. If you have any questions, WhatsApp us:
        <a href="https://wa.me/{_WA.replace('+','')}" style="color:#0D7A5F">{_WA}</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })


async def send_return_offer(to: str, name: str, reference: str) -> None:
    """T+30 days — come back offer"""
    resend.Emails.send({
        "from": FROM, "to": to,
        "subject": f"10% off your next Kenya safari | Engai Safaris",
        "html": f"""
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#0D7A5F">Hi {name},</h2>
        <p>A month ago, you were watching lions in the Mara. Do you miss it yet?</p>
        <p>As a returning Engai guest, you get <strong>10% off</strong> your next safari. Quote <strong>{reference}-RETURN</strong> when enquiring.</p>
        <p>What's new for your next trip:</p>
        <ul>
        <li>Tanzania — Serengeti &amp; Ngorongoro (coming soon)</li>
        <li>Uganda — Gorilla trekking Bwindi</li>
        <li>Lipa Polepole — Pay in 4 monthly M-Pesa instalments</li>
        </ul>
        <p><a href="{_SITE}/safaris" style="color:#0D7A5F">Browse next year's safaris &#x2192;</a></p>
        <p style="margin-top:32px;color:#666">— The Engai Safaris Team</p>
        </div>
        """,
    })
