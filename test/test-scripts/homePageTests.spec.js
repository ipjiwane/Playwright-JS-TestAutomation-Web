const { test, expect } = require('@playwright/test');
const logger = require('../utils/logger')
const { LoginPage } = require('../pages/LoginPage')

test.beforeEach(async ({ page }) => {
  try {
    logger.info("Navigating to the Login page");
    await page.goto('/');
  } catch (error) {
    logger.error(`Error while navigating to the login page: ${error.message}`);
    throw error;
  }
})

test('Verify the Home page menus', async ({ page }) => {
  const loginPage = new LoginPage(page);
  try {
    // Login to the application with valid credentials
    logger.info("Login to the application with valid credentials");
    const homePage = await loginPage.login(process.env.email, process.env.password);

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

test('Verify Logout functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  try {
    logger.info('Login to the application with valid credentials')
    const homePage = await loginPage.login(process.env.email, process.env.password);

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
