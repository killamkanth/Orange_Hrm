import { Page, expect } from "@playwright/test";
import { Utils } from "../commonUtils/utils";
import Constants from "../commonUtils/constants.json"

let utils: Utils;

export class AddEmployeePage {
    readonly page: Page;
    readonly addEmployeeTitle: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly enabledRadioBtn: string;
    readonly disabledRadioBtn: string;
    readonly container: string;
    readonly tableIdlocator: string;
    readonly tableContainer: string;
    readonly errorMessage: string;

    constructor(page: Page) {
        this.page = page;
        utils = new Utils(page);
        this.addEmployeeTitle = "//h6[normalize-space()='Add Employee']";
        this.firstName = "//input[@placeholder='First Name']";
        this.lastName = "//input[@placeholder='Last Name']";
        this.enabledRadioBtn = "//label[text()='Enabled']/span";
        this.disabledRadioBtn = "//label[text()='Disabled']/span";
        this.tableContainer =".orangehrm-container";
        this.tableIdlocator = "//div[@class='oxd-table-card']//div[2]";
        this.errorMessage ="//div[input[@placeholder='First Name']]/following-sibling::span"

    }
    // 
    // This method is used to fill the employee details
    //  

    async fillEmployeeDetails() {
        const employeeId = await utils.getRanNum(4);
        await this.page.locator(this.firstName).type(Constants.PimData.firstName);
        await this.page.locator(this.lastName).type(Constants.PimData.lastName);
        (await utils.getTextElement(Constants.PimTextElements.employeeId)).clear();
        (await utils.getTextElement(Constants.PimTextElements.employeeId)).type(employeeId);
        let status = await utils.getSliderstatus(Constants.Slider.createLoginDetails, true);
        expect (status).toBeTruthy();
        const value = Constants.Credentials.userName + await utils.getRanNum(3);
        await (await utils.getTextElement(Constants.PimTextElements.userName)).type(value);
        await (await utils.getTextElement(Constants.PimTextElements.password)).type(Constants.Credentials.password);
        await (await utils.getTextElement(Constants.PimTextElements.confirmPassword)).type(Constants.Credentials.confirmPassword);

        let boolStatus = await this.page.locator(this.disabledRadioBtn).isChecked();
        if (boolStatus) {
            console.log("Buttton is already clicked");
        } else {
            await this.page.locator(this.disabledRadioBtn).click();
            console.log("Radio button is now clicked");
        }

        return employeeId;

    }
}