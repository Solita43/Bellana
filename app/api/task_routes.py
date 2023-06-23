from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task

task_routes = Blueprint("tasks", __name__)

@task_routes.route('/my_tasks')
@login_required
def my_tasks():
    """Query for current users tasks"""

    return {task.id: task.to_dict() for task in current_user.tasks}

@task_routes.route('/dragged', methods=["PUT"])
@login_required
def dragged_task():

    data = request.get_json()

    for key,value in data.items():
        task = Task.query.get(value)
        task.order = key

    db.session.commit()

    return {"message": "success"}, 201