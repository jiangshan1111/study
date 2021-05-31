//属性代理
import React, { Component } from 'react';
function hoc (WithComponent, title) {
  return class HocComponent extends Component {
    constructor() {
      super();
      this.state = {
        userName: '',
        passWord: '',
        errMessage: ''
      }
    }
    setUserName (e) {
      this.setState({
        userName: e.target.value
      })
    }
    setPassWord (e) {
      this.setState({
        passWord: e.target.value
      })

    }
    submitData (callBack) {
      if (typeof callBack == 'function') {
        callBack()
      }
    }
    render () {
      console.log(this.props)
      let newPros = {
        userName: {
          value: this.state.userName,
          onChange: this.setUserName.bind(this),
          onBlur: this.setUserName.bind(this)
        },
        passWord: {
          value: this.state.passWord,
          onChange: this.setPassWord.bind(this),
          onBlur: this.setPassWord.bind(this)
        },
        submitData: this.submitData.bind(this),
        errMessage: this.state.errMessage
      }
      return (
        <React.Fragment>
          <div>{title}</div>
          <WithComponent title={this.props.title} {...newPros}></WithComponent>
        </React.Fragment>
      )
    }
  }
}
export default hoc;