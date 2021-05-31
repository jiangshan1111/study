let defaultState={
    username:localStorage["username"]?localStorage["username"]:"",
    isLogin:localStorage["isLogin"]?Boolean(localStorage["isLogin"]):false
};
function reducer(state=defaultState,action){
    switch(action.type){
        case "login":
            return Object.assign({},state,action.data);
        case "out_login":
            return Object.assign({},state,action.data);
        default:
            return state;
    }

}
export default reducer
