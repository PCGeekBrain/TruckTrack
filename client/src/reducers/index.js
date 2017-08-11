import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import routeReducer from './routeReducer';

export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  routes: routeReducer
})