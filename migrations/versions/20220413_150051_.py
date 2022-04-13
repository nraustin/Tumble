"""empty message

Revision ID: 71f129f07c96
Revises: ffdc0a98111c
Create Date: 2022-04-13 15:00:51.211440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '71f129f07c96'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('userImage', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('liker_id', sa.Integer(), nullable=True),
    sa.Column('liked_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['liked_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['liker_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('matchedRooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstUser', sa.Integer(), nullable=False),
    sa.Column('secondUser', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['firstUser'], ['users.id'], ),
    sa.ForeignKeyConstraint(['secondUser'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('match_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['match_id'], ['matchedRooms.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('biography', sa.Text(), nullable=False))
    op.add_column('users', sa.Column('location', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'location')
    op.drop_column('users', 'biography')
    op.drop_table('messages')
    op.drop_table('matchedRooms')
    op.drop_table('likes')
    op.drop_table('images')
    # ### end Alembic commands ###
