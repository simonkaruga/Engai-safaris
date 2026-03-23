from __future__ import annotations
import uuid
from datetime import date, datetime
from decimal import Decimal
from pydantic import BaseModel, EmailStr, field_validator
from typing import Any


# ── Destination ──────────────────────────────────────────────────────────────

class DestinationOut(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    tagline: str | None
    description: str | None
    country: str
    region: str | None
    cover_image: str | None
    gallery: list[Any]
    best_months: Any
    highlights: Any
    wildlife_list: Any
    latitude: float | None
    longitude: float | None
    peak_fee_usd: float | None
    low_fee_usd: float | None
    meta_title: str | None
    meta_desc: str | None

    model_config = {"from_attributes": True}


# ── Guide ─────────────────────────────────────────────────────────────────────

class GuideOut(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    title: str | None
    bio: str | None
    photo_url: str | None
    languages: Any
    specialities: Any
    certifications: Any
    years_exp: int | None
    home_region: str | None
    fun_fact: str | None
    is_featured: bool
    review_count: int
    avg_rating: float | None

    model_config = {"from_attributes": True}


# ── Safari ────────────────────────────────────────────────────────────────────

class ItineraryDayOut(BaseModel):
    day_number: int
    title: str
    description: str | None
    meals: Any
    accommodation: str | None
    accommodation_type: str | None
    activities: Any
    distance_km: int | None
    drive_hours: float | None
    image: str | None

    model_config = {"from_attributes": True}


class SafariListOut(BaseModel):
    id: uuid.UUID
    slug: str
    name: str
    tagline: str | None
    category: str | None
    duration_days: int
    price_usd_2pax: float | None
    price_kes_2pax: float | None
    cover_image: str | None
    is_featured: bool
    is_shared: bool

    model_config = {"from_attributes": True}


class SafariDetailOut(SafariListOut):
    description: str | None
    group_size_max: int
    price_usd_solo: float | None
    price_usd_4pax: float | None
    price_usd_6pax: float | None
    price_kes_solo: float | None
    price_kes_4pax: float | None
    price_kes_6pax: float | None
    deposit_pct: int
    installments_ok: bool
    video_url: str | None
    gallery: list[Any]
    highlights: Any
    inclusions: Any
    exclusions: Any
    what_to_bring: Any
    cancellation_policy: str | None
    meta_title: str | None
    meta_desc: str | None
    itinerary_days: list[ItineraryDayOut] = []
    has_beach_extension: bool = False
    beach_extension_days: int | None = None
    beach_extension_price_usd: float | None = None
    beach_extension_price_kes: float | None = None
    beach_extension_desc: str | None = None


# ── Enquiry ───────────────────────────────────────────────────────────────────

class EnquiryCreate(BaseModel):
    safari_id: uuid.UUID | None = None
    source: str | None = None
    ai_conversation: list[Any] | None = None
    customer_name: str
    customer_email: EmailStr
    customer_phone: str | None = None
    customer_country: str | None = None
    travel_date_from: date | None = None
    travel_date_to: date | None = None
    flexibility: str | None = None
    group_size: int | None = None
    group_type: str | None = None
    budget_usd: str | None = None
    interests: list[str] | None = None
    dietary_req: list[str] | None = None
    medical_notes: str | None = None
    celebration: str | None = None
    special_requests: str | None = None


class EnquiryOut(BaseModel):
    id: uuid.UUID
    reference: str
    status: str
    customer_name: str
    customer_email: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Review ────────────────────────────────────────────────────────────────────

class ReviewCreate(BaseModel):
    booking_id: uuid.UUID | None = None
    safari_id: uuid.UUID | None = None
    guide_id: uuid.UUID | None = None
    author_name: str
    author_country: str | None = None
    rating: int
    guide_rating: int | None = None
    value_rating: int | None = None
    title: str | None = None
    body: str
    trip_month: str | None = None

    @field_validator("rating", "guide_rating", "value_rating", mode="before")
    @classmethod
    def check_rating(cls, v):
        if v is not None and not (1 <= v <= 5):
            raise ValueError("Rating must be 1–5")
        return v


class ReviewOut(BaseModel):
    id: uuid.UUID
    author_name: str
    author_country: str | None
    rating: int
    guide_rating: int | None
    value_rating: int | None
    title: str | None
    body: str
    trip_month: str | None
    is_featured: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Auth ──────────────────────────────────────────────────────────────────────

class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Payment ───────────────────────────────────────────────────────────────────

class PaymentInitiate(BaseModel):
    booking_id: uuid.UUID
    payment_type: str = "deposit"
    phone_number: str | None = None


class PaymentOut(BaseModel):
    id: uuid.UUID
    status: str
    redirect_url: str | None = None

    model_config = {"from_attributes": True}


# ── AI Planner ────────────────────────────────────────────────────────────────

class AIPlannerRequest(BaseModel):
    conversation: list[dict[str, str]]
