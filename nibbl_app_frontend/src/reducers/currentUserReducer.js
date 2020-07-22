export default (state = {}, action) => {
  switch (action.type) {
    case 'LOADING_CURRENT_USER':
      return state
    case 'LOGIN_USER':
      return action.user
    case 'FOLLOW_USER':
      return {
        ...state,
        given_follows: [...state.given_follows, action.follow]
      }
    case 'UNFOLLOW_USER':
      return {
        ...state,
        given_follows: state.given_follows.filter(follow => follow.id !== action.id)
      }
    case 'LOGOUT_USER':
      return {}
    default:
      return state
  }
}