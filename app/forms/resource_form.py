from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ResourceForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    projectId = IntegerField("projectId", validators=[DataRequired()])
    url = StringField("url", validators=[DataRequired()])
