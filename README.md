# gdg-node-api

Simple REST api written in NodeJS with the purpose of teaching basic REST api concepts and how to implement them in the aforementioned platform.

## Main Technologies
Here's a list of technologies and dependencies

- [node](https://nodejs.org/en/)
  - oh really? you don't say
- [npm](https://www.npmjs.com/)
  - package management
  - npm scripts
  - comes built-in with node
- [nvm](https://github.com/creationix/nvm)
  - node version manager
- [koa](http://koajs.com/)
  - lighweight web "framework"
  - extensible through middlewares
- [koa-router](https://github.com/alexmingoia/koa-router)
  - a more capable routing layer on top of koa
- [sequelize](http://docs.sequelizejs.com/)
  - ORM
  - database migration and seeding

## Project structure

```sh
/.
|
|- /server
|   |- server.js # creates the application/server using koa
|   |
|   |- index.js # uses ./server.js to serve the application in configured port: is the entrypoint/main file of the application
|   |
|  /config
|   |- index.js # application configuration as a singleton object/dictionary
|   |           # configuration is being managed by environment variables and exposed by the config object
|   |           # for dev environment `dotenv` is being used to simulate environment variables
|   |
|  /db
|   |- /migrations # database migration scripts using the sequelize DSL
|   |
|   |- db.sqlite # non-versioned (git) sqlite database: so attendees won't have to spin up a rdbms instance
|   |
|  /app
|   |- /handlers  # route handlers a.k.a controllers a.k.a endpoints
|   |
|   |- /middlewares # application router level middlewares for handling cross-cutting concerns
|   |               # e.g. authentication, authorization, request validation, error handling
|   |
|   |- /services  # service-layer: business logic
|   |
|   |- /models # repository-layer: database connection and active-record style models
|   |
|   |- /utils # general utility functions: logging, object manipulation, etc
|   
|
|- .env # loaded by dotenv to simulate environment variables. usually this is a non-versioned file.
|       # In our case it is versioned for the attendees convenience
|
|- .eslintrc # configures eslint linting tool
|
|- .nvmrc # tells nvm which version of node we're using (lts/carbon)
|
|- .sequelizerc # configures sequelize-cli: migrations
|
|- package.json # among other stuff, contains our list of dependencies and their respective versions (for npm)
                # and npm scripts to help streamline the deploy/running process
```

## Running the api
Disclaimer: I'm assuming you already have [nvm](https://github.com/creationix/nvm) and [git](https://git-scm.com/) installed.

After you (forked and) cloned the repository, first you need to setup the correct node version and install the application dependencies.
To do that `cd` into the project directory and run

```sh
nvm install # installs version of node configured in .nvmrc
nvm use     # sets current shell session's node version to the one in .nvmrc
npm install # installs application dependencies configured in package.json
```

Now you are ready to run the application

```
npm run dev
```

This does the following:
- creates `./db/db.sqlite` file
- executes database migrations
- deploys the application locally in `debug` and `watch` (using [nodemon](https://nodemon.io/)) mode


## The Workshop
We're going to build a user CRUD api that also handles the orthogonal concepts of authentication, authorization, request validation and error handling.

The repo was prepared with branches in specific states:

- **master**:
  - code scaffolding
  - database integration
  - configuration management
  - logging
  - routing/handlers structure
  - hello world endpoint

- **feature/endpoints**:
  - CRUD endpoints implemented

- **feature/auth**:
  - login endpoint
  - authenticated user routes

- **feature/validation**:
  - request validation using schemas

- **feature/authorization**:
  - routes with authorization verification

- **final**:
  - final version of the code
  - hello world stuff removed
  - postman collection

The speaker (in this case, myself) will guide the attendees through each major step (cheating by checking out to the branches in the convenient states mentioned above) explaining what is being done and how it is being achieved.

## Main topics
These are the main topics this workshop proposes to address

- node principles introduction
  - single threaded
  - non-blocking I/O
  - async
- koa and koa-router api for creating a web server application
- using middlewares for handling cross-cutting concerns
- using [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) chains for dealing with asynchronicity

## Not discussed
Things that this workshop does not proposes to address

- [clustering](https://nodejs.org/api/cluster.html#cluster_cluster)
- [streams](https://nodejs.org/api/stream.html)
- functional programming in-depth
- reactive programming
- effective config management

## "Not the best" for convenience
Some things were implemented kinda sloppy.
Here's a list of some of them (I'm sure you can probably find more) and the justifications behind them.

- logger logs only to console
- .env is versioned to help attendees have a proper (not ideal though) working environment
- sqlite instead of a more production-ready rdbms for the same reason
  - PS: locally I usually spin up datasource instances using [Docker](https://www.docker.com/)
- simplified user and permission model
  - the point is to show a way you can handle this type of concern
  - if you need a more robust mean of doing it try [node_acl](https://github.com/OptimalBits/node_acl)

## Future
- [ ] Talk about and implement clustering

- [ ] Documentation
  - [ ] Add JSDoc
  - [ ] Api Documentation (swagger, openapi, apiblueprint, etc)
   - [ ] Doc file
   - [ ] UI Preview
   
- [ ] Implement unit and integration tests
  - [ ] code coverage report
  - [ ] code coverage of 100%

- [ ] Simulate production environment using Docker (and [Docker Compose](https://docs.docker.com/compose/))
  - [ ] nginx reverse proxy serving over https
  - [ ] database running in container
  - [ ] multiple api containers

## Thanks
Thank you [GDG Campinas](https://www.facebook.com/gdgcampinas/) for the opportunity to share some of my knowledge and believing this workshop was something that was worth sharing with the community.

And thank you! Yes you, the one reading right now. This would not be possible if it weren't for your interest and dedication in the subject matter. You rock!
