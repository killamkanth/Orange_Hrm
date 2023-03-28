import {expect ,  Page } from "@playwright/test";
import { homePage } from "./homePage";

export class organizationPage{

    readonly page : Page;
    readonly homepage: homePage;
    readonly generalInformationLocators: any;
    readonly locationsLocators:any;



    constructor(page :Page){
        this.page = page
        this.homepage = new homePage(page);
        this.generalInformationLocators={
            editToggleIcon :"//label[normalize-space()='Edit']/child::span",
            
        }

        this.locationsLocators = {
            locationsTitle : "//h5[normalize-space()='Locations']",
            tablelocator : ".orangehrm-container",
            locationName : "//div[@class='oxd-table-card']//div[2]",
            errorMesg : "Already exists",
        }

        



    }

    async clickAndVerifyToggleIcon(){
        const toggleButton = await this.page.locator(this.generalInformationLocators.editToggleIcon);
        //if((toggleButton).check)
      // let boo= await expect (toggleButton).;
      toggleButton.click();
       await this.page.waitForTimeout(2000);
       //expect (boo).toBeTruthy();
       const ele = this.homepage.getButtonElement('Save');
    //   const val =(await ele).textContent();
        (await ele).scrollIntoViewIfNeeded();
       let boo = (await ele).isVisible();
       expect (boo).toBeTruthy();
       
       
    }

    async fillGeneralInformationDetails(textValue:string){
        await (await this.homepage.getTextElement('Organization Name')).clear();
        let numValue = await this.homepage.getRanNum(2);
        let value = textValue + numValue;
        console.log(value);
        await (await this.homepage.getTextElement('Organization Name')).type(value);
        await (await this.homepage.getTextElement('Registration Number')).clear();
        let numValue1 = await this.homepage.getRanNum(6);
        await (await this.homepage.getTextElement('Registration Number')).type(numValue1);

        await (await this.homepage.getButtonElement('Save')).click();
        await this.homepage.waitForTimeout(3000);
        console.log('value is ' , value);
       
        return value;


    }

    async verifyGeneralInformationDetails(value :string){

        let orgaName = await (await this.homepage.getTextElement('Organization Name')).inputValue();;
        console.log('organisation name is ', orgaName);
        await expect (orgaName).toContain(value);

    }

    async verifyLocationPageTitle(){
        const pageTitlevalue = await this.page.locator(this.locationsLocators.locationsTitle).textContent();
        await expect (pageTitlevalue).toBe('Locations');
    }

    async selectDropdownValues(ddName : string, ddValue:string){
        await (await this.homepage.getTextElement(ddName)).click();
        await this.homepage.waitForTimeout(2000);
        await this.page.locator(`//div[span[normalize-space()='${ddValue}']]`).click();
        await this.homepage.waitForTimeout(2000);

    }
    async fillAddLocationDetails(locName :string){
        const value = locName+"_"+await this.homepage.getRanNum(3);
        console.log(value);
        await (await this.homepage.getTextElement('Name')).clear();
        await (await this.homepage.getTextElement('Name')).type(value);
        await (await this.homepage.getTextElement('City')).clear();
        await (await this.homepage.getTextElement('City')).type('Texas');
        await this.selectDropdownValues('Country','India');

        await this.homepage.clickOnButton('Save');
        await this.homepage.waitForTimeout(3000);

        await (await this.page.waitForSelector(this.locationsLocators.tablelocator)).waitForElementState('stable');

        return value;

    }

    
    async verifyRecordTable(locationName:string){

        await (await this.page.waitForSelector(this.locationsLocators.tablelocator)).waitForElementState('stable');
  
          const locationArray = await this.page.locator(this.locationsLocators.locationName).allTextContents();
          console.log(locationArray , locationArray.length);
  
          console.log(locationArray.length);
  
          let boo = await locationArray.includes(locationName);
          return boo;
         
      }

      async verifyErrorMessage(){
        const mesg = await this.page.locator(this.locationsLocators.errorMesg).textContent();
        expect (mesg).toBe('Already exists');
      }

      







}