from app.models import db, User
from datetime import date

today = date.today()

def seed_users():
    demo = User(
        name='Demo', 
        email='demo@aa.io', 
        password='password', 
        biography=
    '''
    Not looking for anything serious! 
    ''',
        dog=False,
        location='San Francisco, CA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y")
        )

    marnie = User(
        name='marnie', 
        email='marnie@aa.io', 
        password='password',
        biography=
    '''
    Leaning more towards larger dogs. My last Chihuahua gave me PTSD. Must be at least 6.2 lbs.
    ''',
        dog=False,
        location='Seattle, WA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    bobbie = User(
        name='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        biography=
    '''
    My Georgia bloodhound needs a friend. She's a playmate to anyone, just a little lonelier these days with the work load I've been under.  
    ''',
        dog=False,
        location='Arlen, TX',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    
    Spot = User(
        name='Spot', 
        email='spot@aa.io', 
        password='password', 
        biography=
    '''
    WOOF (Spot's own words. He loves squirrels, leftover ribs, dog parks and new smells. Owner must be present, attentive, and loving.)
    ''',
        dog=True,
        location='San Francisco, CA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y")
        )

    Scooby = User(
        name='Scooby', 
        email='scooby@aa.io', 
        password='password',
        biography=
    '''
    My owner and I are taking a break ever since he ate my last Scooby Snack. Yes, I made this profile myself. 
    ''',
        dog=True,
        location='Seattle, WA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Bella = User(
        name='Bella', 
        email='bella@aa.io', 
        password='password',
        biography=
    '''
    Hi! I'm a purebred, fully vaccinated, purebred Border Collie with all my paperwork!
    ''',
        dog=True,
        location='Oxford, MS',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Spot)
    db.session.add(Scooby)
    db.session.add(Bella)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
