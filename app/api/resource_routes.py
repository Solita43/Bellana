from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Project, ProjectResource
from app.forms import ResourceForm
from .auth_routes import validation_errors_to_error_messages

resource_routes = Blueprint("resources", __name__)

@resource_routes.route('/<int:projectId>', methods=["POST"])
@login_required
def create_resource(projectId):

    project = Project.query.get(projectId)

    if not project:
        return {"error": "Project not found..."}, 404

    if current_user.id != project.owner_id:
        return {"error": "Unauthorized"}, 401
    

    form = ResourceForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.projectId.data = projectId

    if form.validate():
        resource = ProjectResource(title=form.data['title'], url=form.data['url'])
        project.resources.append(resource)
        db.session.commit()

        return {project.id: project.to_dict()}, 201
    else:
        return validation_errors_to_error_messages(form.errors), 400