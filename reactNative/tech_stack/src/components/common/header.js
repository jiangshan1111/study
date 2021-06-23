import React from 'react';
import {Text, View} from 'react-native';
const Header = props => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.title}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 20,
  },
  viewStyle: {
    backgroundColor: '#e0e0e0',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    elevation: 2,
  },
};
export default Header;
