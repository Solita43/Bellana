from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Board, Card

card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:boardId>')
@login_required
def getCards(boardId):

    return {boardId: {card.order: card.to_dict() for card in Board.query.get(boardId).cards}}


@card_routes.route("/<int:boardId>", methods=["PUT"])
@login_required
def changeOrder(boardId):
    
    data = request.get_json()

    for key,value in data.items():
        card = Card.query.get(value)
        card.order = key

    db.session.commit()

    return {"message": "success"}, 201
