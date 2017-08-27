import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import routeReducer from './routeReducer';
import deliveryReducer from './deliveryReducer';
import userReducer from './userReducer';
import truckReducer from './truckReducer';

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  routes: routeReducer,
  deliveries: deliveryReducer,
  users: userReducer,
  trucks: truckReducer
})