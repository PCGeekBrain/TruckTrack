class Api::UsersController < ApplicationController
  before_action :authenticate_request!
  before_action :validate_admin, only: [:create, :update, :destroy, :all, :show]

  def all
    render json: User.all, only: [:username, :email, :role, :id]
  end

  def index
    render json: current_user, only: [:username, :email, :role]
  end

  def show
    render json: User.find(params[:id]), only: [:username, :email, :role]
  end

  def create
    if user = User.create(user_params)
      render json: {message: "User created sucessfully."}, status: :created
    else
      render json: {message: "Could not create User.", errors: user.errors}, status: :bad_request
    end
  end

  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: {message: "User updated sucessfully."}, status: :accepted
    else
      render json: {message: "Could not update User.", errors: user.errors}, status: :bad_request
    end
  end

  def destroy
    user = User.find(params[:id])

    if user.destroy
      render json: {message: "User deleted sucessfully."}, status: :accepted
    else
      render json: {message: "Could not delete User."}, status: :bad_request
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email, :role)
  end

  def validate_admin
    raise AuthenticationError::AccessDeniedError unless current_user.role == "admin"
  end

end