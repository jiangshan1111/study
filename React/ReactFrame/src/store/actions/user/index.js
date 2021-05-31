//会员登录
export function login(data){
    return {
        type:"LOGIN",
        data
    }
}

//会员退出
export function outLogin(){
    return {
        type:"OUTLOGIN"
    }
}

//头像上传
export function uploadHead(data) {
    return {
        type:"UPLOAD_HEAD",
        data
    }
}