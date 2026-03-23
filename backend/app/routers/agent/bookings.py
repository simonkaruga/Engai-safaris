from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.booking import Booking
from app.models.safari import Safari
from app.models.agent import Agent
from app.services.auth import require_agent
from app.services.pdf import generate_invoice_pdf
from app.routers.booking.bookings import BookingCreate, get_price_usd, get_season
from app.config import settings
from fastapi.responses import Response
import random, string, datetime

router = APIRouter(prefix="/agent", tags=["agent"])


@router.get("/bookings")
async def agent_bookings(db: AsyncSession = Depends(get_db), payload=Depends(require_agent)):
    result = await db.execute(
        select(Booking).where(Booking.agent_id == payload["sub"]).order_by(Booking.created_at.desc())
    )
    return result.scalars().all()


@router.get("/bookings/{booking_id}")
async def agent_booking_detail(booking_id: str, db: AsyncSession = Depends(get_db), payload=Depends(require_agent)):
    result = await db.execute(
        select(Booking).where(Booking.id == booking_id, Booking.agent_id == payload["sub"])
    )
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(404)
    return booking


@router.post("/bookings", status_code=201)
async def agent_create_booking(data: BookingCreate, db: AsyncSession = Depends(get_db), payload=Depends(require_agent)):
    agent_result = await db.execute(select(Agent).where(Agent.id == payload["sub"]))
    agent = agent_result.scalar_one_or_none()
    if not agent:
        raise HTTPException(403)

    safari_result = await db.execute(select(Safari).where(Safari.slug == data.safari_slug, Safari.is_active == True))
    safari = safari_result.scalar_one_or_none()
    if not safari:
        raise HTTPException(404, "Safari not found")

    date = datetime.date.fromisoformat(data.travel_date)
    pax = max(1, min(data.pax, safari.group_size_max))
    season, multiplier = get_season(date)

    # Agents use wholesale_usd price with their discount
    base_usd = float(safari.wholesale_usd) if safari.wholesale_usd else get_price_usd(safari, pax)
    if not base_usd:
        raise HTTPException(400, "No pricing available")

    discount = agent.discount_pct / 100
    total_usd = round(base_usd * multiplier * pax * (1 - discount), 2)
    total_kes = round(total_usd * settings.USD_TO_KES, 0)
    deposit_kes = round(total_kes * safari.deposit_pct / 100, 0)

    ref = "AGT-" + "".join(random.choices(string.digits, k=6))
    booking = Booking(
        reference=ref,
        safari_id=safari.id,
        agent_id=agent.id,
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        customer_phone=data.customer_phone,
        customer_country=data.customer_country,
        travel_date=date,
        pax=pax,
        season=season,
        season_multiplier=multiplier,
        base_price_usd=base_usd,
        total_usd=total_usd,
        total_kes=total_kes,
        deposit_kes=deposit_kes,
        balance_kes=total_kes - deposit_kes,
        addons_total_kes=0,
        currency="KES",
        booking_type="b2b",
        installments=False,
        status="confirmed",
    )
    db.add(booking)
    await db.commit()
    return {"reference": ref, "total_kes": total_kes, "deposit_kes": deposit_kes}


@router.get("/invoices")
async def agent_invoices(db: AsyncSession = Depends(get_db), payload=Depends(require_agent)):
    result = await db.execute(
        select(
            func.date_trunc("month", Booking.created_at).label("month"),
            func.count(Booking.id).label("bookings"),
            func.sum(Booking.total_kes).label("total_kes"),
        )
        .where(Booking.agent_id == payload["sub"])
        .group_by("month")
        .order_by("month")
    )
    return [{"month": str(r.month), "bookings": r.bookings, "total_kes": float(r.total_kes or 0)} for r in result]


@router.get("/invoices/{month}/pdf")
async def agent_invoice_pdf(month: str, db: AsyncSession = Depends(get_db), payload=Depends(require_agent)):
    agent_result = await db.execute(select(Agent).where(Agent.id == payload["sub"]))
    agent = agent_result.scalar_one_or_none()
    if not agent:
        raise HTTPException(403)

    try:
        start = datetime.date.fromisoformat(f"{month}-01")
        end = (start.replace(day=28) + datetime.timedelta(days=4)).replace(day=1)
    except ValueError:
        raise HTTPException(400, "Invalid month format — use YYYY-MM")

    result = await db.execute(
        select(Booking).where(
            Booking.agent_id == payload["sub"],
            Booking.created_at >= start,
            Booking.created_at < end,
        )
    )
    bookings = result.scalars().all()
    total_kes = sum(float(b.total_kes) for b in bookings)

    pdf_bytes = generate_invoice_pdf(
        agent={"company_name": agent.company_name, "contact_name": agent.contact_name, "email": agent.email},
        bookings=[{"reference": b.reference, "travel_date": str(b.travel_date), "pax": b.pax, "total_kes": float(b.total_kes)} for b in bookings],
        total_kes=total_kes,
    )
    return Response(content=pdf_bytes, media_type="application/pdf",
                    headers={"Content-Disposition": f"attachment; filename=invoice-{month}.pdf"})
