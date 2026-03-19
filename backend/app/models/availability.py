import uuid
from sqlalchemy import String, Integer, Date, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.database import Base


class SafariAvailability(Base):
    __tablename__ = "safari_availability"
    __table_args__ = (UniqueConstraint("safari_id", "date"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    safari_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("safaris.id", ondelete="CASCADE"), nullable=False)
    date: Mapped[str] = mapped_column(Date, nullable=False)
    # available | blocked | full
    status: Mapped[str] = mapped_column(String(20), default="available", nullable=False)
    spots_left: Mapped[int | None] = mapped_column(Integer)
    note: Mapped[str | None] = mapped_column(String(200))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
