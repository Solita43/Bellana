from flask_socketio import SocketIO, emit
import os
from app.models import db, Board, Card


# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://bellana.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("drag_column")
def handle_chat(data):
    print("😾😾😾😾😾😾😾🤬🤬🤬🤬🤬 SOCKET RECEIVED DATA =======> ", data)

    board = Board.query.get(data["boardId"])

    for key,value in data["columns"].items():
        card = Card.query.get(value)
        card.order = key

    db.session.commit()

    # return board.to_dict(), 201
    emit("drag_column", board.to_dict(), broadcast=True)