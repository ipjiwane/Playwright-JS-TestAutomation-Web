const config = require('../config/config.json');
const { test, expect } = require('@playwright/test');

// describe('Login functionality', () => {
  test('Successful login', async () => {
    await page.goto(config.baseUrl + '/login');
    await loginPage.login(config.credentials.username, config.credentials.password);
    // Assert login success
  });

  test('Timeout example', async () => {
    await page.waitForTimeout(config.timeout);
    // Perform assertions after timeout
  });
// });
