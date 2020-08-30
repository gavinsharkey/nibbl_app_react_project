import { fetchWithToken } from '../concerns/fetchable'

const checkLoggedInStatus = () => {
  return dispatch => {
    dispatch({type: 'LOADING_CURRENT_USER'})
    fetchWithToken('http://localhost:3001/api/v1/logged_in')
    .then(json => {
      if (json.logged_in) {
        dispatch({type: 'LOGIN_USER', user: json.user})
      } else {
        dispatch({type: 'LOGOUT_USER'})
      }
    })
  }
}

const loginUser = json => {
  localStorage.setItem('token', json.jwt)
  return {type: 'LOGIN_USER', user: json.user}
}

const logoutUser = () => {
  localStorage.removeItem('token')
  return {type: 'LOGOUT_USER'}
}

export {
  checkLoggedInStatus,
  loginUser,
  logoutUser
}