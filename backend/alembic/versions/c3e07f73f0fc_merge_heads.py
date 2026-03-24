"""merge heads

Revision ID: c3e07f73f0fc
Revises: a4272217c3d6, b7e3a91c4f02
Create Date: 2026-03-24 09:55:51.946509
"""
from alembic import op
import sqlalchemy as sa


revision = 'c3e07f73f0fc'
down_revision = ('a4272217c3d6', 'b7e3a91c4f02')
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
