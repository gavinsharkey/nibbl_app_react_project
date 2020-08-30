import { fetchWithToken } from '../concerns/fetchable'

const search = query => {
  return dispatch => {
    fetchWithToken(`http://localhost:3001/api/v1/users/search?query=${query}`)
    .then(json => dispatch({type: 'SET_SEARCH', users: json}))
  }
}

const clearSearch = () => {
  return {type: 'CLEAR_SEARCH'}
}

export {
  search,
  clearSearch
}