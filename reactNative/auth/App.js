/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Header} from './src/components/index';
import {SignOutForm, SignUpForm, SignInForm} from './src/components/forms';
const Mode = {
  SIGN_IN: Symbol('SIGN_IN'),
  SIGN_UP: Symbol('SIGN_UP'),
  SIGN_OUT: Symbol('SIGN_OUT'),
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {mode: Mode.SIGN_OUT};
  }
  renderContent() {
    switch (this.state.mode) {
      case Mode.SIGN_IN:
        return <SignInForm />;
      case Mode.SIGN_UP:
        return <SignUpForm />;
      case Mode.SIGN_OUT:
        return <SignOutForm zhuxiao={this.zhuxiao.bind(this)} />;
      default:
        break;
    }
  }
  zhuxiao() {
    this.setState({mode: Mode.SIGN_UP});
  }
  switchSIGN() {
    const {mode} = this.state;
    if (mode === Mode.SIGN_IN) {
      this.setState({mode: Mode.SIGN_UP});
    } else if (mode === Mode.SIGN_UP) {
      this.setState({mode: Mode.SIGN_IN});
    }
  }
  renderButton() {
    const {viewStyle, buttonStyle, textStyle} = styles;
    if (this.state.mode !== Mode.SIGN_OUT) {
      return (
        <View style={viewStyle}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.switchSIGN.bind(this)}>
            <Text style={textStyle}>
              {this.state.mode === Mode.SIGN_IN
                ? '新用户注册'
                : '使用已有账号登录'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    return (
      <View>
        <Header title="用户认证" />
        {this.renderContent()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  buttonStyle: {
    fontSize: 16,
  },
  textStyle: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 16,
    marginRight: 16,
  },
};

export default App;
