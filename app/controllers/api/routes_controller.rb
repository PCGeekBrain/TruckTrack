class Api::RoutesController < ApplicationController
  before_action :authenticate_request!
  before_action :validate_manager, only: [:create, :update, :destroy]

  def index
    render json: Route.all, include: {
      driver: {only: :username}, 
      truck: {only: [:id, :name, :licence]}}, 
      only: [:id, :log_number, :status]
  end

  def show
    render json: Route.find(params[:id]), include: {
      driver: {only: :username}, 
      truck: {only: [:id, :name, :licence]}}, 
      only: [:id, :log_number, :status]
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:route).permit(:log_number, :user_id, :truck_id, :status)
  end

  def validate_manager
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("manager")
  end
end
