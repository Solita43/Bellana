from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Project

project_routes = Blueprint('projects', __name__)


@project_routes.route('/')
@login_required
def projects():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    return {project.id: project.to_dict() for project in current_user.projects}