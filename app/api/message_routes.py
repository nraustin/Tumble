from flask import Blueprint, jsonify
from app.models import Message

message_routes = Blueprint('messages', __name__)

