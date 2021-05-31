import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import reducer from './reducer'
import { createStore } from 'redux'
let store = createStore(reducer)
console.log(store.getState())
class App extends Component {
  click () {
    store.dispatch({ type: 'delete' });
  }
  add () {
    store.dispatch({ type: 'add' });
  }
  render () {
    return (
      <div className="App" >
        <input type='button' value='-' onClick={this.click.bind(this)} />
        <span>{store.getState().counter}</span>
        <input type='button' value='+' onClick={this.add.bind(this)} />
      </div>
    )
  }
}
export { App, store };
