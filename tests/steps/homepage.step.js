const { Given, When, Then } = require("@cucumber/cucumber");
const { HomeLocators } = require('../pages/homePage.locators.js');
const { ExcelUtils } = require('../utils/excelUtils.js');
const { expect } = require("@playwright/test");
const testData = require('../testData/registerData.json');
const path = require('path');

When('Enter name, email, subject and message', async function () {
    const contactUsForm = testData.contactUs;

    const addressFields = [
        { locator: HomeLocators.nameIpt, value: contactUsForm.name },
        { locator: HomeLocators.emailIpt, value: contactUsForm.email },
        { locator: HomeLocators.subjectIpt, value: contactUsForm.subject },
        { locator: HomeLocators.messageIpt, value: contactUsForm.message }
    ];

    // Fill all text input fields
    for (const field of addressFields) {
        await elementUtils.fillInputField(field.locator, field.value);
    }
    
});

When('Upload file {string}', async function (fileName) {
    const filePath = path.join(__dirname, '../testData/uploads', fileName);
    await elementUtils.uploadFile(HomeLocators.fileUploadBtn, filePath);
});

When('Click OK button on alert dialog', async function () {
    await page.waitForTimeout(3000);
    await elementUtils.handleOKButtonAlertDialog();
});

When('Enter product name in search input {string} and click search button', async function (params) {
    await elementUtils.fillInputField(HomeLocators.searchProductIpt, params);
    await elementUtils.clickElement(HomeLocators.searchProductBtn);
});

Then('Verify success message {string} is visible', async function (expectedMessage){
    
    await elementUtils.waitForElement(HomeLocators.submitSuccessMsg);
    await elementUtils.verifyElementContainsText(HomeLocators.submitSuccessMsg, expectedMessage);
    await page.waitForTimeout(3000);
});

Then('Verify that detail is visible: product name, category, price, availability, condition, brand', async function (){
    const productDetails = [
        { locator: HomeLocators.productDetails.name},
        { locator: HomeLocators.productDetails.category},
        { locator: HomeLocators.productDetails.price},
        { locator: HomeLocators.productDetails.availability},
        { locator: HomeLocators.productDetails.condition},
        { locator: HomeLocators.productDetails.brand}
    ];

    // Fill all text input fields
    for (const detail of productDetails) {
        await elementUtils.waitForElement(detail.locator);
    }
});

Then('The products list is visible', async function (){
    const products = await page.locator(HomeLocators.productWrapper);
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    if(count === 0) {
        throw new Error('No products found on the page');
    }

    console.log(`Found ${count} products in the list`);
});

Then('Verify user is navigated to {string} page successfully', async function (titleName) {
    await pageUtils.waitForPageLoad();
    await expect(page.locator(HomeLocators.pageTitle(titleName))).toBeVisible();
});

Then('User is landed to product detail page', async function(){
    await pageUtils.waitForPageLoad();

    const currentUrl = page.url();

    if(!currentUrl.includes('/product_details/')) {
        throw new Error('User is not on the product detail page');
    }
});

Then('Verify all the products related to search {string} are visible', async function (searchTerm) {
    const products = await page.locator(HomeLocators.productWrapper);
    const count = await products.count();

    if(count ===0){
        throw new Error('No products found related to the search');
    }

    console.log(`Found ${count} products in the list`);
    for (let i = 0; i < count; i++) {
        const product = products.nth(i);
        const productName = await product.locator(HomeLocators.productList.name).textContent();
        if (!productName.toLowerCase().includes(searchTerm.toLowerCase())) {
            throw new Error(`Product "${productName}" does not match search term "${searchTerm}"`);
        }
        console.log(`Verified product: ${productName}`);
    }
});

When('Enter input value from {string} data with {string} Sheet and {string} Column', async function(fileName, sheetName, columnName) {
    const excelUtils = new ExcelUtils();
    const dataFile = await excelUtils.readExcel(fileName);

    const allData = await dataFile.getAllValueBySheetNameAndColumn(sheetName, columnName);

    for(singleData of allData){
        await elementUtils.fillInputField(HomeLocators.searchProductIpt, singleData);
        await elementUtils.clickElement(HomeLocators.searchProductBtn);
        await page.waitForTimeout(2000); // Wait for search results to load
    }
});

Then('Verify no products found', async function () {
    const products = await page.locator(HomeLocators.productWrapper);
    const count = await products.count();
    if (count > 0) {
        throw new Error(`Expected no products, but found ${count} products`);
    }
    expect(count).toBe(0);
});


When('Scroll down to footer', async function() {
    await elementUtils.scrollToBottom();
});

When('Enter email address in input and click arrow button', async function() {
    await elementUtils.fillInputField(HomeLocators.emailSubscriptionIpt, testData.users.emailSubscription.email);
    await elementUtils.clickElement(HomeLocators.subscribeBtn);
});