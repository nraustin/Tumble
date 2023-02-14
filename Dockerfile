FROM python:3.11

# Set the following enviroment variables
#
ENV REACT_APP_BASE_URL=https://tumble-app.onrender.com
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SECRET_KEY=b12a14789e1949dae579bc24ba08df42
ENV DATABASE_URL=postgres://personal_projects_75sb_user:LMH7P40Ocy7omP8Byg3y49SRCkv4nPDD@dpg-cfgum3hgp3jqehook9rg-a/personal_projects_75sb
ENV SCHEMA=tumble_schema
ENV SQLALCHEMY_ECHO=true

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www

# Copy all the files from your repo to the working directory
COPY . .

# Copy the built react app (it's built for us) from the  
# /react-app/build/ directory into your flasks app/static directory
COPY /react-app/build/* app/static/

# Run the next two python install commands with PIP
# install -r requirements.txt
# install psycopg2
RUN npm install --prefix react-app && npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2 && flask db upgrade && flask seed all

# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn --worker-class eventlet -w 1 app:app
