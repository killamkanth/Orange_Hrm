import {test,  Page, expect } from "@playwright/test"
import { homePage } from "../pages/homePage"
import { loginPage } from "../pages/loginpage"
import { organizationPage } from "../pages/organizationPage"


let page : Page
let browser,context : any
let loginpage : loginPage
let homepage : homePage
let organizationpage: organizationPage


test.beforeAll(async({ browser})=>{
    // browser = await chromium.launch();
    // context = await browser.newContext();
     page = await browser.newPage();
     
})

test('Edit General Information', async()=>{


    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    await homepage.navigateToMenuSubMenu('Organization','General Information');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('General Information');
    expect (boo).toBeTruthy();

    organizationpage = new organizationPage(page);
    await organizationpage.clickAndVerifyToggleIcon();

    const value = await organizationpage.fillGeneralInformationDetails('Orange HRM');
    await organizationpage.verifyGeneralInformationDetails(value);

})


test('Add Location Record',async()=>{

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    organizationpage = new organizationPage(page);
    await homepage.navigateToMenuSubMenu('Organization','Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    //await expect (boo).toBeTruthy();

    const value = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(value);
    await expect (boolVal).toBeTruthy();

})

test('Delete Location Record', async()=>{


    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    organizationpage = new organizationPage(page);
    await homepage.navigateToMenuSubMenu('Organization','Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    //await expect (boo).toBeTruthy();

    const value = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(value);
    await expect (boolVal).toBeTruthy();

    await (await homepage.generatePathForDeleteIcon(value)).click();
    await (await homepage.getButtonElement('Yes, Delete')).click();
    await homepage.waitForTimeout(3000);

    boolVal =await organizationpage.verifyRecordTable(value);
    await expect (boolVal).toBeFalsy();





})

test.only('System should not allow user to Add Record with existing Location Name',async()=>{
    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    organizationpage = new organizationPage(page);
    await homepage.navigateToMenuSubMenu('Organization','Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    //await expect (boo).toBeTruthy();

    const value = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(value);
    await expect (boolVal).toBeTruthy();
    
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo1 = await homepage.verifyPageTitle('Add Location');
    //await expect (boo1).toBeTruthy();

    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(3000);

    await organizationpage.verifyErrorMessage();

})
//InProgress
test('Edit Location Record', async()=>{

    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    organizationpage = new organizationPage(page);
    await homepage.navigateToMenuSubMenu('Organization','Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    //await expect (boo).toBeTruthy();

})

test.afterAll(async()=>{
    await page.close();
})

