import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
const Input = ({label, value, secureTextEntry, placeholder, onChangeText}) => {
  const {viewStyle, textStyle, textInputStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{label}</Text>
      <TextInput
        style={textInputStyle}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = {
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    flex: 1,
  },
  textInputStyle: {
    fontSize: 16,
    flex: 2,
    height: 20,
    padding: 0,
    // borderColor: 'gray',
    // borderWidth: 1,
  },
};
export default Input;
