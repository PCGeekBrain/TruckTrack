class ApplicationController < ActionController::API
  # Incluce the authenticaion concern
  include Authentication

  # Hadle errors with the correct JSON responses of.
  rescue_from AuthenticationError::TimeoutError, with: :authentication_timeout
  rescue_from AuthenticationError::AccessDeniedError, with: :forbidden_resource
  rescue_from AuthenticationError::NotAuthenticatedError, with: :user_not_authenticated

  def authentication_timeout
    render json: { error: 'Authentication Timeout' }, status: 419
  end

  def forbidden_resource
    render json: { error: 'Not Authorized To Access Resource' }, status: :forbidden
  end

  def user_not_authenticated
    render json: { error: 'Not Authenticated' }, status: :unauthorized
  end
end
