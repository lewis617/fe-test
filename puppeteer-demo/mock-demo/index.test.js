const puppeteer = require('puppeteer');

test('body text is correct', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.url.endsWith('data1.json')) {
      // request.continue({
      //   url: 'http://localhost:8081/puppeteer-demo/mock-demo/data2.json'
      // });
      request.respond({
        body: JSON.stringify({ name: 'data2' })
      })
    }
    else {
      request.continue();
    }
  });
  await page.goto('http://localhost:8081/puppeteer-demo/mock-demo/');
  await page.waitForSelector('h1');
  const text = await page.$eval('h1', el => el.textContent)
  expect(text).toBe('data2');
  await browser.close();
}, 16000);