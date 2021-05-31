import React, { Component } from 'react';
import './index.css'
export default class Toast extends Component {
  constructor() {
    super();
    this.state = {
      text: 'hehe'
    }
  }
  componentDidMount () {
    this.setState({ text: this.props.opt.text })
  }
  render () {
    return (
      <div className="toast-div">
        {this.state.text}
      </div>
    )
  }
}