let PreState = {
  int: 0
};

export default (state = PreState, action)=> {
  switch (action.type) {
    case 'PAGE_COUNT_INTERMENT':
      let int = state.int + 1;
      return {...state, int: int};
    default:
      return state;
  }
}