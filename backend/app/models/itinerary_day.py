import uuid
from sqlalchemy import String, Text, Integer, Numeric, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class ItineraryDay(Base):
    __tablename__ = "itinerary_days"
    __table_args__ = (UniqueConstraint("safari_id", "day_number"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    safari_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("safaris.id", ondelete="CASCADE"), nullable=False)
    day_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    meals: Mapped[dict | None] = mapped_column(JSONB)
    accommodation: Mapped[str | None] = mapped_column(String(200))
    accommodation_type: Mapped[str | None] = mapped_column(String(50))
    activities: Mapped[dict | None] = mapped_column(JSONB)
    distance_km: Mapped[int | None] = mapped_column(Integer)
    drive_hours: Mapped[float | None] = mapped_column(Numeric(3, 1))
    image: Mapped[str | None] = mapped_column(String(500))
