const { test, expect } = require('@playwright/test');

test.describe('Login Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Replace with the URL of your login page
    await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');
  });

  test('Verify that username and password fields have appropriate labels and placeholders', async ({ page }) => {
    const usernameLabel = await page.locator('label[for="email"]');
    const passwordLabel = await page.locator('label[for="password"]');
    const usernamePlaceholder = await page.locator('input[name="email"]').getAttribute('placeholder');
    const passwordPlaceholder = await page.locator('input[name="password"]').getAttribute('placeholder');

    await expect(usernameLabel).toHaveText('User');
    await expect(passwordLabel).toHaveText('Password');
    await expect(usernamePlaceholder).toBe('E-mail address');
    await expect(passwordPlaceholder).toBe('Password');
  });

  test('Verify that tab key navigates through fields in a logical order', async ({ page }) => {
    await page.locator('input[name="email"]').click();
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('input[id="login"]')).toBeFocused();
  });

//   test('Verify that error messages are clear and helpful', async ({ page }) => {
//     await page.locator('input[id="login"]').click();
//     const errorMessage = await page.locator('//*[text()="Please enter username and password"]');
    
//     await expect(errorMessage).toBeVisible();
//   });

  test('Forgot password link', async ({ page }) => {
  
    // Verify that the forgot password link is available
    await expect(page.locator('a[text()="Forgot password"]')).toBeVisible();
  
  });

});
