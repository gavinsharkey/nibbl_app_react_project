export default (state = true, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return true
    case 'LOADING_POSTS':
      return true
    case 'SET_POSTS':
      return false
    case 'LOGIN_USER':
      return false
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}