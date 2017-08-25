require 'rails_helper'

RSpec.describe Route, type: :model do

  describe "Fields:" do

    let(:route){Route.new}

    it { should have_db_column :log_number }
    
    it { should define_enum_for :status }

    it "status defaults to 0" do
      expect(Route.statuses[route.status]).to eq(0)
    end
  
  end

  describe "Relationships:" do

    it { should belong_to :driver }

    it { should belong_to :truck }

    it { should have_many :deliveries }

  end

  describe "Validations:" do
    
    it { should validate_presence_of(:log_number)}

  end

end
