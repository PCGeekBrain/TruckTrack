export default (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_DELIVERIES":
      if (Array.isArray(action.deliveries)){
        return action.deliveries
      } else {
        return state
      }
    default:
      return state
  }
}