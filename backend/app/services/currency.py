"""
Live exchange rate service — fetches USD base rates from open.er-api.com,
caches in-memory for 12 hours. Falls back to hardcoded rates on any failure.
"""
import logging
import time
from typing import Optional
import httpx

logger = logging.getLogger(__name__)

SUPPORTED = ["USD", "GBP", "EUR", "KES", "AUD", "CAD", "CHF", "SEK", "JPY", "INR", "ZAR"]

FALLBACK_RATES: dict[str, float] = {
    "USD": 1.0,
    "GBP": 0.79,
    "EUR": 0.92,
    "KES": 130.0,
    "AUD": 1.55,
    "CAD": 1.37,
    "CHF": 0.90,
    "SEK": 10.4,
    "JPY": 149.0,
    "INR": 83.5,
    "ZAR": 18.7,
}

TTL = 12 * 3600  # 12 hours in seconds

_cache: Optional[dict[str, float]] = None
_cached_at: float = 0.0


async def get_rates() -> dict[str, float]:
    """Return exchange rates vs USD, refreshed every 12 hours."""
    global _cache, _cached_at

    if _cache and (time.time() - _cached_at) < TTL:
        return _cache

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.get("https://open.er-api.com/v6/latest/USD")
            res.raise_for_status()
            data = res.json()
            raw: dict = data.get("rates", {})
            rates = {c: float(raw[c]) for c in SUPPORTED if c in raw}
            rates["USD"] = 1.0  # always accurate
            _cache = rates
            _cached_at = time.time()
            logger.info("Exchange rates refreshed from open.er-api.com")
            return rates
    except Exception:
        logger.exception("Failed to fetch exchange rates — using fallback")
        return FALLBACK_RATES


def convert(amount_usd: float, currency: str, rates: dict[str, float]) -> float:
    """Convert a USD amount to the target currency."""
    return amount_usd * rates.get(currency, FALLBACK_RATES.get(currency, 1.0))
