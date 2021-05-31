import React, { useState } from 'react'
import Index from './layouts/index'
import './App.css'

function App ()
{
  const [ count, setCount ] = useState( 0 )

  return (
    <div className="App">
      <Index></Index>
    </div>
  )
}

export default App
