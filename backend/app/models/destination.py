import uuid
from sqlalchemy import String, Text, Boolean, Integer, Numeric, DECIMAL
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from app.database import Base


class Destination(Base):
    __tablename__ = "destinations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    tagline: Mapped[str | None] = mapped_column(String(300))
    description: Mapped[str | None] = mapped_column(Text)
    country: Mapped[str] = mapped_column(String(100), default="Kenya")
    region: Mapped[str | None] = mapped_column(String(100))
    cover_image: Mapped[str | None] = mapped_column(String(500))
    gallery: Mapped[dict] = mapped_column(JSONB, default=list)
    best_months: Mapped[dict | None] = mapped_column(JSONB)
    highlights: Mapped[dict | None] = mapped_column(JSONB)
    wildlife_list: Mapped[dict | None] = mapped_column(JSONB)
    latitude: Mapped[float | None] = mapped_column(Numeric(9, 6))
    longitude: Mapped[float | None] = mapped_column(Numeric(9, 6))
    peak_fee_usd: Mapped[float | None] = mapped_column(Numeric(10, 2))
    low_fee_usd: Mapped[float | None] = mapped_column(Numeric(10, 2))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    meta_title: Mapped[str | None] = mapped_column(String(300))
    meta_desc: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
