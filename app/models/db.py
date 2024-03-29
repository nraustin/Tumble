from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get('SCHEMA')

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr



class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    userImage = db.Column(db.String, nullable=False)

    def image_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'userImage': self.userImage
        }

    

class matchedroom(db.Model):
    __tablename__ = "matchedrooms"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # firstUser = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # secondUser = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    messages = db.relationship("Message", back_populates="match", cascade="all, delete")

    # likes = db.relationship("Like", backref="matchedRooms", cascade="all, delete")

    matchedusers = db.relationship("User", secondary="matched_users", back_populates="matches")


    def matchedroom_to_dict(self):
        return{
            'id': self.id,
            'matched': [maU.info() for maU in self.matchedusers], 
            'messages': [m.message_to_dict() for m in self.messages]
        }

class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("matchedrooms.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    match = db.relationship('matchedroom', back_populates='messages')

    def message_to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'match_id': self.match_id,
            'created_at': self.created_at
        }



class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    liker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    liked_id = db.Column(db. Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # liker = db.relationship("User", foreign_keys=[liker_id])
    # liked = db.relationship("User", foreign_keys=[liked_id])

    def like_to_dict(self):
        return{
            'id': self.id,
            'liker_id': self.liker_id,
            'liked_id': self.liked_id
        }

class Unlike(db.Model):
    __tablename__ = "unlikes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    unliker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    unliked_id = db.Column(db. Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    def unlike_to_dict(self):
        return{
            'id': self.id,
            'unliker_id': self.unliker_id,
            'unliked_id': self.unliked_id
        }

    
    