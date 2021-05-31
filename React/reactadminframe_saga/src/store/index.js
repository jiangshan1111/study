import {createStore,applyMiddleware} from 'redux';
import createSaga from 'redux-saga';
import reducers from './reducers';
import rootSaga from './saga';

let saga=createSaga();

let store=createStore(reducers,applyMiddleware(saga));

saga.run(rootSaga);

export default store;