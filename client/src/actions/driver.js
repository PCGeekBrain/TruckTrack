import API from '../api';

/** Action Creators */
const setDrivers = drivers => {
  return {
    type: "SET_DRIVERS",
    drivers
  }
}

/** Async Actions */
export const getDrivers = () => {
  return dispatch => {
    return API.get(`/users/drivers`)
      .then(drivers => dispatch(setDrivers(drivers)));
  }
}