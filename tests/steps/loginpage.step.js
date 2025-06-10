const { Given, When, Then } = require("@cucumber/cucumber");
const { LoginLocators } = require('../pages/loginPage.locators.js');
const { expect } = require("@playwright/test");
const testData = require('../testData/registerData.json');



Given("User navigates to the Homepage", async function () {
    await page.goto(testData.urls.home);
});

When('User clicks on Login Button', async function () {
    await page.locator(LoginLocators.loginButton).click();
});

When('User input username and password Student account', async function () {
    const user = testData.users.existingUser;

    await page.locator(LoginLocators.usernameInput).fill(user.email);
    await page.locator(LoginLocators.passwordInput).fill(user.password);
});

Then('User should see {string} page', async function (expectedValue) {
    await pageUtils.waitForPageLoad();
    await expect(page.locator(LoginLocators.homeTitle(expectedValue))).toBeVisible();
});