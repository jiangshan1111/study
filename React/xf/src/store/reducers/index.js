import {combineReducers} from 'redux';
import userReducer from './user';
import homeReducer from './home';
let reducers=combineReducers({
  user: userReducer,
  home: homeReducer
})

export default reducers;