const { expect } = require('@playwright/test');
const logger = require('../utils/logger');
const { LoginPage } = require('../pages/LoginPage');

exports.HomePage = class HomePage {
    
    constructor(page) {
        this.page = page;
        this.menuHome = page.locator('.home');
        this.menuProducts = page.locator('.products');
        this.menuContact = page.locator('.contact');
        this.menuUser = page.locator('#user');
        this.lnklogout = page.locator('#logout');
    }

    async verifyLoginSuccess() {
        try {
            await expect(this.menuHome).toBeVisible();
            logger.info('Login Success')
        } catch (error) {
            logger.error(`Login failure: ${error.message}`);
            throw error;
        }   
    }

    async verifyHomeMenuIsWorking() {
        expect(await this.menuHome.getAttribute('href')).not.toBeNull();;
    }

    async verifyProductsMenuIsWorking() {
        expect(await this.menuProducts.getAttribute('href')).not.toBeNull();
    }

    async verifyContactMenuIsWorking() {
        expect(await this.menuContact.getAttribute('href')).not.toBeNull();
    }

    async logout() {
        try {
            await this.menuUser.click();
            await this.lnklogout.click();
            await this.page.waitForTimeout(5000);
            // const loginPage = new LoginPage(this.page);
            // return loginPage;
        } catch (error) {
            logger.error(`Issue with Logout: ${error.message}`);
            throw error;
        }
    }
}