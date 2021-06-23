import React, {Component} from 'react';
import {View} from 'react-native';
import {Card, CardSection, Button} from '../index';
const SignOutForm = ({zhuxiao}) => {
  const {viewStyle} = styles;
  return (
    <Card>
      <CardSection>
        <View style={viewStyle}>
          <Button onPress={zhuxiao}>注销</Button>
        </View>
      </CardSection>
    </Card>
  );
};
const styles = {
  viewStyle: {
    flex: 1,
  },
};
export {SignOutForm};
