from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db, Board, Card, TeamMember
from app.forms import TeamMemberForm
from .auth_routes import validation_errors_to_error_messages
from .utils import is_owner_admin

team_routes = Blueprint("team", __name__)

@team_routes.route('/project/<int:projectId>', methods=["POST"])
@login_required
def create_member(projectId):
    project = Project.query.get(projectId)

    if not project:
        return {"error": "Project not found..."}, 404

    if not is_owner_admin(current_user.id, projectId):
        return {"error": "Unauthorized"}, 401
    
    form = TeamMemberForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate():
        new_member = TeamMember(user_id=form.data["userId"],
                                project_id=form.data["projectId"],
                                role=form.data["role"],
                                admin=form.data["admin"])
        db.session.add(new_member)
        db.session.commit()

        return new_member.to_dict(), 201
    else:
        return validation_errors_to_error_messages(form.errors), 400
    
@team_routes.route('/role/<int:memberId>', methods=["PUT"])
@login_required
def update_role(memberId):
    member = TeamMember.query.get(memberId)

    if not member:
        return {"error": "Team Member not found"}, 404
    
    if not is_owner_admin(current_user.id, member.project_id):
        return {"error": "Unauthorized"}, 401
    
    if member.owner and current_user.id != member.user_id:
        return {"error": "Unauthorized"}, 401
    
    data = request.get_json()

    if len(data["role"]) == 0:
        member.role = None
        db.session.commit()
        return member.to_dict(), 201
    elif len(data["role"]) <= 20:
        member.role = data["role"]
        db.session.commit()
        return member.to_dict(), 201
    else: 
        print("😾😾😾😾😾😾😾😾😾😾😾😾😾😾😾😾😾 ERROR BLOCK =====> ")

        return {"error": "Role cannot be greater than 20 characters"}
        


    
