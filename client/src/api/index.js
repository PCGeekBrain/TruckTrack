import fetch from 'isomorphic-fetch';

export const API_URL = process.env.REACT_APP_API_URL;

export const headers = () => {
  const token = localStorage.getItem('token');

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
        console.error(json.errors, json.error);
        return Promise.reject(json.errors ? json.errors : json.error)
      }
      return json;
    })
}