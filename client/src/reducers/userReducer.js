const initialState = {
  drivers: [],
  users: [],
  roles: [],
  showModal: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type){
    case "SET_DRIVERS":
      return Object.assign({}, state, { drivers: action.drivers })
    case "SET_USERS":
      return Object.assign({}, state, { users: action.users })
    case "SET_USER_ROLES":
      return Object.assign({}, state, { roles: action.roles })
    case "SHOW_USER_MODAL":
      return Object.assign({}, state, { showModal: true, user: action.user})
    case "CLEAR_USER_MODAL":
      return Object.assign({}, state, { showModal: false, user: {}})
    default:
      return state
  }
}