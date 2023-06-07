from .db import db, environment, SCHEMA, add_prefix_for_prod

matched_users = db.Table('matched_users', 
                    db.Column("matchedroom_id",
                            db.Integer, 
                            db.ForeignKey(add_prefix_for_prod("matchedrooms.id")),
                            primary_key=True),
                    db.Column("user_id",
                            db.Integer,
                            db.ForeignKey(add_prefix_for_prod("users.id")),
                            primary_key=True))

if environment == "production":
        matched_users.schema = SCHEMA