//会员
let defaultState={
    uid:localStorage['uid']?localStorage['uid']:"",
    username:localStorage['username']?localStorage['username']:"",
    isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false
};

function userReducer(state=defaultState,action){
    switch (action.type){
        //会员登录
        case "login":
            localStorage['username']=action.data.username;
            localStorage['isLogin']=true;
            localStorage['uid']=action.data.uid;
            return {...state, ...action.data};
        case "out_login"://安全退出
            localStorage.clear();
            return Object.assign({},state, {username:"",isLogin:false,uid:''});
        default:
            return state;
    }
}

export default userReducer;