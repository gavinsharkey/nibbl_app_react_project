class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user.as_json(include: [:likes, :received_follows, :given_follows], except: [:password_digest])
      }
    else
      render json: {
        logged_in: false,
        error: 'Invalid Username Or Password'
      }
    end
  end

  def is_logged_in
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user.as_json(include: [:likes, :received_follows, :given_follows], except: [:password_digest])
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def destroy
    logout!
    render json: {
      logged_out: true
    }
  end
end