class RegexUtils {
    static DASH_TWO_DIGITS = /-\d{2}/;
    static DASH_TWO_DIGITS_GLOBAL = /-\d{2}/g;
    static DASH_TWO_DIGITS_EXACT = /^-\d{2}$/;

    static RFF_ABO_NUMBER = /RFF\+ABO:(\d+)'/;
    static RFF_ABO_NUMBER_GLOBAL = /RFF\+ABO:(\d+)'/g;

    static UNA_SEGMENT = /UNA:\+\.\? '/;

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

    static extractRffAboNumber(text) {
        const match = text.match(this.RFF_ABO_NUMBER);
        return match ? match[1] : null;
    }

    static extractAllRffAboNumbers(text) {
        const results = [];
        let match;
        const regex = new RegExp(this.RFF_ABO_NUMBER_GLOBAL.source, 'g');
        while ((match = regex.exec(text)) !== null) {
            results.push(match[1]);
        }
        return results;
    }

    static containsRffAboNumber(text) {
        return this.RFF_ABO_NUMBER.test(text);
    }

    static matchUnaSegment(text) {
        return text.match(this.UNA_SEGMENT);
    }

    static containsUnaSegment(text) {
        return this.UNA_SEGMENT.test(text);
    }
}

module.exports = { RegexUtils };
