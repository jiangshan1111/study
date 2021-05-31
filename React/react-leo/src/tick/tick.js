import React, { Component } from 'react';

var myStyle = {
  fontSize: 100,
  color: '#FF0000'
};
var arr = [
  <h1 style={myStyle} key='1'>Hello, world!</h1>,
  <h1 key='2'>Hello, world!</h1>
]
export default class Clock extends Component {
  constructor() {
    super();
    this.state = { date: new Date() };
    setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }
  render () {
    return (
      <div>
        <input type="button" onClick={this.getShow.bind(this)} />
        {arr}
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }

  getShow () {
    // console.log(1)
    // this.state.date = new Date('2018-02-01')
    this.setState({ 'date': new Date('2018-02-01') })
    console.log(this)
  }
}



// export default Clock;