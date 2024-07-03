const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
// const HomePage = require('../pages/HomePage');
const logger = require('../utils/logger')

test('Verify application page title', async ({ page }) => {
  try {
    //Navigate to the login page
    logger.info("Navigating to the login page");
    await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

    //verify the page title
    logger.info("Verifying the page title");
    await expect(page).toHaveTitle('Single Page Application');

  } catch (error) {
    logger.error(`Test failed with error: ${error.message}`);
    throw error;
  }

});


test.only('Verify Valid login', async ({ page }) => {
  try {
    logger.info("Navigating to the Login page");
    await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');
  
    // Login to the application with valid credentials
    logger.info("Login to the application with valid credentials");
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.login('admin@admin.com', '2021');
  
    // Verify that the user is redirected to the home page
    logger.info("Verifying Login Success");
    await homePage.verifyLoginSuccess();
    logger.info('Test Passed')
  } catch (error) {
    logger.error(`Test failed with error: ${error.message}`);
    throw error;
  }
});

test('Verify Invalid login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Login to the application with invalid credentials
  const loginPage = new LoginPage(page);
  await loginPage.login('testuser@example.com', 'test1234');

  // Verify error message
  await loginPage.verifyLoginFailureMessage('Invalid credentials')
});

test('Empty fields', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Click login button with empty fields
  await page.click('input[id="login"]');

  // Assert that an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Please enter username and password');
  await expect(page.locator('//*[text()="Please enter username and password"]')).toBeVisible();
});

test('Empty user field', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Enter username and password
  await page.fill('input[name="password"]', '2020');

  // Click login button with empty fields
  await page.click('input[id="login"]');

  // Assert that an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Please enter username and password');
  await expect(page.locator('//*[text()="Please enter user"]')).toBeVisible();
});

test('Empty password field', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Enter username and password
  await page.fill('input[name="email"]', 'admin@admin.com');

  // Click login button with empty fields
  await page.click('input[id="login"]');

  // Assert that an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Please enter username and password');
  await expect(page.locator('//*[text()="Please enter password"]')).toBeVisible();
});

test('Case sensitivity', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Enter username and password with correct credentials but different case
  await page.fill('input[name="email"]', 'ADMIN@ADMIN.COM');
  await page.fill('input[name="password"]', '2020');

  // Click login button
  await page.click('input[id="login"]');

  // Assert that login fails and an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
  await expect(page.locator('//*[text()="Invalid credentials"]')).toBeVisible();
});

test('Password masking', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Enter password
  await page.fill('input[name="password"]', 'TestPassword');

  // Assert that the password is masked
  const passwordField = await page.locator('input[name="password"]');
  expect(await passwordField.getAttribute('type')).toBe('password');
});

test('Show/Hide password', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Enter password
  await page.fill('input[name="password"]', 'TestPassword');

  // Assert that show/hide password toggle is present
  await expect(page.locator('.show-password-toggle')).toBeVisible();
});
