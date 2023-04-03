import {test, Page, expect } from "@playwright/test"
import { homePage } from "../pages/homePage"
import { loginPage } from "../pages/loginpage"
import { configurationPage } from "../pages/configurationPage"
import { Utils } from "../commonUtils/utils"

let page : Page

let loginpage : loginPage
let homepage : homePage
let utils : Utils
let configurationpage : configurationPage


test.beforeAll(async({ browser})=>{
    // browser = await chromium.launch();
    // context = await browser.newContext();
     page = await browser.newPage();
     loginpage = new loginPage(page);
     homepage = new homePage(page);
     utils = new Utils(page);
     configurationpage = new configurationPage(page);
   
         
})

test('Optional Fields', async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Optional Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Optional Fields');
    //expect (titStatus).toBeTruthy();

    let bool = configurationpage.setSliderElement('Smoke',true);
    expect (bool).toBeTruthy();

    let bool1 = configurationpage.setSliderElement('SIN',true);
    expect (bool1).toBeTruthy();

    let bool2 = configurationpage.setSliderElement('SSN',true);
    expect (bool2).toBeTruthy();

    let bool3 = configurationpage.setSliderElement('US Tax',true);
    expect (bool3).toBeTruthy();
    
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await homepage.waitForSpinnerToDisappear();


})

test('Add Custom Field',async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Custom Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Custom Fields');

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');

    const fieldName = await configurationpage.fillAddCustomFieldDetails('Languages Known');
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});

    await utils.waitForSelector(configurationpage.tablelocator);
    
    let boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeTruthy();

    
    await homepage.clickOnLogout();

    await loginpage.verifyLogout();

})

test('System should throw Error message while creating custom fiels with existing name', async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Custom Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Custom Fields');

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');
    let inpvalue ='Marital Status' + await utils.getRanNum(2);
    //const value = await utilspage.getCustomisedStringNumber('Marital Status',3);
    const fieldName = await configurationpage.fillAddCustomFieldDetails(inpvalue);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});

    await utils.waitForSelector( configurationpage.tablelocator);
    
    let boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeTruthy();

    (await utils.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');

    (await utils.getTextElement('Field Name')).type(inpvalue);

    await utils.verifyErrorMessage(configurationpage.errorMesg,'Already exists');
    (await utils.getButtonElement('Cancel')).click();

    await homepage.clickOnLogout();

    await loginpage.verifyLogout();


})

test('Edit Custom Field', async()=>{
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Custom Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Custom Fields');

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');
    let inpvalue ='Marital Status' + await utils.getRanNum(2);

    const fieldName = await configurationpage.fillAddCustomFieldDetails(inpvalue);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await utils.waitForSelector(configurationpage.tablelocator);
    
    let boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeTruthy();

    (await utils.generatePathForEditIcon(fieldName)).click();

    await utils.verifyPageTitle('Edit Custom Field');

    inpvalue ='Marital Status' + await utils.getRanNum(2);
    (await utils.getTextElement('Field Name')).clear();
    (await utils.getTextElement('Field Name')).type(inpvalue);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await utils.waitForSelector(configurationpage.tablelocator);

    boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,inpvalue);
    expect (boo).toBeTruthy();

})

test('Delete Custom Field Record', async()=>{
    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Custom Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Custom Fields');

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');
    let inpvalue ='Marital Status' + await utils.getRanNum(2);

    const fieldName = await configurationpage.fillAddCustomFieldDetails(inpvalue);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await utils.waitForSelector(configurationpage.tablelocator);
    
    let boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeTruthy();

    (await utils.generatePathForDeleteIcon(fieldName)).click();

    (await utils.getButtonElement('Yes, Delete')).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(configurationpage.tablelocator);

    boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeFalsy();


})

test.only('Delete Multiple Custom Field Records', async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await homepage.navigateToMenuSubMenu('Configuration','Custom Fields');
    await homepage.waitForTimeout(2000);

    await utils.verifyPageTitle('Custom Fields');

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();

    await utils.verifyPageTitle('Add Custom Field');
    let inpvalue1 ='Marital Status' + await utils.getRanNum(2);

    const fieldName = await configurationpage.fillAddCustomFieldDetails(inpvalue1);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await utils.waitForSelector(configurationpage.tablelocator);
    
    let boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeTruthy();

    (await homepage.getButtonElement('Add')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await homepage.waitForSpinnerToDisappear();
    let inpvalue2 ='Marital Status' + await utils.getRanNum(2);

    const fieldName1 = await configurationpage.fillAddCustomFieldDetails(inpvalue2);
    (await homepage.getButtonElement('Save')).click({force:true,delay:2000});
    await page.waitForLoadState('load');
    await utils.waitForSelector(configurationpage.tablelocator);

    boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName1);
    expect (boo).toBeTruthy();

    await utils.selectChckboxInTable(fieldName,configurationpage.tablelocator);
    await utils.selectChckboxInTable(fieldName1,configurationpage.tablelocator);

    (await utils.getButtonElement('Delete Selected')).click();

    (await utils.getButtonElement('Yes, Delete')).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(configurationpage.tablelocator);

    boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName);
    expect (boo).toBeFalsy();

    boo = await utils.verifyRecordTable(configurationpage.tablelocator,configurationpage.tableFieldNamelocator,fieldName1);
    expect (boo).toBeFalsy();

    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})



test.afterAll(async()=>{
    await page.close();
})