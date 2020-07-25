export default (state = {}, action) => {
  switch (action.type) {
    case 'LOADING_CURRENT_USER':
      return state
    case 'LOGIN_USER':
      return action.user
    case 'UPDATE_USER':
      return {
        ...state,
        display_name: action.user.display_name,
        bio: action.user.bio
      }
    case 'LIKE_POST':
      return {
        ...state,
        likes: [...state.likes, action.like]
      }
    case 'LIKE_SINGLE_POST':
      return {
        ...state,
        likes: [...state.likes, action.like]
      }
    case 'UNLIKE_POST':
      return {
        ...state,
        likes: state.likes.filter(like => like.id !== action.like.id)
      }
    case 'UNLIKE_SINGLE_POST':
      return {
        ...state,
        likes: state.likes.filter(like => like.id !== action.like.id)
      }
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