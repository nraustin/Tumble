from flask import Blueprint, jsonify, request
from app.models import Like, matchedRoom, User
from flask_login import login_required, current_user
from app.models import db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/create', methods=['POST'])
def create_like():

    liker_id=request.json['userId']
    liked_id=request.json['profileId']

    like = Like(
        liker_id=liker_id,
        liked_id=liked_id
    )

    db.session.add(like)
    db.session.commit()

    likes = Like.query.all()

    for like in likes:
        if like.liked_id == liker_id and like.liker_id == liked_id:
            new_match = matchedRoom()

            db.session.add(new_match)

            current_user.matches.append(new_match)

            likedUser = User.query.get(liked_id)

            likedUser.matches.append(new_match)

            db.session.commit()

    return like.like_to_dict()





