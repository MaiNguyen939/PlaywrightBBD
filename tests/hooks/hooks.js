const { Before, After, setDefaultTimeout, Status } = require("@cucumber/cucumber");
const { chromium, firefox, msedge } = require("@playwright/test");
const { PageUtils } = require('../utils/pageUtils.js');
const testData = require('../testData/registerData.json');
const { ElementUtils } = require('../utils/elementUtils.js');

const browsers = {
    chromium: chromium,
    firefox: firefox,
    msedge: msedge
};

// Set timeout for all operations
setDefaultTimeout(60 * 1000);
const MAX_RETRIES = 2;
const RETRY_DELAY = 3000;

// Declare global variables
let page, browser, pageUtils, user, elementUtils;

// Before hook
Before(async function ({ pickle }) {
    let retryCount = 0;
    while (retryCount <= MAX_RETRIES) {
        try {
            const browserType = this.parameters.browser;
            console.log(`Launching browser: ${browserType}`);

            // Validate browser type
            if (!browsers[browserType]) {
                throw new Error(`Unsupported browser type: ${browserType}`);
            }

            const launchOptions = {
                headless: this.parameters.headless,
                args: ['--start-maximized'],
                channel: browserType === 'msedge' ? 'msedge' : undefined
            };

            browser = await browsers[browserType].launch(launchOptions);
            
            const context = await browser.newContext({
                viewport: null,
                screen: {
                    width: 1920,
                    height: 1080
                }
            });
            
            page = await context.newPage();

            // Initialize all page utilities
            pageUtils = new PageUtils(page);
            elementUtils = new ElementUtils(page);

            // Initialize user data
            user = testData.users.newUser;
            existingUser = testData.users.existingUser;
            incorrectUser = testData.users.incorrectUser;
            
            // Make page available globally
            global.page = page;
            global.browser = browser;
            global.pageUtils = pageUtils;
            global.elementUtils = elementUtils;
            global.user = user;
            global.existingUser = existingUser;

            console.log(`Starting scenario: ${pickle.name}`);
            return; // Success - exit retry loop

        }catch (error) {
            retryCount++;
            if (retryCount > MAX_RETRIES) {
                console.error(`Failed to start browser after ${MAX_RETRIES} retries`);
                throw error;
            }
            console.log(`Retry attempt ${retryCount} for scenario: ${pickle.name}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            
            // Cleanup before retry
            if (browser) {
                await browser.close();
            }
        }
    }
    
});

After(async function ({ result }) {
    try {
        if (result.status === Status.FAILED) {
            // Check if page object exists before taking screenshot
            if (page) {
                const screenshot = await page.screenshot({
                    path: `./allure-results/screenshot-${Date.now()}.png`,
                    fullPage: true
                });
                await this.attach(screenshot, 'image/png');
            } else {
                console.warn('Could not take screenshot - page object was not initialized');
            }
        }
    } catch (error) {
        console.error('Error in After hook:', error.message);
    } finally {
        // Close browser if it exists
        if (browser) {
            try {
                await browser.close();
            } catch (error) {
                console.error('Error closing browser:', error.message);
            }
        }
    }
});