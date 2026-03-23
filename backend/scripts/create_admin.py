"""
Run: python scripts/create_admin.py
"""
import asyncio, sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.database import SessionLocal
from app.models.agent import Admin
from app.services.auth import hash_password

EMAIL = os.getenv("ADMIN_EMAIL", "admin@engaisafaris.com")
PASSWORD = os.getenv("ADMIN_PASSWORD", "change-me-immediately")
NAME = os.getenv("ADMIN_NAME", "Engai Admin")


async def create():
    from sqlalchemy import select
    async with SessionLocal() as db:
        existing = (await db.execute(select(Admin).where(Admin.email == EMAIL))).scalar_one_or_none()
        if existing:
            print(f"ℹ️  Admin already exists: {EMAIL}")
            return
        admin = Admin(email=EMAIL, password_hash=hash_password(PASSWORD), name=NAME)
        db.add(admin)
        await db.commit()
        print(f"✅ Admin created: {EMAIL}")


asyncio.run(create())
