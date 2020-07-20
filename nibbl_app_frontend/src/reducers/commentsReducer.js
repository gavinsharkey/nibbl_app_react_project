export default (state = {
  loadingComments: true,
  comments: []
}, action) => {
  switch (action.type) {
    case 'LOADING_COMMENTS':
      return {
        loadingComments: true,
        comments: [...state.comments]
      }
    case 'SET_COMMENTS':
      return {
        loadingComments: false,
        comments: action.comments
      }
    case 'ADD_COMMENT':
      return {
        loadingComments: false,
        comments: [action.comment, ...state.comments]
      }
    case 'DELETE_COMMENT':
      return {
        loadingComments: false,
        comments: state.comments.filter(comment => comment.id !== action.id)
      }
    default:
      return state
  }
}