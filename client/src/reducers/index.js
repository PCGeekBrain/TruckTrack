import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  home: homeReducer,
  login: loginReducer
})