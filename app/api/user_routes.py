from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Image
from app.s3_helpers import upload_file_to_s3, get_unique_filename, allowed_file
from app.models import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):

        user = User.query.get(id)

        return user.to_dict()



@user_routes.route('/<int:id>', methods=['POST'])
def upload_image(id):

        if "image" not in request.files:
            print("\n\n\n----YO-----\n\n\n")
            return {"errors": "image required"}, 400
        
        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}

        image.filename = get_unique_filename(image.filename)

        print("\n\n\n----", image, "-----\n\n\n")

        upload = upload_file_to_s3(image)

        if "url" not in upload:


            return upload, 400

        url = upload["url"]

        print("\n\n\n----", url, "----\n\n\n")


        user_id=request.form["user_id"]

        new_image = Image(
            user_id=user_id,
            userImage=url
        )

        db.session.add(new_image)
        db.session.commit()

        return {"url": url}
        
    
@user_routes.route('/edit', methods=['PUT'])
def edit_user():

        id = request.json['user_id']

        user = User.query.get(id)

        bio=request.json['bio']
        location=request.json['location']
        name=request.json['name']

        user.biography=bio,
        user.location=location,
        user.name=name,

        db.session.add(user)
        db.session.commit()

        return user.to_dict()

@user_routes.route('/delete', methods=['DELETE'])
def delete_image():

        image_id=request.json['imageId']

        image = Image.query.get(image_id)

        db.session.delete(image)
        db.session.commit()

        return image.to_dict()


        








    


