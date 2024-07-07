const { test, expect } = require('@playwright/test');
const logger = require('../utils/logger');
const users = require('../test-data/users.json');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');
const { ENVIRONMENT } = require('../config/environment');

test.beforeEach(async ({ page }, testInfo) => {
  try {
    logger.info(`*** Running test : ${testInfo.title} ***`);
    logger.info("Navigating to the Login page");
    await page.goto('/');
  } catch (error) {
    logger.error(`Error while navigating to the login page: ${error.message}`);
    throw error;
  }
})

test.describe('@usability: Login Page Usability Tests', () => {
  test('TC001: Verify login page loads correctly', {
    tag: ['@regression', '@smoke']
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      //verifying the page title
      logger.info("Verifying the page title");
      await loginPage.verifyLoginPageTitle();
      logger.info('Verifying "User" field is present');
      await loginPage.verifyUserFieldIsPresent();
      logger.info('Verifying "Password" field is present');
      await loginPage.verifyPasswordFieldIsPresent();
      logger.info('Verifying "Login" button is present');
      await loginPage.verifyLoginButtonIsPresent();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test('TC002: Verify Valid login', {
    tag: ['@regression']
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    try {
      // Login to the application with valid credentials
      logger.info("Login to the application with valid credentials");
      await loginPage.login(ENVIRONMENT.username, ENVIRONMENT.password);
      // Verify that the user is redirected to the home page
      logger.info("Verifying Login Success");
      await homePage.verifyLoginSuccess();
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC003: Verify Invalid login', {
    tag: ['@regression', '@smoke'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Login to the application with invalid credentials
      logger.info("Login to the application with invalid credentials");
      await loginPage.login(ENVIRONMENT.invalidUsername, ENVIRONMENT.invalidPassword);

      // Verifying error message for invalid credentials
      logger.info("Verifying error message for invalid credentials");
      await loginPage.verifyLoginFailureMessage('Invalid credentials')
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC004 - Verify login with empty "User" and "Password" fields', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Clicking login button with empty fields
      logger.info("Clicking login button with empty fields");
      await loginPage.clickLoginButton();

      // Verifying error message for empty fields
      logger.info("Verifying error message for empty fields");
      await loginPage.verifyLoginFailureMessage('Please enter username and password')
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC005 - Verify login with empty "User" field', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Attempting login with empty user field
      logger.info("Clicking login button with empty user field");
      await loginPage.login('', ENVIRONMENT.password)

      // Verifying error message for empty user field
      logger.info("Verifying error message for empty user field");
      await loginPage.verifyLoginFailureMessage('Please enter User')
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC006 - Verify login with empty "Password" field', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Attempting login with empty password field
      logger.info("Clicking login button with empty password field");
      await loginPage.login(ENVIRONMENT.username, '')

      // Verifying error message for empty password field
      logger.info("Verifying error message for empty password field");
      await loginPage.verifyLoginFailureMessage('Please enter Password')
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC007 - Verify Case sensitivity in login', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Attempting login with correct credentials but different case
      logger.info("Attempting login with correct credentials but different case");
      await loginPage.login(ENVIRONMENT.username.toUpperCase(), ENVIRONMENT.password.toUpperCase());

      // Verifying error message for invalid credentials
      logger.info("Verifying error message for invalid credentials");
      await loginPage.verifyLoginFailureMessage('Invalid credentials')
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test('TC008 - Verify Password masking on Login Page', {
    tag: ['@regression', '@smoke']
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Entering password
      logger.info("Entering Password");
      await loginPage.enterPassword(process.env.password);

      // Verifying that the password is masked
      logger.info("Verifying that the password is masked");
      loginPage.verifyPasswordIsMasked()
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC009 - Verify Show/Hide password on Login Page', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/6',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Entering password
      logger.info("Entering Password");
      await loginPage.enterPassword(ENVIRONMENT.password);

      // Verifying that show/hide password toggle is present
      logger.info("Verifying that show/hide password toggle is present");
      loginPage.verifyShowHidePasswordToggleIsPresent();
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC010 - Verify the labels and placeholders of "User" and "Password" fields', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/5',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Verifying the login page labels and placeholders
      logger.info('Verifying the login page labels and placeholders')
      await loginPage.verifyLabelsAndPlaceholders();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }

  });

  test.fail('TC011 - Verify the presence of "Forgot password" link', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/4',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      logger.info('Verifying that "Forgot Password" Link is available on Login Page')
      await loginPage.verifyForgotPasswordLinkIsPresent();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC012 - Verify the presence of "Remember Me" checkbox', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/3',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      logger.info('Verifying that "Remember Me" checkbox is available on Login Page')
      await loginPage.verifyRememberMeCheckBoxIsPresent();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });
});

test.describe('@accessibility: Login Page Accessibility Tests', () => {
  test('TC013 - Verify keyboard navigation on login page', {
    tag: ['@regression']
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Verifying keyboard navigation on login page
      logger.info("Verifying keyboard navigation on login page");
      await loginPage.verifyKeyboardNavigation();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC014 - Verify screen reader compatibility on login page', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/2',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Verifying screen reader compatibility on login page
      logger.info("Verifying screen reader compatibility on login page");
      await loginPage.verifyARIALoginPage();
      logger.info('Test Passed');
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });
});

test.describe('@data-driven: Login Test with multiple users', {
  tag: ['@regression']
}, () => {
  for (const user of users) {
    test(`TC015 - Verify Valid login for user '${user.email}'`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      try {
        // Login to the application with valid credentials
        logger.info("Login to the application with valid credentials");
        await loginPage.login(user.email, user.password);

        // Verifying that the user is redirected to the home page
        logger.info("Verifying that the user is redirected to the home page");
        await homePage.verifyLoginSuccess();
        logger.info('Test Passed')
      } catch (error) {
        logger.error(`Test failed with error: ${error.message}`);
        throw error;
      }
    });
  }
});

test.describe('@performance: Login Page Performance Tests', () => {
  test('TC016 - Verify login page load time', {
    tag: ['@regression', '@smoke']
  }, async ({ page }) => {
    try {
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;

      // Assert that the page loads within 2 seconds
      logger.info('Verifying the performance by checking login page load time')
      expect(loadTime).toBeLessThan(2000);
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });
});

test.describe('@security: Login Page Security Tests', () => {
  test.fail('TC017 - Verify SQL injection security breach on login page', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      logger.info('Attempting SQL Injection while login')
      await loginPage.login("' OR '1'='1", "' OR '1'='1");

      // Assert that an error message is displayed
      logger.info('Verifying that an error message is displayed')
      await loginPage.verifyLoginFailureMessage('Invalid credentials');
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });

  test.fail('TC018 - Verify Brute Force Attack security breach on login page', {
    tag: ['@regression'],
    annotation: {
      type: 'issue',
      description: 'https://github.com/ipjiwane/Playwright-JS-TestAutomation-Web/issues/7',
    },
  }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    try {
      // Attempting to login with invalid credentials multiple times
      logger.info('Attempting to login with invalid credentials multiple times')

      const loginAttemps = 5;
      for (let i = 0; i < loginAttemps; i++) {
        await loginPage.login(ENVIRONMENT.invalidUsername, ENVIRONMENT.invalidPassword);
        await page.waitForTimeout(2000);
      }

      // Verifying account lock after multiple failed login attempts
      logger.info('Verifying that an error message is displayed')
      await loginPage.verifyLoginFailureMessage('Multiple failed login attempts. Your account has been locked');
      logger.info('Test Passed')
    } catch (error) {
      logger.error(`Test failed with error: ${error.message}`);
      throw error;
    }
  });
});