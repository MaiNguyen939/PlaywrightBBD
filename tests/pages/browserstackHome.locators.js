class BrowserstackHomeLocators {
    static productsMenuButton = 'button[aria-label="Products"]';
    static webTestingButton = 'div[aria-label="Products"] button[title="Web Testing"]';
    static webTestingButtonSpan = 'div[aria-label="Products"] button[title="Web Testing"] span';
    static pricingMenuLink = 'a[title="Pricing"]';
    static sidenavContent = 'div.sidenav-content';
    static sidenavProductNames = "//a[contains(@class, 'sidenav-link')]//span[contains(@class, 'sidenav__item-name')]";
}

module.exports = { BrowserstackHomeLocators };