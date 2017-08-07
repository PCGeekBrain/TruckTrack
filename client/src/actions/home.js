import fetch from 'isomorphic-fetch';
import { API_URL } from '../api';

//** Action Creators */
const setResults = results => {
  return {
    type: 'HOME_NEW_RESULTS',
    results
  }
}

//** Async Actions */
export const getResults = ({query, option}) => {
  return dispatch => {
    return fetch(`${API_URL}/search/${option}/${query}`)
      .then(response => response.json())
      .then(results => dispatch(setResults(results)))
      .catch(error => console.log(error))
  }
}