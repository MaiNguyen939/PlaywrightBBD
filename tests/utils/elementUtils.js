class ElementUtils {
    constructor(page) {
        this.page = page;
    }

    async fillInputField(selector, value) {
        const element = this.page.locator(selector);
        await this.verifyElementExists(element);
        await element.scrollIntoViewIfNeeded();
        await element.fill(value);
    }

    async clickElement(selector) {
        const element = this.page.locator(selector);
        await this.verifyElementExists(element);
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async checkElement(selector) {
        const element = this.page.locator(selector);
        await this.verifyElementExists(element);
        await element.scrollIntoViewIfNeeded();
        await element.check();
    }

    async selectOption(selector, value) {
        const element = this.page.locator(selector);
        await this.verifyElementExists(element);
        await element.scrollIntoViewIfNeeded();
        await element.selectOption(value);
    }

    async verifyElementExists(element) {
        try {
            // Changed from element.waitFor to proper Playwright syntax
            await element.waitFor({
                state: 'attached',
                timeout: 5000,
                message: 'Element not found within 5 seconds'
            });
            return true;
        } catch (error) {
            throw new Error(`Element not found: ${error.message}`);
        }
    }

    async waitForPageLoad() {
        try {
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('load');
        } catch (error) {
            throw new Error(`Page load timeout: ${error.message}`);
        }
    }

    async waitForElement(selector, timeout = 5000) {
        const element = this.page.locator(selector);
        try {
            await element.waitFor({ state: 'visible', timeout });
        } catch (error) {
            throw new Error(`Element not visible: ${error.message}`);
        }
    }
    
    async navigateToUrl(url, maxAttempts = 3) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                console.log(`Navigation attempt ${attempt} to ${url}`);
                this.page.on('load', () => console.log('Page load event fired'));
                this.page.on('domcontentloaded', () => console.log('DOMContentLoaded event fired'));

                // Set a longer timeout for navigation
                await this.page.goto(url, {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000 // 60 seconds
                });

                // Wait for network to be idle
                await Promise.all([
                    this.page.waitForLoadState('domcontentloaded'),
                    this.page.waitForLoadState('networkidle'),
                    this.page.waitForSelector('body', { state: 'visible' })
                ]);

                console.log('Page loaded successfully');
                return;
                
            } catch (error) {
                lastError = error;
                console.log(`Navigation attempt ${attempt} failed:`, error.message);
                
                if (attempt === maxAttempts) {
                    throw new Error(`Failed to navigate to ${url} after ${maxAttempts} attempts: ${lastError.message}`);
                }
                
                // Wait before retrying
                await this.page.waitForTimeout(5000);
            } finally {
                // Remove event listeners
                this.page.removeListener('load', () => {});
                this.page.removeListener('domcontentloaded', () => {});
            }
        }
    }

    async verifyErrorMessage(selector, expectedText, expectedColor = 'rgb(255, 0, 0)') {
        const element = this.page.locator(selector);
        await this.verifyElementExists(element);
        
        // Verify text content
        const actualText = await element.textContent();
        if (!actualText.includes(expectedText)) {
            throw new Error(`Error message mismatch. Expected: "${expectedText}", got: "${actualText}"`);
        }

        // Verify color
        const color = await element.evaluate(el => window.getComputedStyle(el).color);
        if (color !== expectedColor) {
            throw new Error(`Error message color mismatch. Expected: "${expectedColor}", got: "${color}"`);
        }
    }

    async uploadFile(selector, filePath){
        try{
            const element = this.page.locator(selector);
            await this.verifyElementExists(element);

            // Ensure the file input is visible and enabled
            const fs = require('fs');
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            //Handle upload file
            await element.setInputFiles(filePath);

            //Wait for upload to complete
            await this.page.waitForLoadState('networkidle');
            console.log(`File uploaded successfully: ${filePath}`);
        }catch(error){
            throw new Error(`File upload failed: ${error.message}`);
        }
    }

    async handleOKButtonAlertDialog() {
        try {
            // Handle alert by listening for dialog event
            this.page.once('dialog', async dialog => {
                console.log('Dialog message:', dialog.message());
                await dialog.accept();
            });
        } catch (error) {
            throw new Error(`Failed to handle alert dialog: ${error.message}`);
        }
    }
    
    async scrollToBottom() {
        try {
            await this.page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            console.log('Scrolled to the bottom of the page');
        } catch (error) {
            throw new Error(`Failed to scroll to the bottom: ${error.message}`);
        }
    }

    async scrollToTop() {
        try {
            await this.page.evaluate(() => {
                window.scrollTo(0, 0);
            });
            console.log('Scrolled to the top of the page');
        } catch (error) {
            throw new Error(`Failed to scroll to the top: ${error.message}`);
        }
    }

    async scrollToLeft() {
        try {
            await this.page.evaluate(() => {
                window.scrollTo(0, 0);
            });
            console.log('Scrolled to the left of the page');
        } catch (error) {
            throw new Error(`Failed to scroll to the left: ${error.message}`);
        }
    }

    async scrollToRight(){
        try {
            await this.page.evaluate(() => {
                window.scrollTo(document.body.scrollWidth, 0);
            });
            console.log('Scrolled to the right of the page');
        } catch (error) {
            throw new Error(`Failed to scroll to the right: ${error.message}`);
        }
    }
}

module.exports = { ElementUtils };