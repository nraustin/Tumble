from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    biography = db.Column(db.Text)
    age = db.Column(db.Integer, nullable=False)
    dog = db.Column(db.Boolean, default=False, nullable=False)
    location = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    images = db.relationship("Image", backref="users", cascade="all, delete")
    likes = db.relationship("Like", primaryjoin="User.id==Like.liked_id", backref="users", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'biography': self.biography,
            'dog': self.dog,
            'location': self.location,
            'images': [i.to_dict() for i in self.images],
            'likes': [l.to_dict() for l in self.likes]
        }
