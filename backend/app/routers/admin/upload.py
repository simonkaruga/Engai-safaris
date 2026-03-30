from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from app.services.auth import require_admin
from app.config import settings
import cloudinary
import cloudinary.uploader

router = APIRouter(prefix="/admin/upload", tags=["admin"])


def _configure():
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
    )


@router.post("")
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Form(default="engai"),
    _=Depends(require_admin),
):
    if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY:
        raise HTTPException(status_code=501, detail="Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env")

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    if file.size and file.size > 20 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Maximum 20MB.")

    _configure()
    contents = await file.read()

    try:
        result = cloudinary.uploader.upload(
            contents,
            folder=f"engaisafaris/{folder}",
            resource_type="image",
            quality="auto:good",
            fetch_format="auto",
        )
        return {"url": result["secure_url"], "public_id": result["public_id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
