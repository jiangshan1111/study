/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Header from './src/components/header';
import AlbumsList from './src/components/albumsList';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="专辑" />
        <AlbumsList />
      </View>
    );
  }
}
// const App = () => {
//   return <Header title="专辑" />;
// };

export default App;
