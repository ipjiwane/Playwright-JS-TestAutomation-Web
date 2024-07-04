const { test, expect } = require('@playwright/test');
const logger = require('../utils/logger')

exports.HomePage = class HomePage {
    
    constructor(page) {
        this.page = page;
        this.menuHome = page.locator('//div[@class="home"]');
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

}