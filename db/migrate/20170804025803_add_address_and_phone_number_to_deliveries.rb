class AddAddressAndPhoneNumberToDeliveries < ActiveRecord::Migration[5.1]
  def change
    add_column :deliveries, :address, :string
    add_column :deliveries, :phone_number, :string
  end
end
