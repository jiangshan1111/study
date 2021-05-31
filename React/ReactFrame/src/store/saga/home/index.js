import {take,fork,put,call} from 'redux-saga/effects';
import {getNavData} from '../../../services/home';

function *watchNav(){
    while (true){
        yield take("NAV");
        let payload=yield call(getNavData);
        let data=[];
        if (payload.code ===200){
            data = payload.data;
        }
        yield put({type:"nav",data:{navs:data}});
    }
}

export default [
    fork(watchNav)
]