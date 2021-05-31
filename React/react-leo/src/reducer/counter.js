import { counterInit } from './initState'
import { add, remove } from './initfun'
import { createReducer } from './createReducer'

// export default function counter (state = counterInit, action) {
//   if (action.type == 'add') {
//     return add(state)
//   } else if (action.type == 'delete') {
//     return remove(state)
//   } else {
//     return state;
//   }
// }
let counter = createReducer(counterInit, { 'add': add, 'delete': remove })
export default counter
//createReducer(counterInit,{'add':add()}) 封装一个createReducer函数