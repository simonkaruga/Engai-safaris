import africastalking
from app.config import settings

africastalking.initialize(settings.AT_USERNAME, settings.AT_API_KEY)
_sms = africastalking.SMS
_WA = settings.WHATSAPP_NUMBER

TEMPLATES = {
    "confirmation": (
        "Confirmed! Ref: {ref}\n"
        "{safari} · {date} · {pax} guests\n"
        "Deposit paid: KES {deposit}\n"
        "Balance on arrival: KES {balance}\n"
        f"WhatsApp: {_WA}"
    ),
    "reminder": (
        "Your safari is TOMORROW!\n"
        "Ref: {ref} · Meet: {location}\n"
        "Time: {time}\n"
        "Guide: {guide} · {guide_phone}\n"
        "Balance: KES {balance}"
    ),
    "review_request": (
        "Hi {name}! How was your Engai Safari?\n"
        "Leave a review (2 min): {review_link}\n"
        "10% off your next trip as our thanks!"
    ),
    "ai_confirm": (
        "Hi {name}! Your safari enquiry is received (Ref: {ref}).\n"
        "Our team will send your personalised quote within 4 hours.\n"
        f"Questions? WhatsApp: {_WA}\n"
        "- Engai Safaris"
    ),
}


async def send_sms(phone: str, template: str, **kwargs) -> None:
    msg = TEMPLATES[template].format(**kwargs)
    _sms.send(msg, [phone], sender_id="EngaiSafaris")
