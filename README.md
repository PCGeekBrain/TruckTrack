# TruckTrack
React and Rails SPA for tracking truck shipments

# Configuration

## Dependencies
* Rails: `bundle install` in the main folder
* React: `npm install` in the `/client` directory

## Enviroment Variables
* `REACT_APP_RAILS_API` => The URL for the RAILS API server. For development this is `http://localhost:3001/api`

## Database
* run `rake db:migrate` to create the database

# Deployment

## Development
1. Configure enviroment as shown in the steps above
2. Run `rake start`, forman will start a rails server on port 3001 and a hotloading webpack client on port 3000

# Contrubuting

## How to:
All forks and pull requests are welcome

## TODO list:
[ ] Add Comments

# Licence
This is licenced under the MIT standard licence.

