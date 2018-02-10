const puppeteer = require('puppeteer');

test('baidu title is correct', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  const title = await page.title();
  expect(title).toBe('百度一下，你就知道');
  await browser.close();
});
