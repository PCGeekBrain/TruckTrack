# TruckTrack
SPA for simple internal shipment tracking based on invoice numbers and generated tracking numbers.

## Features
* User facing tracking system.
* Drivers only see their own deliveries.
* Seperate client and server.
* Uses React for fast UI.
* Bootstrap for mobile responsiveness.
* Multiple user roles.
* JWT authentication with one week timeout.
* Autologout on JWT timeout

# Configuration

## Install Dependencies
* Rails: `bundle install` in the main folder
* React: `npm install` in the `/client` directory

## Required Enviroment Variables
* React:
  * `REACT_APP_API_URL`: The URL for the API server. For development this is `http://localhost:3001/api`
* Rails:
  * `RAILS_ENV`: Needs to be set to `production` for app to work in nanobox. Defaults to `development`.
  * `REACT_CLIENT_URL`: The URL for the React client (so it is allowed through CORS)
  * `SECRET_KEY_BASE` (production only): Hashed used for security 
* Postgres (production only, creates database called `production`, is generated by nanobox.io):
  * `DATA_DB_HOST`: host of the postgres server
  * `DATA_DB_USER`: username used for login
  * `DATA_DB_PASS`: password for the given user

## Database
* run `rake db:migrate` to create the database

# Deployment

## nanobox.io (docker as a service)

Deployment command: `nanobox deploy <dry-run | <app-name> >`

**Note:** To force SSL in production just change the app name after the if statements in `transform` under `deploy.config`

`boxfile.yml` info:
  * run configuration:
    1.  uses the rails 2.3 engine
    2.  uses nodejs and nginx as extra_packages
    3.  runs `npm install` whenever the code changes or `nanobox run` is called.
  * deployment configuration:
    1.  compiles react app on your local machine (`react-app build` in the client directory)
    2.  Migrate the database before the api container goes live (`rake db:migrate`). NOTE this may fail. If so login manually and run `rake db:setup`
  * web.client container:
    1.  uses the main route for the domain (`/`)
    2.  app is allowed to write to `client/config`
    3.  uses `nginx/client.conf` for the nginx server and runs `client/server.js` to serve the client
  * web.api container:
    1.  uses the api.domain route
    2.  allowed to write to `tmp` and `logs`
    3.  uses `nginx/server.conf` for nginx server configuration and runs the built in rails server on port 3001
    4. looks for streaming logs on `logs/production.log`
  * data.db:
    1.  uses postgresql 9.5 image
    2.  sets `DATA_DB_HOST`, `DATA_DB_USER`, `DATA_DB_PASS` to the correct variables by default
    3.  note that the app will use a _database_ called `production`


## Development
1. Configure enviroment as shown in the steps above
2. Run `rake start`, forman will start a rails server on port 3001 and a hotloading webpack client on port 3000

# Contrubuting

Imposter syndrome disclaimer: I want your help. No really, I do.

There might be a little voice inside that tells you you're not ready; that you need to do one more tutorial, or learn another framework, or write a few more blog posts before you can help me with this project.

I assure you, that's not the case.

The only expectation is that the code runs (preferably well), the pull request defines what it actually is and provides a feature that is usefull for thouse using the software. There is a TODO list below where you can add features you are looking for or find requested features for insparation.

Thank you for contributing!

# TODO list:

### Server
- [ ] Use joins in `/routes` call to reduce database hits and imporve performance.

### Client
- [x] Show server errors in Dashboard.
- [x] Handle 500 errors from server when driver is attempted to be deleted.
- [ ] Make tracking numbers more user freindly.
- [ ] Simple "search" for dashboard index views (using an internal state)

# Licence
This is licenced under the MIT standard licence.

