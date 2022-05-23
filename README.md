# Tumble
Welcome to Tumble, a simplified clone of the popular dating app, Bumble. Tumble connects those with dogs in difficult circumstances of adoption with those in search of a new friend. Create, explore, and meet with other users by signing up for a free account or by using a demo account available on the live site.

## Technologies used

### Frontend

* React
* Redux
* JavaScript
* HTML
* CSS

### Backend

* Flask
* Python
* PostgreSQL
* SQLAlchemy

## Tumble Installation Guide

1) Clone this repository 

    ```bash
    git clone https://github.com/nraustin/Tumble.git
    ```
    
2) Install dependencies 

    ```bash
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
    ```
    
4) Create a .env file based on the .env.example with proper settings required for the development environment
5) Setup PostgreSQL user, password and database and to make sure it matches the .env file
6) Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
    ```bash
    pipenv shell
    ```
    ```bash
    flask db upgrade
    ```
    ```bash
    flask seed all
    ```
    ```bash
    flask run
    ```

* To run the React App in development, checkout the README inside the react-app directory.

# Features
