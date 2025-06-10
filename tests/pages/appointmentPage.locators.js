class AppointmentLocators {
    static makeAppointmentBtn = '[id="btn-make-appointment"]';
    static userNameIpt = 'input[id="txt-username"]';
    static passwordIpt = 'input[id="txt-password"]';
    static loginBtn = 'button[id="btn-login"]';
    static homeTitle = (text) => `//*[text()="${text}"]`;
}

module.exports = { AppointmentLocators };