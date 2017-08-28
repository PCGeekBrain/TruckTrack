class Api::RoutesController < ApplicationController
  before_action :authenticate_request!, except: :options
  before_action :validate_manager, only: [:create, :update, :destroy]

  def index
    if current_user.role == "driver"
      render json: current_user.routes
    else
      render json: Route.all
    end
  end

  def show
    render json: Route.find(params[:id])
  end

  def create
    route = Route.create(post_params)
    if route.persisted?
      render json: route, status: :created
    else
      render json: {error: "Could not create Route", errors: route.errors}, status: :bad_request
    end
  end

  def update
    route = Route.find(params[:id])
    if route.update(post_params)
      render json: route, status: :accepted
    else
      render json: {error: "Could not update Route", errors: route.errors}, status: :bad_request
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

  def options
    render json: Route.statuses.keys
  end

  private

  def post_params
    params.require(:route).permit(:log_number, :user_id, :truck_id, :status)
  end

  def validate_manager
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("manager")
  end
end
