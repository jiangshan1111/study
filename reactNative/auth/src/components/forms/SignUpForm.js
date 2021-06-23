import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardSection, Button, Input} from '../index';
class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pwd: '',
      pwdRepeat: '',
    };
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
          <Input
            label="确认密码"
            value={this.state.pwdRepeat}
            placeholder="请再次输入密码"
            secureTextEntry={true}
            onChangeText={text => this.setState({pwdRepeat: text})}
          />
        </CardSection>
        <CardSection>
          <View style={viewStyle}>
            <Button>注册</Button>
          </View>
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
export {SignUpForm};
