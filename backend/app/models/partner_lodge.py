import uuid
from sqlalchemy import String, Text, Boolean, Integer, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class PartnerLodge(Base):
    __tablename__ = "partner_lodges"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    location: Mapped[str] = mapped_column(String(200), nullable=False)   # e.g. "Diani Beach, Kenya"
    destination_slug: Mapped[str] = mapped_column(String(100), nullable=False)  # links to destination
    tier: Mapped[str] = mapped_column(String(20), default="standard")    # budget|standard|luxury
    description: Mapped[str | None] = mapped_column(Text)
    amenities: Mapped[dict | None] = mapped_column(JSONB)
    price_usd_per_night: Mapped[float | None] = mapped_column(Numeric(10, 2))
    commission_pct: Mapped[int] = mapped_column(Integer, default=10)
    booking_email: Mapped[str | None] = mapped_column(String(200))
    website_url: Mapped[str | None] = mapped_column(String(500))
    photo_url: Mapped[str | None] = mapped_column(String(500))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
