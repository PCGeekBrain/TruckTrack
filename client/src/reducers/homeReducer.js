export default (state = [], action) => {
  switch (action.type) {
    case "HOME_NEW_RESULTS":
      return action.payload
    default:
      return state
  }
}