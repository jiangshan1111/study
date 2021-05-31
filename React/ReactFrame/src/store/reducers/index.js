import {combineReducers} from 'redux';
import counterReducer from './counter';
import userReducer from './user';
import homeReducer from './home';

let reducers=combineReducers({
    counter:counterReducer,
    user:userReducer,
    home:homeReducer
})

export default reducers;