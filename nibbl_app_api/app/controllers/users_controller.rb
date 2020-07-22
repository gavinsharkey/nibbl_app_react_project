class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: 200,
        logged_in: true,
        user: @user
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
    @user = User.find_by(id: params[:id])
    if @user
      render json: @user, except: [:password_digest], methods: [:followings_count]
    else
      render json: {
        status: 404,
        error: 'User Not Found'
      }
    end
  end

  def search
    @users = User.search(params[:query])
    render json: @users, except: [:password_digest]
  end

  def to_follow
    @users = User.order('followers_count DESC').limit(3)
    render json: @users, except: [:password_digest]
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :display_name, :bio)
  end
end