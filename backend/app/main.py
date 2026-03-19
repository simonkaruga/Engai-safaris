from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import settings
from app.routers.public import safaris, destinations, guides, reviews, blog, enquiries, ai_planner, partner_lodges, availability
from app.routers.booking import payments
from app.routers.agent import auth as agent_auth
from app.routers.admin import auth as admin_auth, dashboard, enquiries as admin_enquiries, availability as admin_availability

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

# Booking
app.include_router(payments.router, prefix="/api")

# Agent
app.include_router(agent_auth.router, prefix="/api")

# Admin
app.include_router(admin_auth.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(admin_enquiries.router, prefix="/api")
app.include_router(admin_availability.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "engai-safaris-api"}
