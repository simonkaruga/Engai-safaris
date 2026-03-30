from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str
    JWT_SECRET: str
    JWT_EXPIRES_HOURS: int = 24

    PESAPAL_ENV: str = "sandbox"
    PESAPAL_KEY: str
    PESAPAL_SECRET: str
    PESAPAL_IPN_ID: str

    RESEND_API_KEY: str
    AT_USERNAME: str
    AT_API_KEY: str
    WHATSAPP_TOKEN: str = ""
    WHATSAPP_PHONE_ID: str = ""
    WHATSAPP_NUMBER: str = "+254000000000"

    ANTHROPIC_API_KEY: str

    API_URL: str = "http://localhost:8000"
    FRONTEND_URL: str = "http://localhost:3000"
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    MEILISEARCH_HOST: str = "http://localhost:7700"
    MEILISEARCH_KEY: str = "masterKey"

    AFFILIATE_COOKIE_DAYS: int = 30

    GOOGLE_CLIENT_ID: str = ""  # OAuth 2.0 client ID from Google Cloud Console

    # FX rate — update monthly via env var. Source: CBK / XE interbank mid.
    USD_TO_KES: float = 130.0

    # Resend audience ID for newsletter subscribers
    RESEND_AUDIENCE_ID: str = ""

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",")]


settings = Settings()
