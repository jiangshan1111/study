import {fork,put,take} from "redux-saga/effects";

//会员登录
function *watchLogin(){
    while (true) {
        let action=yield take("LOGIN");
        localStorage["username"]=action.data.username;
        localStorage["isLogin"]=action.data.isLogin;
        yield put({type:"login",data:{username:action.data.username,isLogin:true}});
        if (action.data.success){
            action.data.success();
        }
    }
}

//会员退出
function *watchOutLogin(){
    while (true){
        yield take("OUTLOGIN");
        localStorage.removeItem("username");
        localStorage.removeItem("isLogin");
        yield put({type:"out_login",data:{username:"",isLogin:false}});
    }
}

export default [
    fork(watchLogin),
    fork(watchOutLogin)
]