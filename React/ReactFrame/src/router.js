/*
HashRouter:有#号
BrowserRouter:没有#号
Route：设置路由与组件关联
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
import React,{lazy,Suspense} from 'react';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
// import {AuthRoute} from './routes/private';
const MainPage=lazy(()=>import("./pages/home/main"));
const GoodsPage=lazy(()=>import("./pages/home/goods"));
class RouterComponent extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Suspense fallback={<React.Fragment/>}>
                            <Switch>
                                <Route path={window.base.config.path+"home"} component={MainPage}></Route>
                                <Route path={window.base.config.path+"goods"} component={GoodsPage}></Route>
                                {/*<AuthRoute path={window.base.config.path+"goods"} component={GoodsPage}></AuthRoute>*/}
                                <Redirect to={window.base.config.path+"home/index"}></Redirect>
                            </Switch>
                        </Suspense>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}

export default RouterComponent;
