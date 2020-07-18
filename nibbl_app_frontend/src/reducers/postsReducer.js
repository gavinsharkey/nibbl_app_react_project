export default (state = {
  posts: [],
  current_page: 0
}, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return  {
        posts: action.posts,
        current_page: action.page
      }
    default:
      return state
  }
}