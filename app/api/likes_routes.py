from flask import Blueprint, jsonify
from app.models import Like

likes_routes = Blueprint('likes', __name__)