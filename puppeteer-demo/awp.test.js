const puppeteer = require('puppeteer');
const { execSync } = require('child_process');

let browser;
let page;

execSync('defaults delete org.chromium.Chromium AutoSelectCertificateForUrls && defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string \'{"pattern":"https://[*.]alibaba-inc.com","filter":{"ISSUER":{"CN":"Alilang Class 3 Root"}}}\'');

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
  });
  const pages = await browser.pages();
  [page] = pages;
});

afterAll(() => {
  browser.close();
});

test('should auto select certificate', async () => {
  await page.goto('http://pre.h5.taobao.org/admin/addPage.htm?protoId=45247');
  await page.waitForSelector('.brand');
  const result = await page.$eval('.brand', el => el.textContent);
  expect(result).toBe('AWP管理平台');
}, 10000);
