require 'jwt'

############################################
# Class JsonWebToken
# Custom JWT handler for API authentication
#
# This class folows the singleton pattern and
# only has class functions
# 
# Functions:
#
# - JsonWebToken.encode(payload, exparation (optional))
#   returns JWT encoded with Rails secret_key_base
#
# - JsonWebToken.decode(token)
#   decodes payload from token or nil if invalid
#
# - JsonWebToken.valid_payload?(payload)
#   checks if the payload hash is valid
#
# - JsonWebToken.expired?(payload)
#   checks if the payload hash has expired
#
############################################

class JsonWebToken

  # JsonWebToken.encode(payload, exp)
  # encodes the payload with a default 7 day exparation

  # Example: JsonWebToken.encode({foo: "bar"}) #=> "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1MDIyMTM5ODh9.BosnwiTQ3pMMN7LB_D8GJlvHUYTNIOqLsaT6V1_Rnxs"

  def self.encode(payload, exp = 7.days.from_now)
    # add the exparation to the payload
    payload[:exp] = exp.to_i
    # encode it with the secret from the configurations
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  # JsonWebToken.decode(token)
  # decodes the token and returns the payload
  # returns nil if invalid token

  # Example: JsonWebToken.decode("") #=> nil

  def self.decode(token)
    # decode the token with the same key from the configuration
    # [0] is to get the body (first object in result) not the metadata
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    # Return the body with constants working as keys instead of just strings
    return HashWithIndifferentAccess.new(body)
  # if the decoding has an error reutrn nil
  # TODO throw invalid token error
  rescue
    return nil
  end

  # JsonWebToken.valid_payload?(payload)
  # check if the provided payload is a valid JWT payload.
  # checks the following things:
  #   - exparation

  # Example: JsonWebToken.valid_payload?({exp: 1.day.ago}) #=> false

  def self.valid_payload?(payload)
    # TODO add meta checks as well if needed.
    # if it is invalid return false
    if expired?(payload) 
      return false
    else
      return true
    end
  end

  # JsonWebToken.expired?(payload)
  # check if the payload is expired

  # Example: JsonWebToken.expired?({exp: 1.day.from_now}) #> false

  def self.expired?(payload)
    Time.at(payload['exp']) < Time.now
  end

end