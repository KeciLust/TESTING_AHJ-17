import puppeteer from 'puppeteer';
import Valid from '../js/validation';

const valid = new Valid();
jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = valid(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  const cases = [
    ['4556480445308228', true],
    ['5369607016438703', true],
    ['5369607016438707', false],
  ];
  test.each(cases)('should add do something', async (a, expected) => {
    await page.goto(baseUrl);
    const input = await page.$(['class = input']);
    await input.type(a);
    const button = await page.$(['class = button']);
    button.click();
    expect(valid.luhn()).toBe(expected);
  });
});
