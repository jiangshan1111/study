import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './App';
import RouterComponent from './router';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import qs from 'qs';

import NewSuccess from './pages/businessUser/newPage/newSuccess';
function App (params) {
  return (
    <React.Fragment>
      <NewSuccess></NewSuccess>
      <AppComponent></AppComponent>
      <RouterComponent></RouterComponent>
    </React.Fragment>
  )
}
console.log(axios)
// axios({
//   method: 'post', url: '/api/lockServer/search',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }, data: qs.stringify({ index: 1 })
// })
// axios({
//   method: 'post', url: '/api/lockServer/search',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }, data: 'index=1&index1=2'
// })
let param = new URLSearchParams()
param.append('username', 'admin')
param.append('pwd', 'admin')
axios({ method: 'post', url: '/api/lockServer/search', data: param })

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
