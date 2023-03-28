import {test, Page, expect } from "@playwright/test";
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

test('Add Job Title',async()=>{
    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let value = await homepage.fillAddJobTitleFields('QA Automation_');
    await homepage.verifyAddJobTitleTableRecord(value);

})

test('Delete JobTitle',async()=>{

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let value = await homepage.fillAddJobTitleFields('QA Automation_');

    console.log(value);

    //div[div[text()='Account Assistant']]/following-sibling::div//button[i[@class='oxd-icon bi-trash']]

   // await (await homepage.generatePathForEditIcon(value)).click();
   await homepage.deleteJobTitleRecord(value);
   await page.waitForTimeout(3000);
   let val =await homepage.verifyJobTitleRecordTable(value);
   expect (val).toBeFalsy();

})

test('Edit Job Title', async()=>{

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let value = await homepage.fillAddJobTitleFields('QA Automation_');
    await homepage.verifyAddJobTitleTableRecord(value);

    await homepage.clickOnEditJobTitleRecordIcon(value);
    await homepage.verifyEditJobTitleHeader();
    let finalValue =await homepage.editJobTitleFields(value);
    let status = await homepage.verifyJobTitleRecordTable(finalValue);
    expect (status).toBeTruthy();





})

test.only('Delete Multiple Records', async()=>{

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let valueFirst = await homepage.fillAddJobTitleFields('QA Automation_');
    await homepage.verifyAddJobTitleTableRecord(valueFirst);


    await homepage.clickAndVerifyAddJobTitle();
    let valueSecond = await homepage.fillAddJobTitleFields('QA Automation_');
    await homepage.verifyAddJobTitleTableRecord(valueSecond);

    //const valueFirst = "Account Assistant";
    await homepage.selectChckboxInTable(valueFirst);
    await homepage.selectChckboxInTable(valueSecond);

    await homepage.cilckOnDelete();
    await homepage.waitForTimeout(3000);
    let status = await homepage.verifyJobTitleRecordTable(valueFirst);
    expect (status).toBeFalsy();
    
    
})



test.afterAll(async()=>{
    await page.close();
})

