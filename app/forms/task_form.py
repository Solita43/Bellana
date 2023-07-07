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

class TaskForm(FlaskForm):
    details = StringField("details", validators=[DataRequired()])
    # userId = StringField("userId", validators=[DataRequired()])
