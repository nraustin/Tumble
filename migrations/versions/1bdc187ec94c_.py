"""empty message

Revision ID: 1bdc187ec94c
Revises: 
Create Date: 2022-04-25 13:42:08.359308

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1bdc187ec94c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('matchedRooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('biography', sa.Text(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('dog', sa.Boolean(), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
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
    op.create_table('matched_Users',
    sa.Column('matchedRoom_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['matchedRoom_id'], ['matchedRooms.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('matchedRoom_id', 'user_id')
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
    op.create_table('unlikes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('unliker_id', sa.Integer(), nullable=True),
    sa.Column('unliked_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['unliked_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['unliker_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('unlikes')
    op.drop_table('messages')
    op.drop_table('matched_Users')
    op.drop_table('likes')
    op.drop_table('images')
    op.drop_table('users')
    op.drop_table('matchedRooms')
    # ### end Alembic commands ###
