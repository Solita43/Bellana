from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task, Board, Card
from app.forms import TaskForm
from .auth_routes import validation_errors_to_error_messages


task_routes = Blueprint("tasks", __name__)

@task_routes.route('/my_tasks')
@login_required
def my_tasks():
    """Query for current users tasks"""

    return {task.id: task.to_dict() for task in current_user.tasks}

@task_routes.route('/<int:boardId>')
@login_required
def board_tasks(boardId):
    board = Board.query.get(boardId)

    return {task.id: task.to_dict() for task in board.tasks}

@task_routes.route('/dragged_same', methods=["PUT"])
@login_required
def dragged_task_same():

    data = request.get_json()

    for key,value in data.items():
        task = Task.query.get(key)
        task.order = value

    db.session.commit()

    return {"message": "success"}, 201

@task_routes.route('/dragged_different', methods=["PUT"])
@login_required
def dragged_task_different():

    data = request.get_json()


    for column, array in data.items():
        for key,value in array.items():
            task = Task.query.get(key)
            task.order = value
            task.card_id = column

    db.session.commit()

    return {"message": "success"}, 201

@task_routes.route('/<int:cardId>', methods=["POST"])
@login_required
def create_task(cardId):

    card = Card.query.get(cardId)

    if not card:
        return {"error": "Card not found..."}, 404

    form = TaskForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate():
        task = Task(
            details=form.data["details"],
            board_id=card.board_id,
            user_id=current_user.id,
            order=len(card.tasks)
        )

        card.tasks.append(task)
        db.session.commit()

        return {task.id: task.to_dict()}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400