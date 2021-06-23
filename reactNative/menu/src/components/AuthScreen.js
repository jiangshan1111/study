import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Card, CardSection, Input, Button} from './common';
import {connect} from 'react-redux';
import {authActions} from '../actions';
const styles = StyleSheet.create({
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
});
class AuthScreen extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: () => <Text style={styles.headerTitleStyle}>用户认证</Text>,
    // headerRight: () => (
    //   <Button onPress={() => alert('This is a button!')}>
    //     <Text>+</Text>
    //   </Button>
    // ),
  };
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      email: this.props.email,
      pwd: this.props.pwd,
      loading: false,
    };
  }
  login_in() {
    this.setState({loading: true});
    new Promise(resolve => {
      this.props.loginIn(
        {
          email: this.state.email,
          pwd: this.state.pwd,
        },
        resolve,
      );
    }).then(res => {
      this.setState({loading: false});
      this.props.navigation.push('menuList', {
        nav: 123545,
      });
    });
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator color="#e0e0e0" />;
    } else {
      return <Button onPress={this.login_in.bind(this)}>登录</Button>;
    }
  }
  onChangeText(text) {}
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="邮箱"
            placeholder="请输入邮箱"
            value={this.state.email}
            onChangeText={email => {
              this.setState({
                email,
              });
            }}
          />
        </CardSection>
        <CardSection>
          <Input
            label="密码"
            placeholder="请输入密码"
            secureTextEntry
            value={this.state.pwd}
            onChangeText={pwd => {
              this.setState({
                pwd,
              });
            }}
          />
        </CardSection>
        <CardSection>
          <View style={{flex: 1}}>{this.renderButton()}</View>
        </CardSection>
      </Card>
    );
  }
}
export default connect(
  state => {
    console.log(state);
    return {
      email: state.auth.email,
      pwd: state.auth.pwd,
    };
  },
  {loginIn: authActions.loginIn},
)(AuthScreen);
