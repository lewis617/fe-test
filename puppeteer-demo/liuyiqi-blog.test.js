const puppeteer = require('puppeteer');

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80
  });
  page = await browser.newPage();
});

afterAll(() => {
  browser.close();
});

test('open baidu page', async () => {
  await page.goto('https://baidu.com');
});

test('search liuiqi\'s blog', async () => {
  await page.waitForSelector('#kw');
  await page.type('#kw', '刘一奇的个人博客');
  await page.click('#su');
});

test('goto liuyiqi\'s blog', async () => {
  await page.waitForSelector('h3.t > a');
  await page.click('h3.t:nth-of-type(1) > a');

  const pages = await browser.pages();
  page = pages.pop();
  await page.bringToFront();
});

test('expect logo is 刘一奇的个人博客', async () => {
  await page.waitForSelector('#logo');
  const text = await page.$eval('#logo', el => el.textContent)
  expect(text).toBe('刘一奇的个人博客');
});

test('expect main-nav-link is 主页,归档,关于我', async () => {
  const textArray = await page.$$eval('.main-nav-link', els => Array.from(els).map(el => el.textContent));
  expect(textArray).toEqual(['主页', '归档', '关于我']);
});