from app.models import db, TeamMember, environment, SCHEMA
from sqlalchemy.sql import text

def seed_team_members():
    members=[
        TeamMember(user_id=4, project_id=1, role="Project Manager", admin=False, owner=True),
        TeamMember(user_id=4, project_id=2, role="Project Manager", admin=False, owner=True),
        TeamMember(user_id=2, project_id=1, role="Developer", admin=False, owner=False),
        TeamMember(user_id=2, project_id=2, role="Developer", admin=False, owner=False)
    ]

    [db.session.add(member) for member in members]
    db.session.commit()

def undo_team_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.team_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM team_members"))
    
    db.session.commit()