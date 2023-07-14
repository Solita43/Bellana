from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Board, Card
from app.forms import CardForm
from .auth_routes import validation_errors_to_error_messages


card_routes = Blueprint("cards", __name__)

@card_routes.route('/<int:boardId>')
@login_required
def getCards(boardId):
    board = Board.query.get(boardId)



    return {boardId: {card.id: card.to_dict() for card in board.cards}}


@card_routes.route("/order/<int:boardId>", methods=["PUT"])
@login_required
def changeOrder(boardId):

    board = Board.query.get(boardId)
    
    data = request.get_json()

    for key,value in data.items():
        card = Card.query.get(value)
        card.order = key

    db.session.commit()

    return board.to_dict(), 201

@card_routes.route('/<int:cardId>', methods=["PUT"])
@login_required
def update_category(cardId):

    card = Card.query.get(cardId)


    if not card:
        return {"error": "Card not found..."}, 404
    
    if (current_user.id != card.board.project.owner_id):
        return {"error": "Unauthorized"}, 401
    
    data = request.get_json()

    card.category = data["category"]
    db.session.commit()



    return card.to_dict(), 201

@card_routes.route('/<int:cardId>', methods=["DELETE"])
@login_required
def delete_card(cardId):

    deleting = Card.query.get(cardId)
    board = deleting.board

    if not deleting:
        return {"error": "Card not found..."}, 404
    
    if (current_user.id != deleting.board.project.owner_id):
        return {"error": "Unauthorized"}, 401
    
    data = request.get_json()

    db.session.delete(deleting)

    for key,value in data.items():
        card = Card.query.get(value)
        card.order = key
    
    db.session.commit()

    return board.to_dict(), 200

@card_routes.route('/', methods=["POST"])
@login_required
def create_card():


    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", form.data)


    if form.validate():
        column = Card(
            category=form.data["category"],
            board_id=form.data["boardId"],
            order=form.data["order"]
        )

        db.session.add(column)
        db.session.commit()

        
        return {"card": column.to_dict(), "board": column.board.to_dict()}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400



