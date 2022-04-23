from flask_socketio import SocketIO
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://tumble-app.herokuapp.com",
        "https://tumble-app.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO()

@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)