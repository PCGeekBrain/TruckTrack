require 'rails_helper'

RSpec.describe User, :type => :model do
  
    describe "Fields:" do
  
      it { should have_db_column :username }
  
      it { should have_secure_password }
  
      it { should have_db_column :email }

      it { should define_enum_for :role }

      it "has a role that defaults to user" do
        expect(User.new.role).to eq("user")
      end
      
    end

    describe "Relationships:" do

      it { should have_many :routes }

      it { should have_many :trucks }

      it { should have_many :deliveries}

      it "has many comments"
    end
  
    describe "Validations:" do
  
      it { should validate_presence_of :username }
  
      it { should validate_uniqueness_of :username}
  
      it "should require email addresses to be valid" do
        user = User.new(email: "test.com")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:email)
      end
  
      it { should validate_length_of(:password).is_at_least(8) }
  
    end

    describe "Functions:" do

      describe "#fits_role?" do

        let(:driver){User.create(role: "driver", username: "driver1234", password: "password")}

        it "returns true if user role is greater then given role" do
          expect(driver.fits_role?("agent")).to eq(true)
        end

        it "returns true if user role is equal to the given role" do
          expect(driver.fits_role?("driver")).to eq(true)
        end

        it "returns false if user role is less then the given role" do
          expect(driver.fits_role?("admin")).to eq(false)
        end

      end
    end
  end
