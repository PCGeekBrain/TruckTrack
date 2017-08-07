export default (state = [], action) => {
  switch (action.type) {
    case "HOME_NEW_RESULTS":
      if (Array.isArray(action.results)){
        return action.results
      } else {
        return state
      }
    default:
      return state
  }
}