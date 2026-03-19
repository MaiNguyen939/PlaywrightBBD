class RegexUtils {
    static DASH_TWO_DIGITS = /-\d{2}/;
    static DASH_TWO_DIGITS_GLOBAL = /-\d{2}/g;
    static DASH_TWO_DIGITS_EXACT = /^-\d{2}$/;

    static matchDashTwoDigits(text) {
        return text.match(this.DASH_TWO_DIGITS);
    }

    static matchAllDashTwoDigits(text) {
        return text.match(this.DASH_TWO_DIGITS_GLOBAL) || [];
    }

    static containsDashTwoDigits(text) {
        return this.DASH_TWO_DIGITS.test(text);
    }

    static extractDigitsAfterDash(text) {
        const matches = this.matchAllDashTwoDigits(text);
        return matches.map(m => m.substring(1));
    }

    static replaceDashTwoDigits(text, replacement) {
        return text.replace(this.DASH_TWO_DIGITS_GLOBAL, replacement);
    }
}

module.exports = { RegexUtils };
