@ShoppingCart
Feature: Shopping Cart Functionality

    @contact_us
    Scenario: Contact Us Form
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Contact Us" button
        Then Verify that "Get In Touch" is visible
        When Enter name, email, subject and message
        When Upload file "contact_us.txt"
        When Click "Submit" button
        When Click OK button on alert dialog
        Then Verify success message "Success! Your details have been submitted successfully." is visible
        When Click "Home" button
        Then Verify that "Home" is visible

    @all_product
    Scenario: Verify All Products and product detail page
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Products" button
        Then Verify user is navigated to "All Products" page successfully
        Then The products list is visible
        When Click "View First Product" button
        Then User is landed to product detail page
        Then Verify that detail is visible: product name, category, price, availability, condition, brand


    @search_product
    Scenario: Verify All Products and product detail page
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Click "Products" button
        Then Verify user is navigated to "All Products" page successfully
        When Enter product name in search input "Blue" and click search button
        Then Verify user is navigated to "Searched Products" page successfully
        Then Verify all the products related to search "Blue" are visible
        When Enter input value from "productSearchTerms.xlsx" data with "Search" Sheet and "Invalid Search" Column
        Then Verify no products found
    
    @flaky @subscription_home
    Scenario: Verify All Products and product detail page
        Given Launch browser
        Given Navigate to url
        Then Verify that "Home" is visible
        When Scroll down to footer
        Then Verify that "Subscription" is visible
        When Enter email address in input and click arrow button
        Then Verify success message "You have been successfully subscribed!" is visible

