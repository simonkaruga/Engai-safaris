from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from app.database import get_db
from app.models.safari import Safari
from app.models.availability import SafariAvailability
from app.services.auth import require_admin
from pydantic import BaseModel
import datetime

router = APIRouter(prefix="/admin/availability", tags=["admin-availability"])


class AvailabilitySet(BaseModel):
    date: str          # YYYY-MM-DD
    status: str        # available | blocked | full
    spots_left: int | None = None
    note: str | None = None


@router.get("/{slug}")
async def list_availability(
    slug: str,
    month: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    result = await db.execute(select(Safari.id).where(Safari.slug == slug))
    safari_id = result.scalar_one_or_none()
    if not safari_id:
        raise HTTPException(404, "Safari not found")

    from sqlalchemy import extract
    year, mon = int(month.split("-")[0]), int(month.split("-")[1])
    result = await db.execute(
        select(SafariAvailability).where(
            SafariAvailability.safari_id == safari_id,
            extract("year", SafariAvailability.date) == year,
            extract("month", SafariAvailability.date) == mon,
        )
    )
    rows = result.scalars().all()
    return [{"date": str(r.date), "status": r.status, "spots_left": r.spots_left, "note": r.note} for r in rows]


@router.post("/{slug}")
async def set_availability(
    slug: str,
    data: AvailabilitySet,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    result = await db.execute(select(Safari.id).where(Safari.slug == slug))
    safari_id = result.scalar_one_or_none()
    if not safari_id:
        raise HTTPException(404, "Safari not found")

    date = datetime.date.fromisoformat(data.date)

    result = await db.execute(
        select(SafariAvailability).where(
            SafariAvailability.safari_id == safari_id,
            SafariAvailability.date == date,
        )
    )
    row = result.scalar_one_or_none()
    if row:
        row.status = data.status
        row.spots_left = data.spots_left
        row.note = data.note
    else:
        db.add(SafariAvailability(
            safari_id=safari_id,
            date=date,
            status=data.status,
            spots_left=data.spots_left,
            note=data.note,
        ))
    await db.commit()
    return {"ok": True, "date": data.date, "status": data.status}


@router.delete("/{slug}/{date}")
async def delete_availability(
    slug: str,
    date: str,
    db: AsyncSession = Depends(get_db),
    _=Depends(require_admin),
):
    result = await db.execute(select(Safari.id).where(Safari.slug == slug))
    safari_id = result.scalar_one_or_none()
    if not safari_id:
        raise HTTPException(404, "Safari not found")

    await db.execute(
        delete(SafariAvailability).where(
            SafariAvailability.safari_id == safari_id,
            SafariAvailability.date == datetime.date.fromisoformat(date),
        )
    )
    await db.commit()
    return {"ok": True}
