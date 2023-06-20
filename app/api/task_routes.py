from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db, Task

task_routes = Blueprint("tasks", __name__)

@task_routes.route('/my_tasks')
@login_required
def my_tasks():
    """Query for current users tasks"""

    return {task.id: task.to_dict() for task in current_user.tasks}
