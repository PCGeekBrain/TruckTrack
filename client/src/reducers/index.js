import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import routeReducer from './routeReducer';
import deliveryReducer from './deliveryReducer';
import driverReducer from './driverReducer';

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  routes: routeReducer,
  deliveries: deliveryReducer,
  drivers: driverReducer
})