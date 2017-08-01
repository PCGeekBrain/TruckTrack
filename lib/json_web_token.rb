require 'jwt'

class JsonWebToken

  def self.encode(payload, exp = 7.days.from_now)
    # add the exparation to the payload
    payload[:exp] = exp.to_i
    # encode it with the secret from the configurations
    jwt.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def self.decode(token)
    # decode the token with the same key from the configuration
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)
    # Return the body with constants working as keys instead of just strings
    return HashWithIndifferentAccess.new(body)
  # if the decoding has an error reutrn nil
  rescue
    return nil
  end

  def self.valid_payload(payload)
    # TODO add meta checks as well if needed.
    if expired(payload)
      return false
    else
      return true
    end
  end
  
  # check if the token is expired
  def self.expired(payload)
    Time.at(payload['exp']) < Time.now
  end

end