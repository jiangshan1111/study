let home = {
  showType:localStorage['showType']?localStorage['showType']:'tableList'
}
function homeReducer (state=home,action) {
  if (action.type === 'update_showType') {
    localStorage['showType'] = action.data
    return Object.assign({},state,{showType:action.data})
  }
  return state
}
export default homeReducer