from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    userId = field.data
    user = User.query.get(userId)
    if user:
        raise ValidationError('User does not exist')
    
def valid_status(form, field):
    # Checking if user exists
    status = field.data
    options = ['Not Complete', 'complete']
    if status not in options:
        raise ValidationError('That is not a valid status. Please choose from Not started, in progress, or complete')


class TaskForm(FlaskForm):
    details = StringField("details", validators=[DataRequired()])
    status = StringField("status", validators=[DataRequired(), valid_status])
    # userId = StringField("userId", validators=[DataRequired()])
