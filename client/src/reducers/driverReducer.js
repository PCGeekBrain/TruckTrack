const initialState = {
  drivers: []
}

export default (state = initialState, action) => {
  switch(action.type){
    case "SET_DRIVERS":
      return Object.assign({}, state, { drivers: action.drivers })
    default:
      return state
  }
}