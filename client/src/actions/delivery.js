import API from '../api';

//** Action Creators */
const setDeliveries = deliveries => {
  return {
    type: 'SET_NEW_DELIVERIES',
    deliveries
  }
}

export const setActiveDelivery = (delivery) => {
  return {
    type: "SET_ACTIVE_DELIVERY",
    delivery
  }
}

export const setShowModal = (show) => {
  return {
    type: "SET_SHOW_MODAL",
    show
  }
}

//** Async Actions */
export const getDeliveries = (route_id) => {
  return dispatch => {
    return API.get(`/routes/${route_id}/deliveries`)
      .then(routes => dispatch(setDeliveries(routes)))
  }
}

export const markDelivered = (route_id, delivery_id) => {
  return dispatch => {
    return API.patch(`/routes/${route_id}/deliveries/${delivery_id}`, {delivered: true})
      .then(result => dispatch(getDeliveries(route_id)))
  }
}