//反向继承
import React from 'react';
function hoc (WithComponent, title) {
  return class HocComponent extends WithComponent {
    render () {
      const props = this.props
      const newProps = {
        button: {
          onClick : () => {
            console.log(1)
          },
        },
        title:title,
        ...props
      }
      return (
        <div>
          <div>{title}{this.state.password}</div>
          <WithComponent {...newProps}></WithComponent>
        </div>
      )
    }
  }
}
export default hoc;