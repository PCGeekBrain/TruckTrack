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
  
      before(:each) do
        @valid_user_hash = {username: "BobMarly24", 
                            password: "Password", 
                            email: "test@test.com",
                            password_confirmation: "Password"
                          }
        @valid_user = User.create(@valid_user_hash)
      end
  
      it { should validate_presence_of :username }
  
      it { should validate_uniqueness_of :username}
  
      it "should require email addresses to be valid" do
        user = User.new(email: "test.com")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:email)
      end
  
      it { should validate_length_of(:password).is_at_least(8) }
  
    end
  end
