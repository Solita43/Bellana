from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def name_length(form, field):
    if len(field.data) > 30 or len(field.data) < 4:
        raise ValidationError('Name must be between 4 and 30 characters')

def purpose_length(form, field):
    if len(field.data) > 50 or len(field.data) < 4:
        raise ValidationError('Purpose must be between 4 and 50 characters')

class BoardForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), name_length])
    projectId = IntegerField("projectId", validators=[DataRequired()])
    purpose = StringField("purpose", validators=[DataRequired(), purpose_length])