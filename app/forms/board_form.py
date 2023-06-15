from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    projectId = IntegerField("projectId", validators=[DataRequired()])
    purpose = StringField("purpose", validators=[DataRequired()])