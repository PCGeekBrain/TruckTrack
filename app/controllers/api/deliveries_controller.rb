class Api::DeliveriesController < ApplicationController
  # authenticate the user, get the route and validate user role before CRUD operations
  before_action :authenticate_request!, only: [:index, :show, :create, :update, :destroy]
  before_action :load_route, only: [:index, :show, :create, :update, :destroy]
  before_action :validate_driver, only: :update
  before_action :validate_manager, only: [:create, :destroy]

  def index
    render json: @route.deliveries
  end

  def show
    render json: @route.deliveries.find(params[:id])
  end

  def create
    delivery = @route.deliveries.build(post_params)
    if delivery.save
      render json: delivery, status: :created
    else
      render json: {error: "Could not create Delivery", errors: delivery.errors}, status: :bad_request
    end
  end
  
  def update
    delivery = @route.deliveries.find(params[:id])
    if delivery.update(post_params)
      render json: delivery, status: :accepted
    else
      render json: {error: "Could not update Delivery", errors: delivery.errors}, status: :bad_request
    end
  end

  def destroy
    delivery = @route.deliveries.find(params[:id])
    if delivery.destroy
      head :no_content
    else
      render json: {error: "Could not delete delivery"}
    end
  end

  def track_invoice
    deliveries = Delivery.where(:invoice_number => params[:invoice_number])
    if deliveries
      render json: deliveries
    else
      render json: {error: "Delivery not found"}, status: :not_found
    end
  end

  def track_number
    delivery = Delivery.where(:tracking_number => params[:tracking_number])
    if delivery
      render json: delivery
    else
      render json: {error: "Delivery not found"}, status: :not_found
    end
  end

  private

  def load_route
    @route = Route.find(params[:route_id])
  end

  def validate_driver
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("driver")
  end

  def validate_manager
    raise AuthenticationError::AccessDeniedError unless current_user.fits_role?("manager")
  end

  def post_params
    params.require(:delivery).permit(:invoice_number, :cod, :address, :phone_number, :delivered)
  end
end
