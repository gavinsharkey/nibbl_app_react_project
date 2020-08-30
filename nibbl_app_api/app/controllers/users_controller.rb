class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  def create
    @user = User.new(user_params)
    if @user.save
      payload = {user_id: @user.id}
      token = encode_token(payload)
      render json: {
        status: 200,
        logged_in: true,
        user: @user,
        jwt: token
      }, include: [:likes, :received_follows, :given_follows], except: [:password_digest]
    else
      render json: {
        status: 500,
        logged_in: false,
        errors: @user.errors.full_messages
      }
    end
  end

  def show
    if @user
      render json: @user, except: [:password_digest], methods: [:followings_count, :followers_count]
    else
      render json: {
        status: 404,
        error: 'User Not Found'
      }
    end
  end

  def update
    if @user.update(user_params)
      render json: @user, except: [:password_digest], methods: [:followings_count, :followers_count]
    else
      render json: { 
        status: 500,
        errors: @user.errors.full_messages
       }
    end
  end

  def search
    @users = User.search(params[:query])
    render json: @users, except: [:password_digest]
  end

  def to_follow
    @users = User.by_most_followers
    render json: @users, except: [:password_digest], methods: [:followers_count]
  end

  def exists?
    @username_taken = User.exists?(username: params[:username])
    render json: {
      username_taken: @username_taken
    }
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
  end

  # def new_user_params
  #   params.permit(:username, :email, :password, :password_confirmation, :display_name, :bio, :avatar)
  # end 

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :display_name, :bio)
  end
end