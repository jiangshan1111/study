import {UPDATE_FOOD_INFO} from '../actions/types';
const food_info = {
  foodName: '',
  imageSrc: '',
  _id: '',
  price: 0,
};
export default (state = food_info, action) => {
  switch (action.type) {
    case UPDATE_FOOD_INFO:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
