import API from '../api';

//** Action Creators */
const setRoutes = routes => {
  return {
    type: 'SET_NEW_ROUTES',
    routes
  }
}

const setActiveRoute = route => {
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