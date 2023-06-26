from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text

def seed_boards():
    boards=[Board(name="Software Development", project_id=1, purpose="Track Feature Development"),
            Board(name="Marketing Campaign", project_id=1, purpose="Plan, execute, and track the progress of our marketing campaign"),
            Board(name="Property Management", project_id=2, purpose="Streamline property management tasks and ensure efficient management of properties"),
            Board(name="Guest Reservations", project_id=2, purpose="Facilitate the reservation process from inquiry to check-out"),
            Board(name="Marketing Campaign", project_id=2, purpose=" Plan and execute marketing campaigns to promote Matrixbnb properties"),]

    [db.session.add(board) for board in boards]
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
    
    db.session.commit()