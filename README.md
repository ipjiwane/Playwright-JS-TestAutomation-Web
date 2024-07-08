# Playwright and JavaScript Test Automation Project

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Test Scenarios](#test-scenarios)
- [Running the Tests](#running-the-tests)
- [View Report](#view-report)
- [Code Formatting and Pre-commit Hooks](#code-formatting-and-pre-commit-hooks)
- [Github CI](#github-ci)

## Introduction

This project leverages Playwright and JavaScript to automate the testing of a web application. The project is structured to include page objects, test scripts, configuration files, test data, and more, to ensure a clean and scalable testing framework.

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)

Ensure you have Node.js and npm installed on your machine. You can download Node.js from [nodejs.org](https://nodejs.org/).

## Installation

To set up the project, clone the repository and install the necessary dependencies:

```sh
git clone https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web.git
cd Playwright-JS-TestAutomation-Web
npm install
```

## Folder Structure

```
.github/
  workflows/
    playwright.yml
node_modules/
test/
  config/
    dev.env
    qa.env
    staging.env
    environment.js
  page-objects/
    HomePage.js
    LoginPage.js
  test-cases/
    TC_HomePage.md
    TC_LoginPage.md
  test-data/
    users.json
  test-scripts/
    homePageTests.spec.js
    loginPageTests.spec.js
  user-stories/
    HomePageFeature.md
    LoginPageFeatue.md
  utils/
    logger.js
package.json
playwright.config.js
test-logs.log

```

This structure ensures an organized and modular approach to test automation, making it easier to manage and scale.

## Environment Variables

The project includes various environment configurations stored in the `test/config` directory:

- `dev.env`
- `qa.env`
- `staging.env`
- `environment.js`

These files contain environment-specific variables that can be used to configure test settings for different environments. You can set the environment by specifying the `ENV` variable before running the tests:

## Test Scenarios

Test scenarios are documented in the `test/test-cases` directory:

- `TC_HomePage.md`: Test cases for Home Page
- `TC_LoginPage.md`: Test cases for Login Page

User stories related to these test cases are located in the `test/user-stories` directory:

- `HomePageFeature.md`
- `LoginPageFeature.md`

## Running the Tests

To execute the tests, you can run the following command:

```sh
npx playwright test
```

OR

```sh
npm test
```

This command will run all the test scripts defined in the `test/test-scripts` directory:

- `homePageTests.spec.js`
- `loginPageTests.spec.js`

## View Report

After running the tests, a report will be generated that you can view to see the test results. To view the report, use the following command:

```sh
npx playwright show-report
```

This will open an HTML report in your default browser, providing detailed information on the test execution.

The project also uses Allure reporting that provides detailed and visually appealing reports.

## Code Formatting and Pre-commit Hooks

To maintain code quality and consistency, the project uses Prettier for code formatting and Husky for pre-commit hooks.

## GitHub CI

This project includes a GitHub Actions workflow to automate testing. The workflow file is located at .github/workflows/playwright.yml.
