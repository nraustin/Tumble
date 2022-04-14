from app.models import db, Message
from datetime import date

today = date.today()

def seed_messages():
    message1 = Message(
        user_id=1,
        content=
    '''
    Had me at that 2nd pic
    ''',
        match_id=1,
        created_at=today.strftime("%B %d, %Y")
        
    )
    message2 = Message(
        user_id=3,
        content=
    '''
    She's adorable isn't she? I will say, she can be a bit stand-offish with strangers
    ''',
        match_id=1,
        created_at=today.strftime("%B %d, %Y") 
    )
    message3 = Message(
        user_id=1,
        content=
    '''
    Byeeee
    ''',
        match_id=1,
        created_at=today.strftime("%B %d, %Y") 
    )

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
