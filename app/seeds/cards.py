from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cards():
    cards=[
        Card(category="backlog", board_id=1, order=0),
        Card(category="in Progress", board_id=1, order=1),
        Card(category="in Review", board_id=1, order=2),
        Card(category="Deployed", board_id=1, order=3),
        Card(category="Strategy", board_id=2, order=0),
        Card(category="Content Creation", board_id=2, order=1),
        Card(category="Promotion", board_id=2, order=2),
        Card(category="Done", board_id=2, order=3),
        Card(category="Property Acquisition", board_id=3, order=0),
        Card(category="Listing Setup", board_id=3, order=1),
        Card(category="Guest Communication", board_id=3, order=2),
        Card(category="Reviews and Feedback", board_id=3, order=3),
        Card(category="Reservation Inquiries", board_id=4, order=0),
        Card(category="Boooking Confirmation", board_id=4, order=1),
        Card(category="Check-in/Check-out", board_id=4, order=2),
        Card(category="Payment Processing", board_id=4, order=3),
        Card(category="Social Media Promos", board_id=5, order=0),
        Card(category="Content Creation", board_id=5, order=1),
        Card(category="Advertising Campaigns", board_id=5, order=2),
        Card(category="Analytics and Reporting", board_id=5, order=3),
        ]

    [db.session.add(card) for card in cards]
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))
    
    db.session.commit()