from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text

def seed_projects():
    projects = [Project(name="Bellana", owner_id=4, 
                        details="""Bellana is a task management web application. Teams can collaborate on and track the progress of the project through kanban boards and tasks. 
                        When a team member is assigned a task, they can update the progress along the board and mark it as complete. A team member can be given admin privileges giving them permission to add team members and create, edit, assign, and delete tasks.
                        Only the owner of a project can edit the project details, delete the project, create boards, edit category headers, transfer ownership, remove team members, and give or remove admin permissions."""),
                Project(name="MatrixBnb", owner_id=4, details="MatrixBnb is a site you can go to find lodging for a short period of time. It's is mainly marketed towards vacation stays. Users have the ability to open their homes up to other users to stay for their set price or book another users home for a period of time.")]

    [db.session.add(project) for project in projects]
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()
