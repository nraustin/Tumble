from app.models import db, Image

def seed_images():
    image1 = Image(
        user_id=1,
        userImage='https://tumblebucket.s3.amazonaws.com/user1.jpeg'
    )

    image2 = Image(
        user_id=2,
        userImage='https://tumblebucket.s3.amazonaws.com/user2.jpeg'
    )
    image3 = Image(
        user_id=3,
        userImage='https://tumblebucket.s3.amazonaws.com/user3.jpeg'
    )

    image4 = Image(
        user_id=4,
        userImage='https://tumblebucket.s3.amazonaws.com/user4.jpeg'
    )
    image5 = Image(
        user_id=5,
        userImage='https://tumblebucket.s3.amazonaws.com/user5.jpeg'
    )

    image6 = Image(
        user_id=6,
        userImage='https://tumblebucket.s3.amazonaws.com/user6.jpeg'
    )
    image7 = Image(
        user_id=7,
        userImage='https://tumblebucket.s3.amazonaws.com/user7.jpeg'
    )

    image8 = Image(
        user_id=8,
        userImage='https://tumblebucket.s3.amazonaws.com/user8.jpeg'
    )
    image9 = Image(
        user_id=9,
        userImage='https://tumblebucket.s3.amazonaws.com/user9.webp'
    )

    image10 = Image(
        user_id=10,
        userImage='https://tumblebucket.s3.amazonaws.com/user10.webp'
    )

    image11 = Image(
        user_id=11,
        userImage='https://tumblebucket.s3.amazonaws.com/dog1.jpeg'
    )

    image12 = Image(
        user_id=12,
        userImage='https://tumblebucket.s3.amazonaws.com/dog2.jpg'
    )
    image13 = Image(
        user_id=13,
        userImage='https://tumblebucket.s3.amazonaws.com/dog3.jpeg'
    )

    image14 = Image(
        user_id=14,
        userImage='https://tumblebucket.s3.amazonaws.com/dog4.jpeg'
    )
    image15 = Image(
        user_id=15,
        userImage='https://tumblebucket.s3.amazonaws.com/dog5.jpeg'
    )

    image16 = Image(
        user_id=16,
        userImage='https://tumblebucket.s3.amazonaws.com/dog6.webp'
    )
    image17 = Image(
        user_id=17,
        userImage='https://tumblebucket.s3.amazonaws.com/dog7.jpeg'
    )

    image18 = Image(
        user_id=18,
        userImage='https://tumblebucket.s3.amazonaws.com/dog8.jpeg'
    )
    image19 = Image(
        user_id=19,
        userImage='https://tumblebucket.s3.amazonaws.com/dog9.jpeg'
    )

    image20 = Image(
        user_id=20,
        userImage='https://tumblebucket.s3.amazonaws.com/dog10.jpeg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()