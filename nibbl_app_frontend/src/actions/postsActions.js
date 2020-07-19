import { fetchWithCredentials } from '../concerns/fetchable'

const fetchFeed = (offset = 0) => {
  return dispatch => {
    dispatch({type: 'LOADING_POSTS'})
    fetchWithCredentials(`http://localhost:3001/api/v1/posts?page=${offset}`)
    .then(json => {
      dispatch({type: 'SET_POSTS', posts: json, page: offset})
    })
  }
}

const createPost = content => {
  return dispatch => {
    fetchWithCredentials('http://localhost:3001/api/v1/posts', 'POST', {
      post: {
        content
      }
    })
    .then(json => {
      if (!json.errors) {
        dispatch({type: 'ADD_POST', post: json})
      }
    })
  }
}

const likePost = postId => {
  return dispatch => {
    fetchWithCredentials('http://localhost:3001/api/v1/likes', 'POST', { post_id: postId })
    .then(json => {
      if (!json.errors) {
        dispatch({type: 'LIKE_POST', id: json.post_id, like: json})
      }
    })
  }
}

const unlikePost = likeId => {
  return dispatch => {
    fetchWithCredentials(`http://localhost:3001/api/v1/likes/${likeId}`, 'DELETE')
    .then(json => {
      dispatch({type: 'UNLIKE_POST', like: json})
    })
  }
}

export {
  fetchFeed,
  likePost,
  unlikePost,
  createPost
}