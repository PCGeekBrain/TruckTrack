import API from '../api';

/** Action Creators */
const setDrivers = drivers => {
  return {
    type: "SET_DRIVERS",
    drivers
  }
}

export const showModal = driver => {
  return {
    type: "SHOW_DRIVER_MODAL",
    driver
  }
}

export const hideModal = () => {
  return {
    type: "CLEAR_DRIVER_MODAL",
  }
}

/** Async Actions */
export const getDrivers = () => {
  return dispatch => {
    return API.get(`/users/drivers`)
      .then(drivers => dispatch(setDrivers(drivers)));
  }
}

export const submitDriver = driver => {
  return dispatch => {
    // set the defaults
    let url = "/users"
    let request = API.post
    // check if it is an update (we have an id)
    if (driver.id) {
      url += `/${driver.id}`;
      request = API.patch;
    }
    // Push it up to the server
    return request(url, driver)
      .then(result => dispatch(getDrivers()))
  }
}

export const deleteDriver = (id) => {
  return dispatch => {
    API.delete(`/users/${id}`)
      .catch(() => dispatch(getDrivers())) // no content throws error since json is invalid
  }
}