class Delivery < ApplicationRecord
  # Hooks
  # update the delivered_at if delivered is set to true
  before_update :update_delivered_at, if: :delivered_changed?
  
  # Relationships
  belongs_to :route
  has_one :truck, through: :route

  # Validations
  validates :invoice_number, presence: true

  private
  ############################################
  # Hook functions
  ############################################
  # #update_delivered_at => sets delivered at to current time if item was delivered.
  def update_delivered_at
    if self.delivered
      self.delivered_at = Time.now
    end
  end
end
