const { parse } = require("path");

class PageUtils {
    constructor(page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
    }

    parseDateOfBirth(dateString) {
        const [day, month, year] = dateString.split(' ');
        return {
            day: parseInt(day).toString(),
            month: this.getMonthNumber(month),
            year: year
        };
    }
    getMonthNumber(month) {
        const months = {
            'January': '1',
            'February': '2',
            'March': '3',
            'April': '4',
            'May': '5',
            'June': '6',
            'July': '7',
            'August': '8',
            'September': '9',
            'October': '10',
            'November': '11',
            'December': '12'
        };
        return months[month] || month;
    }
}

module.exports = { PageUtils };