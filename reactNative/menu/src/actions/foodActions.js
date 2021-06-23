import {UPDATE_FOOD_INFO} from './types';
export const updateFoodInfo = foodInfo => {
  return {
    type: UPDATE_FOOD_INFO,
    payload: foodInfo,
  };
};
