import {LOGIN_IN} from './types';
export const loginIn = (obj, resolve) => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: LOGIN_IN,
        payload: obj,
      });
      resolve(3);
    }, 1000);
  };
};
// return {
//   type: LOGIN_IN,
//   payload: obj,
// }
