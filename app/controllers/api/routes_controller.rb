class Api::RoutesController < ApplicationController
  before_action :authenticate_request!
  before_action :validate_manager, only: [:create, :update, :destroy]

  def index
    render json: Route.all
  end

  def show
    render json: Route.find(params[:id])
  end

  def create
    route = Route.create(post_params)
    render json: route, status: :created
  end

  def update
    route = Route.find(params[:id])
    if route.update(post_params)
      render json: route, status: :accepted
    else
      render json: {errors: route.errors}, status: :bad_request
    end
  end

  def destroy
    route = Route.find(params[:id])
    if route.destroy
      head :no_content
    else
      render json: {error: "Could not delete route"}, status: :bad_request
    end
  end

  private

  def post_params
    params.require(:route).permit(:log_number, :user_id, :truck_id, :status)
  end

  def validate_manager
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("manager")
  end
end
