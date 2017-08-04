class Api::LoginController < ApplicationController

  def login
    # find the user in the database (nil if the username is false)
    user = User.find_by(username: params[:username])
    # if the user is nil the username is invalid and the first condition will fail
    if user && user.authenticate(params[:password])
      # if the user is logged in return a useable JWT token
      token = JsonWebToken.encode({id: user.id, username: user.username, email: user.email})
      render json: {
        message: "Login Successful",
        token: token
      }, status: :ok
    else
      render json: {
        message: "Username and password are incorrect",
      }, status: :unauthorized
    end

  end

end
