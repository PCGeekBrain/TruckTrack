require 'rails_helper'

RSpec.describe User, :type => :model do
  
    describe "Fields:" do
  
      it "has a username" do
        expect(User.new).to respond_to(:username)
      end
  
      it "has a passowrd_digest" do
        expect(User.new).to respond_to(:password_digest)
      end
  
      it "has a email" do
        expect(User.new).to respond_to(:email)
      end

      it "has a role that defaults to user" do
        expect(User.new).to respond_to(:role)
        expect(User.new.role).to eq("user")
      end
      
    end

    describe "Relationships:" do
      
      before(:each) do
        @user = User.create(username: "localhost", password: "password", password_confirmation: "password")
        @route1 = Route.create(driver: @user, log_number: "001")
        @route2 = Route.create(driver: @user, log_number: "002")
      end

      it "has many routes" do
        expect(@user.routes.count).to eq(2)
        expect(@user.routes).to include(@route1)
        expect(@user.routes).to include(@route2)
      end

      it "has many trucks through routes" do
        truck1 = @route1.create_truck(name: "truck1")
        @route1.save # this must be saved for the user to find it.
        expect(@user.trucks.count).to eq(1)
        expect(@user.trucks.first).to eq(truck1)

        @route2.create_truck(name: "truck2")
        @route2.save # this must be saved for the user to find it.
        expect(@user.trucks.count).to eq(2)
      end

      it "has many deliveries through routes"

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
  
      it "username is present" do
        user = User.new(password: "password")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:username)
      end
  
      it "username is unique" do
        user = User.new(username: "BobMarly24", password: "Passoword", email: "test@test.com")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:username)
      end
  
      it "email is valid" do
        user = User.new(email: "test.com")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:email)
      end
  
      it "password is longer then 8 characters" do
        user = User.new(password: "test")
        expect(user.valid?).to be(false)
        expect(user.errors).to include(:password)
      end
  
      it "hashes the password" do
        user = User.create(username: "localhost", password: "password", email: "test@test.com")
        expect(user.password_digest).to_not be(nil);
        expect(user.password_digest).to_not be("password");
        expect(user.password_digest.length).to eq(60) # subject to change but should break when encryption changes
      end
  
    end
  end
