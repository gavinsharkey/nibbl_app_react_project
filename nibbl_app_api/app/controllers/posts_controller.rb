class PostsController < ApplicationController
  def index
    if params[:user_id]
      @posts = Post.by_user(params[:user_id]).offset_by(params[:page])
      render json: @posts, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    else
      @posts = Post.from_current_user_and_their_followers(current_user).offset_by(params[:page])
      render json: @posts, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      render json: @post, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
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
      render json: @post, include: [{user: { except: [:password_digest] }}, :likes], methods: :time_created_string
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