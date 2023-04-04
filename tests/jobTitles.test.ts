import {test, Page, expect } from "@playwright/test";
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

test('Add Job Title',async()=>{
  
    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let value = await homepage.fillAddJobTitleFields('QA Automation_');
    await homepage.verifyAddJobTitleTableRecord(value);

})

test('Delete JobTitle',async()=>{


    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.verifyJobTitle();
    await homepage.clickAndVerifyAddJobTitle();
    let value = await homepage.fillAddJobTitleFields('QA Automation_');

    console.log(value);

   await homepage.deleteJobTitleRecord(value);
   await page.waitForTimeout(3000);
   let val =await homepage.verifyJobTitleRecordTable(value);
   expect (val).toBeFalsy();

})

test('Edit Job Title', async()=>{

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

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

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

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

