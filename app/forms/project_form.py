from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def name_length(form, field):
    if len(field.data) > 30 or len(field.data) < 4:
        raise ValidationError('Name must be between 4 and 30 characters')



class ProjectForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), name_length])
    ownerId = IntegerField("ownerId", validators=[DataRequired()])
    details = StringField("details")

