require 'rails_helper'

RSpec.describe Delivery, type: :model do
  
  describe "Fields:" do

    let(:delivery){Delivery.create(:invoice_number => "15987", route: Route.create(log_number: "1567"))}
    
    it { should have_db_column :invoice_number }

    it { should have_db_column :cod }

    it { should have_db_column :tracking_number }

    it { should have_db_column :address }

    it { should have_db_column :phone_number }

    it { should have_db_column :delivered }

    it { should have_db_column :delivered_at }

    it "delivered_at timestamp is set when status is set to 'delivered'" do
      expect(delivery.delivered_at).to eq(nil)
      delivery.delivered = true
      delivery.save
      expect(delivery.delivered_at).to_not eq(nil)
    end

  end

  describe "Relationships:" do

    it { should belong_to :route }

    it { should have_one :truck }

  end

  describe "Validations:" do

    it { should validate_presence_of :invoice_number}

    it { should validate_uniqueness_of :tracking_number}

    it "cod defaults to 0" do
      expect(Delivery.new.cod).to eq(0)
    end

    it "phone number must be valid if present" do
      valid_numbers = ["2438894546", "(718)891-1313", "234 435 9978", "(800)4261134"]
      invalid_numbers = ["28894546", "(718)891-13135", "234 43 9978", "(800)IloveNY"]

      valid_numbers.each do |number|
        should allow_value(number).for(:phone_number)
      end

      invalid_numbers.each do |number|
        should_not allow_value(number).for(:phone_number)
      end

    end

  end

  describe "Hooks:" do

    it "generates 10 character hex tracking number on create" do
      delivery = Delivery.new(:invoice_number => "156787", route: Route.create(log_number: "1456"))
      expect(delivery.tracking_number).to eq(nil)

      delivery.save # saving to the database should generate the tracking number

      expect(delivery.persisted?).to eq(true)
      expect(delivery.tracking_number).to_not eq(nil)
      expect(delivery.tracking_number.length).to eq(10)

    end

  end
  
end
