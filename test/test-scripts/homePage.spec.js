const { test, expect } = require('@playwright/test');



test('Verify home page load time', async ({ page }) => {

    // Enter username and password
    await page.fill('input[name="email"]', 'admin@admin.com');
    await page.fill('input[name="password"]', '2020');

    const start = Date.now();

    // Click login button
    await page.click('input[id="login"]');

    const loadTime = Date.now() - start;

    console.log(`Page load time: ${loadTime}ms`);

    // Assert that the page loads within 2 seconds
    expect(loadTime).toBeLessThan(2000);

  });