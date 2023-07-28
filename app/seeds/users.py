from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name="Demo", last_name="Doe", email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', first_name="Marnie", last_name="Doe", email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', first_name="Bobbie", last_name="Doe", email='bobbie@aa.io', password='password')
    mel = User(
        username='Mel', first_name="Melinda", last_name="Cortez", email='mel@aa.io', password='password')
    jane = User(
        username='Janie', first_name="Jane", last_name="Doe", email='jane@aa.io', password='password')
    Alfonso = User(
        username='Ishiro', first_name="Alfonso", last_name="Zapata", email='alfonso@aa.io', password='password')
    Jennifer = User(
        username='Jenny', first_name="Jennifer", last_name="Zapata", email='jennifer@aa.io', password='password')
    phil = User(
        username='Phil', first_name="Phillip", last_name="Oeung", email='phil@aa.io', password='password')
    Bella = User(
        username='Bella', first_name="Bella", last_name="Oeung", email='bella@aa.io', password='password')
    nikki = User(
        username='Nikki', first_name="Nicole", last_name="Doe", email='nicole@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mel)
    db.session.add(jane)
    db.session.add(Alfonso)
    db.session.add(Jennifer)
    db.session.add(phil)
    db.session.add(Bella)
    db.session.add(nikki)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()