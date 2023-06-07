from flask import Blueprint, jsonify, request
from app.models import Unlike, matchedroom, User
from flask_login import login_required, current_user
from app.models import db

unlike_routes = Blueprint('unlikes', __name__)


@unlike_routes.route('/create', methods=['POST'])
def create_unlike():

    unliker_id=request.json['userId']
    unliked_id=request.json['profileId']

    unlike = Unlike(
        unliker_id=unliker_id,
        unliked_id=unliked_id
    )

    db.session.add(unlike)
    db.session.commit()


    return unlike.unlike_to_dict()