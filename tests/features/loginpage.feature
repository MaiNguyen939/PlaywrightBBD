@ShoppingCart
Feature: Shopping Cart Functionality
   
    Background: Create user account
        Given Launch browser
        Given Navigate to url
        When Click "Signup/Login" button
        Then Verify that "New User Signup!" is visible
        When Enter name and email address
        When Click "Signup" button
        When Fill details: Title, Name, Email, Password, Date of birth
        When Select checkbox "Sign up for our newsletter!"
        When Select checkbox "Receive special offers from our partners!"
        When Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        When Click "Create Account" button
        Then Verify that "Account Created!" is visible
        When Click "Continue" button
        When Click "Logout" button

    @login_valid
    Scenario: Login User with correct email and password
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Signup/Login" button
        Then Verify that "Login to your account" is visible
        When Enter email address and password
        When Click "Login" button
        Then Verify that Logged in as is visible
        When Click "Delete Account" button
        Then Verify that "Account Deleted!" is visible
        When Click "Continue" button

    @login_invalid
    Scenario: Login User with incorrect email and password
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Signup/Login" button
        Then Verify that "Login to your account" is visible
        When Enter incorrect name and email address
        When Click "Login" button
        Then Verify error "Your email or password is incorrect!" is visible

    