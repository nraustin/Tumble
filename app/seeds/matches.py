from app.models import db, matchedroom
from datetime import date

def seed_matchedrooms():
    matchedRoom1 = matchedroom()

    db.session.add(matchedRoom1)

    db.session.commit()

def undo_matchedrooms():
    db.session.execute('TRUNCATE matchedrooms RESTART IDENTITY CASCADE;')
    db.session.commit()
