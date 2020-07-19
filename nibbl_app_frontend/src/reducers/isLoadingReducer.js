export default (state = true, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return true
    case 'LOGIN_USER':
      return false
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}