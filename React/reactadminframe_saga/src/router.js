/*router.js 页面里的代码
HashRouter:有#号
BrowserRouter:没有#号
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
/*eslint-disable*/
import React from 'react'
import  {HashRouter as Router,Route,Switch}  from 'react-router-dom';
import {AuthRoute} from './routes/private';
import asyncComponent from './components/async/AsyncComponent';
const IndexPage=asyncComponent(()=>import("./pages/home/index/index"));
const AdminIndexPage=asyncComponent(()=>import("./pages/admin/index/index"));

export default class RouterComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path={base.config.path} exact component={IndexPage}></Route>
                            <AuthRoute path={base.config.path+"admin"} component={AdminIndexPage}></AuthRoute>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
