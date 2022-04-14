from flask import Blueprint, jsonify
from app.models import matchedRoom

matchedRoom_routes = Blueprint('matchedRoom', __name__)

@matchedRoom_routes.route('/')
    