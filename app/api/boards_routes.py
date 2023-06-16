from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Project, db, Board
from app.forms import BoardForm

board_routes = Blueprint("boards", __name__)


@board_routes.route("/<int:projectId>")
@login_required
def boards(projectId):
    """
    Query for all boards by project id and returns a dictionary of each board.
    """

    return {board.id: board.to_dict() for board in Project.query.get(projectId).boards}

@board_routes.route("/<int:projectId>", methods=["POST"])
@login_required
def create_board(projectId):
    """
    Creates a new board for a project
    """
    project = Project.query.get(projectId)

    if not project:
        return {"error": "Project not found..."}, 404
    
    if (current_user.id != project.owner_id):
        return {"error": "Unauthorized"}, 401

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.projectId.data = projectId

    if form.validate():
        board = Board(name=form.data["name"], project_id=projectId, purpose=form.data["purpose"])
        project.boards.append(board)
        db.session.commit()
        return board.to_dict()
    else:
        return form.errors, 400
    
@board_routes.route("/<int:boardId>", methods=["PUT"])
@login_required
def update_board(boardId):
    """
    Updates a board 
    """
    board = Board.query.get(boardId)

    if not board:
        return {"error": "Board not found..."}, 404
    
    if (current_user.id != board.project.owner_id):
        return {"error": "Unauthorized"}, 401

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.projectId.data = board.project.id

    if form.validate():
        board.name=form.data["name"]
        board.purpose=form.data["purpose"]
        db.session.commit()
        return board.to_dict()
    else:
        return form.errors, 400

@board_routes.route("/<int:boardId>", methods=["DELETE"])
@login_required
def delete_board(boardId):
    """
    Updates a board 
    """
    board = Board.query.get(boardId)

    if not board:
        return {"error": "Board not found..."}, 404
    
    if (current_user.id != board.project.owner_id):
        return {"error": "Unauthorized"}, 401
    
    db.session.delete(board)
    db.session.commit()
    return {"message": "Project has been successfully deleted."}


