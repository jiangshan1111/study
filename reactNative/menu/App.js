import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import reducers from './src/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Header} from './src/components/common';
import AppWithNavigator from './src/navigators/AppWithNavigator';
const store = createStore(reducers, applyMiddleware(thunk));
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigator screenProps={{signOut: 'some text'}} />
      </Provider>
    );
  }
}
