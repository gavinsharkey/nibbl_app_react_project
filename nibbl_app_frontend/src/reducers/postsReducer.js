export default (state = {
  posts: [],
  currentPage: 0,
  loadingLike: false,
  loadingPosts: false,
  loadingMorePosts: false,
  noMorePosts: false
}, action) => {
  switch (action.type) {
    case 'LOADING_POSTS':
      return {
        ...state,
        loadingPosts: true
      }
    case 'LOADING_MORE_POSTS':
      return {
        ...state,
        loadingMorePosts: true
      }
    case 'SET_POSTS':
      return  {
        ...state,
        currentPage: 0,
        posts: action.posts,
        loadingPosts: false,
        loadingMorePosts: false,
        noMorePosts: false
      }
    case 'ADD_POSTS':
      return {
        ...state,
        loadingMorePosts: false,
        currentPage: action.page,
        posts: [...state.posts, ...action.posts]
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [ action.post, ...state.posts ]
      }
    case 'LOADING_LIKE':
      return {
        ...state,
        loadingLike: true,
        posts: [ ...state.posts ]
      }
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.id) {
            return {
              ...post,
              user: { ...post.user },
              likes: [...post.likes, action.like]
            }
          } else {
            return post
          }
        }),
        loadingLike: false,
      }
    case 'UNLIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.like.post_id) {
            return {
              ...post,
              user: { ...post.user },
              likes: post.likes.filter(like => like.id !== action.like.id)
            }
          } else {
            return post
          }
        }),
        loadingLike: false
      }
    case 'NO_MORE_POSTS':
      return {
        ...state,
        loadingMorePosts: false,
        noMorePosts: true
      }
    default:
      return state
  }
}