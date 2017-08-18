const initialState = {
  routes: [], 
  active_route: undefined,
  show_modal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_ROUTES":
      if (Array.isArray(action.routes)){
        return Object.assign({}, state, {routes: action.routes})
      } else {
        return state
      }
    case "SET_ACTIVE_ROUTE":
      return Object.assign({}, state, {active_route: action.route})
    case "SET_SHOW_MODAL":
      return Object.assign({}, state, { show_modal: action.show_modal })
    default:
      return state
  }
}