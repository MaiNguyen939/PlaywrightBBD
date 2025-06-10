const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const testData = require('../testData/registerData.json');
const { RegisterLocators } = require("../pages/registerPage.locators.js");
const { HomeLocators } = require("../pages/homePage.locators.js");
const { StateManager } = require('../utils/stateManager.js');


// Declare shared variables at the top level
let randomGeneratedEmail, userData;

Given("Launch browser", async function () {
    // Navigate to the home page using the URL from test data
});

Given("Navigate to url", async function () {
    await elementUtils.navigateToUrl(testData.urls.cart);
});

When('Click on Signup\\/Login button', async function () {
    await elementUtils.clickElement(RegisterLocators.loginMenuBtn);
});

When('Enter name and email address', async function () {
    const randomNum = Math.floor(Math.random() * 900) + 100; // Generates number between 100-999
    randomGeneratedEmail = user.email.replace('{NUM}', randomNum);

    StateManager.setUserData(user.name, randomGeneratedEmail, user.password);
    console.log(`Generated Email: ${randomGeneratedEmail}`);

    await elementUtils.fillInputField(RegisterLocators.emailSignUpIpt, randomGeneratedEmail);
    await elementUtils.fillInputField(RegisterLocators.nameSignUpIpt, user.name);
});

When('Enter email address and password', async function () {
    userData = StateManager.getUserData();
    console.log(`Generated Password: ${userData.password}`);
    await elementUtils.fillInputField(RegisterLocators.emailLoginIpt, userData.email);
    await elementUtils.fillInputField(RegisterLocators.passwordLoginIpt, userData.password);
});

When('Enter incorrect name and email address', async function () {
    await elementUtils.fillInputField(RegisterLocators.emailLoginIpt, incorrectUser.email);
    await elementUtils.fillInputField(RegisterLocators.passwordLoginIpt, incorrectUser.password);
});

When('Enter existing name and email address', async function () {
    await elementUtils.fillInputField(RegisterLocators.emailSignUpIpt, existingUser.email);
    await elementUtils.fillInputField(RegisterLocators.nameSignUpIpt, existingUser.name);
});

When('Click {string} button', async function (buttonName) {
    const buttonLocators = {
        'Signup/Login': RegisterLocators.loginMenuBtn,
        'Signup': RegisterLocators.signUpBtn,
        'Create Account': RegisterLocators.createAccountBtn,
        "Continue": RegisterLocators.continueBtn,
        "Delete Account": RegisterLocators.deleteAccountBtn,
        "Login": RegisterLocators.logInBtn,
        "Logout": RegisterLocators.logoutMenuBtn,
        "Contact Us": HomeLocators.contactUsBtn,
        "Submit": HomeLocators.submitBtn,
        "Home": HomeLocators.homeBtn,
        "Products": HomeLocators.productsBtn,
        "View First Product": HomeLocators.viewFirstProductBtn
        // Add more button mappings here
    };

    const locator = buttonLocators[buttonName];
    if (!locator) {
        throw new Error(`Button "${buttonName}" is not defined in buttonLocators mapping`);
    }
    
    await elementUtils.clickElement(locator);
});

When('Fill details: Title, Name, Email, Password, Date of birth', async function () {
    const dateOfBirth = pageUtils.parseDateOfBirth(user.dateOfBirth);
    console.log(`Parsed Date of Birth`,dateOfBirth.day, dateOfBirth.month, dateOfBirth.year);

    await elementUtils.checkElement(RegisterLocators.titleRadio('Mr'));
    await elementUtils.fillInputField(RegisterLocators.nameIpt, user.name);
    await elementUtils.fillInputField(RegisterLocators.passwordIpt, user.password);
    await elementUtils.selectOption(RegisterLocators.DateOfBirthIpt, dateOfBirth.day);
    await elementUtils.selectOption(RegisterLocators.MonthOfBirthIpt, dateOfBirth.month);
    await elementUtils.selectOption(RegisterLocators.YearOfBirthIpt, dateOfBirth.year);
})

When('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async function () {
    
    const addressFields = [
        { locator: RegisterLocators.firstNameIpt, value: user.address.firstName },
        { locator: RegisterLocators.lastNameIpt, value: user.address.lastName },
        { locator: RegisterLocators.companyIpt, value: user.address.company },
        { locator: RegisterLocators.addressIpt, value: user.address.address1 },
        { locator: RegisterLocators.secondAddressIpt, value: user.address.address2 },
        { locator: RegisterLocators.stateIpt, value: user.address.state },
        { locator: RegisterLocators.cityIpt, value: user.address.city },
        { locator: RegisterLocators.zipCodeIpt, value: user.address.zipCode },
        { locator: RegisterLocators.mobileNumberIpt, value: user.address.phoneNumber }
    ];

    // Fill all text input fields
    for (const field of addressFields) {
        await elementUtils.fillInputField(field.locator, field.value);
    }

    // Handle dropdown separately since it uses different method
    await elementUtils.selectOption(RegisterLocators.countrySelect, user.address.country);
})

When('Select checkbox {string}', async function (termsText) {
    await elementUtils.checkElement(RegisterLocators.termsCheckbox(termsText));
});

Then('Verify that {string} is visible', async function (expectedValue) {
    await pageUtils.waitForPageLoad();
    await expect(page.locator(RegisterLocators.homeTitle(expectedValue))).toBeVisible();
});

Then('Verify that Logged in as is visible', async function () {
    await pageUtils.waitForPageLoad();
    const userData = StateManager.getUserData();
    console.log(`Generated Password: ${userData.name}`);
    await expect(page.locator(RegisterLocators.loggedInAsText(userData.name))).toBeVisible();
});

Then('Verify error {string} is visible', async function (errorText) {
    await pageUtils.waitForPageLoad();
    await elementUtils.verifyErrorMessage(RegisterLocators.errorMessage, errorText);
});