import fetch from 'isomorphic-fetch';
import { API_URL, parseResponse, headers } from '../api';

//** Action Creators */
const setErrors = error => {
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

//** Async Actions */
export const login = ({username, password}) => {
  const body = JSON.stringify({username, password})
  return dispatch => {
    return fetch(`${API_URL}/authenticate`, {
      method: "POST",
      headers: headers(),
      body,
    }).then(parseResponse)
      .then(result => dispatch(setToken(result.token)))
      .then(result => localStorage.setItem('token', result.token))
      .catch(error => dispatch(setErrors(error)))
  }
}