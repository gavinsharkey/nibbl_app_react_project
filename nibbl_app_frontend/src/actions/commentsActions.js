import { fetchWithToken } from '../concerns/fetchable'

const fetchComments = postId => {
  return dispatch => {
    dispatch({type: 'LOADING_COMMENTS'})
    fetchWithToken(`http://localhost:3001/api/v1/comments?post_id=${postId}`)
    .then(json => {
      dispatch({type: 'SET_COMMENTS', comments: json})
    })
  }
}

const createComment = (postId, body) => {
  return dispatch => {
    fetchWithToken('http://localhost:3001/api/v1/comments', 'POST', {
      comment: {
        post_id: postId,
        body
      }
    })
    .then(json => {
      if (json.status === 200) {
        dispatch({type: 'ADD_COMMENT', comment: json.comment})
      }
    })
  }
}

const destroyComment = commentId => {
  return dispatch => {
    fetchWithToken(`http://localhost:3001/api/v1/comments/${commentId}`, 'DELETE')
    .then(json => {
      dispatch({type: 'DELETE_COMMENT', id: json.id})
    })
  }
}

export {
  fetchComments,
  createComment,
  destroyComment
}