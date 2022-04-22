from flask import Blueprint, jsonify, request
from app.models import matchedRoom

matchedRoom_routes = Blueprint('matches', __name__)

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


