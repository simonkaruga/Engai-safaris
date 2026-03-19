import resend
from app.config import settings

resend.api_key = settings.RESEND_API_KEY

FROM = "Engai Safaris <hello@engaisafaris.com>"


async def send_enquiry_confirmation(to: str, name: str, reference: str) -> None:
    resend.Emails.send({
        "from": FROM,
        "to": to,
        "subject": f"We received your enquiry [{reference}]",
        "html": f"""
        <h2>Hi {name},</h2>
        <p>Thank you for reaching out to Engai Safaris.</p>
        <p>Your enquiry reference is <strong>{reference}</strong>.</p>
        <p>Our team will be in touch within 24 hours with a personalised quote.</p>
        <p>In the meantime, feel free to WhatsApp us at +254XXXXXXXXX.</p>
        <p>— The Engai Safaris Team</p>
        """,
    })


async def send_booking_confirmation(to: str, name: str, reference: str, itinerary_pdf_url: str) -> None:
    resend.Emails.send({
        "from": FROM,
        "to": to,
        "subject": f"Booking Confirmed — {reference} | Engai Safaris",
        "html": f"""
        <h2>Your safari is confirmed, {name}!</h2>
        <p>Booking reference: <strong>{reference}</strong></p>
        <p><a href="{itinerary_pdf_url}">Download your full itinerary PDF</a></p>
        <p>We'll be in touch with your guide details closer to departure.</p>
        <p>— The Engai Safaris Team</p>
        """,
    })


async def send_review_request(to: str, name: str, review_link: str) -> None:
    resend.Emails.send({
        "from": FROM,
        "to": to,
        "subject": "How was your Engai Safari? 🦁",
        "html": f"""
        <h2>Hi {name},</h2>
        <p>We hope you had an incredible safari!</p>
        <p><a href="{review_link}">Leave a quick review</a> — it takes 2 minutes
        and helps other travellers discover Kenya.</p>
        <p>As a thank you, enjoy <strong>10% off your next safari</strong>.</p>
        <p>— The Engai Safaris Team</p>
        """,
    })
