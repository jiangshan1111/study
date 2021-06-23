import React from 'react';
import {View, Text} from 'react-native';
const CardSection = props => {
  console.log(props.style);
  return (
    <View style={[styles.cardSectionStyle, props.style]}>{props.children}</View>
  );
};
const styles = {
  cardSectionStyle: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    padding: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};
export default CardSection;
