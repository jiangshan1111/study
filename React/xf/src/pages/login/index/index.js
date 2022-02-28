import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Css from '../../../assets/css/login/index.css'
import { connect } from 'react-redux';
import config from '../../../assets/js/conf/config'
import {login} from '../../../store/actions/user'
class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      username: "",
      password:'',
    }
  }
  replacePage(pUrl){
    this.props.history.replace(config.path+pUrl);
  }
  LoginIn () {
    const { username, password } = this.state
    // new Promise((resolve,reject) => {
    //   this.props.login(resolve,{ username, password })
    // }).then((res) => {
    //     if (res === 'success') {
    //       this.replacePage('home/index');
    //     }
    // })
    this.props.login({ username, password }).then((res) => {
        if (res === 'success') {
          this.replacePage('home/index');
        }
    })
  }
  render () {
    return (
      <div  className = {Css['login-box']}>
        <p  className = {Css['login-title']}>中科江南-财务云产品实施部署工具</p>
        <div className={Css['login-content']}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="账户"
              name="username"
            >
              <Input size="large" onChange={(e) => {
                this.setState({
                username:e.target.value
              })}}/>
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
            >
              <Input.Password size="large" onChange={(e) => {
                this.setState({
                password:e.target.value
              })}}/>
            </Form.Item>
            <Form.Item
              style={{
                textAlign:'center'
              }}
              wrapperCol={{ span: 24 }}
            >
              <Button type="primary" htmlType="submit" className = {Css['login-button']}   onClick={this.LoginIn.bind(this)}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      )
  }
}
export default connect((state, props) => {
  console.log(state, props)
  return{user:state.user}
}, {
  login
})(Login)