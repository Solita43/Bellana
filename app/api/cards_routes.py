from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Board, Card

card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:boardId>')
@login_required
def getCards(boardId):

    return {boardId: {card.order: card.to_dict() for card in Board.query.get(boardId).cards}}


@card_routes.route("/", methods=["PUT"])
@login_required
def changeOrder():
    
    data = request.get_json()

    for key,value in data.items():
        card = Card.query.get(value)
        card.order = key

    db.session.commit()

    return {"message": "success"}, 201

@card_routes.route('/<int:cardId>', methods=["PUT"])
@login_required
def update_category(cardId):

    card = Card.query.get(cardId)
    print("card start🤬🤬🤬🤬🤬 ", card.to_dict())


    if not card:
        return {"error": "Card not found..."}, 404
    
    if (current_user.id != card.board.project.owner_id):
        return {"error": "Unauthorized"}, 401
    
    data = request.get_json()

    print("🤬🤬🤬➡️➡️➡️➡️➡️➡️ DATA", data)
    card.category = data["category"]
    db.session.commit()

    print("card end 🦄🦄🦄🦄🦄🦄 ", card.to_dict())


    return{card.board_id:{card.order: card.to_dict()}}, 201
