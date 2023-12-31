from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .boards import seed_boards, undo_boards
from .cards import seed_cards, undo_cards
from .tasks import seed_tasks, undo_tasks
from .resources import seed_resources, undo_resources
from app.models.db import db, environment, SCHEMA
from .team_members import seed_team_members, undo_team_members

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_projects()
        undo_boards()
        undo_cards()
        undo_tasks()
        undo_resources()
        undo_team_members()
        
    seed_users()
    seed_projects()
    seed_boards()
    seed_cards()
    seed_tasks()
    seed_resources()
    seed_team_members()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_projects()
    undo_boards()
    undo_cards()
    undo_tasks()
    undo_resources()
    undo_team_members()
    # Add other undo functions here