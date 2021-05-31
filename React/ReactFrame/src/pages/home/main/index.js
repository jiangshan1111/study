import React,{lazy,Suspense} from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
import Css from '../../../assets/css/home/main/index.css';
const IndexPage=lazy(()=>import("../index"));
const CartPage=lazy(()=>import("../cart"));
const UcenterPage=lazy(()=>import("../../user/ucenter"));
class Index extends React.Component {
    constructor(){
        super();
        this.state = {
            homeStyle:true,
            cartStyle:false,
            myStyle:false
        }
    }
    componentDidMount() {
        this.setBottomNavStyle(this.props.location.pathname);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setBottomNavStyle(nextProps.location.pathname)
    }

    setBottomNavStyle(pathName){
        switch (pathName) {
            case window.base.config.path+"home/index":
                this.setState({homeStyle:true,cartStyle:false,myStyle:false});
                break;
            case window.base.config.path+"home/cart":
                this.setState({homeStyle:false,cartStyle:true,myStyle:false});
                break;
            case window.base.config.path+"home/my":
                this.setState({homeStyle:false,cartStyle:false,myStyle:true});
                break;
            default:
                this.setState({homeStyle:true,cartStyle:false,myStyle:false});
                break;
        }
    }

    goPage(url){
        this.props.history.replace(window.base.config.path+url);
    }
    render() {
        return (
            <div>
                <div>
                    <Suspense fallback={<React.Fragment/>}>
                        <Switch>
                            <Route path={window.base.config.path+"home/index"} component={IndexPage}></Route>
                            <Route path={window.base.config.path+"home/cart"} component={CartPage}></Route>
                            <Route path={window.base.config.path+"home/my"} component={UcenterPage}></Route>
                            <Redirect to={window.base.config.path+"home/index"}></Redirect>
                        </Switch>
                    </Suspense>
                </div>
                <div className={Css['bottom-nav']}>
                    <ul className={this.state.homeStyle?"ulnone "+Css["home"]+" "+Css['active']:"ulnone "+Css["home"]} onClick={this.goPage.bind(this, "home/index")}>
                        <li></li>
                        <li>首页</li>
                    </ul>
                    <ul className={this.state.cartStyle?"ulnone "+Css["cart"]+" "+Css['active']:"ulnone "+Css["cart"]} onClick={this.goPage.bind(this, "home/cart")}>
                        <li></li>
                        <li>购物车</li>
                        <li className={Css['spot']+" hide"}></li>
                    </ul>
                    <ul className={this.state.myStyle?"ulnone "+Css["my"]+" "+Css['active']:"ulnone "+Css["my"]} onClick={this.goPage.bind(this, "home/my")}>
                        <li></li>
                        <li>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Index;