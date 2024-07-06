// helpers/teardown.js
async function teardown(browser) {
    await browser.close();
  }
  
  module.exports = teardown;
  