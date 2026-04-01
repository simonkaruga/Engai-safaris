"""add cost tracking to safaris

Revision ID: d1f8a29c4e05
Revises: c3e07f73f0fc
Create Date: 2026-04-01 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

revision = 'd1f8a29c4e05'
down_revision = 'c3e07f73f0fc'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('safaris', sa.Column('cost_park_fees_usd', sa.Numeric(10, 2), nullable=True))
    op.add_column('safaris', sa.Column('cost_accommodation_usd', sa.Numeric(10, 2), nullable=True))
    op.add_column('safaris', sa.Column('cost_vehicle_usd', sa.Numeric(10, 2), nullable=True))
    op.add_column('safaris', sa.Column('cost_insurance_usd', sa.Numeric(10, 2), nullable=True))
    op.add_column('safaris', sa.Column('cost_evac_usd', sa.Numeric(10, 2), nullable=True))


def downgrade() -> None:
    op.drop_column('safaris', 'cost_evac_usd')
    op.drop_column('safaris', 'cost_insurance_usd')
    op.drop_column('safaris', 'cost_vehicle_usd')
    op.drop_column('safaris', 'cost_accommodation_usd')
    op.drop_column('safaris', 'cost_park_fees_usd')
