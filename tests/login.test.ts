import {test,  expect, Page, chromium } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginpage";

let page : Page
let loginpage : LoginPage
let homepage : HomePage


test.beforeAll(async({ browser})=>{
   
     page = await browser.newPage();
     loginpage = new LoginPage(page);
     homepage = new HomePage(page);
     
})

test('Login with valid data', async()=>{
    // await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // await expect (page.locator("//h5")).toHaveText("Login");

    // await page.getByPlaceholder("Username").fill("Admin")
    // await page.getByPlaceholder("Password").fill("admin123");
    // await page.click("button[type='submit']");

    // await expect (page.locator("//span[text()='Admin']")).toHaveText("Admin");

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

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
    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

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