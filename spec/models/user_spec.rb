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
