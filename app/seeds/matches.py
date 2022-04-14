from app.models import db, matchedRoom
from datetime import date

def seed_matchedRooms():
    matchedRoom1 = matchedRoom(
        firstUser=1,
        secondUser=3
    )

    db.session.add(matchedRoom1)

    db.session.commit()

def undo_matchedRooms():
    db.session.execute('TRUNCATE matchedRooms RESTART IDENTITY CASCADE;')
    db.session.commit()
