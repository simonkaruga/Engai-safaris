from datetime import date
from decimal import Decimal

PEAK_MONTHS = {7, 8, 9, 10}
LOW_MONTHS = {4, 5, 11}


def get_season_multiplier(travel_date: date) -> Decimal:
    m, d = travel_date.month, travel_date.day
    if m == 12 and d >= 20:
        return Decimal("1.50")
    if m == 1 and d <= 5:
        return Decimal("1.50")
    if m in PEAK_MONTHS:
        return Decimal("1.40")
    if m in LOW_MONTHS:
        return Decimal("0.75")
    return Decimal("1.00")


def _season_name(travel_date: date) -> str:
    m, d = travel_date.month, travel_date.day
    if (m == 12 and d >= 20) or (m == 1 and d <= 5):
        return "holiday"
    if m in PEAK_MONTHS:
        return "peak"
    if m in LOW_MONTHS:
        return "low"
    return "standard"


def get_group_multiplier(pax: int) -> Decimal:
    if pax == 1:
        return Decimal("1.00")
    if pax == 2:
        return Decimal("0.90")
    if pax <= 4:
        return Decimal("0.82")
    return Decimal("0.75")


def calculate_price(base_price_usd: Decimal, travel_date: date, pax: int) -> dict:
    season_mult = get_season_multiplier(travel_date)
    group_mult = get_group_multiplier(pax)
    per_person = base_price_usd * season_mult * group_mult
    return {
        "per_person_usd": round(per_person, 2),
        "total_usd": round(per_person * pax, 2),
        "season": _season_name(travel_date),
        "multiplier": float(season_mult),
    }
