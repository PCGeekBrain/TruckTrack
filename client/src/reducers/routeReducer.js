export default (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_ROUTES":
      if (Array.isArray(action.routes)){
        return action.routes
      } else {
        return state
      }
    default:
      return state
  }
}