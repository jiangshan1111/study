//属性代理
import React, { Component } from 'react';
function hoc (WithComponent, title) {
  return class HocComponent extends Component {
    render () {
      return (
        <div>
          <div>{title}</div>
          <WithComponent title="属性代理"></WithComponent>
        </div>
      )
    }
  }
}
export default hoc;