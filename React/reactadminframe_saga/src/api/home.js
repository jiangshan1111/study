import {request} from '../assets/js/libs/request.js';
export function getSlider(callback){
    return request(window.base.config.baseApi + "/home/index/slide?token="+window.base.config.token).then(res=>{
        if(res.code===200){
            if(callback){
                callback(res.data)
            }
            return res.data;
        }else{
            return []
        }
    })
}
