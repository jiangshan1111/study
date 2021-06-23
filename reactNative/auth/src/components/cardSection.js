import React from 'react';
import {View, Text} from 'react-native';
const CardSection = props => {
  return (
    <View style={[styles.cardSectionStyle, props.style]}>{props.children}</View>
  );
};
const styles = {
  cardSectionStyle: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};
export default CardSection;
