require 'rails_helper'

RSpec.describe Truck, type: :model do
  
  describe "Feilds:" do

    it { should have_db_column :name }

    it { should have_db_column :licence }

  end

  describe "Relationships:" do

    it { should have_many :routes }

    it { should have_many :deliveries }

    it { should have_many :drivers }

  end

  describe "Validations" do
    
    let(:truck){Truck.new}

    it { should validate_presence_of :name }

    it { should validate_uniqueness_of :name}

    it { should validate_uniqueness_of :licence }
  end

end
