## Run the Node App

This is the main README, please stick with the instructions below to setup the Node platform.

This is just an app that is using typescript with express.

### Setup

This project is using Postgres for the database. I have setup Docker to use postgres image, if you would like to use Docker to run your database please install docker. 

Run `nvm use` to use the correct node version.

Run `npm i` to install all the correct packages.

There is an `.env.example` file located in the root, setup the variables you would like to use. This will feed into the `docker-compose.yml` file for the database setup. After you have setup the `.env.example` rename this to `.env`

You can then run `docker-compose up -d` which will start up the database. To know if the database is working, it will show on the Docker dashboard. You can then install a Database Management Tool. I use TablePlus.

Once the database is up and running, create your table if it does not exist and then run `npx prisma migrate dev`, this will bring your table up to date with database changes.

Finally run `npm start` and the app will be up and running. Only one endpoint exists which is `POST: http://localhost:3132/{API_BASEPATH}/users` {API_BASEPATH} is set on env. If you want to test the endpoint, it is a POST method and takes in json object of `{name, email}`. You can use POSTMAN to send post requests.