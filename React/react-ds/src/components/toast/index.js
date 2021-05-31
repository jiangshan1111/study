import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './toast';
export default function ToastInit (options) {
  let div = document.createElement('div');
  document.body.appendChild(div)
  ReactDOM.render(
    <Toast opt={options}></Toast>, div
  )
  setTimeout(() => {
    document.querySelector('.toast-div').style.animation = 'hideToast 1s forwards'
    setTimeout(() => {
      document.body.removeChild(div)
    }, 1100)
  }, options.duration ? options.duration : 2000)
}