const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const logger = require('../utils/logger')

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.txtUsername = page.locator('input[name="email"]');
        this.txtPassword = page.locator('input[name="password"]');
        this.btnLogin = page.locator('input[id="login"]');
        this.error = page.locator('div[id="error"]');
    }

    async login(username, password) {
        try {
            await this.txtUsername.fill(username);
            await this.txtPassword.fill(password);
            await this.btnLogin.click();
            const homePage = new HomePage(this.page);
            return homePage;
        } catch (error) {
            // const screenshotPath = `error-login.png`;
            // await this.page.screenshot({ path: screenshotPath });
            logger.error(`Login failed: ${error.message}`);
            throw error;
        }
    }

    async verifyLoginFailureMessage(errorMessage) {
        // await expect(this.page.locator('//*[text()="Invalid Credentials"]')).toBeVisible();
        await expect(this.error).toHaveText(errorMessage);
    }
}
