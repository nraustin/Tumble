from app.models.db import db, environment, SCHEMA
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .messages import seed_messages, undo_messages
from .matches import seed_matchedRooms, undo_matchedRooms
from .images import seed_images, undo_images
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.matchedRooms RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_images()
    seed_likes()
    seed_matchedRooms()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_images()
    undo_likes()
    undo_matchedRooms()
    undo_messages()
    

    # Add other undo functions here
