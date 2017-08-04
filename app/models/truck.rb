class Truck < ApplicationRecord
  has_many :routes

  has_many :drivers, through: :routes

  validates :name, presence: true, uniqueness: true

  validates :licence, uniqueness: true, allow_nil: true
end
