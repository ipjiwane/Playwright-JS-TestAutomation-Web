const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const logger = require('../utils/logger')
const users = require('../test-data/users.json')

for (const user of users) {
    test(`Verify Valid login for user '${user.email}'`, async ({ page }) => {
        try {
            logger.info("Navigating to the Login page");
            await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

            // Login to the application with valid credentials
            logger.info("Login to the application with valid credentials");
            const loginPage = new LoginPage(page);
            const homePage = await loginPage.login(user.email, user.password);

            // Verify that the user is redirected to the home page
            logger.info("Verifying Login Success");
            await homePage.verifyLoginSuccess();
            logger.info('Test Passed')
        } catch (error) {
            logger.error(`Test failed with error: ${error.message}`);
            throw error;
        }
    });
}
