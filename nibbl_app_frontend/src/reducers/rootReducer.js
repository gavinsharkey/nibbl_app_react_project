import { combineReducers } from 'redux'
import user from './userReducer'
import isLoggedIn from './isLoggedInReducer'
import isLoading from './isLoadingReducer'
import postsData from './postsReducer'

export default combineReducers({
  user,
  isLoggedIn,
  isLoading,
  postsData
})