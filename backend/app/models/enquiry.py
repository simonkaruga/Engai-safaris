import uuid
from sqlalchemy import String, Text, Integer, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Enquiry(Base):
    __tablename__ = "enquiries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    safari_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("safaris.id"))
    source: Mapped[str | None] = mapped_column(String(100))
    ai_conversation: Mapped[dict | None] = mapped_column(JSONB)
    customer_name: Mapped[str] = mapped_column(String(200), nullable=False)
    customer_email: Mapped[str] = mapped_column(String(200), nullable=False)
    customer_phone: Mapped[str | None] = mapped_column(String(30))
    customer_country: Mapped[str | None] = mapped_column(String(100))
    travel_date_from: Mapped[str | None] = mapped_column(Date)
    travel_date_to: Mapped[str | None] = mapped_column(Date)
    flexibility: Mapped[str | None] = mapped_column(String(50))
    group_size: Mapped[int | None] = mapped_column(Integer)
    group_type: Mapped[str | None] = mapped_column(String(50))
    budget_usd: Mapped[str | None] = mapped_column(String(50))
    interests: Mapped[dict | None] = mapped_column(JSONB)
    dietary_req: Mapped[dict | None] = mapped_column(JSONB)
    medical_notes: Mapped[str | None] = mapped_column(Text)
    celebration: Mapped[str | None] = mapped_column(String(100))
    special_requests: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(30), default="new")
    quoted_amount_usd: Mapped[float | None] = mapped_column(Numeric(10, 2))
    follow_up_date: Mapped[str | None] = mapped_column(Date)
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
