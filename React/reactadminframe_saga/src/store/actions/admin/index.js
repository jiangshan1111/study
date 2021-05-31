export function login(data){
    return {
        type:"LOGIN",
        data:data
    }
}
export function outLogin(){
    return {
        type:"OUTLOGIN"
    }
}
