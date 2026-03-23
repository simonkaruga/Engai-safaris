import uuid
from decimal import Decimal
from sqlalchemy import String, Text, Integer, Numeric, Date, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    enquiry_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("enquiries.id"))
    safari_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("safaris.id"), nullable=False)
    agent_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("agents.id"))
    guide_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("guides.id"))
    affiliate_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("affiliates.id"))
    customer_name: Mapped[str] = mapped_column(String(200), nullable=False)
    customer_email: Mapped[str] = mapped_column(String(200), nullable=False)
    customer_phone: Mapped[str] = mapped_column(String(30), nullable=False)
    customer_country: Mapped[str | None] = mapped_column(String(100))
    dietary_req: Mapped[dict | None] = mapped_column(JSONB)
    celebration: Mapped[str | None] = mapped_column(String(100))
    promo_code: Mapped[str | None] = mapped_column(String(50))
    travel_date: Mapped[str] = mapped_column(Date, nullable=False)
    pax: Mapped[int] = mapped_column(Integer, nullable=False)
    season: Mapped[str | None] = mapped_column(String(20))
    base_price_usd: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    season_multiplier: Mapped[Decimal | None] = mapped_column(Numeric(4, 2))
    total_usd: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    total_kes: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    deposit_kes: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    balance_kes: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    addons_total_kes: Mapped[Decimal] = mapped_column(Numeric(10, 2), default=Decimal("0"))
    currency: Mapped[str] = mapped_column(String(3), default="KES")
    booking_type: Mapped[str] = mapped_column(String(10), default="b2c")
    installments: Mapped[bool] = mapped_column(Boolean, default=False)
    installment_plan: Mapped[dict | None] = mapped_column(JSONB)
    status: Mapped[str] = mapped_column(String(30), default="pending")
    itinerary_pdf: Mapped[str | None] = mapped_column(String(500))
    voucher_pdf: Mapped[str | None] = mapped_column(String(500))
    memories_url: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
