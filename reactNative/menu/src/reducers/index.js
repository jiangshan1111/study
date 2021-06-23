import {combineReducers} from 'redux';
import authReducers from './authReducers';
import foodReducers from './foodReducers';
import navReducer from './navReducer';
const reducers = combineReducers({
  auth: authReducers,
  nav: navReducer,
  food: foodReducers,
});
export default reducers;
