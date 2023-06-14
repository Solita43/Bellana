from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ProjectForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    ownerId = IntegerField("ownerId", validators=[DataRequired()])
    details = StringField("details")

