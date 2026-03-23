from fastapi import APIRouter
from app.services.currency import get_rates, SUPPORTED

router = APIRouter(prefix="/currency", tags=["currency"])


@router.get("/rates")
async def exchange_rates():
    """Return live USD-based exchange rates for all 11 supported currencies.
    Cached server-side for 12 hours. Used by the frontend currency switcher."""
    rates = await get_rates()
    return {"base": "USD", "currencies": SUPPORTED, "rates": rates}
