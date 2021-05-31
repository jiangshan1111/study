import {createStore,applyMiddleware} from 'redux';
import createSaga from 'redux-saga';
import rootSaga from "./saga";
import reducers from './reducers';

let saga=createSaga();

//3、存入仓库
let store=createStore((reducers),applyMiddleware(saga));

saga.run(rootSaga);

export default store;