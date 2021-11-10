const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://virtualbank.com:5000/', {waitUntil: 'load'});

  // Fill out the form using data from fake site
  await page.waitForSelector('input#id');
  await page.focus('input#id');
  await page.type('input#id', 'jasvir');
  await page.waitForTimeout(3000);

  await page.focus('input#password');
  await page.type('input#password', 'jasvir');
  await page.evaluate( () => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitForTimeout(3000);

  await page.focus('input#sbmbtn');
  await page.click('input#sbmbtn')
  await page.waitForTimeout(3000);

  // Pause so people can see the filled out fields
  await page.waitForTimeout(3000);

  await browser.close();
})();
