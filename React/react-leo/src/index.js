import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, store } from './App';
import Clock from './tick/tick';
import Tab from './tab/tab';
import AButton from './material/button';
import AApp from './antd';
import PrimarySearchAppBar from './material/PrimarySearchAppBar';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function tick () {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('example')
  );
}
// tick()

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: ''
    }
  }
  componentWillMount () {
    this.setState({
      a: this.props.a
    })
  }
  render () {
    return <div>{this.state.a}</div>
  }
}
// function Home () {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About () {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard () {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }
class Parent extends React.Component {
  render () {
    return (<div>
      <Child a='111' />
      <Child a='1112' />
      <p>222</p>
    </div>)
  }
}

var tabJson = {
  index: 0,
  TabTop: ['123', '22', '33'],
  TabBottom: ['11的内容', '22的内容', '33的内容'],
  timer: ''
}

function render () {

  ReactDOM.render(
    <div>
      <App />
      {/* react-router */}
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          {/* <Switch> */}
          <Route exact path="/">
            <Parent />
          </Route>
          <Route path="/about">
            <AButton />
          </Route>
          <Route path="/dashboard">
            <Tab tabJson={tabJson} />
          </Route>
          {/* </Switch> */}
        </div>
      </Router>
      {/* <Parent />
    <Tab tabJson={tabJson} />
    <AButton /> */}
    </div>
    ,
    document.getElementById('root')
  )
}
render()
store.subscribe(render)
// setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
