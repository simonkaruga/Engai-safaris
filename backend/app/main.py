import logging
from fastapi import FastAPI

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
)

from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import settings
from app.routers.public import safaris, destinations, guides, reviews, blog, enquiries, ai_planner, partner_lodges, availability, currency as currency_router, contact as contact_router, newsletter as newsletter_router, memories as memories_router
from app.routers.booking import payments, bookings
from app.routers.agent import auth as agent_auth, bookings as agent_bookings
from app.routers.admin import (
    auth as admin_auth, dashboard, enquiries as admin_enquiries, availability as admin_availability,
    safaris as admin_safaris, guides as admin_guides, blog as admin_blog,
    destinations as admin_destinations, reviews as admin_reviews,
    bookings as admin_bookings, agents as admin_agents, affiliates as admin_affiliates,
)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Engai Safaris API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Public
app.include_router(safaris.router, prefix="/api")
app.include_router(destinations.router, prefix="/api")
app.include_router(guides.router, prefix="/api")
app.include_router(reviews.router, prefix="/api")
app.include_router(blog.router, prefix="/api")
app.include_router(enquiries.router, prefix="/api")
app.include_router(ai_planner.router, prefix="/api")
app.include_router(partner_lodges.router, prefix="/api")

app.include_router(availability.router, prefix="/api")
app.include_router(currency_router.router, prefix="/api")
app.include_router(contact_router.router, prefix="/api")
app.include_router(newsletter_router.router, prefix="/api")
app.include_router(memories_router.router, prefix="/api")

# Booking
app.include_router(payments.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")

# Agent
app.include_router(agent_auth.router, prefix="/api")
app.include_router(agent_bookings.router, prefix="/api")

# Admin
app.include_router(admin_auth.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(admin_enquiries.router, prefix="/api")
app.include_router(admin_availability.router, prefix="/api")
app.include_router(admin_safaris.router, prefix="/api")
app.include_router(admin_guides.router, prefix="/api")
app.include_router(admin_blog.router, prefix="/api")
app.include_router(admin_destinations.router, prefix="/api")
app.include_router(admin_reviews.router, prefix="/api")
app.include_router(admin_bookings.router, prefix="/api")
app.include_router(admin_agents.router, prefix="/api")
app.include_router(admin_affiliates.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "engai-safaris-api"}
