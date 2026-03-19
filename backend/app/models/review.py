import uuid
from sqlalchemy import String, Text, Integer, Numeric, DateTime, Boolean, ForeignKey, SmallInteger
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("bookings.id"))
    safari_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("safaris.id"))
    guide_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("guides.id"))
    author_name: Mapped[str] = mapped_column(String(200), nullable=False)
    author_country: Mapped[str | None] = mapped_column(String(100))
    rating: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    guide_rating: Mapped[int | None] = mapped_column(SmallInteger)
    value_rating: Mapped[int | None] = mapped_column(SmallInteger)
    title: Mapped[str | None] = mapped_column(String(200))
    body: Mapped[str] = mapped_column(Text, nullable=False)
    trip_month: Mapped[str | None] = mapped_column(String(20))
    is_approved: Mapped[bool] = mapped_column(Boolean, default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
