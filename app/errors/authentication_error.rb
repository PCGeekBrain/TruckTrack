# define coustom errors for authentication

module AuthenticationError

  class AccessDeniedError < StandardError
  end
  
  class NotAuthenticatedError < StandardError
  end

  class AuthenticationTimeoutError < StandardError
  end

end