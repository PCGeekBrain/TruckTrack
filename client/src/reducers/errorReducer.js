const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_ERROR":
      return state.concat({msg: action.error, key: state.length})
    case "CLEAR_ERROR":
      return state.filter((value) => value.key !== action.key)
    default:
      return state
  }
}