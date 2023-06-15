from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    boards=[Board(name="Feature Workflow", project_id=1), Board(name="Feature Workflow", project_id=2)]

    [db.session.add(board) for board in boards]
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
    
    db.session.commit()