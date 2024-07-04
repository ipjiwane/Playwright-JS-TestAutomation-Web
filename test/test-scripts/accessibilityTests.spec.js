const { test, expect } = require('@playwright/test');

test.describe('Login Page Accessibility Tests', () => {

  // *************explore accessibility testing******************
  // browserstack for accessibility testing

  // test.describe('Screen Reader Compatibility', () => {
    test('Verify screen reader compatibility on login page', async ({ page }) => {
      await page.goto('https://your-login-page.com');

      // Check ARIA labels on input fields
      await expect(page.locator('input[name="username"]')).toHaveAttribute('aria-label', 'Username');
      await expect(page.locator('input[name="password"]')).toHaveAttribute('aria-label', 'Password');

      // Check ARIA role on the login button
      await expect(page.locator('button[type="submit"]')).toHaveAttribute('role', 'button');

      // Trigger error message and check ARIA live region
      await page.click('button[type="submit"]');
      await expect(page.locator('.error-message')).toHaveAttribute('role', 'alert');
    });
  // });

  // test.describe('Keyboard Navigation', () => {
    test.only('Verify keyboard navigation on login page', async ({ page }) => {
      await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

      // Focus on the username input and type
      await page.focus('input[name="email"]');
      await page.keyboard.type('admin@admin.com');

      // Press Tab to navigate to the password input
      await page.keyboard.press('Tab');
      await page.keyboard.type('2020');

      // Press Tab to navigate to the login button
      await page.keyboard.press('Tab');

      // Verify the login button is focused
      await expect(page.locator('input[id="login"]')).toBeFocused();

      // Press Enter to submit the form
      await page.keyboard.press('Enter');

      // Assert that the user is redirected to the home page
      // await expect(page).toHaveURL('https://your-home-page.com');
      await expect(page.locator('//div[@class="home"]')).toBeVisible();
    });
  // });

});
