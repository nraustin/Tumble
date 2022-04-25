from flask import Blueprint, jsonify, request
from app.models import db, matchedRoom, User, matched_Users


matchedRoom_routes = Blueprint('matches', __name__)



@matchedRoom_routes.route('/<int:id>')
def one_room(id): 

    match = matchedRoom.query.get(id)

    return match.matchedRoom_to_dict()


@matchedRoom_routes.route('/delete', methods=['DELETE'])
def delete_room(): 

    print('\n\n\n', request.json['matchId'], '\n\n\n')
    match_id=request.json['matchId']

    match = matchedRoom.query.get(match_id)

    print('\n\n\n', match, '\n\n\n')

    deleted_match = match.matchedRoom_to_dict()

    db.session.delete(match)
    db.session.commit()

    return deleted_match


