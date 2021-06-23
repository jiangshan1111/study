import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
const Button = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = {
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#007AFF',
    padding: 8,
  },
  textStyle: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'center',
  },
};
export default Button;
