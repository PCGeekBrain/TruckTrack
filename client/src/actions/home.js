import API from '../api';

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
    return API.get(`/search/${option}/${query}`)
      .then(results => dispatch(setResults(results)))
      .catch(error => console.log(error))
  }
}