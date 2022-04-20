from .db import db

matched_Users = db.Table('matched_Users', 
                    db.Column("matchedRoom_id",
                            db.Integer, 
                            db.ForeignKey("matchedRooms.id"),
                            primary_key=True),
                    db.Column("user_id",
                            db.Integer,
                            db.ForeignKey("users.id"),
                            primary_key=True))