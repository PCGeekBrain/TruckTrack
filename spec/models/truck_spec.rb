require 'rails_helper'

RSpec.describe Truck, type: :model do
  
  describe "Feilds:" do

    let(:truck){Truck.new}

    it "has a name" do
      expect(truck).to respond_to(:name)
    end

    it "has a licence" do
      expect(truck).to respond_to(:licence)
    end

  end

  describe "Relationships:" do

    before(:each) do
      @truck = Truck.create(name: "truck1")
      @route1 = @truck.routes.create(log_number: "aa5")
      @route2 = @truck.routes.create(log_number: "ar7")
    end

    it "has many routes" do
      expect(@truck.routes.count).to eq(2)
      expect(@truck.routes.first).to eq(@route1)
    end

    it "has many deliveries through routes"

    it "has many drivers through routes"

  end

  describe "Validations" do
    
    let(:truck){Truck.new}

    it "validates presence of name" do
      truck.valid?
      expect(truck.errors).to include(:name)
    end

    it "validates uniqueness of name" do
      Truck.create(name: "test")
      truck.name="test"
      truck.valid?
      expect(truck.errors).to include(:name)
    end

    it "validates uniqueness of licence" do
      Truck.create(name: "test", licence: "test")
      truck.licence="test"
      truck.valid?
      expect(truck.errors).to include(:licence)
    end
  end

end
