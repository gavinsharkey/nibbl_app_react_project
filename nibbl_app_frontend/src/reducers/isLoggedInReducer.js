export default (state = false, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return state
    case 'LOGIN_USER':
      return true
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}