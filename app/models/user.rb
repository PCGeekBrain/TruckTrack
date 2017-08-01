class User < ApplicationRecord
  has_secure_password

  enum role: {user: 0, agent: 10, driver: 20, manager: 30, admin: 40}
end
