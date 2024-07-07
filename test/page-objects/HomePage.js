const { expect } = require('@playwright/test');
const logger = require('../utils/logger');

exports.HomePage = class HomePage {
    
    constructor(page) {
        this.page = page;
        this.menuHome = page.getByText('Home');
        this.menuProducts = page.getByText('Products');
        this.menuContact = page.getByText('Contact')
        this.menuUser = page.locator('#user');
        this.lnklogout = page.getByText('Sign Out')
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
        } catch (error) {
            logger.error(`Issue with Logout: ${error.message}`);
            throw error;
        }
    }
}