from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task, Board, Card, User
from app.forms import TaskForm
from .auth_routes import validation_errors_to_error_messages
from .utils import is_owner_admin



task_routes = Blueprint("tasks", __name__)

@task_routes.route('/my_tasks')
@login_required
def my_tasks():
    """Query for current users tasks"""

    return {task.id: task.to_dict_dash() for task in current_user.tasks}

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
    
    if not is_owner_admin(current_user.id, card.board.project_id):
        return {"error": "Unauthorized"}, 401

    form = TaskForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate():
        task = Task(
            details=form.data["details"],
            board_id=card.board_id,
            order=len(card.tasks)
        )

        card.tasks.append(task)
        db.session.commit()

        return {"task": {task.id: task.to_dict()}, "card": card.to_dict()}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400
    
@task_routes.route('/status/<int:taskId>', methods=["PUT"])
@login_required
def change_status(taskId):
    task = Task.query.get(taskId)

    if not task:
        return {"error": "Task not found..."}, 404
    if not is_owner_admin(current_user.id, task.board.project_id):
        return {"error": "Unauthorized"}, 401
    
    task.status = not task.status
    db.session.commit()

    return {"task":{task.id: task.to_dict()}, "myTask": {task.id: task.to_dict_dash()}}, 201

@task_routes.route('/<int:taskId>', methods=["PUT"])
@login_required
def edit_task(taskId):
    task = Task.query.get(taskId)

    if not task:
        return {"error": "Task not found..."}, 404
    if not is_owner_admin(current_user.id, task.board.project_id):
        return {"error": "Unauthorized"}, 401
    
    form = TaskForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate():
        task.details = form.data["details"]

        db.session.commit()
    
        return {"task": {task.id: task.to_dict()}}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400
    
@task_routes.route('/<int:taskId>', methods=["DELETE"])
@login_required
def delete_task(taskId):

    task = Task.query.get(taskId)

    if not task:
        return {"error": "Task not found..."}, 404
    if not is_owner_admin(current_user.id, task.board.project_id):
        return {"error": "Unauthorized"}, 401
    
    db.session.delete(task)
    db.session.commit()

    return {"message": "Project has been successfully deleted."}

@task_routes.route('/assign/<int:taskId>', methods=["PUT"])
@login_required
def assign_task(taskId):
    task = Task.query.get(taskId)

    if not task:
        return {"error": "Task not found..."}, 404
    if not is_owner_admin(current_user.id, task.board.project_id):
        return {"error": "Unauthorized"}, 401
    
    data = request.get_json()

    if data["userId"] == None:
        task.user_id = data["userId"]
    else:
        user = User.query.get(data["userId"])

        if not user:
            return {"error": "User does not exist..."}, 404
    
        task.user_id = user.id

    db.session.commit()

    return {"task":{task.id: task.to_dict()}}, 201
