from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, matchedroom, User, matched_users, Unlike


matchedroom_routes = Blueprint('matches', __name__)

@matchedroom_routes.route('')
def all_matches():


    if len(current_user.matches) > 0:
        userMatches = []
        for match in current_user.matches:
            userMatches.append(match)
            print('\n\n\n', match.matchedusers, '\n\n\n')
        return {'matched':[match.matchedroom_to_dict() for match in userMatches]}
    
    return None




@matchedroom_routes.route('/<int:id>')
def one_room(id): 

    match = matchedroom.query.get(id)

    return match.matchedroom_to_dict()


@matchedroom_routes.route('/delete', methods=['DELETE'])
def delete_room(): 

    print('\n\n\n', request.json['matchId'], '\n\n\n')
    match_id=request.json['matchId']

    match = matchedroom.query.get(match_id)

    print('\n\n\n', match, '\n\n\n')
    
    for user in match.matchedusers:
        if user.id != current_user.id:

            unliked = Unlike(
                unliker_id=current_user.id,
                unliked_id=user.id
            )
            
            db.session.add(unliked)

    deleted_match = match.matchedroom_to_dict()

    db.session.delete(match)
    db.session.commit()

    return deleted_match


