import httpx
from app.config import settings

PESAPAL_URLS = {
    "live": "https://pay.pesapal.com/v3",
    "sandbox": "https://cybqa.pesapal.com/pesapalv3",
}


class PesapalService:
    def __init__(self):
        self.base = PESAPAL_URLS[settings.PESAPAL_ENV]

    async def get_token(self) -> str:
        async with httpx.AsyncClient() as c:
            r = await c.post(
                f"{self.base}/api/Auth/RequestToken",
                json={"consumer_key": settings.PESAPAL_KEY, "consumer_secret": settings.PESAPAL_SECRET},
                timeout=10,
            )
        r.raise_for_status()
        return r.json()["token"]

    async def submit_order(self, booking, token: str) -> dict:
        async with httpx.AsyncClient() as c:
            r = await c.post(
                f"{self.base}/api/Transactions/SubmitOrderRequest",
                headers={"Authorization": f"Bearer {token}"},
                json={
                    "id": str(booking.id),
                    "currency": "KES",
                    "amount": float(booking.deposit_kes),
                    "description": f"Deposit — {booking.reference}",
                    "callback_url": f"{settings.FRONTEND_URL}/booking/confirmation?ref={booking.reference}",
                    "notification_id": settings.PESAPAL_IPN_ID,
                    "billing_address": {
                        "email_address": booking.customer_email,
                        "phone_number": booking.customer_phone,
                        "first_name": booking.customer_name.split()[0],
                    },
                },
                timeout=15,
            )
        r.raise_for_status()
        return r.json()

    async def submit_balance_order(self, booking, token: str) -> dict:
        async with httpx.AsyncClient() as c:
            r = await c.post(
                f"{self.base}/api/Transactions/SubmitOrderRequest",
                headers={"Authorization": f"Bearer {token}"},
                json={
                    "id": f"{booking.id}-balance",
                    "currency": "KES",
                    "amount": float(booking.balance_kes),
                    "description": f"Balance — {booking.reference}",
                    "callback_url": f"{settings.FRONTEND_URL}/booking/confirmation?ref={booking.reference}&type=balance",
                    "notification_id": settings.PESAPAL_IPN_ID,
                    "billing_address": {
                        "email_address": booking.customer_email,
                        "phone_number": booking.customer_phone,
                        "first_name": booking.customer_name.split()[0],
                    },
                },
                timeout=15,
            )
        r.raise_for_status()
        return r.json()

    async def get_transaction_status(self, order_tracking_id: str, token: str) -> dict:
        async with httpx.AsyncClient() as c:
            r = await c.get(
                f"{self.base}/api/Transactions/GetTransactionStatus",
                params={"orderTrackingId": order_tracking_id},
                headers={"Authorization": f"Bearer {token}"},
                timeout=10,
            )
        r.raise_for_status()
        return r.json()


pesapal = PesapalService()
