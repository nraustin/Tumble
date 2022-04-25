from app.models import db, Image

def seed_images():
    image1 = Image(
        user_id=1,
        userImage='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'
    )

    image2 = Image(
        user_id=2,
        userImage='https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc='
    )
    image3 = Image(
        user_id=3,
        userImage='https://media.istockphoto.com/photos/studio-portrait-of-smiling-young-woman-holding-affectionate-pet-picture-id1170668075?k=20&m=1170668075&s=612x612&w=0&h=9BDN9UNU8D2o-dpLh_-Ow4SyCQy8L3B3eiz-F6JNpdo='
    )

    image4 = Image(
        user_id=4,
        userImage='https://live-production.wcms.abc-cdn.net.au/ff1221fbfdb2fe163fdda15df5f77676?impolicy=wcms_crop_resize&cropH=394&cropW=700&xPos=0&yPos=37&width=862&height=485'
    )
    image5 = Image(
        user_id=5,
        userImage='https://static.boredpanda.com/blog/wp-content/uploads/2019/09/66496295_480467852786914_5586803424032145328_n1-5d7f7de9a38b3__700.jpg'
    )

    image6 = Image(
        user_id=6,
        userImage='https://www.animalfactsencyclopedia.com/images/border-collie-puppy.jpg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()