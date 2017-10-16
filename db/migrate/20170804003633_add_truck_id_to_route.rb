class AddTruckIdToRoute < ActiveRecord::Migration[5.1]
  def change
    add_reference :routes, :truck, foreign_key: true
  end
end
