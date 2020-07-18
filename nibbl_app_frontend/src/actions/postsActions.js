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

export {
  fetchFeed
}