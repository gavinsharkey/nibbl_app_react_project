export default (state = {
  posts: [],
  current_page: 0,
  loadingLike: false,
  loadingPosts: false
}, action) => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return {
        posts: state.posts,
        current_page: state.current_page,
        loadingLike: false,
        loadingPosts: true
      }
    case 'SET_POSTS':
      return  {
        posts: action.posts,
        current_page: action.page,
        loadingLike: false,
        loadingPosts: false
      }
    case 'ADD_POST':
      return {
        current_page: state.current_page,
        loadingLike: false,
        loadingPosts: false,
        posts: [ action.post, ...state.posts ]
      }
    case 'LOADING_LIKE':
      return {
        current_page: state.current_page,
        loadingLike: true,
        loadingPosts: false,
        posts: [ ...state.posts ]
      }
    case 'LIKE_POST':
      return {
        current_page: state.current_page,
        posts: state.posts.map(postData => {
          if (postData.post.id === action.id) {
            return {
              liked_by_current_user: true,
              post: {
                ...postData.post,
                user: { ...postData.post.user },
                likes: [...postData.post.likes, action.like]
              }
            }
          } else {
            return postData
          }
        }),
        loadingLike: false,
        loadingPosts: false
      }
    case 'UNLIKE_POST':
      return {
        current_page: state.current_page,
        posts: state.posts.map(postData => {
          if (postData.post.id === action.like.post_id) {
            return {
              liked_by_current_user: false,
              post: {
                ...postData.post,
                user: { ...postData.post.user },
                likes: postData.post.likes.filter(like => like.id !== action.like.id)
              }
            }
          } else {
            return postData
          }
        }),
        loadingLike: false,
        loadingPosts: false
      }
    default:
      return state
  }
}