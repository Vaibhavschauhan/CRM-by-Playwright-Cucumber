// const {When,Then,Given}=require('@cucumber/cucumber')
import { When, Then, Given } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import { loginpage } from "../../POM pages/loginpage.js";
import { homepage } from '../../POM pages/homepage.js';
import { leadscreationpage } from '../../POM pages/leadCreationPage.js';
import { leadspage } from '../../POM pages/leadspage.js';
import { logoutpage } from '../../POM pages/logoutpage.js';
import { expect } from "playwright/test";
// const dataset = JSON.parse(JSON.stringify(require("../../Testdata/testDataCRM.json")));

// let page;
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();


Given('Login to crm tool with {string} and {string} and {string} is', { timeout: 20 * 1000 }, async function (username, password, url) {

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const lp = new loginpage(page);
    await lp.logincredentials(username, password);

});

When('home page is displayed', async function () {
    page.locator("//a[@href='index.php?action=index&module=Home']").isVisible;
});

Then('Click on leads page and click on plus icon to create leads profile', async function () {
    const hp = new homepage(page);
    await hp.homepageclick();

    const lcp = new leadscreationpage(page);
    await lcp.leadsbtnclick();
});

When('leads profile page is open', async function () {
    await page.getByText('Creating New Lead').isVisible;
});

Then('fill all the mandatory fields with {string} and {string}  and click on submit button', async function (lastname, title) {
    const ldp = new leadspage(page);
    await ldp.leadscredentials(lastname, title);
});

When('leads profile is saved and verified', async function () {
    await page.getByText('[ LEA2041 ] bch  -  Lead Information').isVisible;
});

Then('Logout from crm', async function () {
    const lop = new logoutpage(page);
    await lop.signout();
    // await browser.close();

});