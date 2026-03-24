import logging
from datetime import date
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.services.auth import require_admin

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])


def _next_vehicle_ref(existing_refs: list[str]) -> str:
    """Generate next VEH-YYYY-NNN ref. Scans existing refs for this year's max sequence."""
    current_year = date.today().year
    prefix = f"VEH-{current_year}-"
    max_seq = 0
    for ref in existing_refs:
        if ref and ref.startswith(prefix):
            try:
                seq = int(ref[len(prefix):])
                if seq > max_seq:
                    max_seq = seq
            except ValueError:
                pass
    return f"{prefix}{max_seq + 1:03d}"


def _booking_to_dict(b: Booking) -> dict:
    return {
        "id": str(b.id),
        "reference": b.reference,
        "safari_id": str(b.safari_id),
        "customer_name": b.customer_name,
        "customer_email": b.customer_email,
        "customer_phone": b.customer_phone,
        "travel_date": str(b.travel_date),
        "pax": b.pax,
        "status": b.status,
        "total_kes": float(b.total_kes) if b.total_kes is not None else None,
        "vehicle_ref": b.vehicle_ref,
        "booking_type": b.booking_type,
        "base_price_usd": float(b.base_price_usd) if b.base_price_usd is not None else None,
    }


@router.get("/vehicle-groups")
async def list_vehicle_groups(
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
) -> list[dict]:
    """Return all unique vehicle_refs with their bookings grouped."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.vehicle_ref.isnot(None))
        .order_by(Booking.vehicle_ref, Booking.travel_date)
    )
    rows = result.all()

    groups: dict[str, dict[str, Any]] = {}
    for booking, safari in rows:
        ref = booking.vehicle_ref
        if ref not in groups:
            groups[ref] = {
                "vehicle_ref": ref,
                "bookings": [],
                "total_pax": 0,
                "departure_date": str(booking.travel_date),
                "safari_name": safari.name,
                "status_counts": {},
            }
        groups[ref]["bookings"].append(_booking_to_dict(booking))
        groups[ref]["total_pax"] += booking.pax or 0
        status = booking.status or "unknown"
        groups[ref]["status_counts"][status] = groups[ref]["status_counts"].get(status, 0) + 1

    output = []
    for ref, group in groups.items():
        status_parts = [f"{count} {status}" for status, count in group["status_counts"].items()]
        output.append({
            "vehicle_ref": group["vehicle_ref"],
            "bookings": group["bookings"],
            "total_pax": group["total_pax"],
            "departure_date": group["departure_date"],
            "safari_name": group["safari_name"],
            "status_summary": ", ".join(status_parts),
        })

    # Sort by departure date ascending
    output.sort(key=lambda g: g["departure_date"])
    return output


@router.patch("/bookings/{booking_id}/assign-vehicle")
async def assign_vehicle(
    booking_id: str,
    data: dict,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    """Assign or remove vehicle_ref on a booking. Send vehicle_ref: null to unassign."""
    result = await db.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(404, "Booking not found")

    vehicle_ref = data.get("vehicle_ref")  # None = unassign
    booking.vehicle_ref = vehicle_ref
    await db.commit()
    await db.refresh(booking)
    return _booking_to_dict(booking)


@router.post("/vehicle-groups/next-ref")
async def generate_next_ref(
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
) -> dict:
    """Return the next available VEH-YYYY-NNN reference."""
    result = await db.execute(
        select(Booking.vehicle_ref).where(Booking.vehicle_ref.isnot(None)).distinct()
    )
    existing = [row[0] for row in result.all()]
    return {"vehicle_ref": _next_vehicle_ref(existing)}


@router.post("/vehicle-groups/auto-suggest")
async def auto_suggest_groups(
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
) -> list[dict]:
    """Find unassigned bookings sharing the same safari + travel_date — suggest groupings."""
    result = await db.execute(
        select(Booking, Safari)
        .join(Safari, Booking.safari_id == Safari.id)
        .where(Booking.vehicle_ref.is_(None))
        .where(Booking.status.in_(["pending", "confirmed"]))
        .order_by(Booking.safari_id, Booking.travel_date)
    )
    rows = result.all()

    # Group by (safari_id, travel_date)
    buckets: dict[tuple, dict] = {}
    for booking, safari in rows:
        key = (str(booking.safari_id), str(booking.travel_date))
        if key not in buckets:
            buckets[key] = {
                "safari_name": safari.name,
                "safari_slug": safari.slug,
                "departure_date": str(booking.travel_date),
                "bookings": [],
                "total_pax": 0,
            }
        buckets[key]["bookings"].append(_booking_to_dict(booking))
        buckets[key]["total_pax"] += booking.pax or 0

    # Only return buckets with 2+ bookings (worth grouping)
    suggestions = [v for v in buckets.values() if len(v["bookings"]) >= 2]
    suggestions.sort(key=lambda g: g["departure_date"])
    return suggestions
