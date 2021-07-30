//会员
let defaultState={
    username:localStorage['username']?localStorage['username']:"",
    isLogin: localStorage['isLogin'] ? Boolean(localStorage['isLogin']) : false,
    auth:localStorage['auth'] ?localStorage['auth'] : '',
};

function userReducer(state=defaultState,action){
    switch (action.type){
        //会员登录
        case "login":
            localStorage['username']=action.data.username;
            localStorage['isLogin']=true;
            localStorage['auth']=action.data.auth;
            return {...state, ...action.data};
        case "out_login"://安全退出
            localStorage.removeItem('username');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('auth');
            localStorage.removeItem('showType');
            return Object.assign({},state, {username:"",isLogin:false,uid:'',auth:''});
        default:
            return state;
    }
}

export default userReducer;