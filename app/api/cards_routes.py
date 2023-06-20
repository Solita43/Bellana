from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Project, db, Board, Card
from app.forms import BoardForm
from .auth_routes import validation_errors_to_error_messages

card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:boardId>')
@login_required
def getCards(boardId):
    return


@card_routes.route("/<int:cardId>", methods=["PUT"])
@login_required
def changeOrder(cardId):
    print("➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️ REQUEST INFO?", request.json)

    card = Card.query.get(cardId)
    card.order = request.json
    db.session.commit()

    return card.to_dict(), 201
