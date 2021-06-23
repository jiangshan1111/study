import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import CardSection from './cardSection';
import Button from './Button';
const styles = StyleSheet.create({
  textContentStyle: {
    justifyContent: 'center',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  buttonContentStyle: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomWidth: 0,
    justifyContent: 'space-evenly',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  contentStyle: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
});
const Confirm = ({children, visible, onAccept, onCancel}) => {
  const {contentStyle, textStyle, textContentStyle, buttonContentStyle} =
    styles;
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {}}>
      <View style={contentStyle}>
        <CardSection style={textContentStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>
        <CardSection style={buttonContentStyle}>
          <Button onPress={onAccept}>确认</Button>
          <Button onPress={onCancel}>取消</Button>
        </CardSection>
      </View>
    </Modal>
  );
};
export default Confirm;
