from .db import db, environment, SCHEMA, add_prefix_for_prod

matched_Users = db.Table('matched_Users', 
                    db.Column("matchedRoom_id",
                            db.Integer, 
                            db.ForeignKey(add_prefix_for_prod("matchedRooms.id")),
                            primary_key=True),
                    db.Column("user_id",
                            db.Integer,
                            db.ForeignKey(add_prefix_for_prod("users.id")),
                            primary_key=True))