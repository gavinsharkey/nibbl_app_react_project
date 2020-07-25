export default (state = {
  loadingUser: true,
  loadingFollow: false,
  userNotFound: false,
  user: {}
}, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return {
        ...state,
        loadingUser: true,
        user: state.user
      }
    case 'SET_USER':
      return {
        ...state,
        loadingUser: false,
        user: action.user
      }
    case 'UPDATE_USER':
      return {
        ...state,
        loadingUser: false,
        user: {
          ...state.user,
          display_name: action.user.display_name,
          bio: action.user.bio
        }
      }
    case 'LOADING_FOLLOW':
      return {
        loadingUser: false,
        loadingFollow: true,
        userNotFound: false,
        user: state.user
      }
    case 'SET_FOLLOW':
      return {
        loadingUser: false,
        loadingFollow: false,
        userNotFound: false,
        user: {
          ...state.user,
          followers_count: state.user.followers_count + 1
        }
      }
    case 'SET_UNFOLLOW':
      return {
        loadingUser: false,
        loadingFollow: false,
        userNotFound: false,
        user: {
          ...state.user,
          followers_count: state.user.followers_count - 1
        }
      }
    case 'USER_NOT_FOUND':
      return {
        loadingUser: false,
        loadingFollow: false,
        userNotFound: true,
        user: state.user
      }
    default:
      return state
  }
}