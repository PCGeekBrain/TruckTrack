class Truck < ApplicationRecord
  has_many :routes

  validates :name, presence: true, uniqueness: true

  validates :licence, uniqueness: true
end
