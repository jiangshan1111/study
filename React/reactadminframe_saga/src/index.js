import 'babel-polyfill'//es6转es5兼容ie
import 'url-search-params-polyfill';//让ie支持URLSearchParams
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/js/conf/global.js';
import './assets/css/common/public.css';
import * as serviceWorker from './serviceWorker';
import Router from './router';
import {Provider} from 'react-redux'
import store from './store';

function App(){
    return (
        <React.Fragment>
            <Provider store={store}>
                <Router></Router>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
