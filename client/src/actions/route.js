import API from '../api';

//** Action Creators */
const setRoutes = routes => {
  return {
    type: 'SET_NEW_ROUTES',
    routes
  }
}

export const setActiveRoute = route => {
  return {
    type: "SET_ACTIVE_ROUTE",
    route
  }
}

export const setShowModal = show => {
  return {
    type: "SET_SHOW_ROUTE_MODAL",
    show
  }
}

export const clearModal = () => {
  return {
    type: "CLEAR_ROUTE_MODAL"
  }
}

const setStatusOptions = options => {
  return {
    type: "SET_STATUS_OPTIONS",
    options
  }
}

//** Async Actions */
export const getRoutes = () => {
  return dispatch => {
    return API.get("/routes")
      .then(routes => dispatch(setRoutes(routes)))
  }
}

export const getRoute = (id) => {
  return dispatch => {
    return API.get(`/routes/${id}`)
      .then(route => dispatch(setActiveRoute(route)))
  }
}

export const getStatusOptions = () => {
  return dispatch => {
    return API.get(`/routes/options`)
      .then(options => dispatch(setStatusOptions(options)))
  }
}

export const submitRoute = (route) => {
  return dispatch => {
    // set the defaults
    let url = "/routes"
    let request = API.post
    // check if it is an update (we have an id)
    if (route.id) {
      url += `/${route.id}`;
      request = API.patch;
    }
    // Push it up to the server
    return request(url, route)
      .then(result => dispatch(getRoutes()))
  }
}