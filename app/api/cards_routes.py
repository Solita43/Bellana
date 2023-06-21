from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Project, db, Board, Card
from app.forms import BoardForm
from .auth_routes import validation_errors_to_error_messages

card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:boardId>')
@login_required
def getCards(boardId):

    return {boardId: {card.order: card.to_dict() for card in Board.query.get(boardId).cards}}


@card_routes.route("/<int:boardId>", methods=["PUT"])
@login_required
def changeOrder(boardId):
    
    data = request.get_json()
    print("🦄🦄🦄🦄🦄🦄🤬🤬🤬🤬🤬🤬🤬🤬➡️➡️➡️➡️ DATA", data)

    for key,value in data.items():
        card = Card.query.get(value)
        card.order = key
    
    # dragged = [card for card in boardCards if card.id == int(cardId)][0].to_dict()
    # section =  boardCards[source:destination+1] if source < destination else boardCards[destination:source]


    # for card in section:
    #     if source < destination:
    #         card.order-=1
    #     else:
    #         card.order+=1
    
    # dragged.order = destination






    db.session.commit()

    return {"message": "success"}, 201
