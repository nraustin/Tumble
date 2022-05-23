from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, PasswordField
from wtforms.validators import DataRequired, ValidationError, InputRequired
from app.models import User


class ProfileForm(FlaskForm):
    userId = StringField('userId', validators=[DataRequired()])
    biography = StringField('biography', validators=[InputRequired()])
    location = StringField('location', validators=[InputRequired()])
