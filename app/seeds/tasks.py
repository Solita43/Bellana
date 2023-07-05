from app.models import db, Task, environment, SCHEMA, Card
from sqlalchemy.sql import text

def seed_tasks():

    
    # Tasks for board 1 backlog category
    backlog_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'backlog').first()
    tasks_backlog_board_1 = [Task(details='User authentication feature', user_id=2, order=0, board_id=1),
                             Task(details='API integration with third-party service', user_id=2, order=1, board_id=1),
                             Task(details='Allow user to add and update profile picture', user_id=2, order=3, board_id=1)]

    [backlog_board_1.tasks.append(task) for task in tasks_backlog_board_1]

    # Tasks for board 1 in progress category
    inprogress_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'in Progress').first()

    tasks_inprogress_board_1 = [Task(details='Refactoring database structure', user_id=2, order=0, board_id=1, status='in progress'),
                             Task(details='Implementing payment gateway', user_id=2, order=1, board_id=1, status='in progress')]

    [inprogress_board_1.tasks.append(task) for task in tasks_inprogress_board_1]

    # Tasks for board 1 in review category
    inreview_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'in Review').first()

    tasks_inreview_board_1 = [Task(details='Test cases for new feature', user_id=2, order=0, board_id=1, status='in progress'),
                             Task(details='Cross-browser compatibility testing', user_id=2, order=1, board_id=1, status='complete')]

    [inreview_board_1.tasks.append(task) for task in tasks_inreview_board_1]

    # Tasks for board 1 deployed category
    deployed_board_1 = Card.query.filter(Card.board_id == 1, Card.category == 'Deployed').first()

    tasks_deployed_board_1 = [Task(details='Release version 1.0', user_id=2, order=0, board_id=1),
                             Task(details='Documentation updates', user_id=2, order=1, board_id=1)]

    [deployed_board_1.tasks.append(task) for task in tasks_deployed_board_1]

    # Tasks for board 2 strategy category
    strategy_board_2 = Card.query.filter(Card.board_id == 2, Card.category == 'Strategy').first()
    tasks_strategy_board_2 = [Task(details='Define target audience', user_id=2, order=0, board_id=2),
                             Task(details='Set campaign goals', user_id=2, order=1, board_id=2)]

    [strategy_board_2.tasks.append(task) for task in tasks_strategy_board_2]

    # Tasks for board 2 Content Creation category
    content_creation_board_2 = Card.query.filter(Card.board_id == 2, Card.category == 'Content Creation').first()

    tasks_content_creation_board_2 = [Task(details='Write blog posts', user_id=2, order=0, board_id=2),
                                      Task(details='Create social media content', user_id=2, order=1, board_id=2),
                                      Task(details='Design banner ads', user_id=2, order=3, board_id=2),
                                      Task(details='Create landing page visuals', user_id=2, order=4, board_id=2)]

    [content_creation_board_2.tasks.append(task) for task in tasks_content_creation_board_2]

    # Tasks for board 2 Promotion category
    promotion_board_2 = Card.query.filter(Card.board_id == 2, Card.category == 'Promotion').first()

    tasks_promotion_board_2 = [Task(details='Schedule social media posts', user_id=2, order=0, board_id=2),
                               Task(details='Launch email marketing campaign', user_id=2, order=1, board_id=2)]

    [promotion_board_2.tasks.append(task) for task in tasks_promotion_board_2]

    # Tasks for board 2 Done category
    done_board_2 = Card.query.filter(Card.board_id == 2, Card.category == 'Done').first()

    tasks_done_board_2 = [Task(details='Evaluate campaign performance', user_id=2, order=0, board_id=2),
                          Task(details='Generate campaign report', user_id=2, order=1, board_id=2)]

    [done_board_2.tasks.append(task) for task in tasks_done_board_2]

    # Tasks for board 3 Property Acquisition category
    pa_board_3 = Card.query.filter(Card.board_id == 3, Card.category == 'Property Acquisition').first()

    tasks_pa_board_3 = [Task(details='Research potential properties', user_id=2, order=0, board_id=3),
                        Task(details='Conduct property viewings', user_id=2, order=1, board_id=3),
                        Task(details='Evaluate investment opportunities', user_id=2, order=2, board_id=3)]

    [pa_board_3.tasks.append(task) for task in tasks_pa_board_3]

    # Tasks for board 3 Listing Setup category
    ls_board_3 = Card.query.filter(Card.board_id == 3, Card.category == 'Listing Setup').first()

    tasks_ls_board_3 = [Task(details='Take high-quality property photos', user_id=2, order=0, board_id=3),
                        Task(details='Write a compelling property description', user_id=2, order=1, board_id=3),
                        Task(details='Set pricing and availability', user_id=2, order=2, board_id=3)]

    [ls_board_3.tasks.append(task) for task in tasks_ls_board_3]

    # Tasks for board 3 Guest Communication category
    gc_board_3 = Card.query.filter(Card.board_id == 3, Card.category == 'Guest Communication').first()

    tasks_gc_board_3 = [Task(details='Respond to inquiries and booking requests', user_id=2, order=0, board_id=3),
                        Task(details='Provide pre-arrival instructions', user_id=2, order=1, board_id=3),
                        Task(details="Offer assistance during the guest's stay", user_id=2, order=2, board_id=3)]

    [gc_board_3.tasks.append(task) for task in tasks_gc_board_3]

    db.session.commit()

    # Tasks for board 3 Reviews and Feedback category
    rf_board_3 = Card.query.filter(Card.board_id == 3, Card.category == 'Reviews and Feedback').first()

    tasks_rf_board_3 = [Task(details='Monitor guest reviews and ratings', user_id=2, order=0, board_id=3),
                        Task(details='Respond to guest feedback and address concerns', user_id=2, order=1, board_id=3),
                        Task(details="Implement improvements based on feedback", user_id=2, order=2, board_id=3)]

    [rf_board_3.tasks.append(task) for task in tasks_rf_board_3]

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
    
    db.session.commit()