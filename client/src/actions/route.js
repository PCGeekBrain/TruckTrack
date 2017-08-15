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