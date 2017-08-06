import fetch from 'isomorphic-fetch';

export const API_URL = process.env.REACT_APP_API_URL;

export const headers = () => {
  const token = localStorage.getItem('token');
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer: ${token}`,
  }
}