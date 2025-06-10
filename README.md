# Playwright with Cucumber BDD Framework

## Overview
Automated testing framework using Playwright with Cucumber BDD for cross-browser testing.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Windows OS

## Project Structure
```
PlaywrightWithBDD/
├── tests/
│   ├── features/        # Gherkin feature files
│   ├── steps/          # Step definitions
│   ├── hooks/          # Test hooks
│   ├── pages/          # Page objects
│   ├── utils/          # Utilities
│   └── testData/       # Test data files
├── reports/            # Test reports
└── batch_scripts/      # Batch scripts for test execution
```

## Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Running Tests

### Run All Tests
```bash
npx cucumber-js
```

### Run Tests by Tag
```bash
tests\batch_scripts\run-cross-browser.bat "@search_product"
```

### Available Tags
- @all_product
- @search_product
- @contact_us
- @subscription_home

### Cross-Browser Testing
Tests can be run in different browsers:
- Chrome: `npx cucumber-js --profile chrome`
- Firefox: `npx cucumber-js --profile firefox`
- WebKit: `npx cucumber-js --profile webkit`

## Configuration

### cucumber.js
- Defines test profiles
- Sets browser configurations
- Configures reporting formats

### Test Retries
- Maximum retries: 2
- Retry delay: 3000ms
- Use @flaky tag for retryable tests

## Reports
Test reports are generated in multiple formats:
- HTML report: `cucumber-report.html`
- Browser-specific reports:
  - `chrome-report.html`
  - `firefox-report.html`
  - `webkit-report.html`

## Project Features
- Cross-browser testing support
- Page Object Model
- Data-driven testing
- Parallel execution
- Retry mechanism
- Custom utilities
- BDD approach

## Cross-browser running
tests\batch_scripts\run-cross-browser.bat "@search_product"

## Parallel
npx cucumber-js --parallel 3

## Retry by tag
npx cucumber-js --tags @flaky --retry 2

## Run single script by tag 
npx cucumber-js --tags @subscription_home

# Run all tests
npm run test

# Run specific tag
npm run test:tag "@subscription_home"
npx cucumber-js --profile default --tags "@your_tag"

# Generate allure report
npm run report:allure