import API from '../api';

//** Action Creators */
export const setErrors = error => {
  return {
    type: 'LOGIN_ERRORS',
    error
  }
}

export const setToken = token => {
  return {
    type: 'LOGIN_SUCCESS',
    token
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT'
  }
}

//** Async Actions */
export const login = ({username, password}) => {
  return dispatch => {
    return API.post("/authenticate", {username, password})
      .then(result => dispatch(setToken(result.token)))
      .then(result => localStorage.setItem('token', result.token))
      .catch(error => dispatch(setErrors(error.error)))
  }
}