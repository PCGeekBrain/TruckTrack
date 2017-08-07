const initialState = {logged_in: false, error: null, token: null}

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERRORS":
      return {logged_in: false, error: action.error, token: null}
    case "LOGIN_SUCCESS":
      return {logged_in: true, error: null, token: action.token}
    default:
      return state
  }
}