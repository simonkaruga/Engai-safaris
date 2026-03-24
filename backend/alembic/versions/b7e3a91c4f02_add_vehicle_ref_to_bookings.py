"""add vehicle_ref to bookings

Revision ID: b7e3a91c4f02
Revises: 8304c411a313
Create Date: 2026-03-24 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa


revision = 'b7e3a91c4f02'
down_revision = '8304c411a313'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('bookings', sa.Column('vehicle_ref', sa.String(length=20), nullable=True))


def downgrade() -> None:
    op.drop_column('bookings', 'vehicle_ref')
