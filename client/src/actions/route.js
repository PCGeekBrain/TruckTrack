import API from '../api';

//** Action Creators */
const setRoutes = routes => {
  return {
    type: 'SET_NEW_ROUTES',
    routes
  }
}

//** Async Actions */
export const getRoutes = () => {
  return dispatch => {
    return API.get("/routes")
      .then(routes => dispatch(setRoutes(routes)))
  }
}