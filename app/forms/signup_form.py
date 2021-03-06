from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm',  message='Passwords must match')])
    confirm = PasswordField('confirm')
    dog = BooleanField('dog')
    age = IntegerField('age', validators=[DataRequired()])
