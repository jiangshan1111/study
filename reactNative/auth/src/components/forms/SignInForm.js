import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Card, CardSection, Button, Input} from '../index';
class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pwd: '',
      ButtonActive: false,
    };
  }
  changeStatus() {
    this.setState({ButtonActive: true});
    const {email, pwd} = this.state;
    console.log(email, pwd);
    setTimeout(() => {
      this.setState({ButtonActive: false});
    }, 2000);
  }
  renderButton() {
    if (this.state.ButtonActive) {
      return <ActivityIndicator color="#e0e0e0" />;
    } else {
      return <Button onPress={this.changeStatus.bind(this)}>登录</Button>;
    }
  }
  render() {
    const {viewStyle} = styles;
    return (
      <Card>
        <CardSection>
          <Input
            label="邮箱"
            value={this.state.email}
            placeholder="请输入邮箱"
            onChangeText={text => this.setState({email: text})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="密码"
            value={this.state.pwd}
            placeholder="请输入密码"
            secureTextEntry={true}
            onChangeText={text => this.setState({pwd: text})}
          />
        </CardSection>
        <CardSection>
          <View style={viewStyle}>{this.renderButton()}</View>
        </CardSection>
      </Card>
    );
  }
}
const styles = {
  viewStyle: {
    flex: 1,
  },
};
export {SignInForm};
