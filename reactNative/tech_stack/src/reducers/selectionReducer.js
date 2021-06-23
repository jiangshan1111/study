export default (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case 'select_tech':
      console.log(23);
      return action.payload;
    default:
      return state;
  }
};
