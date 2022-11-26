### Run the app in terminal

1. Start a MySQL database server on your machine or in the cloud.
2. Set the following environment variables in your .env file

3. Install packages and start the application server.

```
$ npm install
$ npm start
```

### Run the app inside a Docker container

Build the docker container and get it up and running.

```
$ docker-compose build
$ docker-compose up
```

### Make API calls against the server

1. Go to [http://localhost:8000/swagger](http://localhost:8000/swagger) to see Swagger documentation for API endpoints.
2. Run the APIs by clicking the "Try it now" button on the Swagger page.

### Run tests and check code coverage

```
$ npm test
$ npm coverage
```

### Lint your code

```
$ npm lint
$ npm format
```
