import "babel-polyfill";//es6转es5 兼容ie
import 'url-search-params-polyfill'; //让ie支持new URLSearchParams()
import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/js/conf/global";
import './assets/css/common/public.css';
import RouterComponent from './router';
import {Provider} from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';

function App(){
    return (
        <React.Fragment>
            <Provider store={store}>
                <RouterComponent></RouterComponent>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
