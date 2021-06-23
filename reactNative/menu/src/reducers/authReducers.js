import {LOGIN_IN} from '../actions/types';
const login_info = {
  email: '',
  pwd: '',
};
export default (state = login_info, action) => {
  switch (action.type) {
    case LOGIN_IN:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
