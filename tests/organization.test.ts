import { test, Page, expect } from "@playwright/test"
import { HomePage } from "../pages/homePage"
import { LoginPage } from "../pages/loginpage"
import { OrganizationPage } from "../pages/organizationPage"


let page: Page
let loginpage: LoginPage
let homepage: HomePage
let organizationpage: OrganizationPage


test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginpage = new LoginPage(page);
    homepage = new HomePage(page);
    organizationpage = new OrganizationPage(page);

})

test('Edit General Information', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    await homepage.navigateToMenuSubMenu('Organization', 'General Information');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('General Information');
    expect(boo).toBeTruthy();

    await organizationpage.clickAndVerifyToggleIcon();

    const value = await organizationpage.fillGeneralInformationDetails('Orange HRM');
    await organizationpage.verifyGeneralInformationDetails(value);

})


test('Add Location Record', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();

    await homepage.verifyLogin();
    await homepage.verifyAdmin();

    await homepage.navigateToMenuSubMenu('Organization', 'Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();

    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);

    const value = await organizationpage.fillAddLocationDetails('Sweden');
    let boolVal = await organizationpage.verifyRecordTable(value);
    expect(boolVal).toBeTruthy();

})

test('Delete Location Record', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    const value = await organizationpage.fillAddLocationDetails('Sweden');
    let boolVal = await organizationpage.verifyRecordTable(value);
    expect(boolVal).toBeTruthy();
    await (await homepage.generatePathForDeleteIcon(value)).click();
    await (await homepage.getButtonElement('Yes, Delete')).click();
    await homepage.waitForTimeout(3000);
    boolVal = await organizationpage.verifyRecordTable(value);
    expect(boolVal).toBeFalsy();

})

test('System should not allow user to Add Record with existing Location Name', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    const value = await organizationpage.fillAddLocationDetails('Sweden');
    let boolVal = await organizationpage.verifyRecordTable(value);
    expect(boolVal).toBeTruthy();
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo1 = await homepage.verifyPageTitle('Add Location');
    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(3000);
    await organizationpage.verifyErrorMessage();

})
//Done
test('Edit Location Record', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    const value = await organizationpage.fillAddLocationDetails('Sweden');
    let boolVal = await organizationpage.verifyRecordTable(value);
    expect(boolVal).toBeTruthy();
    await (await homepage.generatePathForEditIcon(value)).click();
    await homepage.waitForTimeout(2000);
    await homepage.verifyPageTitle('Edit Location');
    const value1 = "Germany" + "_" + await homepage.getRanNum(3);
    console.log(value1);
    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value1);
    await homepage.clickOnButton('Save');
    await homepage.waitForTimeout(3000);
    await (await page.waitForSelector(organizationpage.locationsLocators.tablelocator)).waitForElementState('stable');
    boolVal = await organizationpage.verifyRecordTable(value1);
    expect(boolVal).toBeTruthy();

})

test('Delete Multiple Location Records', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Locations');
    await homepage.waitForTimeout(2000);
    await organizationpage.verifyLocationPageTitle();
    await (await homepage.getButtonElement('Add')).click();
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    const locValue1 = await organizationpage.fillAddLocationDetails('Sweden');
    let boolVal = await organizationpage.verifyRecordTable(locValue1);
    expect(boolVal).toBeTruthy();
    await (await homepage.getButtonElement('Add')).click();
    await page.waitForLoadState("domcontentloaded");
    await homepage.waitForTimeout(2000);
    boo = await homepage.verifyPageTitle('Add Location');
    console.log(boo);
    const locValue2 = await organizationpage.fillAddLocationDetails('Germany');
    boolVal = await organizationpage.verifyRecordTable(locValue2);
    expect(boolVal).toBeTruthy();
    await homepage.selectChckboxInTable(locValue1);
    await homepage.selectChckboxInTable(locValue2);
    await homepage.cilckOnDelete();
    let status = await organizationpage.verifyRecordTable(locValue1);
    expect(status).toBeFalsy();


})

///Admin->Organisation->Structure
test('Add an Organisation Unit', async () => {
    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Structure');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Organization Structure');
    console.log(boo);
    await organizationpage.clickOnEditToggleIcon();
    await (await page.waitForSelector(homepage.buttonEle('Add'))).waitForElementState('stable');
    await (await homepage.getButtonElement('Add')).click();
    await homepage.verifyPageTitleByPassingLocator('Add Organization Unit',
        organizationpage.organizationStructureLocators.addOrganizationUnitTitle);
    console.log("executed");
    await (await homepage.getTextElement('Unit Id')).type(await homepage.getRanNum(5));
    let value = 'Security' + await homepage.getRanNum(2);
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(1000);
    await (await homepage.getButtonElement('Save')).click();
    await homepage.waitForTimeout(1000);
    await homepage.waitForSelector(".org-container");
    await homepage.waitForTimeout(3000);
    let status = organizationpage.verifyOrganizationStructureTable(value);
    expect(status).toBeTruthy();

})

test('Should throw an error message while Addiing an Organisation Unit with existing name', async () => {
    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Structure');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Organization Structure');
    console.log(boo);
    await organizationpage.clickOnEditToggleIcon();
    await (await page.waitForSelector(homepage.buttonEle('Add'))).waitForElementState('stable');
    await (await homepage.getButtonElement('Add')).click();
    await homepage.verifyPageTitleByPassingLocator('Add Organization Unit',
        organizationpage.organizationStructureLocators.addOrganizationUnitTitle);
    console.log("executed");
    await (await homepage.getTextElement('Unit Id')).type(await homepage.getRanNum(5));
    let value = 'Security' + await homepage.getRanNum(2);
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(1000);
    await (await homepage.getButtonElement('Save')).click();
    await homepage.waitForTimeout(1000);
    await homepage.waitForSelector(".org-container");
    await homepage.waitForTimeout(3000);
    let status = organizationpage.verifyOrganizationStructureTable(value);
    expect(status).toBeTruthy();
    //Adding the same name unit
    await (await homepage.getButtonElement('Add')).click();
    await homepage.verifyPageTitleByPassingLocator('Add Organization Unit',
        organizationpage.organizationStructureLocators.addOrganizationUnitTitle);
    console.log("executed");
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(1000);
    await organizationpage.verifyErrorMessage1(organizationpage.organizationStructureLocators.errorMesg);


})
test.only('Delete an Organisation Unit', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Structure');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Organization Structure');
    console.log(boo);
    await organizationpage.clickOnEditToggleIcon();
    await (await page.waitForSelector(homepage.buttonEle('Add'))).waitForElementState('stable');
    await (await homepage.getButtonElement('Add')).click();
    await homepage.verifyPageTitleByPassingLocator('Add Organization Unit',
        organizationpage.organizationStructureLocators.addOrganizationUnitTitle);
    console.log("executed");
    await (await homepage.getTextElement('Unit Id')).type(await homepage.getRanNum(5));
    let value = 'Security' + await homepage.getRanNum(2);
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(1000);
    await (await homepage.getButtonElement('Save')).click();
    await homepage.waitForTimeout(1000);
    await homepage.waitForSelector(".org-container");
    await homepage.waitForTimeout(3000);
    let status = organizationpage.verifyOrganizationStructureTable(value);
    expect(status).toBeTruthy();
    const countBefDeleting = organizationpage.getOrganizationStructureListCount();
    await page.locator(organizationpage.organizationStructureLocators.deleteOrganisationUnitIcon).click();
    await (await homepage.getButtonElement("Yes, Delete")).click({ force: true, delay: 2000 });
    await homepage.waitForTimeout(4000);
    await homepage.waitForSelector(".org-container");
    const countAfterDeleting = organizationpage.getOrganizationStructureListCount();
    if (countAfterDeleting < countBefDeleting) {
        console.log("Record deleted successfully");
    }


})

test('Edit Organisation Unit', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await homepage.verifyAdmin();
    await homepage.navigateToMenuSubMenu('Organization', 'Structure');
    await homepage.waitForTimeout(2000);
    let boo = await homepage.verifyPageTitle('Organization Structure');
    console.log(boo);
    await organizationpage.clickOnEditToggleIcon();
    await homepage.waitForSelector(organizationpage.organizationStructureLocators.editOrganisationUnitIcon);
    await page.locator(organizationpage.organizationStructureLocators.editOrganisationUnitIcon).click();
    await homepage.verifyPageTitleByPassingLocator('Edit Organization Unit',
        organizationpage.organizationStructureLocators.editOrganizationUnitTitle);
    console.log("executed");
    //edit details
    let value = 'Security' + await homepage.getRanNum(2);
    await (await homepage.getTextElement('Name')).clear();
    await (await homepage.getTextElement('Name')).type(value);
    await homepage.waitForTimeout(1000);
    await (await homepage.getButtonElement('Save')).click();
    await page.waitForLoadState("load");
    let status = organizationpage.verifyOrganizationStructureTable(value);
    expect(status).toBeTruthy();

})

test.afterAll(async () => {
    await page.close();
})

