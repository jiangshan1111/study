/*
 HashRouter:有#号
 BrowserRouter:没有#号
 Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
 Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
* */
import React from 'react';
import  {HashRouter as Router,Route,Switch,Redirect}  from  'react-router-dom';
// import {AuthRoute} from './routes/private';
import asyncComponents from './components/async/AsyncComponent';
import config from './assets/js/conf/config.js';
const HomeComponent=asyncComponents(()=>import('./pages/home/home/index'));
const GoodsClassify=asyncComponents(()=>import('./pages/home/goods/classify'));
const GoodsSearch=asyncComponents(()=>import('./pages/home/goods/search'));
const GoodsDetails=asyncComponents(()=>import('./pages/home/goods/details'));
const LoginIndex=asyncComponents(()=>import('./pages/home/login/index'));
const RegIndex=asyncComponents(()=>import('./pages/home/reg/index'));
const BalanceIndex=asyncComponents(()=>import('./pages/home/balance/index'));
const BalanceEnd=asyncComponents(()=>import('./pages/home/balance/end'));
const AddressIndex=asyncComponents(()=>import('./pages/home/address/index'));
const AddressAdd=asyncComponents(()=>import('./pages/home/address/add'));
const AddressMod=asyncComponents(()=>import('./pages/home/address/mod'));
const ProfileIndex=asyncComponents(()=>import('./pages/user/profile/index'));
const MyOrder=asyncComponents(()=>import('./pages/user/myorder/index'));
const OrderDetail=asyncComponents(()=>import('./pages/user/myorder/detail'));
const AddReview=asyncComponents(()=>import('./pages/user/myorder/add_review'));
const UserAddressIndex=asyncComponents(()=>import('./pages/user/address/index'));
const UserAddressMod=asyncComponents(()=>import('./pages/user/address/mod'));
const UserMobileIndex=asyncComponents(()=>import('./pages/user/mobile/index'));
const UserModpwdIndex=asyncComponents(()=>import('./pages/user/modpwd/index'));
const MyFav=asyncComponents(()=>import('./pages/user/myfav/index'));
const Transfer=asyncComponents(()=>import('./pages/transfer/index'));
export default class RouterComponent extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route path={config.path+"home"} component={HomeComponent} ></Route>
                            <Route path={config.path+"goods/classify"} component={GoodsClassify} ></Route>
                            <Route path={config.path+"goods/search"} component={GoodsSearch} ></Route>
                            <Route path={config.path+"goods/details"} component={GoodsDetails} ></Route>
                            <Route path={config.path+"login/index"} component={LoginIndex} ></Route>
                            <Route path={config.path+"reg/index"} component={RegIndex} ></Route>
                            <Route path={config.path+"balance/index"} component={BalanceIndex} ></Route>
                            <Route path={config.path+"address/index"} component={AddressIndex} ></Route>
                            <Route path={config.path+"address/add"} component={AddressAdd} ></Route>
                            <Route path={config.path+"address/mod"} component={AddressMod} ></Route>
                            <Route path={config.path+"balance/end"} component={BalanceEnd} ></Route>
                            <Route path={config.path+"profile/index"} component={ProfileIndex} ></Route>
                            <Route path={config.path+"myorder"} component={MyOrder} ></Route>
                            <Route path={config.path+"order/detail"} component={OrderDetail} ></Route>
                            <Route path={config.path+"order/add_review"} component={AddReview} ></Route>
                            <Route path={config.path+"user/address/index"} component={UserAddressIndex} ></Route>
                            <Route path={config.path+"user/address/mod"} component={UserAddressMod} ></Route>
                            <Route path={config.path+"user/mobile/index"} component={UserMobileIndex} ></Route>
                            <Route path={config.path+"user/modpwd/index"} component={UserModpwdIndex} ></Route>
                            <Route path={config.path+"user/myfav/index"} component={MyFav} ></Route>
                            <Route path={config.path+"transfer"} component={Transfer} ></Route>
                            <Redirect to={config.path+"home/index"}></Redirect>
                        </Switch>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}
