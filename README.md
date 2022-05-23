# Tumble
Welcome to Tumble, a simplified clone of the popular dating app, Bumble. Tumble connects those with dogs in difficult circumstances of adoption with those in search of a new friend. Create, explore, and meet with others users by signing up for a free account or using a demo account available on the live site.

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
    
2) Install dependencies - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3) Create a .env file based on the .env.example with proper settings required for the development environment
4) Setup PostgreSQL user, password and database and to make sure it matches the .env file
5) Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
6) pipenv shell
7) flask db upgrade
8) flask seed all
9) flask run

* To run the React App in development, checkout the README inside the react-app directory.






<!-- # Flask React Project.

This is the starter for the Flask React project.

## Getting started
### Dev Containers (M1 Users, follow this guide)

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. 

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

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

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory. -->

<br>

### Standard (Traditional)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

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

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |

## Deploy to Heroku

### Abstract
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

### Writing your Dockerfile
In order for the Github action to work effectively, it must have a configured docker file. In order to effectively deploy your site you need to code out the notes found in this [docker file](./Dockerfile)

### Configuring Production Environment Variables 

1. In your Heroku app settings you should have two environment variables set. 

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

2. In your Github Actions Secrets you should have two environment variables set. You can find this webpage at the following address: *github.com/userID/repoName/settings/secrets/actions*

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token |
   | `HEROKU_APP_NAME` | Heroku app name    |

3. To get an Oauth token for Heroku, run the following command in your terminal already authenticated to the Heroku CLI and pull out the string on the Token key. 
   ```bash
   heroku authorizations:create 
   ```
