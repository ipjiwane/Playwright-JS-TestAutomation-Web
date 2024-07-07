const { expect } = require('@playwright/test');
const { HomePage } = require('./HomePage');
const logger = require('../utils/logger')

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.txtUsername = page.locator('input[name="email"]');
        this.txtPassword = page.locator('input[name="password"]');
        this.lblUsername = page.locator('label[for="email"]');
        this.lblPassword = page.locator('label[for="password"]');
        this.btnLogin = page.locator('input[id="login"]');
        this.error = page.locator('div[id="error"]');
        this.lnkforgotPassword = page.locator('#forgot_password_link');
        this.chkRememberMe = page.locator('input[name="rememberMe"]');
        this.toggleShowHidePassword = page.locator('.show-password-toggle');
    }

    async login(username, password) {
        try {
            await this.txtUsername.fill(username);
            await this.txtPassword.fill(password);
            await this.btnLogin.click();
            const homePage = new HomePage(this.page);
            return homePage;
        } catch (error) {
            logger.error(`Issue with Login: ${error.message}`);
            throw error;
        }
    }

    async enterPassword(password){
        await this.txtPassword.fill(password);
    }

    async clickLoginButton(){
        await this.btnLogin.click();
    }

    async verifyPasswordIsMasked() {
        expect(await this.txtPassword.getAttribute('type')).toBe('password');
    }

    async verifyLoginFailureMessage(errorMessage) {
        await expect(this.error).toHaveText(errorMessage); 
    }

    // accessibility methods
    async verifyKeyboardNavigation() {
        try {
            await this.txtUsername.focus();
            await this.page.keyboard.type(process.env.email);
            await this.page.keyboard.press('Tab');
    
            await expect(this.txtPassword).toBeFocused();
            await this.page.keyboard.type(process.env.password);
            await this.page.keyboard.press('Tab');
    
            await expect(this.btnLogin).toBeFocused();
            await this.page.keyboard.press('Enter');
            await expect(this.page.locator('//div[@class="home"]')).toBeVisible();
        } catch (error) {
            logger.error(`Encountered error: ${error.message}`);
            throw error;
        }

    }

    async verifyARIALoginPage() {
        logger.info('Checking ARIA related labels and roles to check screen reader compatibility')
        await this.verifyLocatorAttribute(this.txtUsername,'aria-label','Email');
        await this.verifyLocatorAttribute(this.txtPassword,'aria-label','Password');
        await this.verifyLocatorAttribute(this.btnLogin,'role','button');
    }

    async verifyLocatorAttribute(locator, attribute, attribute_value) {
        await expect(locator).toHaveAttribute(attribute, attribute_value);
    }

    async verifyLabelsAndPlaceholders(){
        try {
            const usernamePlaceholder = await this.txtUsername.getAttribute('placeholder');
            const passwordPlaceholder = await this.txtPassword.getAttribute('placeholder');
            await expect.soft(this.lblUsername).toHaveText('User');
            await expect.soft(this.lblPassword).toHaveText('Password');
            expect.soft(usernamePlaceholder).toBe('E-mail address');
            expect(passwordPlaceholder).toBe('Password');
        } catch (error) {
            logger.error(`Encountered error: ${error.message}`);
            throw error;
        }
    }

    async verifyUserFieldIsPresent(){
        await expect(this.txtUsername).toBeVisible();
    }
    async verifyPasswordFieldIsPresent(){
        await expect(this.txtPassword).toBeVisible();
    }
    async verifyLoginButtonIsPresent(){
        await expect(this.btnLogin).toBeVisible();
    }

    async verifyShowHidePasswordToggleIsPresent(){
        await expect(this.toggleShowHidePassword).toBeVisible();
    }

    async verifyForgotPasswordLinkIsPresent(){
        await expect(this.lnkforgotPassword).toBeVisible();
    }

    async verifyRememberMeCheckBoxIsPresent(){
        await expect(this.chkRememberMe).toBeVisible();
    }

    async verifyLoginPageTitle(){
        await expect(this.page).toHaveTitle('Single Page Application');
    }

    async verifyLogoutSuccess() {
        await expect(this.btnLogin).toBeVisible();
    }
}
