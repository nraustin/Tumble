from flask_socketio import SocketIO
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://tumble-app.onrender.com",
        "https://tumble-app.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO()

@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)