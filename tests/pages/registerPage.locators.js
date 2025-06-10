class RegisterLocators {
    static loginMenuBtn = '[href*="login"]';
    static logoutMenuBtn = '[href*="logout"]';
    static homeTitle = (text) => `//*[contains(text(),"${text}")]`;
    static emailSignUpIpt = 'input[data-qa="signup-email"]';
    static nameSignUpIpt = 'input[data-qa="signup-name"]';
    static emailLoginIpt = 'input[data-qa="login-email"]';
    static passwordLoginIpt = 'input[data-qa="login-password"]';
    static signUpBtn = 'button[data-qa="signup-button"]';
    static logInBtn = 'button[data-qa="login-button"]';
    static nameIpt = 'input[id="name"]';
    static passwordIpt = 'input[id="password"]';
    static titleRadio = (title) => `input[value="${title}"]`;
    static DateOfBirthIpt = 'select[id="days"]';
    static MonthOfBirthIpt = 'select[id="months"]';
    static YearOfBirthIpt = 'select[id="years"]';
    static termsCheckbox = (text) => `//label[contains(text(), "${text}")]//ancestor-or-self::div[@class='checkbox']//input[@type='checkbox']`;
    static firstNameIpt = 'input[id="first_name"]';
    static lastNameIpt = 'input[id="last_name"]';
    static companyIpt = 'input[id="company"]';
    static addressIpt = 'input[id="address1"]';
    static secondAddressIpt = 'input[id="address2"]';
    static countrySelect = 'select[id="country"]';
    static stateIpt = 'input[id="state"]';
    static cityIpt = 'input[id="city"]';
    static zipCodeIpt = 'input[id="zipcode"]';
    static mobileNumberIpt = 'input[id="mobile_number"]';
    static createAccountBtn = 'button[data-qa="create-account"]';
    static continueBtn = 'a[data-qa="continue-button"]';
    static deleteAccountBtn = '[href*="delete_account"]';
    static errorMessage = 'p[style*="color: red"]';
    static loggedInAsText = (username) => `//a[contains(text(), "Logged in as") and //b[text()="${username}"]]`;
    static createdSuccessTitle = (text) => `//h1[contains(text(), "${text}")]`;
}

module.exports = { RegisterLocators };