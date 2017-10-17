#################################################
#
# Authentication Module
# Adds authentication to controllers
#
# Adds the folowing functions:
# #current_user
#
# #authenticate_request! raises the following errors or sets current_user
#   AuthenticationError::NotAuthenticatedError => User is not authenticated
#   AuthenticationError::TimeoutError => The token has expired
#   AuthenticationError::NotAuthenticatedError => The token has had some issue decoding
#
# #user_id_in_auth_token? => true or false if :id is in auth token
#
# #decoded_auth_token => the result of JsonWebToken.decode() on the token
#
# #http_auth_token => the token passed in the header. must be passed after some text
#
#################################################


module Authentication
  
  # Get the current user for a request
  attr_reader :current_user

  protected

  # protect a route by validating that the user exists (and set him if it does)
  def authenticate_request!
    fail AuthenticationError::NotAuthenticatedError unless user_id_in_auth_token?
    @current_user ||= User.find_by(id: decoded_auth_token[:id])
  rescue JWT::ExpiredSignature
    raise AuthenticationError::TimeoutError
  rescue JWT::VerificationError, JWT::DecodeError    
    raise AuthenticationError::NotAuthenticatedError
  end

  def get_current_user
    @current_user ||= User.find_by(id: decoded_auth_token[:id])
  rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    return nil
  end

  # Helper methods
  private

  # true or false if the user id is in the token
  def user_id_in_auth_token?
    !!http_auth_token && !!decoded_auth_token && !!decoded_auth_token[:id]
  end

  # decode the auth token
  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_token)
  end
  
  # extract the token from the header of the request
  def http_auth_token
    # if the header is present split it or just set it to nil
    @http_auth_token ||= request.headers['Authorization'].present? ? 
      token = request.headers['Authorization'].split(' ').last : nil
  end

end