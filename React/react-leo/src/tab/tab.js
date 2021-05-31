import React, { Component } from 'react';
import './tab.css';

class TabTop extends Component {
  constructor() {
    super()
  }
  componentWillMount () {
    console.log(this.props)
  }
  changeTab (e) {
    this.props.linkChange(e.target.getAttribute('data-key'))
  }
  render () {
    var OInput = []
    this.props.topValue.forEach((el, index) => {
      OInput.push(
        <input type='button'
          onClick={this.changeTab.bind(this)}
          className={this.props.MyIndex == index ? "tabTop active" : "tabTop"}
          value={el} key={index}
          data-key={index} />
      )
    });
    return (
      <div>
        {OInput}
      </div>
    )
  }
}

class TabBottom extends Component {
  constructor() {
    super()
  }
  componentWillMount () {
    console.log(this.props)
  }
  render () {
    var ODiv = []
    this.props.bottomValue.forEach((el, index) => {
      ODiv.push(
        <div
          className={this.props.MyIndex == index ? "tabBottom active" : "tabBottom"}
          key={index}>{el}</div>
      )
    });
    return (
      <div>
        {ODiv}
      </div>
    )
  }
}

export default class Tab extends Component {
  constructor() {
    super();
    this.state = {
      MyIndex: 0,
      timer: null
    }
  }
  componentWillMount () {
    this.setState({
      MyIndex: this.props.tabJson.index ? (this.props.tabJson.index < this.props.tabJson.TabTop.length ? this.props.tabJson.index : 0) : 0
    })
  }
  componentDidMount () {
    if (this.props.tabJson.timer) {
      clearInterval(timer)
      var timer = setInterval(() => {
        let index = this.state.MyIndex
        index++
        if (index == 3) {
          index = 0
        }
        this.setState({
          MyIndex: index
        })
      }, this.props.tabJson.timer)
    }
  }
  changeIndex (index) {
    this.setState({
      MyIndex: index
    })
  }
  render () {
    return (
      <div>
        <TabTop topValue={this.props.tabJson.TabTop} MyIndex={this.state.MyIndex} linkChange={this.changeIndex.bind(this)} />
        <TabBottom bottomValue={this.props.tabJson.TabBottom} MyIndex={this.state.MyIndex} />
      </div>
    )

  }
}