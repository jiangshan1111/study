import React, { Component, lazy, Suspense } from 'react';
import './index.css'
console.log(lazy, Suspense)
export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0
    }
    // this.startX = 0
    // this.startY = 0
    console.log(this.props)
  }
  clickFun (e) {
    console.log(e)
  }
  touchMove (e) {
    this.setState({
      left: e.touches[0].pageX - this.startX,
      top: e.touches[0].pageY - this.startY
    })
  }
  touchStart (e) {
    this.startX = e.touches[0].pageX - this.state.left
    this.startY = e.touches[0].pageY - this.state.top
  }
  render () {
    return (<div>
      <div className="move" style={{ top: this.state.top + 'px', left: this.state.left + 'px' }} onTouchMove={(e) => { this.touchMove(e) }} onTouchStart={(e) => { this.touchStart(e) }}>{this.props.title}</div>
    </div>)
  }
}