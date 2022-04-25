from flask import Blueprint, jsonify, request
from app.models import db, Message

message_routes = Blueprint('messages', __name__)

@message_routes.route('/new', methods=['POST'])
def create_message():
    user_id=request.json['userId']
    content=request.json['content']
    match_id=request.json['matchId']
  
    message = Message(
    user_id=user_id,
    content=content,
    match_id=match_id
  )
  
    db.session.add(message)
    db.session.commit()
    
    return message.message_to_dict()


@message_routes.route('/edit', methods=['PUT'])
def update_message():
  
  message_id=request.json['messageId']
  content=request.json['content']
  
  message = Message.query.get(message_id)
  
  message.content=content
  
  db.session.add(message)
  db.session.commit()
  
  return message.message_to_dict()


@message_routes.route('/delete', methods=['DELETE'])
def delete_message():
  
  message_id=request.json['messageId']

  print('\n\n\n\n', message_id, '\n\n\n\n')
  
  message = Message.query.get(message_id)
  
  db.session.delete(message)
  db.session.commit()
  
  return message.message_to_dict()