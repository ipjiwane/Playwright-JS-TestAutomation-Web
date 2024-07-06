// helpers/environment.js
const setup = require('./setup');
const teardown = require('./teardown');

let browser;
let page;

beforeAll(async () => {
  const context = await setup();
  browser = context.browser;
  page = context.page;
});

afterAll(async () => {
  await teardown(browser);
});

module.exports = { browser, page };
