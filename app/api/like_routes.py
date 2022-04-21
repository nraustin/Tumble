from flask import Blueprint, jsonify, request
from app.models import Like, matchedRoom, User
from app.models import db

like_routes = Blueprint('likes', __name__)

@like_routes.route('/create')
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
            db.session.add(matchedRoom())
            db.session.commmit()

    return like.to_dict()





