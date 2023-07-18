from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Project


def user_exists(form, field):
    # Checking if user exists
    user = User.query.get(field.data)
    if not user:
        raise ValidationError('User does not exist.')
    
def project_exists(form, field):
    # Checking if user exists
    project = Project.query.get(field.data)
    if not project:
        raise ValidationError('Project does not exist.')



class TeamMemberForm(FlaskForm):
    userId = StringField("userId", validators=[DataRequired(), user_exists])
    projectId = IntegerField("projectId", validators=[DataRequired(), project_exists])
    role = StringField("details")
    admin = BooleanField("admin", validators=[DataRequired()])