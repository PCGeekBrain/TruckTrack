import API from '../api';

/** Action Creators */
const setUsers = users => {
  return {
    type: "SET_USERS",
    users
  }
}

const setDrivers = drivers => {
  return {
    type: "SET_DRIVERS",
    drivers
  }
}

const setRoles = roles => {
  return {
    type: "SET_USER_ROLES",
    roles
  }
}

export const showModal = user => {
  return {
    type: "SHOW_USER_MODAL",
    user
  }
}

export const hideModal = () => {
  return {
    type: "CLEAR_USER_MODAL",
  }
}

/** Async Actions */
export const getUsers = () => {
  return dispatch => {
    return API.get(`/users`)
      .then(users => dispatch(setUsers(users)));
  }
}

export const getDrivers = () => {
  return dispatch => {
    return API.get(`/users/drivers`)
      .then(drivers => dispatch(setDrivers(drivers)));
  }
}

export const getRoles = () => {
  return dispatch => {
    return API.get(`/users/roles`)
      .then(roles => dispatch(setRoles(roles)));
  }
}

export const submitUser = driver => {
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
    return request(url, {user: driver})
      .then(result => dispatch(getUsers()))
  }
}

export const addPoint = id => {
  return dispatch => {
    return API.post(`/users/${id}/addpoint`)
      .then(result => dispatch(getUsers()))
  }
}

export const deleteUser = (id) => {
  return dispatch => {
    API.delete(`/users/${id}`)
      .then(() => dispatch(getUsers())) // no content throws error since json is invalid
  }
}