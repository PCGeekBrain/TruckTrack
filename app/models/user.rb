class User < ApplicationRecord
  # has many routes (for drivers)
  has_many :routes
  has_many :deliveries, through: :routes
  has_many :trucks, through: :routes

  # encrypt the password and check for varification
  has_secure_password

  # Authorization roles
  enum role: {
    user: 0, 
    agent: 10, 
    driver: 20, 
    manager: 30, 
    admin: 40
  }

  # Validations

  # username:
  # - Must be greater then 8 characters
  # - Must be present
  # - Must be unique
  validates :username, presence: true, uniqueness: true, length: {minimum: 8}

  # password:
  # - Must be between 8 and 40 characters
  validates :password, length: {within: 8..40}, on: :create


  # email:
  # - Must be present
  # - Must be valid (see app/validators/email_validator)
  validates :email, email: true
  
end
