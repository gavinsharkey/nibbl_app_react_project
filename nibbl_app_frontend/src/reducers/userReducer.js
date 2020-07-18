export default (state = {}, action) => {
  switch (action.type) {
    case 'LOADING_USER':
      return state
    case 'LOGIN_USER':
      return action.user
    case 'LOGOUT_USER':
      return {}
    default:
      return state
  }
}