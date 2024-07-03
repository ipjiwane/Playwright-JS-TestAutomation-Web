const { test, expect } = require('@playwright/test');

test('SQL injection', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Attempt SQL injection
  await page.fill('input[name="email"]', "' OR '1'='1");
  await page.fill('input[name="password"]', "' OR '1'='1");

  // Click login button
  await page.click('input[id="login"]');

  // Assert that an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
  await expect(page.locator('//*[text()="Invalid credentials"]')).toBeVisible();
});

test('Cross-Site Scripting (XSS)', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Attempt XSS attack
  await page.fill('input[name="email"]', '<script>alert("XSS")</script>');
  await page.fill('input[name="password"]', '<script>alert("XSS")</script>');

  // Click login button
  await page.click('input[id="login"]');

  // Assert that the script is not executed and an error message is displayed
  // await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
  await expect(page.locator('//*[text()="Invalid credentials"]')).toBeVisible();
});


test('Brute Force Attack', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

  // Perform multiple login attempts
  const attempts = 5; // Define the number of attempts before the account should be locked or CAPTCHA presented
  for (let i = 0; i < attempts; i++) {
    await page.fill('input[name="email"]', 'admin@admin.com');
    await page.fill('input[name="password"]', 'testPassword');
    await page.click('input[id="login"]');
    await page.waitForTimeout(1000)
  }

  // Verify account lock after multiple failed login attempts
  await expect(page.locator('//*[text()="Multiple failed login attempts. Your account has been locked"]')).toBeVisible();

})
