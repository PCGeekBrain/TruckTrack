class Delivery < ApplicationRecord
  
  # Hooks

  # update the delivered_at if delivered is set to true
  before_update :update_delivered_at, if: :delivered_changed?
  # generate tracking numbers before validation
  before_create :generate_tracking_number
  
  # Relationships

  belongs_to :route
  has_one :truck, through: :route

  # Validations

  validates :invoice_number, presence: true

  validates :phone_number, phone: true

  validates :tracking_number, uniqueness: true

  private

  ############################################
  # Hook functions
  #
  # #update_delivered_at => sets delivered at to current time if item was delivered.
  # #generate_tracking_number => sets the tracking number to a 10 character Hex string
  ############################################

  def update_delivered_at
    if self.delivered
      self.delivered_at = Time.now
    end
  end

  def generate_tracking_number
    self.tracking_number = SecureRandom.hex(5)
  end

end
