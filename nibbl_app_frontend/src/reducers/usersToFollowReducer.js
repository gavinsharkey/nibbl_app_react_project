export default (state = {
  users: []
}, action) => {
  switch (action.type) {
    case 'SET_USERS_TO_FOLLOW':
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}