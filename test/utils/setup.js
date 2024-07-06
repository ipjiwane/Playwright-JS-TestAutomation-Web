// helpers/setup.js
const { chromium } = require('playwright');

async function setup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  return { browser, page };
}

module.exports = setup;
