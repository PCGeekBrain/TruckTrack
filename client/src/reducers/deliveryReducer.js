const initialState = {
  deliveries: [],
  show_modal: false,
  active_delivery: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_DELIVERIES":
      if (Array.isArray(action.deliveries)){
        return Object.assign({}, state, { deliveries: action.deliveries })
      } else {
        return state
      }
    case "SET_ACTIVE_DELIVERY":
      return Object.assign({}, state, { active_delivery: action.delivery })
    case "SET_SHOW_DELIVERY_MODAL":
      return Object.assign({}, state, { show_modal: action.show })
    default:
      return state
  }
}