import { fetchWithCredentials } from '../concerns/fetchable'

const fetchUser = userId => {
  return dispatch => {
    dispatch({type: 'LOADING_USER'})
    fetchWithCredentials(`http://localhost:3001/api/v1/users/${userId}`)
    .then(json => {
      if (json.status === 404) {
        dispatch({type: 'USER_NOT_FOUND'})
      } else {
        dispatch({type: 'SET_USER', user: json})
      }
    })
  }
}

const followUser = userId => {
  return dispatch => {
    dispatch({type: 'LOADING_FOLLOW'})
    fetchWithCredentials('http://localhost:3001/api/v1/follows', 'POST', { 
      follow: { followed_user_id: userId } 
    })
    .then(json => {
      if (!json.errors) {
        dispatch({type: 'SET_FOLLOW'})
        dispatch({type: 'FOLLOW_USER', follow: json})
      }
    })
  }
}

const unfollowUser = followId => {
  return dispatch => {
    dispatch({type: 'LOADING_FOLLOW'})
    fetchWithCredentials(`http://localhost:3001/api/v1/follows/${followId}`, 'DELETE')
    .then(json => {
      dispatch({type: 'SET_UNFOLLOW'})
      dispatch({type: 'UNFOLLOW_USER', id: json.id})
    })
  }
}

export {
  fetchUser,
  followUser,
  unfollowUser
}