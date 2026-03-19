import uuid
from sqlalchemy import String, Text, Integer, Numeric, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Affiliate(Base):
    __tablename__ = "affiliates"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    type: Mapped[str | None] = mapped_column(String(50))
    platform: Mapped[str | None] = mapped_column(String(100))
    commission_pct: Mapped[int] = mapped_column(Integer, default=5)
    utm_code: Mapped[str | None] = mapped_column(String(50), unique=True)
    total_earned: Mapped[float] = mapped_column(Numeric(10, 2), default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    payment_details: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())


class MemoryAlbum(Base):
    __tablename__ = "memory_albums"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    photos: Mapped[dict] = mapped_column(JSONB, default=list)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    view_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())


class GiftVoucher(Base):
    __tablename__ = "gift_vouchers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    amount_kes: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    purchaser_email: Mapped[str] = mapped_column(String(200), nullable=False)
    recipient_name: Mapped[str | None] = mapped_column(String(200))
    message: Mapped[str | None] = mapped_column(Text)
    is_redeemed: Mapped[bool] = mapped_column(Boolean, default=False)
    redeemed_at: Mapped[str | None] = mapped_column(DateTime(timezone=True))
    expires_at: Mapped[str | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
