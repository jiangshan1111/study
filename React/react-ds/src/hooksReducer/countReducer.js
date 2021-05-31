export const defaultValue = {
  counter: 10
}
export function counterReducer (state = defaultValue, action) {
  console.log(state)
  if (action.type === 'add') {

    console.log(state)
    // return { ...state, ...{ counter: state.counter + 1 } }
    let newCounter = state.counter + 1
    // state.counter = newCounter
    return { ...state, counter: newCounter }
    // return {
    //   ...{
    //     counter: newCounter
    //   }
    // }
  } else if (action.type === 'del') {
    return { ...state, ...{ counter: state.counter - 1 } }
  }

}