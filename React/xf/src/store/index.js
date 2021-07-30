import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

//3、存入仓库
let store=createStore((reducers),applyMiddleware(thunk));

export default store;