import {combineReducers} from "redux";
import adminReducer from './admin';

let reducers=combineReducers({
    admin:adminReducer
});
export default reducers;
