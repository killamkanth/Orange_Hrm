import { Page } from "@playwright/test";
import { Utils } from "../commonUtils/utils";
import { HomePage } from "./homePage";
import { OrganizationPage } from "./organizationPage";

export class ConfigurationPage{

    readonly page : Page;
    readonly slider: (sliderValue: any) => string;
    readonly utils: Utils;
    readonly homepage: HomePage;
    readonly organizationpage: OrganizationPage;
    readonly tableFieldNamelocator: string;
    readonly tablelocator: string;
    readonly errorMesg: string;
   

    constructor(page : Page){
        this.page =page;
        this.utils = new Utils(page);
        this.homepage = new HomePage(page);
        this.organizationpage = new OrganizationPage(page);
        this.tableFieldNamelocator = "//div[@class='oxd-table-card']//div[2]";
        this.tablelocator =".orangehrm-container",
        this.errorMesg = "//span[text()='Already exists']",
        this.slider =(sliderValue)=>{
            return `//div[p[contains(normalize-space(),'${sliderValue}')]]//label`;
        }

    }

    async setSliderElement(sliderValue:string,checkedStatus:boolean){

            await this.page.locator(this.slider(sliderValue)).setChecked(checkedStatus);
            let bool= await this.page.locator(this.slider(sliderValue)).isChecked();
            return bool;
    }

    async fillAddCustomFieldDetails(fieldName:string){
        (await this.utils.getTextElement('Field Name')).type(fieldName);
        await this.organizationpage.selectDropdownValues('Screen','Personal Details');
        await this.organizationpage.selectDropdownValues('Type','Text or Number');

        return fieldName;
    }

   
}