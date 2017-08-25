const initialState = {
  drivers: [],
  showModal: false,
  driver: {}
}

export default (state = initialState, action) => {
  switch(action.type){
    case "SET_DRIVERS":
      return Object.assign({}, state, { drivers: action.drivers })
    case "SHOW_DRIVER_MODAL":
      return Object.assign({}, state, { showModal: true, driver: action.driver})
    case "CLEAR_DRIVER_MODAL":
      return Object.assign({}, state, { showModal: false, driver: {}})
    default:
      return state
  }
}