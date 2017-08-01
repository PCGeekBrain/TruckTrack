require 'jwt'

class JsonWebToken

  def self.encode(payload, exp = 7.days.from_now)
    payload[:exp] = exp.to_i
    jwt.encode(payload, Rails.application.secrets.secret_key_base)
  end
  
end