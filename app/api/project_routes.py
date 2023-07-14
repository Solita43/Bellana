from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db, Board, Card
from app.forms import ProjectForm
from .auth_routes import validation_errors_to_error_messages

project_routes = Blueprint("projects", __name__)


@project_routes.route("/")
@login_required
def projects():
    """
    Query for all projects and returns a dictionary of each project.
    """

    return {project.id: project.to_dict() for project in Project.query.all()}


@project_routes.route("/my-projects")
@login_required
def user_projects():
    """
    Return a dictionary of all projects the current user owns.
    """

    return {project.project_id: project.project.to_dict() for project in current_user.projects}


@project_routes.route("/", methods=["POST"])
@login_required
def create_project():
    """
    Creates a new project and returns the the new project dictionary.
    """

    form = ProjectForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.ownerId.data = current_user.id

    if form.validate():
        project = Project(
            name=form.data["name"],
            owner_id=form.data["ownerId"],
            details=form.data["details"],
        )

        db.session.add(project)
        db.session.commit()

        #Create a default board for the new project
        board = Board(name="Feature Workflow", project_id=project.id, purpose="Track Feature Development")
        project.boards.append(board)
        db.session.commit()

        #Create default cards for the board
        board.cards.append(Card(category="backlog", order=0))
        board.cards.append(Card(category="in Progress", order=1))
        board.cards.append(Card(category="in Review", order=2))
        board.cards.append(Card(category="Deployed", order=3))
        db.session.commit()
      
        return {project.id: project.to_dict()}
    else:
        return validation_errors_to_error_messages(form.errors), 400


@project_routes.route("/<int:projectId>", methods=["PUT"])
@login_required
def update_project(projectId):
    """
    Query for project by id, updates information, and returns the updated project dictionary.
    """
    project = Project.query.get(projectId)

    if not project:
        return {"error": "Project not found..."}, 404

    if current_user.id != project.owner_id:
        return {"error": "Unauthorized"}, 401

    form = ProjectForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.ownerId.data = current_user.id

    if form.validate():
        project.name = form.data["name"]
        project.owner_id = form.data["ownerId"]
        project.details = form.data["details"]

        db.session.commit()
        return {project.id: project.to_dict()}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400


@project_routes.route("/<int:projectId>", methods=["DELETE"])
@login_required
def delete_project(projectId):
    """
    Query for project by id, removes project from database and returns message of successfully deleted.
    """

    project = Project.query.get(projectId)

    if not project:
        return {"error": "Project not found..."}, 404

    if current_user.id != project.owner_id:
        return {"error": "Unauthorized"}, 401

    db.session.delete(project)
    db.session.commit()
    return {"message": "Project has been successfully deleted."}
