import uuid
from sqlalchemy import String, Text, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    payment_type: Mapped[str] = mapped_column(String(20), default="deposit")
    pesapal_order_id: Mapped[str | None] = mapped_column(String(200))
    pesapal_tracking_id: Mapped[str | None] = mapped_column(String(200))
    amount_kes: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="KES")
    payment_method: Mapped[str | None] = mapped_column(String(50))
    phone_number: Mapped[str | None] = mapped_column(String(30))
    status: Mapped[str] = mapped_column(String(30), default="pending")
    failure_reason: Mapped[str | None] = mapped_column(Text)
    paid_at: Mapped[str | None] = mapped_column(DateTime(timezone=True))
    ipn_data: Mapped[dict | None] = mapped_column(JSONB)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
