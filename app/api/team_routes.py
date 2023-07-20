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

    if not data["role"] or len(data["role"]) <= 20:
        member.role = data["role"]
        db.session.commit()
        return member.to_dict(), 201
    else: 
        return {"error": "Role cannot be greater than 20 characters"}
    
@team_routes.route('/admin/<int:memberId>', methods=["PUT"])
@login_required
def change_admin_status(memberId):
    member = TeamMember.query.get(memberId)

    if not member:
        return {"error": "Team Member not found"}, 404
    
    if is_owner_admin(current_user.id, member.project_id) != "owner":
        return {"error": "Unauthorized"}, 401
    
    if is_owner_admin(current_user.id, member.project_id) == "owner" and member.owner:
        return {"error": "Owner cannot have admin status as well."}, 400
    
    member.admin = not member.admin
    db.session.commit()
    return member.to_dict(), 201

@team_routes.route('/transfer_owner/<int:memberId>', methods=["PUT"])
@login_required
def transfer_ownership(memberId):
    member = TeamMember.query.get(memberId)
    owner = TeamMember.query.filter(TeamMember.project_id == member.project_id, TeamMember.owner == True).first()

    if not member:
        return {"error": "Team Member not found"}, 404
    
    if is_owner_admin(current_user.id, member.project_id) != "owner":
        return {"error": "Unauthorized"}, 401
    
    if member.admin:
        member.admin=False
    member.owner=True
    owner.owner=False

    db.session.commit()
        
    return {"NewOwner": member.to_dict(), "OldOwner": owner.to_dict()}

@team_routes.route('/<int:memberId>', methods=["DELETE"])
@login_required
def remove_member(memberId):
    member = TeamMember.query.get(memberId)

    if not member:
        return {"error": "Team Member not found"}, 404
    
    if is_owner_admin(current_user.id, member.project_id) != "owner":
        return {"error": "Unauthorized"}, 401
    
    if member.owner:
        return {"error": "You must tranfer ownership of this project before you remove yourself."}
    
    db.session.delete(member)
    db.session.commit()

    return {"message": "User successfully removed from project."}
    
    

    
    
    

        


    
