from flask import Blueprint, jsonify, request
from app.models import matchedRoom, User, matched_Users


matchedRoom_routes = Blueprint('matches', __name__)



# @matchedRoom_routes.route('/')
# def all_user_matches():

#     return current_user.matches





@matchedRoom_routes.route('/<int:id>')
def one_room(id): 

    match = matchedRoom.query.get(id)

    return match.to_dict()


@matchedRoom_routes.route('/<int:id>', methods=['DELETE'])
def delete_room(id): 

    match = matchedRoom.query.get(id)

    db.session.delete(match)
    db.session.commit()

    return match.to_dict()


