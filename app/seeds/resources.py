from app.models import db, ProjectResource, environment, SCHEMA
from sqlalchemy.sql import text

def seed_resources():
    resources= [ProjectResource(project_id=1, title="Bellana Github", url="https://github.com/Solita43/Bellana"),
                ProjectResource(project_id=2, title="MatrixBnB Github", url="https://github.com/Solita43/AirBnB")]

    [db.session.add(resource) for resource in resources]
    db.session.commit()

def undo_resources():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.project_resources RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM project_resources"))
        
    db.session.commit()
