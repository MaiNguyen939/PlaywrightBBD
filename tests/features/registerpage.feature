@ShoppingCart
Feature: Shopping Cart Functionality

    @register
    Scenario: Register new user to homepage successfully
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Signup/Login" button
        Then Verify that "New User Signup!" is visible
        When Enter name and email address
        When Click "Signup" button
        Then Verify that "Enter Account Information" is visible
        When Fill details: Title, Name, Email, Password, Date of birth
        When Select checkbox "Sign up for our newsletter!"
        When Select checkbox "Receive special offers from our partners!"
        When Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        When Click "Create Account" button
        Then Verify that "Account Created!" is visible
        When Click "Continue" button
        Then Verify that Logged in as is visible
        When Click "Delete Account" button
        Then Verify that "Account Deleted!" is visible
        When Click "Continue" button

    @regist_exist
    Scenario: Register User with existing email
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Signup/Login" button
        Then Verify that "New User Signup!" is visible
        When Enter existing name and email address
        When Click "Signup" button
        Then Verify error "Email Address already exist!" is visible