import { Page, expect, test } from "@playwright/test"
import { LoginPage } from "../pages/loginpage"
import { HomePage } from "../pages/homePage"
import { Utils } from "../commonUtils/utils"
import { AddEmployeePage } from "../pages/addEmployeePage"
import { EmployeeListPage } from "../pages/employeeListPage"
import Constants from "../commonUtils/constants.json"

let page: Page
let loginpage: LoginPage
let homepage: HomePage
let utils: Utils
let addEmployeePage: AddEmployeePage
let employeeListPage: EmployeeListPage

test.beforeAll(async ({ browser }) => {

    page = await browser.newPage();
    loginpage = new LoginPage(page);
    homepage = new HomePage(page);
    utils = new Utils(page);
    addEmployeePage = new AddEmployeePage(page);
    employeeListPage = new EmployeeListPage(page);


})

test('Add Employee', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await utils.clickOnMenuElement(Constants.Menu.pim);
    await utils.verifyMainTitle(Constants.Menu.pim);
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    const employeeId = await addEmployeePage.fillEmployeeDetails();
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await utils.waitForSelector(addEmployeePage.tableContainer);
    let status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId);
    expect(status).toBeTruthy();
    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})

test('Delete an Employee', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await utils.clickOnMenuElement(Constants.Menu.pim);
    await utils.verifyMainTitle(Constants.Menu.pim);
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    const employeeId = await addEmployeePage.fillEmployeeDetails();
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.verifyPageTitleByPassingLocator(employeeListPage.employeeInformationTitle, Constants.Menu.employeeInformation);
    let status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId);
    expect(status).toBeTruthy();
    //Delete An Employee
    await (await utils.generatePathForDeleteIcon(employeeId)).click();
    await (await utils.getButtonElement(Constants.delete)).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId);
    expect(status).toBeFalsy();
    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})

test('Validate Error message when user add an employee without entering any details', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await utils.clickOnMenuElement(Constants.Menu.pim);
    await utils.verifyMainTitle(Constants.Menu.pim);
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.verifyErrorMessage(addEmployeePage.errorMessage, Constants.PimData.errorMessage);
    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})

test("Delete Multiple Employee Records", async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await utils.clickOnMenuElement(Constants.Menu.pim);
    await utils.verifyMainTitle(Constants.Menu.pim);
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    const employeeId1 = await addEmployeePage.fillEmployeeDetails();
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.verifyPageTitleByPassingLocator(employeeListPage.employeeInformationTitle, Constants.Menu.employeeInformation);
    let status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId1);
    expect(status).toBeTruthy();
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    const employeeId2 = await addEmployeePage.fillEmployeeDetails();
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.verifyPageTitleByPassingLocator(employeeListPage.employeeInformationTitle, Constants.Menu.employeeInformation);
    status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId2);
    expect(status).toBeTruthy();
    await utils.selectChckboxInTable(employeeId1, addEmployeePage.tableContainer);
    await utils.selectChckboxInTable(employeeId2, addEmployeePage.tableContainer);
    await (await utils.getButtonElement(Constants.deleteSelected)).click();
    await (await utils.getButtonElement(Constants.delete)).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId1);
    expect(status).toBeFalsy();
    status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId2);
    expect(status).toBeFalsy();
    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})

test.only('Edit Employee Record', async () => {

    await loginpage.goToBaseURL();
    await loginpage.fillLoginDetails();
    await loginpage.clickOnLogin();
    await homepage.verifyLogin();
    await utils.clickOnMenuElement(Constants.Menu.pim);
    await utils.verifyMainTitle(Constants.Menu.pim);
    await utils.navigateToMenuSubMenu(Constants.Menu.addEmployee);
    await homepage.waitForSpinnerToDisappear();
    await utils.verifyPageTitleByPassingLocator(addEmployeePage.addEmployeeTitle, Constants.Menu.addEmployee);
    const employeeId = await addEmployeePage.fillEmployeeDetails();
    await (await utils.getButtonElement(Constants.save)).click();
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await utils.waitForSelector(addEmployeePage.tableContainer);
    await utils.verifyPageTitleByPassingLocator(employeeListPage.employeeInformationTitle, Constants.Menu.employeeInformation);
    let status = await utils.verifyRecordTable(addEmployeePage.tableContainer, addEmployeePage.tableIdlocator, employeeId);
    expect(status).toBeTruthy();
    await (await utils.generatePathForEditIcon(employeeId)).click();
    await utils.clickOnElement(utils.menuEle(Constants.Menu.job));
    await utils.verifyPageTitle(Constants.Titles.jobDetails);
    await homepage.waitForSpinnerToDisappear();
    await utils.selectDropdownValues(Constants.PimTextElements.jobTitle, Constants.DDValues.jobTitleDDValue);
    await (await utils.getButtonElement(Constants.save)).click();
    await homepage.waitForSpinnerToDisappear();
    await utils.navigateToMenuSubMenu(Constants.Menu.employeeList);
    await homepage.waitForSpinnerToDisappear();
    let boolValue = await utils.verifySpecificRowData(employeeId, Constants.DDValues.jobTitleDDValue);
    expect(boolValue).toBeTruthy();
    await homepage.clickOnLogout();
    await loginpage.verifyLogout();

})