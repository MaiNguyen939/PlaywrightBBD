class HomeLocators {
    static contactUsBtn = '[href*="contact_us"]';
    static nameIpt = '[name="name"]';
    static emailIpt = '[name="email"]';
    static subjectIpt = '[name="subject"]';
    static messageIpt = '[name="message"]';
    static submitBtn = 'button[type="submit"]';
    static fileUploadBtn = 'input[type="file"]';
    static homeBtn = '[class="btn btn-success"]';
    static submitSuccessMsg = '[class="status alert alert-success"]';
    static productsBtn = '[href="/products"]';
    static viewProductBtn = (productName) => `//a[contains(@href, "product_details/${productName}")]`;
    static viewFirstProductBtn = '[href="/product_details/1"]';
    static productWrapper = '.product-image-wrapper';
    static searchProductIpt = '[name="search"]';
    static searchProductBtn = '[id="submit_search"]';
    static emailSubscriptionIpt = '[id="susbscribe_email"]';
    static subscribeBtn = '[id="subscribe"]';
    static productList = {
        price: '.productinfo h2',
        name: '.productinfo p',
        image: '.productinfo img',
        addToCartBtn: '.productinfo a'

    }
    static productDetails = {
        name: '.product-information h2',
        category: '.product-information p:nth-child(3)',
        price: '.product-information span span',
        availability: '.product-information p:nth-child(6) b',
        condition: '.product-information p:nth-child(7) b',
        brand: '.product-information p:nth-child(8) b'
    };
    static pageTitle = (text) => `//h2[contains(text(), "${text}")]`;
}

module.exports = { HomeLocators };