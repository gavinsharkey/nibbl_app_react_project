import { combineReducers } from 'redux'
import currentUser from './currentUserReducer'
import isLoggedIn from './isLoggedInReducer'
import isLoading from './isLoadingReducer'
import postsData from './postsReducer'
import postData from './postReducer'
import commentsData from './commentsReducer'
import userData from './userReducer'
import searchData from './searchReducer'
import usersToFollowData from './usersToFollowReducer'

export default combineReducers({
  currentUser,
  isLoggedIn,
  isLoading,
  postsData,
  postData,
  commentsData,
  userData,
  searchData,
  usersToFollowData
})