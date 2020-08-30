import { fetchWithCredentials } from '../concerns/fetchable'

const fetchFeed = () => {
  return dispatch => {
    dispatch({type: 'LOADING_POSTS'})
    fetchWithCredentials(`http://localhost:3001/api/v1/posts?page=0`)
    .then(json => {
      dispatch({type: 'SET_POSTS', posts: json})
    })
  }
}

const fetchMoreFeed = page => {
  return dispatch => {
    dispatch({type: 'LOADING_MORE_POSTS'})
    fetchWithCredentials(`http://localhost:3001/api/v1/posts?page=${page}`)
    .then(json => {
      if (json.length === 0) {
        dispatch({type: 'NO_MORE_POSTS'})
      } else {
        dispatch({type: 'ADD_POSTS', posts: json, page})
      }
    })
  }
}

const fetchPostsByUser = (userId) => {
  return dispatch => {
    dispatch({type: 'LOADING_POSTS'})
    fetchWithCredentials(`http://localhost:3001/api/v1/posts?page=0&user_id=${userId}`)
    .then(json => {
      dispatch({type: 'SET_POSTS', posts: json})
    })
  }
}

const fetchMorePostsByUser = (userId, page) => {
  return dispatch => {
    dispatch({type: 'LOADING_MORE_POSTS'})
    fetchWithCredentials(`http://localhost:3001/api/v1/posts?page=${page}&user_id=${userId}`)
    .then(json => {
      if (json.length === 0) {
        dispatch({type: 'NO_MORE_POSTS'})
      } else {
        dispatch({type: 'ADD_POSTS', posts: json, page})
      }
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
    dispatch({type: 'LOADING_LIKE'})
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
    dispatch({type: 'LOADING_LIKE'})
    fetchWithCredentials(`http://localhost:3001/api/v1/likes/${likeId}`, 'DELETE')
    .then(json => {
      dispatch({type: 'UNLIKE_POST', like: json})
    })
  }
}

export {
  fetchFeed,
  fetchMoreFeed,
  fetchPostsByUser,
  fetchMorePostsByUser,
  likePost,
  unlikePost,
  createPost
}