一、步骤
    1.create一个项目
    2.npm run eject 将webpack配置暴露出来
    3.npm start 运行 如果报错删除node_modules 重新下载（npm install）
    4.npm build 打包一个文件 npm install serve 注册一个服务 serve -s build
    5.更改webpack.config.js配置
    166行 
        : isEnvDevelopment && 'cheap-module-source-map',
    改成
        : isEnvDevelopment && 'eval-source-map',//可以将react源文件暴露出来，在浏览器中打断点


二、jsx     
    1.自己编写jsx；
    <-script src='js/babel.min.js'></-script>
    /*jsx createElement*/ //babel的自执行命令
    function createElement(nodeName,attr,...args){
        console.log(nodeName:nodeName,attr:attr,children:[].concat(...args))
    }


三、react
    1.绑定事件时 用 this.clickRow.bind(this)
    clickRow(){
        console.log(1)
    }
    也可以用 this.clickRow1
    clickRow1=()=>{
        console.log(1)
    }
    或者 onClick = {()=>{this.clickRow()}}

    检测props里的数据类型
    import PropTypes from 'prop_types';
    使用
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    //默认值
    static defaultProps = {
        data:[]
    }


    react 图片
    直接使用 './assets/img/xx.img' webpack识别不了 应该用 require('./assets/img/xx.img')
    transform:translateX(-50%) 左移width的50% 用于自适应宽度 left:50% 居中的情况

    react想使用class而不是className
    需要下载react-html-attrs插件
    npm install babel-plugin-react-html-attrs --save-dev
    在webpack.config.js里
    {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        ...
    }
    里的plugin下加
    plugin:[
        [
        ...
        ],
        'react-html-attrs'
    ]

    1.react 生命周期
    componentWillMount 组件挂载前
    属性能找到（例如this.props，states） dom找不到
    componentDidMount  组件挂载后
    componentWillUpdate  组件更新前
    componentDidUpdate  组件更新后
    componentWillUnMount  组件卸载前


    2.react 常用方法
    阻止事件冒泡  e.nativeEvent.stopImmediatePropagation()


    3.react 表单
    input(text) 加上 value='' 受控 无法更改
    input(text) 加上 defaultValue='123' 不受控 可以更改
    input(checkbox) 加上 checked 受控 无法更改
    input(checkbox) 加上 defaultChecked 不受控 可以更改
    给input 加上ref = 'xxx'  可以通过 this.refs.xxx.value 来获取input输入值

    4.react 函数
    函数允许调用组件 组件也允许调用函数
    1.function clock(){
        let c = <div>{new Date()}</div>
        ReactDom.render(c,app)
    }
    setInterval(clock,1000)
    2.function c(){
        return 'hello'
    }
    ReactDom.render(<div>{c()}</div>,app)


    5.组件重复调用（父子组件）(父子组件之间通信 可以通过生命周期来 判断父组件值改变是否改变子组件的值)
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
    class Parent extends React.Component {
        render () {
        return <div>
            <Child a='111' />
            <Child a='1112' />
            <p>222</p>
        </div>
        }
    }
    ReactDOM.render(
        <Parent />,
        document.getElementById('root')
    )

    子组件拿父组件的值
    <Child a={父组件的state} />
    子组件里调用 this.props.a  默认情况会同步改变 不想改变的话通过生命周期和state来控制

    父组件拿子组件的数据 通过函数
    <Child a={父组件的函数b，同时bind(this)} />
    子组合里执行this.props.a函数 传值
    父组件函数b 取值 赋值给父组件

    6.react Tab选项卡
    在DOM上绑定类似Value属性 用data-  例如data-MyIndex
    选项卡具体代码见 tab文件夹

    7.百度JSONP
    https://www.baidu.com/sugrec?prod=pc&'wd'=1&cb=jiangshan

    8.webpack
    a.入口，出口
    b.loader(加载器)
    c.plugins(插件)
    touch webpack.config.js 新建一个js
    执行webpack 
    命令webpack运行  命令webpack -w(watch) 监听webpack 实时打包
    命令webpack -p压缩打包  命令webpack -pw(watch) 监听webpack 压缩打包实时打包
    导出值
    export {a,b}
    导出对象
    export default{
    a:1,
    b:2
    }
    导入值
    import {a,b as kkkk} from './a'
    导入对象
    import json from './a'


    9.react 脚手架
    npm install -g create-react-app 安装react脚手架
    create-react-app --version react版本


    css(){
    .jiangshan-enter{
        opactity:0
    }
    .jiangshan-enter-active{
        opactity:1;
        transition:.7s
        }
        .jiangshan-leave{
        opactity:1;
        }
        .jiangshan-leave-active{
        opactity:0;
        transition:.7s
        }
        .jiangshan-appear{
        opactity:0;
        background:red
        }
        .jiangshan-appear-active{
        opactity:1;
        background:yellow
        }
    }
    let ODiv = [this.state.v?<div></div>:'']
    <CSSTransitionGroup 
        transitionName = 'jiangshan'
        transitionEnterTimeOut={70}
        transitionLeaveTimeOut={70}
        transitionAppear={70}> //用标签包起来
    {ODiv}
    <CSSTransitionGroup/>
    /*
    transitionName = 'jiangshan' 自定义类名
    transitionEnterTimeOut 可以限定 动画入场时间 如果超过了你给的参数 
    那么将直接变成 jiangshan-enter-active{}
    transitionLeaveTimeOut 可以限定 动画离场时间 如果超过了你给的参数 
    那么将直接变成 jiangshan-leave-active{}
    .jiangshan-enter{} 进入之前的样式
    .jiangshan-enter-active{} 进入之后的样式
    .jiangshan-leave{} 离开时的样式
    .jiangshan-leave-active{} 离开之后的样式
    .jiangshan-appear{} 初始动画
    .jiangshan-appear-active{} 初始动画之后的样式
    */




四、插槽（Portals）
    this.props.children 可以获取组件的内容 比如<-Button>aaaasas</-Button>
    设置默认props Button.defaultProps = {type:'button'}


五、react.lazy()和 react.Suspense()
    按需加载
    import React, { Component, lazy, Suspense } from 'react';
    之前引入是 import Clock from './components/clock'
    现在引入lazy代码是 const Clock = lazy(()=>import('./components/clock'))
    使用
    <-Suspense fallback={<-div><-div>}> //fallback里是loading图标对应的div 也可以用<-React.Fragment></-React.Fragment>来占位
        <-Clock/>
    <-/Suspense>


六、css模块化
    css单独组件使用，避免全局污染
    在vue中使用scoped
    <-style scoped></-style>
    在react中需要配置webpack 脚手架里已经自动配置好 在webpack.config.js里 cssModuleRegex下设置module为true

    css模块化
    1.命名需要加上.module不然匹配不上
        引入 import Css from './style.module.css'
        使用 <app className={Css['app']}/>
            拼接 例如.app.active  <app className={Css['app']+' '+Css['active']}/>
        自动生成css模块化后的名称
        配置webpack.config.js {
            test: cssModuleRegex,
            use:getStyleLoaders({
            //getLocalIdent:getCSSModuleLocalIdent,//删除这条属性
            localIdentName:'[path]-[name]-[local]-[hash:base64:6]',//增加这条属性
            或者
            localIdentName:'[local]__[hash:base64:6]',//可自定义
            })
        }
    2.文件夹式的模块化（不用加module）
        配置webpack.config.js 
        {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
            importLoaders: 1,
            module:true, //开启模块化
            localIdentName:'[local]__[hash:base64:6]',//可自定义
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment,
        }),
        exclude:[ //排除这两个文件夹下的css文件
            path.join(__dirname,'--','node_modules'),
            path.join(__dirname,'--','src/assets/css/common'),
        ]
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
        },
        引入 import Css from './style.css' //不用加module
        使用 <app className={Css['app']}/>
            拼接 例如.app.active  <app className={Css['app']+' '+Css['active']}/>

        当只有几个文件夹需要使用模块化的话，需要单独插入
        {
        test: cssRegex,
        use: ['style-loader','css-loader'],
        include:[ //只有这两个文件夹使用模块化
            path.join(__dirname,'--','node_modules'),
            path.join(__dirname,'--','src/assets/css/common'),
        ]
        }

        css-loader 3.2版本后
        需要将
            module:true, //开启模块化
            localIdentName:'[local]__[hash:base64:6]',//可自定义
        改成
            module:{
            localIdentName:'[local]__[hash:base64:6]',//可自定义
            }


七、hooks
    无状态组件和有状态组件,高阶组件
    无状态组件（展示组件，函数式组件）：就是一个函数没有props，没有生命周期，就是一个简单的视图函数，没有业务逻辑更纯粹的展示ui。
        代码示例：
        function NullStatus(){
        return(
            <-div>无状态组件</-div>
        )
        }
        使用
        function NullStatus(props){
        return(
            <-div>{props.title}</-div>
        )
        }
        <-NullStatus title="hehe"></-NullStatus>


    有状态组件（容器类组件，类组件）：标准使用模式此函数继承了react里面的组件和props，可以使用生命周期在里面写业务逻辑，可以在里面做任何事情。
        代码示例：
        正常的react组件都是

    高阶组件 (一般只用于写业务逻辑，不同ui层可以反复调用)
    其实就是高阶函数，我们定义一个函数，里面返回一个有状态组件，就是高阶组件
        先了解高阶函数
        function hoc(){
        return function hocComponent(args){
            console.log(args)
        }
        }
        hoc()('呵呵')
        这个时候返回呵呵

        高阶组件分为两种方式：
        1.属性代理的方式：
        它通过做一些操作，将被包裹组件的props和新生成的props一起传递给此组件，这称之为属性带了。
        2.反向继承的方式
        这种方式返回的react组件继承了被传入的组件，所以它能够访问到的区域，权限更多，相比属性代理方式，它更像打入组织内部，对其进行修改。

        获取函数参数
        function aab(){
        console.log(arguments) //获取到的是伪数组，不能foreach没有原型链
        console.log(Array.prototype.slice.call(arguments)) //es5转为真数组
        console.log(Array.from(arguments)) //es6转为真数组
        }
        aab(1,2,3,4,5,6)

        箭头函数获取参数
        let aab=(...args)=>{
        console.log(args) //[1,2,3,4,5,6]
        }
        aab(1,2,3,4,5,6)




    16.8版本后的新特性
    hooks可以让无状态组件具备有状态组件的部分功能，比如设置state,使用钩子函数：
    componentDidMount,componentDidUpdate,componentWillUnMount
    引入 import React,{useState,useEffect} from 'react';
    使用
    function App () {
        const [title, setTitle] = useState('默认值') //类似于之前的constructor 设置和使用state
        function changeTitle () {
        setTitle('改变了')
        }
        useEffect(() => {
        console.log(title)
        return () => {
            //页面跳转时触发
        }
        }, [title])//加第二个参数表示只有这个值改变时才会触发
        return (
        <div className="App" >
            {title}
            <button onClick={changeTitle.bind(this)}>改变title</button>
        </div>
        );
    }
    // setTitle('首页')是一个异步执行函数 在方法中使用 获取title 最好先定义变量然后执行
    useEffect //刷新函数 获取改变后的state
    useState //设置state默认值
    useReducer //类似于redux里的reducer
    useContent //组件共享reducer生产的值
    useRef  //使用setInterval  let timer = useRef(null)  timer.current=setInterval({},2000)



八、react-transition-group
    引入 import CssTransition from 'react-transition-group';
    使用 <-CssTransition classNames='fade' in={this.state.show} timeout={2000} onEntered={(el)=>{}} onExited={(el)=>{}}>
    
        </-CssTransition>
        in 初始化 
        classNames css的样式名
        onExited 出场动画回调函数
        onEntered 入场动画回调函数
    设置css 
        fade-enter{
            left:300px;
            display:block
        }
        fade-enter-active{}
        fade-enter-done{}
        fade-exit{}
        fade-exit-active{}
        fade-exit-done{}


