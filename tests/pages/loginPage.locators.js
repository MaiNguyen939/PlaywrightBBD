class LoginLocators {
    static usernameInput = 'input[id="userEmail"]';
    static passwordInput = 'input[id="userPassword"]';
    static loginButton = 'input[type="submit"]';
    static homeTitle = (text) => `//*[text()="${text}"]`;
    static itemAddToCartBtn = (itemName) => `//*[@class = 'fa fa-shopping-cart']//parent::button//following::h5//*[text()="${itemName}"]`;
}

module.exports = { LoginLocators };