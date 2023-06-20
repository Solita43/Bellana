from app.models import db, Task, environment, SCHEMA, Card
from sqlalchemy.sql import text

def seed_tasks():

    
    # Tasks for board 1 backlog category
    backlog_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'backlog').first()
    print("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬", backlog_board_1.tasks)
    tasks_backlog_board_1 = [Task(details='User authentication feature'),
                             Task(details='API integration with third-party service'),
                             Task(details='Allow user to add and update profile picture')]

    [backlog_board_1.tasks.append(task) for task in tasks_backlog_board_1]

    # Tasks for board 1 in progress category
    inprogress_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'in Progress').first()

    tasks_inprogress_board_1 = [Task(details='Refactoring database structure'),
                             Task(details='Implementing payment gateway')]

    [inprogress_board_1.tasks.append(task) for task in tasks_inprogress_board_1]

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
    
    db.session.commit()