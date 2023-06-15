from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text

def seed_projects():
    projects = [Project(name="First Project", owner_id=2), Project(name="Pinterest", owner_id=2)]

    [db.session.add(project) for project in projects]
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()
