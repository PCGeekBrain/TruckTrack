class CreateDeliveries < ActiveRecord::Migration[5.1]
  def change
    create_table :deliveries do |t|
      t.string :invoice_number
      t.integer :status
      t.belongs_to :route, foreign_key: true
      t.datetime :delivered_at
      t.float :cod, default: 0

      t.timestamps
    end
  end
end
