class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      payload = {user_id: @user.id}
      token = encode_token(payload)
      render json: {
        logged_in: true,
        user: @user.as_json(include: [:likes, :received_follows, :given_follows], except: [:password_digest]),
        jwt: token
      }
    else
      render json: {
        logged_in: false,
        error: 'Invalid Username Or Password'
      }
    end
  end

  def is_logged_in
    if session_user
      render json: {
        logged_in: true,
        user: session_user.as_json(include: [:likes, :received_follows, :given_follows], except: [:password_digest])
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