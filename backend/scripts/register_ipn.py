"""
Run once to register the IPN URL and get your PESAPAL_IPN_ID.
Usage: python scripts/register_ipn.py
"""
import asyncio, httpx, os
from dotenv import load_dotenv

load_dotenv()

KEY    = os.environ["PESAPAL_KEY"]
SECRET = os.environ["PESAPAL_SECRET"]
ENV    = os.environ.get("PESAPAL_ENV", "sandbox")
BASE   = "https://pay.pesapal.com/v3" if ENV == "live" else "https://cybqa.pesapal.com/pesapalv3"
IPN_URL = os.environ.get("FRONTEND_URL", "https://api.engaisafaris.com").replace("http://localhost:3000", "https://api.engaisafaris.com")
IPN_URL = "https://api.engaisafaris.com/api/payments/ipn"


async def main():
    async with httpx.AsyncClient() as c:
        # 1. Get token
        r = await c.post(
            f"{BASE}/api/Auth/RequestToken",
            json={"consumer_key": KEY, "consumer_secret": SECRET},
            timeout=10,
        )
        r.raise_for_status()
        token = r.json()["token"]
        print(f"✓ Token obtained")

        # 2. Register IPN
        r = await c.post(
            f"{BASE}/api/URLSetup/RegisterIPN",
            headers={"Authorization": f"Bearer {token}"},
            json={"url": IPN_URL, "ipn_notification_type": "POST"},
            timeout=10,
        )
        r.raise_for_status()
        data = r.json()
        print(f"✓ IPN registered: {data}")
        ipn_id = data.get("ipn_id") or data.get("id")
        if ipn_id:
            print(f"\n✅ Add this to your .env:\nPESAPAL_IPN_ID={ipn_id}")

asyncio.run(main())
