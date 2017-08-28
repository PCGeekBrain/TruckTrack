import fetch from 'isomorphic-fetch';
import store from '../store';
import { logOut } from '../actions/login';
import { setError } from '../actions/error';

export const API_URL = process.env.REACT_APP_API_URL;

export const headers = () => {
  const token = store.getState().login.token;

  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (token){
    headers.Authorization = `Bearer: ${token}`
  }
  return headers;
}

export const parseResponse = (response) => {
  return response.json()
    .then(json => {
      if(!response.ok) {
        const error = json.error
        // if the user has an authentication error, log them out
        if(response.status === 419 || response.status === 401){
          store.dispatch(logOut())
        } else if(error){ // otherwise display the server error
          store.dispatch(setError(error))
        }
        console.error("Error: ", error);
        return Promise.reject({error: json.error, errors: json.errors })
      }
      return json;
    })
}

export default {
  get(url){
    return fetch(`${API_URL}${url}`, {
      method: "GET",
      headers: headers(),
    }).then(parseResponse)
  },

  post(url, data = []){
    const body = JSON.stringify(data);
    return fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: headers(),
      body
    }).then(parseResponse)
  },

  patch(url, data=[]){
    const body = JSON.stringify(data);
    return fetch(`${API_URL}${url}`, {
      method: "PATCH",
      headers: headers(),
      body
    }).then(parseResponse)
  },

  delete(url) {
    return fetch(`${API_URL}${url}`, {
      method: 'DELETE', 
      headers: headers(),
    })
    .then(parseResponse)
  }
}