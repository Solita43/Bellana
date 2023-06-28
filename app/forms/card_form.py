from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Board

def category_length(form, field):
    if len(field.data) > 20 or len(field.data) < 2:
        raise ValidationError('Category must be between 2 and 20 characters')
    
def category_order(form, field):
    boardLength = len(Board.query.get(form.boardId.data).cards)
    
    if boardLength >= 4:
        raise ValidationError("This board already has the maximum amout of columns")
    elif field.data != boardLength:
        raise ValidationError("Order must be equal to the amount of columns in this board")

class CardForm(FlaskForm):
    boardId = IntegerField("boardId", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
    order = IntegerField("order", validators=[DataRequired()])
    