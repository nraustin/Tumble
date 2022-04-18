from app.models import db, Like

def seed_likes():
    like1 = Like(
        liker_id=1,
        liked_id=3
    )

    like2 = Like(
        liker_id=3,
        liked_id=1
    )

    db.session.add(like1)
    db.session.add(like2)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()