from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
    cards=[
        Card(category="backlog", board_id=1, order=0),
        Card(category="in Progress", board_id=1, order=1),
        Card(category="in Review", board_id=1, order=2),
        Card(category="Deployed", board_id=1, order=3),
        Card(category="backlog", board_id=2, order=0),
        Card(category="in Progress", board_id=2, order=1),
        Card(category="in Review", board_id=2, order=2),
        Card(category="Deployed", board_id=2, order=3),
        ]

    [db.session.add(card) for card in cards]
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
    
    db.session.commit()