from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.config import settings

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer = HTTPBearer()


def hash_password(plain: str) -> str:
    return pwd.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd.verify(plain, hashed)


def create_token(subject: str, role: str) -> str:
    return jwt.encode(
        {"sub": subject, "role": role, "exp": datetime.now(timezone.utc) + timedelta(hours=settings.JWT_EXPIRES_HOURS)},
        settings.JWT_SECRET,
        algorithm="HS256",
    )


def _decode(token: str) -> dict:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


async def require_admin(token=Depends(bearer)) -> dict:
    payload = _decode(token.credentials)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return payload


async def require_agent(token=Depends(bearer)) -> dict:
    payload = _decode(token.credentials)
    if payload.get("role") != "agent":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return payload
