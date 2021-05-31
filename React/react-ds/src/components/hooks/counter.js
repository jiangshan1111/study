import React, { useContext } from 'react';
import ReactContext from '../../context'
console.log(ReactContext)
export default function Counter () {
  let counterContext = useContext(ReactContext)
  console.log(counterContext)
  function add () {
    counterContext.dispatch({ type: 'add', payLoad: {} })
  }
  function del () {
    counterContext.dispatch({ type: 'del', payLoad: {} })
  }
  return (
    <div>
      <button onClick={del.bind(this)}>-</button>{counterContext.state.counter}<button onClick={add.bind(this)} > +</button>
    </div>
  )
}