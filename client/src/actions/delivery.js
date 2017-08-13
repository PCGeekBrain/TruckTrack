import API from '../api';

//** Action Creators */
const setDeliveries = deliveries => {
  return {
    type: 'SET_NEW_DELIVERIES',
    deliveries
  }
}

//** Async Actions */
export const getDeliveries = (route_id) => {
  return dispatch => {
    return API.get(`/routes/${route_id}/deliveries`)
      .then(routes => dispatch(setDeliveries(routes)))
  }
}