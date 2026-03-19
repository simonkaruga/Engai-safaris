import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.database import Base
import app.models.destination   # noqa
import app.models.guide         # noqa
import app.models.safari        # noqa
import app.models.itinerary_day # noqa
import app.models.enquiry       # noqa
import app.models.booking       # noqa
import app.models.payment       # noqa
import app.models.review        # noqa
import app.models.blog          # noqa
import app.models.agent         # noqa
import app.models.affiliate     # noqa
import app.models.partner_lodge  # noqa

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

# Build a sync URL from the async DATABASE_URL in .env
from app.config import settings

_url = settings.DATABASE_URL
# asyncpg → psycopg2 dialect
_url = _url.replace("postgresql+asyncpg", "postgresql")
# Unix socket style: strip the host param and let libpq use PGHOST
if "host=/var/run/postgresql" in _url:
    _url = "postgresql:///engaisafaris"
    os.environ.setdefault("PGHOST", "/var/run/postgresql")

_sync_url = _url


def run_migrations_offline() -> None:
    context.configure(url=_sync_url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        {"sqlalchemy.url": _sync_url},
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
