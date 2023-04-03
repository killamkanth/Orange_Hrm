import { Page, expect, test } from "@playwright/test";
import { loginPage } from "../pages/loginpage";
import { Utils } from "../commonUtils/utils";
import { homePage } from "../pages/homePage";
import { reportsPage } from "../pages/reportsPage";
import { organizationPage } from "../pages/organizationPage";


let page : Page
let loginpage : loginPage
let homepage : homePage
let utils : Utils
let reportspage :reportsPage
let organizationpage : organizationPage

test.beforeAll(async({ browser})=>{
    // browser = await chromium.launch();
    // context = await browser.newContext();
    page = await browser.newPage();
    loginpage = new loginPage(page);
    homepage = new homePage(page);
    reportspage = new reportsPage(page);
    utils = new Utils(page);
    organizationpage = new organizationPage(page);
    
})

test('Add a Report',async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await utils.navigateToMenuSubMenu('Reports');
    await utils.verifyPageTitleByPassingLocator(reportspage.employeeReportsTitle,'Employee Reports');

    (await utils.getButtonElement('Add')).click({force:true,delay:1000});
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitle('Add Report');

    const reportName = await reportspage.fillAddReportFields('Full Employee Report');

    (await utils.getButtonElement('Save')).click({force:true,delay:1000});
    //await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(reportspage.reportTable);

    await utils.verifyPageTitleByPassingLocator(reportspage.reportTitle(reportName),reportName);

    await utils.navigateToMenuSubMenu('Reports');
    await utils.verifyPageTitleByPassingLocator(reportspage.employeeReportsTitle,'Employee Reports');

    let boo = await utils.verifyRecordTable(reportspage.tablelocator,reportspage.tableFieldNamelocator,reportName);
    expect (boo).toBeTruthy();


})

test.only('Delete a Report',async()=>{

    await loginpage.baseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();

    await utils.clickOnMenuElement('PIM');
    await utils.verifyMainTitle('PIM');

    await utils.navigateToMenuSubMenu('Reports');
    await utils.verifyPageTitleByPassingLocator(reportspage.employeeReportsTitle,'Employee Reports');

    (await utils.getButtonElement('Add')).click({force:true,delay:1000});
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitle('Add Report');

    const reportName = await reportspage.fillAddReportFields('Full Employee Report');

    (await utils.getButtonElement('Save')).click({force:true,delay:1000});

    await utils.waitForSelector(reportspage.reportTable);

    await utils.verifyPageTitleByPassingLocator(reportspage.reportTitle(reportName),reportName);

    await utils.navigateToMenuSubMenu('Reports');
    await utils.verifyPageTitleByPassingLocator(reportspage.employeeReportsTitle,'Employee Reports');

    let boo = await utils.verifyRecordTable(reportspage.tablelocator,reportspage.tableFieldNamelocator,reportName);
    expect (boo).toBeTruthy();
    
    (await utils.generatePathForDeleteIcon(reportName)).click();

    (await utils.getButtonElement('Yes, Delete')).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(reportspage.tablelocator);

    boo = await utils.verifyRecordTable(reportspage.tablelocator,reportspage.tableFieldNamelocator,reportName);
    expect (boo).toBeFalsy();

    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})

test.afterAll(async()=>{
    await page.close();
})