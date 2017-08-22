const initialState = {
  routes: [], 
  active: undefined,
  showModal: false,
  status_options: []
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
      return Object.assign({}, state, { active: action.route })
    case "SET_SHOW_ROUTE_MODAL":
      return Object.assign({}, state, { showModal: action.show })
    case "SET_STATUS_OPTIONS":
      return Object.assign({}, state, { status_options: action.options })
    default:
      return state
  }
}