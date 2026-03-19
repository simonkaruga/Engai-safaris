import uuid
from sqlalchemy import String, Text, Boolean, Integer, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Safari(Base):
    __tablename__ = "safaris"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    tagline: Mapped[str | None] = mapped_column(String(300))
    description: Mapped[str | None] = mapped_column(Text)
    category: Mapped[str | None] = mapped_column(String(50))
    duration_days: Mapped[int] = mapped_column(Integer, nullable=False)
    group_size_max: Mapped[int] = mapped_column(Integer, default=6)

    price_usd_solo: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_usd_2pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_usd_4pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_usd_6pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_kes_solo: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_kes_2pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_kes_4pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    price_kes_6pax: Mapped[float | None] = mapped_column(Numeric(10, 2))
    wholesale_usd: Mapped[float | None] = mapped_column(Numeric(10, 2))

    peak_multiplier: Mapped[float] = mapped_column(Numeric(4, 2), default=1.35)
    low_multiplier: Mapped[float] = mapped_column(Numeric(4, 2), default=0.75)

    deposit_pct: Mapped[int] = mapped_column(Integer, default=30)
    installments_ok: Mapped[bool] = mapped_column(Boolean, default=True)

    cover_image: Mapped[str | None] = mapped_column(String(500))
    video_url: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[dict] = mapped_column(JSONB, default=list)
    highlights: Mapped[dict | None] = mapped_column(JSONB)
    inclusions: Mapped[dict | None] = mapped_column(JSONB)
    exclusions: Mapped[dict | None] = mapped_column(JSONB)
    what_to_bring: Mapped[dict | None] = mapped_column(JSONB)
    cancellation_policy: Mapped[str | None] = mapped_column(Text)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    meta_title: Mapped[str | None] = mapped_column(String(300))
    meta_desc: Mapped[str | None] = mapped_column(String(500))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    # Beach extension add-on
    has_beach_extension: Mapped[bool] = mapped_column(Boolean, default=False)
    beach_extension_days: Mapped[int | None] = mapped_column(Integer)
    beach_extension_price_usd: Mapped[float | None] = mapped_column(Numeric(10, 2))
    beach_extension_price_kes: Mapped[float | None] = mapped_column(Numeric(10, 2))
    beach_extension_desc: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
