import { Page } from "@playwright/test";

export class EmployeeListPage{
    readonly page: Page;
    readonly employeeInformationTitle: string;

    constructor(page:Page){
        this.page = page;

        this.employeeInformationTitle = "//h5[normalize-space()='Employee Information']";
    }

}