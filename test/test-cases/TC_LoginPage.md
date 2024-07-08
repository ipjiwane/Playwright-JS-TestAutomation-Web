# Test Cases for Login Page Feature

## Test Case: TC001 - Verify login page loads correctly

**Objective:** Ensure that all expected elements on the login page are present.
**Steps:** 1. Navigate to the login page. 2. Verify the page title to be "Single Page Application". 3. Verify "User" field is present. 4. Verify "Password" field is present. 5. Verify "Login" button is present.

**Expected Outcome:** All elements (page title, "User" field, "Password" field, and "Login" button) are present.

---

## Test Case: TC002 - Verify Valid login

**Objective:** Test successful login with valid credentials.
**Steps:** 1. Navigate to the login page. 2. Enter valid email and password. 3. Click on the login button.

**Expected Outcome:** User should be redirected to the home page.

---

## Test Case: TC003 - Verify Invalid login

**Objective:** Test login attempt with invalid credentials.
**Steps:** 1. Navigate to the login page. 2. Enter invalid email and password. 3. Click on the login button.

**Expected Outcome:** Error message "Invalid credentials" should be displayed.

---

## Test Case: TC004 - Verify login with empty "User" and "Password" fields

**Objective:** Test login attempt with both fields empty.
**Steps:** 1. Navigate to the login page. 2. Click on the login button without entering any credentials.

**Expected Outcome:** Error message "Please enter username and password" should be displayed.

---

## Test Case: TC005 - Verify login with empty "User" field

**Objective:** Test login attempt with empty "User" field.
**Steps:** 1. Navigate to the login page. 2. Enter empty email and valid password. 3. Click on the login button.

**Expected Outcome:** Error message "Please enter User" should be displayed.

---

## Test Case: TC006 - Verify login with empty "Password" field

**Objective:** Test login attempt with empty "Password" field.
**Steps:** 1. Navigate to the login page. 2. Enter valid email and empty password. 3. Click on the login button.

**Expected Outcome:** Error message "Please enter Password" should be displayed.

---

## Test Case: TC007 - Verify Case sensitivity in login

**Objective:** Test login attempt with correct credentials but different case.
**Steps:** 1. Navigate to the login page. 2. Enter email and password with uppercase letters. 3. Click on the login button.

**Expected Outcome:** Error message "Invalid credentials" should be displayed.

---

## Test Case: TC008 - Verify Password masking on Login Page

**Objective:** Test if password input field is masked.
**Steps:** 1. Navigate to the login page. 2. Enter password.

**Expected Outcome:** Password field should display masked characters.

---

## Test Case: TC009 - Verify Show/Hide password on Login Page

**Objective:** Test visibility of show/hide password toggle.
**Steps:** 1. Navigate to the login page. 2. Enter password.

**Expected Outcome:** Show/hide password toggle should be present.

---

## Test Case: TC010 - Verify the labels and placeholders of "User" and "Password" fields

**Objective:** Ensure correct labels and placeholders on login fields.
**Steps:** 1. Navigate to the login page. 2. Verify labels and placeholders for "User" and "Password" fields.

**Expected Outcome:** Labels and placeholders should be correctly displayed.

---

## Test Case: TC011 - Verify the presence of "Forgot password" link

**Objective:** Verify the presence of "Forgot password" link.
**Steps:** 1. Navigate to the login page. 2. Check for the presence of "Forgot password" link.

**Expected Outcome:** "Forgot password" link should be present.

---

## Test Case: TC012 - Verify the presence of "Remember Me" checkbox

**Objective:** Verify the presence of "Remember Me" checkbox.
**Steps:** 1. Navigate to the login page. 2. Check for the presence of "Remember Me" checkbox.

**Expected Outcome:** "Remember Me" checkbox should be present.

---

## Test Case: TC013 - Verify keyboard navigation on login page

**Objective:** Test keyboard navigation on login page.
**Steps:** 1. Navigate to the login page. 2. Navigate through fields using keyboard.

**Expected Outcome:** Keyboard navigation should work correctly.

---

## Test Case: TC014 - Verify screen reader compatibility on login page

**Objective:** Test screen reader compatibility.
**Steps:** 1. Navigate to the login page. 2. Use screen reader on login page.

**Expected Outcome:** Screen reader should read elements correctly.

---

## Test Case: TC015 - Verify Valid login for multiple users

**Objective:** Test successful login for multiple users.
**Steps:** 1. Navigate to the login page. 2. Login with each user from the dataset.

**Expected Outcome:** Each user should be redirected to the home page successfully.

---

## Test Case: TC016 - Verify login page load time

**Objective:** Test login page load time.
**Steps:** 1. Navigate to the login page. 2. Measure login page load time.

**Expected Outcome:** Page should load within 2 seconds.

---

## Test Case: TC017 - Verify SQL injection security breach on login page

**Objective:** Test SQL injection vulnerability.
**Steps:** 1. Navigate to the login page. 2. Attempt SQL injection in login fields.

**Expected Outcome:** Error message "Invalid credentials" should be displayed.

---

## Test Case: TC018 - Verify Brute Force Attack security breach on login page

**Objective:** Test Brute Force Attack vulnerability.
**Steps:** 1. Navigate to the login page. 2. Attempt multiple login attempts with invalid credentials.

**Expected Outcome:** Account should be locked after multiple failed attempts.

---
