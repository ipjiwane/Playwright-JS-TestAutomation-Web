const { test } = require('@playwright/test');
const logger = require('../utils/logger');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const { ENVIRONMENT } = require('../config/environment');

test.beforeEach(async ({ page }, testInfo) => {
  try {
    logger.info(`*** Running test : ${testInfo.title} ***`);
    logger.info("Navigating to the Login page");
    await page.goto('/');
  } catch (error) {
    logger.error(`Error while navigating to the login page: ${error.message}`);
    throw error;
  }
})

test.fail('TC001 - Verify the Home page menus', {
  tag: ['@regression', '@smoke'],
  annotation: {
    type: 'issue',
    description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/1',
  },
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  try {
    // Login to the application with valid credentials
    logger.info("Login to the application with valid credentials");
    await loginPage.login(ENVIRONMENT.username, ENVIRONMENT.password);

    // Verifying the home page menu options
    logger.info('Verifying the home page menu options')
    await homePage.verifyHomeMenuIsWorking();
    await homePage.verifyProductsMenuIsWorking();
    await homePage.verifyContactMenuIsWorking();
    logger.info('Test Passed')
  } catch (error) {
    logger.error(`Test failed with error: ${error.message}`);
    throw error;
  }
});

test('TC002 - Verify Logout functionality', {
  tag: ['@regression', '@smoke']
} , async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    try {
      // Login to the application with valid credentials
      logger.info('Login to the application with valid credentials')
      await loginPage.login(ENVIRONMENT.username, ENVIRONMENT.password);

      // Logout from the application
      logger.info('Logout from the application')
      await homePage.logout();

      // Verify that the user is redirected to the login page
      logger.info("Verifying Logout Success");
      await loginPage.verifyLogoutSuccess();
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });
