class Route < ApplicationRecord
  belongs_to :driver, class_name: "User", foreign_key: "user_id", optional: true
  belongs_to :truck, optional: true

  has_many :deliveries

  enum status: {
    created: 0,
    loading: 10,
    loaded: 20,
    departed: 30,
    en_route: 40,
    returning: 50,
    compleated: 60
  }

  validates :log_number, presence: true
end
