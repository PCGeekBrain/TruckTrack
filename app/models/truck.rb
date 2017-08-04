class Truck < ApplicationRecord

  # Relationships
  has_many :routes
  has_many :deliveries, through: :routes
  has_many :drivers, through: :routes

  # Validations
  
  # Name must be present and unique
  validates :name, presence: true, uniqueness: true
  # licence plates must be unique
  validates :licence, uniqueness: true, allow_nil: true
end
