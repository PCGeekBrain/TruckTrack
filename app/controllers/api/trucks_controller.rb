class Api::TrucksController < ApplicationController
  before_action :authenticate_request!
  before_action :load_truck, only: [:show, :update, :destroy]
  before_action :validate_manager!, only: [:create, :update, :destroy]

  def index
    render json: Truck.all
  end

  def show
    render json: @truck
  end

  def create
    truck = Truck.new(post_params)

    if truck.save
      render json: truck, status: :created
    else
      render json: { error: "Could not create Truck", errors: truck.errors }, status: :bad_request
    end
  end

  def update
    if @truck.update(post_params)
      render json: @truck, status: :accepted
    else
      render json: { error: "Could not update Truck", errors: truck.errors }, status: :bad_request
    end
  end

  def destroy
    if @truck.destroy
      head :no_content
    else
      render json: { error: "Could not delete Truck" }, status: :bad_request
    end
  end

  private

  def load_truck
    @truck = Truck.find(params[:id])
  end

  def validate_manager!
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("manager")
  end

  def post_params
    params.require(:truck).permit(:name, :licence)
  end

end
