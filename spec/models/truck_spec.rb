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

  describe "Relationships" do

    it "has many routes"

    it "has many deliveries through routes"

    it "has many drivers through routes"

  end

  describe "Validations" do

    it "validates presence of name"

    it "validates uniqueness of name"

    it "validates uniqueness of licence"
  end

end
