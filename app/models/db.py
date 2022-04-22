from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    userImage = db.Column(db.String, nullable=False)

    def image_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'userImage': self.userImage
        }

class matchedRoom(db.Model):
    __tablename__ = "matchedRooms"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # firstUser = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # secondUser = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    messages = db.relationship("Message", backref="matchedRooms", cascade="all, delete")

    # likes = db.relationship("Like", backref="matchedRooms", cascade="all, delete")

    matchedUsers = db.relationship("User", secondary="matched_Users", backref="matchedRooms")


    def matchedRoom_to_dict(self):
        return{
            'id': self.id,
            'matched': [maU.info() for maU in self.matchedUsers], 
            'messages': [m.to_dict() for m in self.messages]
        }

class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey("matchedRooms.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

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

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    liker_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    liked_id = db.Column(db. Integer, db.ForeignKey("users.id"))

    # liker = db.relationship("User", foreign_keys=[liker_id])
    # liked = db.relationship("User", foreign_keys=[liked_id])

    def like_to_dict(self):
        return{
            'id': self.id,
            'liker_id': self.liker_id,
            'liked_id': self.liked_id
        }
    