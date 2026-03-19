import africastalking
from app.config import settings

africastalking.initialize(settings.AT_USERNAME, settings.AT_API_KEY)
_sms = africastalking.SMS

TEMPLATES = {
    "confirmation": (
        "Confirmed! Ref: {ref}\n"
        "{safari} · {date} · {pax} guests\n"
        "Deposit paid: KES {deposit}\n"
        "Balance on arrival: KES {balance}\n"
        "WhatsApp: +254XXXXXXXXX"
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
}


async def send_sms(phone: str, template: str, **kwargs) -> None:
    msg = TEMPLATES[template].format(**kwargs)
    _sms.send(msg, [phone], sender_id="EngaiSafaris")
