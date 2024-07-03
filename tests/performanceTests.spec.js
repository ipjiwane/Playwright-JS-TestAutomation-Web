const { test, expect } = require('@playwright/test');

test('Verify login page load time', async ({ page }) => {
    const start = Date.now();
    await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');
    const loadTime = Date.now() - start;

    console.log(`Page load time: ${loadTime}ms`);

    // Assert that the page loads within 2 seconds
    expect(loadTime).toBeLessThan(2000);
});

test('Verify home page load time', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/testautomation-web/index.html');

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