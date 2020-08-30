import { fetchWithToken } from '../concerns/fetchable'

const fetchPost = postId => {
  return dispatch => {
    dispatch({type: 'LOADING_POST'})
    fetchWithToken(`http://localhost:3001/api/v1/posts/${postId}`)
    .then(json => {
      if (json.status === 404) {
        dispatch({type: 'POST_NOT_FOUND'})
      } else {
        dispatch({type: 'SET_POST', post: json})
      }
    })
  }
}

const likePost = postId => {
  return dispatch => {
    dispatch({type: 'LOADING_SINGLE_LIKE'})
    fetchWithToken('http://localhost:3001/api/v1/likes', 'POST', { post_id: postId })
    .then(json => {
      if (!json.errors) {
        dispatch({type: 'LIKE_SINGLE_POST', id: json.post_id, like: json})
      }
    })
  }
}

const unlikePost = likeId => {
  return dispatch => {
    dispatch({type: 'LOADING_SINGLE_LIKE'})
    fetchWithToken(`http://localhost:3001/api/v1/likes/${likeId}`, 'DELETE')
    .then(json => {
      dispatch({type: 'UNLIKE_SINGLE_POST', like: json})
    })
  }
}

export {
  fetchPost,
  likePost,
  unlikePost
}