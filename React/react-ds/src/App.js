// import React, { Component, lazy, Suspense } from 'react'
// import ToastInit from './components/toast'
// import './App.css';
// const Clock = lazy(() => import('./components/clock'))
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       userName: "1",
//       password: "2"
//     }
//   }
//   changeForm () {
//     if (this.state.userName !== '1') {
//       ToastInit({
//         text: '用户名错误',
//         duration: 2000
//       })
//       return
//     }
//     if (this.state.password !== '2') {
//       ToastInit({
//         text: '密码错误'
//       })
//       return
//     }
//     ToastInit({
//       text: '输入正确',
//       duration: 2000
//     })
//   }
//   render () {
//     return (
//       <div className="App" >
//         <div style={{
//           overflow: "hidden",
//           height: '100px'
//         }}>
//           <Suspense fallback={<React.Fragment></React.Fragment>}>
//             <Clock title={'hehe'} />
//           </Suspense>
//         </div>
//         <div>

//           <input type='text' value={this.state.userName} onChange={(e) => { this.setState({ userName: e.target.value }) }} placeholder="密码" /><br />
//           <input type='text' value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="用户名" /><br />
//           <input type='button' value="登录" onClick={this.changeForm.bind(this)} /><br />
//         </div>
//       </div>
//     );
//   }
// }
// export default App;
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    // setTimeout(() => {
      alert('You clicked on: ' + count);
    // }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
export default App;
/*
高阶组件
*/
// import React, { Component } from 'react'
// import ProxyHoc from './components/hoc/proxy'
// import ExtendHoc from './components/hoc/extend'
// import './App.css';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     console.log(this.props)

//     this.state = {
//       userName: "1",
//       password: "2"
//     }
//   }
//   render () {
//     return (
//       <div className="App" >
//         <div {...this.props.button}>
//           {this.props.title}
//         </div>
//       </div>
//     );
//   }
// }

// class ComponentChild extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       num: 2019
//     }
//   }
 
//   componentDidMount() {
//     console.log("child component Did Mount")
//   }
//   clickComponent() {
//     console.log("Component click")
//   }
 
//   render() {
//     return (<div > 
//       <p>1233</p>
//       <button  onClick={this.clickComponent}>点击</button>
//         <p>{this.state.num}</p>
//        </div>
//     )
//   }
// }
 
 
 
// let iihoc = (WrapComponet) => class extends WrapComponet {
//   constructor(props) {
//       super(props)
//       this.state = {
//           num: 2000
//       }
//   }
//   componentDidMount() {
//       console.log('iihoc componentDidMount')
//   }
//   clickComponent() {
//     console.log("Component clic123k")
//   }
//   render () {
//     console.log(super.render());
//     return (
//       <div>
//           <div onClick={this.clickComponent}>iiHoc 点击</div>
  
//           <div><WrapComponet /></div> {/*//用的是父组件的state */}
//             <div>{super.render()}</div>{/*//反向继承，用的是子组件的state；*/}
//       </div>
  
//     )
//   }
// }

// export default ProxyHoc(App, '传值aaaas');
// export default iihoc(ComponentChild);

/**
 * 无状态组件
 */
//  import React, { Component } from 'react'
// const App1 = function (props) {
//   console.log(props)
//   return (
//     <div>{props.title}</div>
//     )
// }
//   class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//     }
//   }
//   render () {
//     return (
//       <div>
//         <App1 title="123"></App1>
//           {/* {this.props.title} */}
//         </div>
//     );
//   }
// }
//  export default App;
/*
 高阶组件实操
 */
// import React, { Component } from 'react'
// import ToastInit from './components/toast'
// // import ProxyHoc from './components/hoc/proxy'
// import Hoc from './components/hoc/hoc'
// import './App.css';

// const Login = Hoc((props) => {
//   console.log(props)
//   return (
//     <div>
//       {props.title}<br />
//       用户名：<input type="text" {...props.userName} /><br />
//       密码：<input type="text"  {...props.passWord} /><br />
//       <input type="button" value="登录" onClick={props.submitData.bind(this, function () {
//         console.log(props)
//         // if (!props.errMessage) {
//         ToastInit({
//           text: '用户名：' + props.userName.value + ' 密码：' + props.passWord.value
//         })
//         // } else {
//         //   ToastInit(props.errMessage)
//         // }
//       })} />
//     </div>
//   )
// },'登录一')

// const Login2 = Hoc((props) => {
//   console.log(props)
//   return (
//     <div>
//       {props.title}<br />
//       用户名：<input type="text" {...props.userName} />
//       密码：<input type="text"  {...props.passWord} />
//       <input type="button" value="登录" onClick={props.submitData.bind(this, function () {
//         console.log(props)
//         // if (!props.errMessage) {
//         ToastInit({
//           text: '用户名：' + props.userName.value + ' 密码：' + props.passWord.value
//         })
//         // } else {
//         //   ToastInit(props.errMessage)
//         // }
//       })} />
//     </div>
//   )
// },'登录二')
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//     }
//   }
//   render () {
//     return (
//       <div className="App" >
//         <div>
//           <Login title="登录"></Login>
//           <Login2 title="登录2"></Login2>
//           {/* {this.props.title} */}
//         </div>
//       </div>
//     );
//   }
// }
// // export default ProxyHoc(App, '传值aaaas');
// export default App;


/*
hooks使用
*/
// import React, { useEffect, useState } from 'react'
// import './App.css';
// function App () {
//   const [title, setTitle] = useState('默认值')
//   function changeTitle () {
//     // setTitle('改变了')
//     new Promise(
//       function () {
//         setTitle('改变了')
//       }
//     ).then(
//       function () {
//         console.log(title)
//       })
//   }
//   useEffect(() => {
//     console.log(title)
//     return () => {
//       //页面跳转时触发
//     }
//   }, [title])//加第二个参数表示只有这个值改变时才会触发
//   return (
//     <div className="App" >
//       {title}
//       <button onClick={changeTitle.bind(this)}>改变title</button>
//     </div>
//   );
// }
// // export default ProxyHoc(App, '传值aaaas');
// export default App;

/*
hooks使用制作一个计数器使用useReducer
*/
// import React, { useReducer } from 'react'
// import './App.css';
// import ReactContext from './context'
// import Counter from './components/hooks/counter'
// import { defaultValue, counterReducer } from './hooksReducer/countReducer'
// let ICount = 10
// // console.log(defaultValue, counterReducer)
// function App ()
// {
//   const [ state, dispatch ] = useReducer( counterReducer, defaultValue )
//   console.log( state, dispatch )
//   function add ()
//   {
//     dispatch( { type: 'add', payLoad: { counter: ++ICount } } )
//   }
//   function del ()
//   {
//     dispatch( { type: 'del', payLoad: { counter: --ICount } } )
//   }
//   console.log( state.counter )
//   return (
//     <div className="App" >
//       <ReactContext.Provider value={ { state, dispatch } }>
//         <Counter></Counter>
//         <button onClick={ del.bind( this ) }>-</button>{ state.counter }<button onClick={ add.bind( this ) }>+</button>
//       </ReactContext.Provider>
//     </div>
//   );
// }
// export default ProxyHoc(App, '传值aaaas');
// export default App;
