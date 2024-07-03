const { chromium, firefox, webkit, test, expect, devices } = require('@playwright/test');

const devicesToTest = [
  { name: 'Desktop', viewport: { width: 1280, height: 800 } },
  { name: 'Tablet', viewport: { width: 768, height: 1024 } },
  { name: 'Mobile', viewport: { width: 375, height: 667 } }
];

test.describe('Login Page Compatibility Tests', () => {

  for (const device of devicesToTest) {
    // test.describe(`Login functionality on ${device.name}`, () => {
      test(`Verify login on ${device.name}`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: device.viewport
        });
        const page = await context.newPage();

        await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

        // Fill username and password
        await page.fill('input[name="email"]', 'admin@admin.com');
        await page.fill('input[name="password"]', '2020');

        // Click login button
        await page.click('input[id="login"]');

        // Assert that the user is redirected to the home page
        // await expect(page).toHaveURL('https://your-home-page.com');
        await expect(page.locator('//div[@class="home"]')).toBeVisible();

        await context.close();
      });
    // });
  }

});
