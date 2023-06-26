from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text

def seed_projects():
    projects = [Project(name="Bellana", owner_id=2, details="Bellana is a task management web application. Teams can collaborate on and track the progress of the project through kanban boards and tasks. When a team member is assigned a task, they can update the progress along the board and submit it to be reviewed and tested. If any bugs are found a ticket will be opened in the bug tracker section and assigned accordingly."),
                Project(name="MatrixBnb", owner_id=2, details="MatrixBnb is a site you can go to find lodging for a short period of time. It's is mainly marketed towards vacation stays. Users have the ability to open their homes up to other users to stay for their set price or book another users home for a period of time.")]

    [db.session.add(project) for project in projects]
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()
