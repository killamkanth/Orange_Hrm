import { Page } from "@playwright/test";
import { Utils } from "../commonUtils/utils";
import { organizationPage } from "./organizationPage";

export class reportsPage{

    readonly page : Page;
    readonly reportspage: reportsPage;
    readonly employeeReportsTitle: string;
    readonly plusBtn: string;
    readonly utils: Utils;
    readonly organizationpage: organizationPage;
    readonly reportTable: string;
    readonly reportTitle: (titleName: any) => string;
    readonly tableFieldNamelocator: string;
    readonly tablelocator: string;


    constructor(page : Page){
        this.page =page;
        this.utils=new Utils(page);
        this.organizationpage = new organizationPage(page);


        this.employeeReportsTitle ="//h5[normalize-space()='Employee Reports']";
        this.plusBtn ="(//button[@class='oxd-icon-button orangehrm-report-icon'])[2]/i";
        this.reportTable="(//div[@class='main-viewport']//div)[1]";
        this.reportTitle= (titleName) => {
            return `//h6[normalize-space()='${titleName}']`;
            
       }

        this.tableFieldNamelocator = "//div[@class='oxd-table-card']//div[2]";
        this.tablelocator =".orangehrm-container";

    }


    async fillAddReportFields(reportName : string){
        const name = reportName+"_"+await this.utils.getRanNum(3);
        (await this.utils.getTextElement('Report Name')).type(name);
        await this.organizationpage.selectDropdownValues('Select Display Field Group','Personal');
        await this.utils.clickOnElement(this.plusBtn);
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('load');

        return name;

    }

}