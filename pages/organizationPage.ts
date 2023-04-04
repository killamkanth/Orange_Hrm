import {expect ,  Page } from "@playwright/test";
import { HomePage } from "./homePage";

export class OrganizationPage{

    readonly page : Page;
    readonly homepage: HomePage;
    readonly generalInformationLocators: any;
    readonly locationsLocators:any;
    readonly editToggleIcon: any;
    readonly organizationStructureLocators: any;



    constructor(page :Page){
        this.page = page
        this.homepage = new HomePage(page);
        // this.generalInformationLocators={
        //     editToggleIcon :"//label[normalize-space()='Edit']/child::span",
            
        // }

        this.locationsLocators = {
            locationsTitle : "//h5[normalize-space()='Locations']",
            tablelocator : ".orangehrm-container",
            locationName : "//div[@class='oxd-table-card']//div[2]",
            errorMesg : "//span[text()='Already exists']",
        }
        this.organizationStructureLocators={
            addOrganizationUnitTitle : "//div[normalize-space()='Add Organization Unit']/p",
            editOrganizationUnitTitle :"//div[normalize-space()='Edit Organization Unit']/p",
            deleteOrganisationUnitIcon:"//li[@class='oxd-tree-node --last']//button[i[@class='oxd-icon bi-trash-fill']]",
            editOrganisationUnitIcon:"//li[@class='oxd-tree-node --last']//button[i[@class='oxd-icon bi-pencil-fill']]",
            errorMesg : "//span[text()='Organization unit name should be unique']",
            container : ".org-name"
        }
        this.editToggleIcon ="//label[normalize-space()='Edit']/child::span";

        



    }

    async clickAndVerifyToggleIcon(){
        const toggleButton = await this.page.locator(this.editToggleIcon);
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
        await this.homepage.waitForTimeout(3000);
        const locationArray = await this.page.locator(this.locationsLocators.locationName).allTextContents();
        console.log(locationArray , locationArray.length);
  
        console.log(locationArray.length);
  
        let boo = await locationArray.includes(locationName);
        return boo;
         
      }

      async verifyErrorMessage(){
        const mesg = await this.page.locator(this.locationsLocators.errorMesg).textContent();
        console.log('mesg is ' , mesg);
        expect (mesg).toBe('Already exists');
      }

        async verifyErrorMessage1(locator:string){
        const mesg = await this.page.locator(locator).textContent();
        console.log('mesg is ' , mesg);
        expect (mesg).toEqual("Organization unit name should be unique");
      }

      async clickOnEditToggleIcon(){
        await this.page.locator(this.editToggleIcon).click();
      }

      async fillDetails(){

      }

    async verifyOrganizationStructureTable(val :string){
        
        
        const arrayList =  await this.page.locator(".org-name").allTextContents();
        console.log(arrayList , arrayList.length);
        let boo;
        for(const name of arrayList){
           const actVal= name.trim();
           if(val == actVal){
            console.log('Act Value is' , actVal , 'Exp Value is ' , val );
            boo = true;
            break;
           }
           boo=false;
        }       
        return boo;
    }

    async getOrganizationStructureListCount(){
    //await this.homepage.waitForSpinnerToDisappear();
    const arrayList1 =  await this.page.locator(this.organizationStructureLocators.container).allTextContents();
    console.log(arrayList1 , arrayList1.length);
    let size = arrayList1.length;
    
    return size;
    }
      







}