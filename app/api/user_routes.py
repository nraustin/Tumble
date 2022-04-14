from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Image
# from app.aws33 import upload_file_to_s3, get_unique_filename, allowed_file

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# @user_routes('/', methods=['POST'])
# def upload_image():
#     user_id=request.json["user_id"]
#     userImage=request.json["imageURL"]

#     image = Image(
#         user_id=user_id,
#         userImage=userImage
#     )

#     db.session.add(image)
#     db.session.commit()

#     return image.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
