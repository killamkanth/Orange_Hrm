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

test('System should not allow user to Add Record with existing Location Name',async()=>{
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
    //console.log(boo);
   // await expect (boo).toBeTruthy();

    const value = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(value);
    await expect (boolVal).toBeTruthy();
    
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo1 = await homepage.verifyPageTitle('Add Location');
   // await expect (boo1).toBeTruthy();

    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(3000);

    await organizationpage.verifyErrorMessage();

})
//Done
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

    const value = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(value);
    expect (boolVal).toBeTruthy();

    await (await homepage.generatePathForEditIcon(value)).click();
    await homepage.waitForTimeout(2000);
    await homepage.verifyPageTitle('Edit Location');
    
    const value1 = "Germany"+"_"+await homepage.getRanNum(3);
    console.log(value1);
    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value1);
    await homepage.clickOnButton('Save');
    await homepage.waitForTimeout(3000);

    await (await page.waitForSelector(organizationpage.locationsLocators.tablelocator)).waitForElementState('stable');

    boolVal =await organizationpage.verifyRecordTable(value1);
    expect (boolVal).toBeTruthy();

})

test('Delete Multiple Location Records' , async()=>{

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

    const locValue1 = await organizationpage.fillAddLocationDetails('Sweden');
   

    let boolVal =await organizationpage.verifyRecordTable(locValue1);
    expect (boolVal).toBeTruthy();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);

    const locValue2 = await organizationpage.fillAddLocationDetails('Germany');
   

    boolVal =await organizationpage.verifyRecordTable(locValue2);
    await expect (boolVal).toBeTruthy();

    await homepage.selectChckboxInTable(locValue1);
    await homepage.selectChckboxInTable(locValue2);

    await homepage.cilckOnDelete();
    let status = await organizationpage.verifyRecordTable(locValue1);
    expect (status).toBeFalsy();


})

test.only('qwe',async()=>{
    loginpage = new loginPage(page);
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    homepage = new homePage(page);
    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    organizationpage = new organizationPage(page);
    await homepage.navigateToMenuSubMenu('Organization','Structure');
    await homepage.waitForTimeout(2000);

    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Organization Structure');
    console.log(boo);

   // await organizationpage.editToggleIcon.click();
    await organizationpage.clickOnEditToggleIcon();
    //check this line
    //await (await page.waitForSelector(homepage.getButtonElement("Add"))).waitForElementState('stable');
    await homepage.waitForTimeout(2000);
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(4000);
    await homepage.verifyPageTitleByPassingLocator('Add Organization Unit', 
            organizationpage.organizationStructureLocators.addOrganizationUnitTitle);







})

test.afterAll(async()=>{
    await page.close();
})

