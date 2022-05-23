from app.models import db, User
from datetime import date

today = date.today()

def seed_users():
    demo = User(
        name='Demo',
        dog=False 
        email='demo@aa.io', 
        password='password', 
        biography=
    '''
    Not looking for anything serious! 
    ''',
        age=22,
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
        age=31,
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
        age=15,
        dog=False,
        location='Arlen, TX',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    scottie = User(
        name='scottie', 
        email='scottie@aa.io', 
        password='password',
        biography=
    '''
    Maecenas fringilla cursus ultricies. Pellentesque suscipit, arcu in porttitor vestibulum, mauris magna blandit erat, ut feugiat odio arcu vitae enim.  
    ''',
        age=27,
        dog=False,
        location='Santiago, Chile',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    arnie = User(
        name='arnie', 
        email='arnie@aa.io', 
        password='password',
        biography=
    '''
    Aliquam erat volutpat. Morbi nulla odio, fringilla fermentum tortor nec, laoreet feugiat orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
    ''',
        age=31,
        dog=False,
        location='Brussels, Belgium',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    
    vinnie = User(
        name='vinnie', 
        email='vinnie@aa.io', 
        password='password', 
        biography=
    '''
    Curabitur est ex, porta quis lorem pharetra, ullamcorper efficitur elit.
    ''',
        age=19,
        dog=False,
        location='Portland, OR',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y")
        )
    jackie = User(
        name='jackie', 
        email='jackie@aa.io', 
        password='password',
        biography=
    '''
    Etiam scelerisque purus id neque feugiat tristique. Fusce ante lorem, laoreet quis lorem sit amet, facilisis gravida risus.  
    ''',
        age=39,
        dog=False,
        location='Scottsdale, AZ',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    
    kenny = User(
        name='Kenny', 
        email='kenny@aa.io', 
        password='password', 
        biography=
    '''
    Fusce ante lorem, laoreet quis lorem sit amet, facilisis gravida risus. Nullam eleifend, lacus tristique finibus bibendum, nunc ligula vulputate nisl, a fermentum lacus massa vel nulla.
    ''',
        age=22,
        dog=False,
        location='Compton, CA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y")
        )
    jamie = User(
        name='Jamie', 
        email='jamie@aa.io', 
        password='password',
        biography=
    '''
    Etiam scelerisque purus id neque feugiat tristique. Fusce ante lorem, laoreet quis lorem sit amet, facilisis gravida risus.  
    ''',
        age=39,
        dog=False,
        location='El Paso, TX',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    
    jeffrey = User(
        name='Ricky', 
        email='ricky@aa.io', 
        password='password', 
        biography=
    '''
    Fusce ante lorem, laoreet quis lorem sit amet, facilisis gravida risus. Nullam eleifend, lacus tristique finibus bibendum, nunc ligula vulputate nisl, a fermentum lacus massa vel nulla.
    ''',
        age=22,
        dog=False,
        location='NYC, NY',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y")
        )



    DemoDog = User(
        name='DemoDog', 
        email='demodog@aa.io', 
        password='password',
        biography=
    '''
    Looking for something serious! 
    ''',
        age=5,
        dog=True,
        location='Provo, UT',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    

    Scooby = User(
        name='Scooby', 
        email='scooby@aa.io', 
        password='password',
        biography=
    '''
    My owner and I are taking a break ever since he ate my last Scooby Snack. 
    ''',
        age=7,
        dog=True,
        location='Chicago, IL',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Bella = User(
        name='Bella', 
        email='bella@aa.io', 
        password='password',
        biography=
    '''
    Hi! I'm a purebred and fully vaccinated with all my paperwork!
    ''',
        age=1,
        dog=True,
        location='Oxford, MS',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Spot = User(
        name='Spot', 
        email='spot@aa.io', 
        password='password',
        biography=
    '''
    Kennel trained and everything.
    ''',
        age=3,
        dog=True,
        location='Fort Worth, TX',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Zoe = User(
        name='Zoe', 
        email='zoe@aa.io', 
        password='password',
        biography=
    '''
    Lorem ipsum bark, woof growl, bark bark woof.
    ''',
        age=1,
        dog=True,
        location='Barcelona, Spain',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Charlie = User(
        name='Charlie', 
        email='charlie@aa.io', 
        password='password',
        biography=
    '''
    Sed finibus augue a tincidunt sollicitudin. Proin eu rutrum elit.
    ''',
        age=4,
        dog=True,
        location='Colombo, Sri Lanka',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Mac = User(
        name='Mac', 
        email='mac@aa.io', 
        password='password',
        biography=
    '''
    Donec semper eu nulla et ullamcorper. Proin iaculis tellus vitae ante consectetur, vel vehicula odio vehicula. Nulla elementum consectetur pharetra.
    ''',
        age=9,
        dog=True,
        location='Boston, MA',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Daisy = User(
        name='Daisy', 
        email='daisy@aa.io', 
        password='password',
        biography=
    '''
    Maecenas euismod malesuada felis sed laoreet.
    ''',
        age=5,
        dog=True,
        location='Bismarck, ND',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

    Ginger = User(
        name='Ginger', 
        email='ginger@aa.io', 
        password='password',
        biography=
    '''
    Donec semper eu nulla et ullamcorper. Proin iaculis tellus vitae ante consectetur, vel vehicula odio vehicula. Nulla elementum consectetur pharetra.
    ''',
        age=3,
        dog=True,
        location='Antalya, Turkey',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))
    Simba = User(
        name='Simba', 
        email='simba@aa.io', 
        password='password',
        biography=
    '''
    Donec semper eu nulla et ullamcorper. Proin iaculis tellus vitae ante consectetur, vel vehicula odio vehicula. Nulla elementum consectetur pharetra.
    ''',
        age=8,
        dog=True,
        location='Knoxville, TN',
        created_at=today.strftime("%B %d, %Y"),
        updated_at=today.strftime("%B %d, %Y"))

   

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(scottie)
    db.session.add(arnie)
    db.session.add(vinnie)
    db.session.add(jackie)
    db.session.add(kenny)
    db.session.add(jamie)
    db.session.add(jeffrey)

    db.session.add(DemoDog)
    db.session.add(Scooby)
    db.session.add(Bella)
    db.session.add(Spot)
    db.session.add(Zoe)
    db.session.add(Charlie)
    db.session.add(Mac)
    db.session.add(Daisy)
    db.session.add(Ginger)
    db.session.add(Simba)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
