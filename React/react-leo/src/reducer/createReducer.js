function createReducer (init, json) {
  return function reducer (state = init, action) {
    if (json[action.type]) {
      return json[action.type](state, action)
    }
    else {
      return state
    }
  }
}
export { createReducer };