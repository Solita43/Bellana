from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    boards=[Board(name="Software Development", project_id=1, purpose="Track Feature Development"),
            Board(name="Marketing Campaign", project_id=1, purpose="Plan, execute, and track the progress of our marketing campaign")]

    [db.session.add(board) for board in boards]
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
    
    db.session.commit()