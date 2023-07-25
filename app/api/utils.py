from app.models import TeamMember

def is_owner_admin(userId, projectId):
    member = TeamMember.query.filter(TeamMember.user_id == userId, TeamMember.project_id == projectId).first()

    if member.owner:
        return "owner"
    elif member.admin:
        return "admin"
    else:
        return False