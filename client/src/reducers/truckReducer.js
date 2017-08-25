const initialState = {
  list: [],
  truck: {},
  showModal: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEW_TRUCKS":
      return Object.assign({}, state, {list: action.trucks})
    case "SHOW_TRUCK_MODAL":
      return Object.assign({}, state, { showModal: true, truck: action.truck})
    case "CLEAR_TRUCK_MODAL":
      return Object.assign({}, state, { showModal: false, truck: {} })
    default:
      return state
  }
}