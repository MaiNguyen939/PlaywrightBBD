const common = {
    retry: 2,
    retryTagFilter: '@flaky',
    formatOptions: {
        snippetInterface: 'async-await',
        resultsDir: "allure-results"
    },
    format: [
        ['progress', 'reports/progress.txt'],
        ['html', 'reports/cucumber-report.html'],
        ['json', 'reports/cucumber-report.json'],
        ['summary', 'reports/summary.txt'],
        ['@cucumber/pretty-formatter', 'reports/pretty.txt'],
        ["allure-cucumberjs/reporter"]
    ],
    paths: ['tests/features/*.feature'],
    require: ['tests/steps/*.step.js', 'tests/hooks/*.js'],
    tags: process.env.TEST_TAGS || ''
};

module.exports = {
    default: {
        ...common,
        parallel: 3,
        worldParameters: {
            browser: 'chromium',
            headless: false,
            slowMo: 0
        }
    },
    chrome: {
        ...common,
        format: ['html:chrome-report.html'],
        worldParameters: {
            browser: 'chromium',
            headless: false
        }
    },
    firefox: {
        ...common,
        format: ['html:firefox-report.html'],
        worldParameters: {
            browser: 'firefox',
            headless: false
        }
    },
    edge: {
        ...common,
        format: ['html:edge-report.html'],
        worldParameters: {
            browser: 'msedge',
            headless: false
        }
    }
};