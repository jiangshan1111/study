import React, {Component} from 'react';
import {
  VirtualizedList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ListItem from './ListItem';
console.log(ListItem);
import {connect} from 'react-redux';
// import Constants from 'expo-constants';
const getItem = (data, index) => {
  return data[index];
};
const getItemCount = data => {
  return data.length;
};
class TechList extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.techs;
    console.log(this.data);
  }
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={this.data}
        initialNumToRender={4}
        renderItem={({item}) => <ListItem {...item} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
      // </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    // marginTop: Constants.statusBarHeight,
  },
});
export default connect(state => {
  return state;
})(TechList);
