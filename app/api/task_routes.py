from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task, Board

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

    print("DATA 🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", data)

    for column, array in data.items():
        print("COLUMN🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", column)
        print("ARRAY 🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", array)
        for key,value in array.items():
            task = Task.query.get(key)
            task.order = value
            task.card_id = column

    db.session.commit()

    return {"message": "success"}, 201