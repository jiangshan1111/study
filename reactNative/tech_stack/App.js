/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers/index';
import {Header} from './src/components/common/index';
import TechList from './src/components/techList';
let store = createStore(reducers);
const styles = StyleSheet.create({
  viewStyle: {
    paddingBottom: 70,
  },
});
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.viewStyle}>
        <Header title="技术栈" />
        <TechList />
      </View>
    </Provider>
  );
};
export default App;
