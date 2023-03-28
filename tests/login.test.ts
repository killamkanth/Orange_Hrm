import {test,  expect, Page, chromium } from "@playwright/test";
import { homePage } from "../pages/homePage";
import { loginPage } from "../pages/loginpage";

let page : Page
let browser,context : any
let loginpage : loginPage
let homepage : homePage


test.beforeAll(async({ browser})=>{
    // browser = await chromium.launch();
    // context = await browser.newContext();
     page = await browser.newPage();
     
})

test('Login with valid data', async()=>{
    // await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // await expect (page.locator("//h5")).toHaveText("Login");

    // await page.getByPlaceholder("Username").fill("Admin")
    // await page.getByPlaceholder("Password").fill("admin123");
    // await page.click("button[type='submit']");

    // await expect (page.locator("//span[text()='Admin']")).toHaveText("Admin");

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    await homepage.clickOnSearch();
    //add a record
    const userval = await homepage.addRecord();
    //Edit a Record
    const randVal = await homepage.editRecord(userval);
    //Delete a Record
    await homepage.deleteRecord(randVal);

    await homepage.clickOnLogout();

    await loginpage.verifyLogout();

})
test('Add a Record',async()=>{
    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    await homepage.clickOnSearch();
    await homepage.addRecord();

    await homepage.clickOnLogout();

    await loginpage.verifyLogout();

})

test.afterAll(async()=>{
    await page.close();
})