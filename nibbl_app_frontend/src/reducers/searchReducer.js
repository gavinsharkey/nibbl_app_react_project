export default (state = {
  isSearching: false,
  users: []
}, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        isSearching: true,
        users: action.users
      }
    case 'CLEAR_SEARCH':
      return {
        isSearching: false,
        users: []
      }
    default:
      return state
  }
}