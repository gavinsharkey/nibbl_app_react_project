export default (state = {
  postNotFound: false,
  loadingLike: false,
  loadingPost: true,
  post: {}
}, action) => {
  switch (action.type) {
    case 'LOADING_POST':
      return {
        loadingPost: true,
        loadingLike: false,
        postNotFound: false,
        post: state.post
      }
    case 'SET_POST':
      return {
        postNotFound: false,
        loadingLike: false,
        loadingPost: false,
        post: action.post
      }
    case 'LOADING_SINGLE_LIKE':
      return {
        postNotFound: false,
        loadingLike: true,
        loadingPost: false,
        post: {
          liked_by_current_user: true,
          post: {
            ...state.post.post,
            user: { ...state.post.post.user },
            likes: [...state.post.post.likes]
          }
        }
      }
    case 'LIKE_SINGLE_POST':
      return {
        postNotFound: false,
        loadingLike: false,
        loadingPost: false,
        post: {
          liked_by_current_user: true,
          post: {
            ...state.post.post,
            user: { ...state.post.post.user },
            likes: [...state.post.post.likes, action.like]
          }
        }
      }
    case 'UNLIKE_SINGLE_POST':
      return {
        postNotFound: false,
        loadingLike: false,
        loadingPost: false,
        post: {
          liked_by_current_user: false,
          post: {
            ...state.post.post,
            user: { ...state.post.post.user },
            likes: state.post.post.likes.filter(like => like.id !== action.like.id)
          }
        }
      }
    case 'POST_NOT_FOUND':
      return {
        postNotFound: true,
        loadingLike: false,
        loadingPost: false,
        post: {}
      }
     default:
      return state
  }
}