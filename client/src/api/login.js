import { setToken } from '../actions/login'

export const check_login = (dispatch) => {
  const token = localStorage.getItem('token');

  if (token){
    dispatch(setToken(token))
  }
}