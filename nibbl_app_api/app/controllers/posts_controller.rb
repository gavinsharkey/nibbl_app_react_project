class PostsController < ApplicationController
  def index
    @posts = Post.from_current_users_followers(current_user, params[:page].to_i).to_a
    @posts_with_current_user = @posts.concat(current_user.posts).sort_by { |post| post.created_at }.reverse
    render json: @posts_with_current_user, include: { user: { except: [:password_digest] } }, methods: :time_created_string
  end
end