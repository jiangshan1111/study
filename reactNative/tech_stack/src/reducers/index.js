import {combineReducers} from 'redux';
import techReducer from './techReducer.js';
import selectionReducer from './selectionReducer.js';
export default combineReducers({
  techs: techReducer,
  selection: selectionReducer,
});
