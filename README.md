# TruckTrack
SPA for simple internal shipment tracking based on invoice numbers and tracking numbers.

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

## Database
* run `rake db:migrate` to create the database
* run `rake db:seed` to create the initial admin user

# Deployment

## Development
1. Configure enviroment as shown in the steps above
2. Run `rake start`, forman will start a rails server on port 3001 and a hotloading webpack client on port 3000

# Contrubuting

## How to:
All forks and pull requests are welcome

## TODO list:

### Server
- [ ] Use joins in `/routes` call to reduce database hits.
- [ ] Support `DATABASE_URL` for database connection.

### Client
- [ ] Show server errors in Dashboard.
- [ ] Handle 500 errors from server when driver is attempted to be deleted.
- [ ] Make tracking numbers more user freindly.
- [ ] Simple "search" for dashboard index views (using an internal state)

# Licence
This is licenced under the MIT standard licence.

