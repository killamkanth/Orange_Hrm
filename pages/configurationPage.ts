import { Page, expect } from "@playwright/test";
//import { utils } from "./utilsPage";
import { Utils } from "../commonUtils/utils";
import { homePage } from "./homePage";
import { organizationPage } from "./organizationPage";

export class configurationPage{

    readonly page : Page;
    readonly slider: (sliderValue: any) => string;
    readonly utils: Utils;
    readonly homepage: homePage;
    readonly organizationpage: organizationPage;
    readonly tableFieldNamelocator: string;
    readonly tablelocator: string;
    readonly errorMesg: string;
   
   
   


    constructor(page : Page){
        this.page =page;
        this.utils = new Utils(page);
        this.homepage = new homePage(page);
        this.organizationpage = new organizationPage(page);

        this.tableFieldNamelocator = "//div[@class='oxd-table-card']//div[2]";
        this.tablelocator =".orangehrm-container",
        this.errorMesg = "//span[text()='Already exists']",

        this.slider =(sliderValue)=>{
            return `//div[p[contains(normalize-space(),'${sliderValue}')]]//label`;
        }

    }

    async setSliderElement(sliderValue:string,checkedStatus:boolean){
      
        
            await this.page.locator(this.slider(sliderValue)).setChecked(checkedStatus);
            //await this.page.waitFor
            let bool= await this.page.locator(this.slider(sliderValue)).isChecked();
            return bool;

        // if(!(await this.page.locator(this.slider(sliderValue)).isChecked())){
        //     await this.page.locator(this.slider(sliderValue)).
        //     await this.page.waitForTimeout(1500);
        //     console.log('clicked');
        // }
    }

    async fillAddCustomFieldDetails(fieldName:string){
        (await this.utils.getTextElement('Field Name')).type(fieldName);
        await this.organizationpage.selectDropdownValues('Screen','Personal Details');
        await this.organizationpage.selectDropdownValues('Type','Text or Number');

        return fieldName;
    }

   
}