/*eslint-disable*/
import React from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions/index';
import Css from '../../../assets/css/home/index/index.css';
import {request} from '../../../assets/js/libs/request.js';
import Toast from '../../../components/toast';

class IndexPage extends React.Component {
    constructor(){
        super();
        this.state={
            username:"",
            password:""
        };
    }
    componentDidMount() {

    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    login(){
        if(this.state.username.match(/^\s*$/)){
            Toast.info('请输入用户名');
            return;
        }
        if(this.state.password.match(/^\s*$/)){
            Toast.info('请输入密码');
            return;
        }
        this.props.dispatch(actions.admin.login({username:this.state.username,success:()=>{
                this.props.history.replace(base.config.path+"admin");
            }}));
    }
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css["login-wrap"]}>
                    <div className={Css["login-title"]}>欢迎登录</div>
                    <div className={Css["input-wrap"]}>
                        <div className={Css["icon"]+" "+Css['user']}></div>
                        <div className={Css["input"]}>
                            <input type="text" placeholder="用户名" onChange={(e)=>{this.setState({username:e.target.value})}} />
                        </div>
                    </div>
                    <div className={Css["input-wrap"]}>
                        <div className={Css["icon"]+" "+Css['password']}></div>
                        <div className={Css["input"]}>
                            <input type="password" placeholder="密码" onChange={(e)=>{this.setState({password:e.target.value})}} />
                        </div>
                    </div>
                    <button type="button" className={Css["login-btn"]} onClick={this.login.bind(this)}>登录</button>
                    <div className={Css["tip"]}>输入任意用户名和密码即可登录</div>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return {
        state
    }
})(IndexPage)
