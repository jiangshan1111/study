import { requestString } from '../../../assets/js/utils/request'
import config from '../../../assets/js/conf/config'
import { message } from 'antd';

//登录
// export function login (data) {
//   return (dispatch) => {
//     return new Promise((resolve) => {
//       requestString(config.baseUrl + '/serverConfig/login', 'post', JSON.stringify(data)).then((res) => {
//         if (res === 'success') {
//           dispatch({
//             type: "login",
//             data: {
//               username: data.username,
//               auth: 'common'
//             }
//           })
//           resolve('success')
//         } else if (res === 'success admin') {
//           dispatch({
//             type: "login",
//             data: {
//               username: data.username,
//               auth: 'admin'
//             }
//           })
//           resolve('success')
//         } else {
//           message.error('登录失败！');
//         }
//       })
//     })
//   }
// }
//登录
export function login (data) {
  return async (dispatch) => {
    return await requestString(config.baseUrl + '/serverConfig/login', 'post', JSON.stringify(data)).then((res) => {
      if (res === 'success') {
        dispatch({
          type: "login",
          data: {
            username: data.username,
            auth: 'common'
          }
        })
        return 'success'
      } else if (res === 'success admin') {
        dispatch({
          type: "login",
          data: {
            username: data.username,
            auth: 'admin'
          }
        })
        return 'success'
      } else {
        message.error('登录失败！');
      }
    })
  }
}
//退出
export function outLogin () {
  return {
    type: "out_login"
  }
}
