import uuid
from sqlalchemy import String, Text, Boolean, Integer, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Guide(Base):
    __tablename__ = "guides"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    title: Mapped[str | None] = mapped_column(String(200))
    bio: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(String(500))
    languages: Mapped[dict | None] = mapped_column(JSONB)
    specialities: Mapped[dict | None] = mapped_column(JSONB)
    certifications: Mapped[dict | None] = mapped_column(JSONB)
    years_exp: Mapped[int | None] = mapped_column(Integer)
    home_region: Mapped[str | None] = mapped_column(String(100))
    fun_fact: Mapped[str | None] = mapped_column(String(300))
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    review_count: Mapped[int] = mapped_column(Integer, default=0)
    avg_rating: Mapped[float | None] = mapped_column(Numeric(3, 2))
    created_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
