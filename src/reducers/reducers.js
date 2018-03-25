const initialState = {
  issues: true,
  backup: true,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST': 
      return state;
    case 'FETCH_SUCCESS': 
      return Object.assign({}, state, {
        issues: action.filteredSuccess,
        backup: action.success
      })
    case 'FETCH_ERROR':
      return action.error || 'error';
    case 'FILTER_SUCCESS':
      return Object.assign({}, state, {
        keyword: action.keyword,
        filterType: action.filterType
      })
    default: 
      return state;
  }
}

export default reducer;