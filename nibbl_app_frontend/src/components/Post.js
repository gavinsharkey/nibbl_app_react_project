import React from 'react'
import PostButtons from './PostButtons'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import { Link } from 'react-router-dom'

function Post(props) {
  const { currentUserId, currentUserLikes, loadingLike, likePost, unlikePost, post: { id, content, time_created_string, user, likes } } = props
  const isLiked = !!currentUserLikes.find(like => like.post_id === id)
  
  return (
    <div className="post container my-2 p-3 px-4 border">
        <PostHeader user={user} time_created_string={time_created_string} />
        <Link to={`/posts/${id}`}>
          <div className="post-body p-2 rounded">
            <p>{content}</p>
          </div>
        </Link>
        <PostButtons
          currentUserId={currentUserId}
          postId={id}
          loadingLike={loadingLike}
          likes={likes}
          likePost={likePost}
          unlikePost={unlikePost}
          isLiked={isLiked}
        />
    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    currentUserLikes: state.currentUser.likes
  }
}


export default connect(mapStateToProps)(Post)
