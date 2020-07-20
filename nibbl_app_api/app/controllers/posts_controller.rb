class PostsController < ApplicationController
  def index
    if params[:user_id]
      @posts = Post.where(user_id: params[:user_id])
      @posts_with_likes = @posts.map do |post|
        {
          post: post,
          liked_by_current_user: !!post.likes.exists?(user: current_user)
        }
      end
      render json: @posts_with_likes, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    else
      @posts = Post.from_current_users_followers(current_user, params[:page].to_i).to_a
      @posts_with_current_user = @posts.concat(current_user.posts).sort_by { |post| post.created_at }.reverse
      @posts_with_current_user_and_likes = @posts_with_current_user.map do |post|
        {
          post: post,
          liked_by_current_user: !!post.likes.exists?(user: current_user)
        }
      end
      render json: @posts_with_current_user_and_likes, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: {
        post: @post,
        liked_by_current_user: false
      }, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    else
      render json: {
        status: 500,
        errors: @post.errors.full_messages
      }
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render json: {
        post: @post,
        liked_by_current_user: !!@post.likes.exists?(user: current_user)
      }, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    else
      render json: {
        status: 404,
        error: 'Post Not Found'
      }
    end
  end

  private

  def post_params
    params.require(:post).permit(:content)
  end
end