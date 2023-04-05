import { expect, Locator, Page } from "@playwright/test";
import { Utils } from "../commonUtils/utils";
import { LoginPage } from "./loginpage";

let utils:Utils;
let loginPage : LoginPage;
export class HomePage{
    readonly page : Page;
    readonly homePageLocators : any;
    readonly logOutmenuLocator : any;
    readonly usermanagementLocator : any;
    readonly toastMessage:any;
    readonly closeIcon: string;
    readonly saveBtn: string;
    readonly cancelBtn: string;
    readonly jobTitlePageLocators:any ;
    readonly buttonEle: (locator: any) => string;
    readonly textEle: (textElementName: any) => string;
    readonly spinner: string;
    
    


    constructor(page :Page){
        this.page = page
        utils = new Utils(page);
        loginPage = new LoginPage(page);
        this.homePageLocators={
            admin : "//span[text()='Admin']",
            adminHeader  : "//h6/parent::span",
            userManagement : "//span[normalize-space()='User Management']",
            usermenu    :"//a[text()='Users']",
            job :"//li[span[normalize-space()='Job']]",
            jobTitlesMenu :"//li[a[text()='Job Titles']]"
        }
        this.logOutmenuLocator = {
            logOutmenu : '.oxd-userdropdown',
            logOutBtn : "//a[contains(text(),'Logout')]",
        }
        this.usermanagementLocator={
            addBtn : "//button[normalize-space()='Add']",
            userroleFld : "(//div[@class='oxd-select-text oxd-select-text--active'])[1]",
            userroleDDvalue :"//div/span[text()='Admin']",
            employeeNameFld : "input[placeholder='Type for hints...']",
            employeeNameFldDDValue : "//div[span[text()='Saul G Goodman']]",
            statusElement:"(//div[@class='oxd-select-text oxd-select-text--active'])[2]",
            statusDDvalue : "//div[span[text()='Enabled']]",
            usernameTxtFld : "(//label[text()='Username']/following::input)[1]",
            passwordTxtFld : "//div[label[text()='Password']]/following-sibling::div/input",
            confirmPwdTxtFld : "//div[label[text()='Confirm Password']]/following-sibling::div/input",

            //searchsystem users
            searchUserNameTxtFld : "(//input[@class='oxd-input oxd-input--active'])[2]",
            searchBtn : "//button[text()=' Search ']",
            editIcon : "//div[@class='oxd-table-card']/div/div[6]//button[2]",
            deleteIcon : "//div[@class='oxd-table-card']/div/div[6]//button[1]",

            //EditUsers
            editUserHeader : "//h6[text()='Edit User']",

            //tableElement
            tableEleUsername :"//div[@class='oxd-table-card']/div/div[2]",
            noRecordfound : "//span[text()='No Records Found']/..",

            //PopUpElements-dialogbox
            deleteBtn : "//button[text()=' Yes, Delete ']",
        }
        this.jobTitlePageLocators={
            addBtn : "//div[button[normalize-space()='Add']]",
            cancelBtn : "//button[normalize-space()='Cancel']",
            saveBtn : "//button[normalize-space()='Save']" ,
            jobTitleHeader : "//h6[text()='Job Titles']",
            addTitleHeader :"//h6[text()='Add Job Title']",

            jobTitleTxtFld : "//div[label[text()='Job Title']]/following-sibling::div/input",
            jobDescTxtArea : "//div[label[text()='Job Description']]/following-sibling::div/textarea",

            jobTitleName :"//div[@class='oxd-table-card']//div[2]",
            tableRecordContainer : ".orangehrm-container",
            editJobTitleHeader : "//h6[text()='Edit Job Title']"
       
          }
        this.saveBtn = "//button[@type='submit' and text()=' Save ']",
        this.cancelBtn = "button.oxd-button--ghost",
        this.toastMessage = 'p.oxd-text--toast-message',
        this.closeIcon = '.oxd-toast-close-container',
        this.spinner = '.oxd-loading-spinner-container',
        this.buttonEle = (buttonName) => {
          return `//button[normalize-space()='${buttonName}']`;
      }
      this.textEle = (textElementName) => {
        return `//div[label[normalize-space()='${textElementName}']]//following-sibling::div/*`;
    }
    }

    async verifyLogin(){
        await expect (this.page.locator(this.homePageLocators.admin)).toHaveText("Admin");
    }

    async verifyAdmin(){
        await this.page.locator(this.homePageLocators.admin).click();
        await this.page.click(this.homePageLocators.admin);

        const ele =await this.page.locator(this.homePageLocators.adminHeader).textContent();
        console.log(ele);
        expect(ele).toContain('Admin');
    }

    async clickOnSearch(){
        await this.page.click(this.homePageLocators.userManagement);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.homePageLocators.usermenu);
    }

    async clickOnLogout(){
        await this.page.locator(this.logOutmenuLocator.logOutmenu).click();
        await this.page.click(this.logOutmenuLocator.logOutBtn);
        await this.waitForSelector(loginPage.loginLocators.loginBtn);
        

    }
    async addRecord(){
        let value ='';
        //const randomText = '';
        await this.page.locator(this.usermanagementLocator.addBtn).click();
        await this.page.locator(this.usermanagementLocator.userroleFld).click();
        await this.page.locator(this.usermanagementLocator.userroleDDvalue).click();

        await this.page.locator(this.usermanagementLocator.employeeNameFld).clear();
        await this.page.locator(this.usermanagementLocator.employeeNameFld).type("Saul G Goodman");
        await this.page.waitForTimeout(2000);
        //await this.page.waitForSelector(this.usermanagementLocator.employeeNameFldDDValue);
        await this.page.click(this.usermanagementLocator.employeeNameFldDDValue);

        await this.page.click(this.usermanagementLocator.statusElement);
        await this.page.click(this.usermanagementLocator.statusDDvalue);

        //const randomText =await this.generateRandomString(7);
        value =await this.generateRandomString(7);
       // console.log(randomText); 
       console.log(value); 

        await this.page.locator(this.usermanagementLocator.usernameTxtFld).clear();
        await this.page.locator(this.usermanagementLocator.usernameTxtFld).type(value);
        await this.page.locator(this.usermanagementLocator.passwordTxtFld).clear();
        await this.page.locator(this.usermanagementLocator.passwordTxtFld).type('Playwright@1');
        await this.page.locator(this.usermanagementLocator.confirmPwdTxtFld).clear();
        await this.page.locator(this.usermanagementLocator.confirmPwdTxtFld).type('Playwright@1');
        await this.page.waitForTimeout(5000);
        await (await this.page.waitForSelector(this.saveBtn)).waitForElementState('stable');
        await this.page.locator(this.saveBtn).click({force:true, delay:5000});
        await this.waitForTimeout(10000);
       
        await (await this.page.waitForSelector(".orangehrm-container")).waitForElementState('stable');
        console.log("clicked");
        let userNameArray = await this.page.locator("//div[@class='oxd-table-card']/div/div[2]").allTextContents();
        console.log(userNameArray);
        console.log("count",userNameArray.length);
        let boo = await userNameArray.includes(value);
       
        expect(boo).toBeTruthy();

        return value;
    }



    async generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
      
        return result;
      }

      async getRanNum(length: number) {
        const characters = '1234567890';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
      
        return result;
      }

    
      async generatePathForTableElement(text :string){
        //await this.page.locator('//div[div[text()="${text}"]]');
        await this.page.locator(`//div[div[text()="${text}"]]`)
      }


      async editRecord(uname : string) {
        
        await this.page.locator(this.usermanagementLocator.searchUserNameTxtFld).type(uname);
        await this.page.locator(this.usermanagementLocator.searchBtn).click({force:true,delay:5000});

        await (await this.page.waitForSelector(".orangehrm-container")).waitForElementState('stable');
        await this.page.waitForTimeout(10000);
        await this.page.locator(this.usermanagementLocator.editIcon).click({force:true,delay:5000});

        await (await this.page.waitForSelector(this.usermanagementLocator.editUserHeader)).waitForElementState('stable');
        await this.page.waitForTimeout(6000);

        const eleTxt = await this.page.locator(this.usermanagementLocator.editUserHeader).textContent();
        expect (eleTxt).toContain('Edit User');

        await this.page.locator(this.usermanagementLocator.usernameTxtFld).clear();
        const randomUname = await this.generateRandomString(7);

        await this.page.locator(this.usermanagementLocator.usernameTxtFld).type(randomUname);

        await this.page.waitForTimeout(5000);
        await (await this.page.waitForSelector(this.saveBtn)).waitForElementState('stable');
        await this.page.locator(this.saveBtn).click({force:true, delay:10000});
        await this.page.getByRole("button",{name : /^\s*Save\s*/i}).click({force:true , delay:3000});
       
        await this.page.waitForTimeout(10000);

        await (await this.page.waitForSelector(".orangehrm-container")).waitForElementState('stable');
        console.log("clicked");
        let userNameArray = await this.page.locator("//div[@class='oxd-table-card']/div/div[2]").allTextContents();
        console.log(userNameArray);
        console.log("count",userNameArray.length);
        let boo = await userNameArray.includes(randomUname);
       
        expect(boo).toBeTruthy();

        return randomUname;

      }

      async deleteRecord(uname : string){
        await this.page.locator(this.usermanagementLocator.searchUserNameTxtFld).type(uname);
        await this.page.locator(this.usermanagementLocator.searchBtn).click({force:true,delay:5000});

        await (await this.page.waitForSelector(".orangehrm-container")).waitForElementState('stable');
        await this.page.waitForTimeout(10000);

        await this.page.locator(this.usermanagementLocator.deleteIcon).click({force:true,delay:5000});

        await(await this.page.waitForSelector(this.usermanagementLocator.deleteBtn)).waitForElementState('stable');
        await this.page.locator(this.usermanagementLocator.deleteBtn).click();

        await (await this.page.waitForSelector(".orangehrm-container")).waitForElementState('stable');

        expect (await this.page.locator(this.usermanagementLocator.noRecordfound).textContent()).toContain('No Records Found');


      }

      async verifyJobTitle(){
        await this.page.locator(this.homePageLocators.job).click();
        await this.page.waitForTimeout(2000);
        await (await this.page.waitForSelector(this.homePageLocators.jobTitlesMenu)).waitForElementState('stable');
        await this.page.locator(this.homePageLocators.jobTitlesMenu).click();
        expect (await this.page.locator(this.jobTitlePageLocators.jobTitleHeader).textContent()).toContain('Job Titles');
      }

      async clickAndVerifyAddJobTitle(){
        await this.page.locator(this.jobTitlePageLocators.addBtn).click();
        await (await this.page.waitForSelector("//div[label[text()='Job Title']]/following-sibling::div/input")).waitForElementState('visible');
        expect (await this.page.locator(this.jobTitlePageLocators.addTitleHeader).textContent()).toBe('Add Job Title');

        console.log(this.getRanNum(2));
      }
      async fillAddJobTitleFields(jobTitle : string){

        let value = jobTitle + await this.getRanNum(2);
        await this.page.locator(this.jobTitlePageLocators.jobTitleTxtFld).type(value);

        await this.page.locator(this.jobTitlePageLocators.jobDescTxtArea).type('Min 4+ Experience required');

        await this.page.waitForTimeout(2500);
        await this.page.locator(this.jobTitlePageLocators.saveBtn).scrollIntoViewIfNeeded();
        await this.page.locator(this.jobTitlePageLocators.saveBtn).click({force:true,delay:3000});
        await this.page.waitForTimeout(6000);
        await this.page.waitForSelector('.loader', { state: 'hidden' });

        await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');
       // await this.page.waitForSelector('.loader', { state: 'hidden' });
        return value;
      }

      async verifyAddJobTitleTableRecord(jobName : string){
        //div[@class='oxd-table-card']//div[2]
        await this.page.waitForSelector('.loader', { state: 'hidden' });
        const jobTitleArray = await this.page.locator(this.jobTitlePageLocators.jobTitleName).allTextContents();
        console.log(jobTitleArray , jobTitleArray.length);

        console.log(jobTitleArray.length);

        let boo = await jobTitleArray.includes(jobName);
        expect (boo).toBeTruthy();
     
    }

    async generatePathForDeleteIcon(jobName:string) {
      let ele = await this.page.locator(`//div[div[text()='${jobName}']]/following-sibling::div//button[i[@class='oxd-icon bi-trash']]`)
      return ele;
    }

    async generatePathForEditIcon(jobName:string) {
      let ele = await this.page.locator(`//div[div[text()='${jobName}']]/following-sibling::div//button[i[@class='oxd-icon bi-pencil-fill']]`)
      return ele;
    }

    async deleteJobTitleRecord(jobName:string){

      await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');

      await (await this.generatePathForDeleteIcon(jobName)).click();
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.usermanagementLocator.deleteBtn).click();
      await this.page.waitForTimeout(3000);


    }

    async verifyJobTitleRecordTable(jobName:string){

      await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');

        const jobTitleArray = await this.page.locator(this.jobTitlePageLocators.jobTitleName).allTextContents();
        console.log(jobTitleArray , jobTitleArray.length);

        console.log(jobTitleArray.length);

        let boo = await jobTitleArray.includes(jobName);
        return boo;
        //expect (boo).toBeFalsy();
    }

    async clickOnEditJobTitleRecordIcon(jobName:string){
      await (await this.generatePathForEditIcon(jobName)).click();

      await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');

    }

    async verifyEditJobTitleHeader(){
      expect (await this.page.locator(this.jobTitlePageLocators.editJobTitleHeader).textContent()).toContain('Edit Job Title');

    }

    async editJobTitleFields(jobTitle : string){
      let value = jobTitle + await this.getRanNum(2);
      await this.page.locator(this.jobTitlePageLocators.jobTitleTxtFld).clear();

      await this.page.locator(this.jobTitlePageLocators.jobTitleTxtFld).type(value);

      await this.page.waitForTimeout(2500);
      await this.page.locator(this.jobTitlePageLocators.saveBtn).scrollIntoViewIfNeeded();
      await this.page.locator(this.jobTitlePageLocators.saveBtn).click({force:true,delay:3000});
      await this.page.waitForTimeout(6000);
      await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');

      return value;
    }

    async generatePathForCheckBoxElement(jobName:string) {
      let ele = await this.page.locator(`//div[div[text()='${jobName}']]/preceding-sibling::div//label`)
      return ele;
    }

    async selectChckboxInTable(jobValue :string){
      await this.page.waitForTimeout(3000);
      await (await this.page.waitForSelector(this.jobTitlePageLocators.tableRecordContainer)).waitForElementState('stable');
      await (await this.generatePathForCheckBoxElement(jobValue)).click();
      await this.page.waitForTimeout(1000);

    //   const table = await this.page.locator(".oxd-table-body");
    //  // row.locator(":scope", new )

    //  const rows:any = await this.page.locator(".oxd-table-card .oxd-table-row");
    //  console.log(await rows.count());
     
    //  console.log("rows",rows);
    //  for (const row of rows) {
    //   console.log(row , 'executed');
    //   const checkbox = await row.locator(".oxd-table-card-cell-checkbox input");
    //   //wait this.page.get("accountant")
    //   await checkbox.click();
      
    //}


    }
    async cilckOnDelete(){
      await this.page.locator("//button[text()=' Delete Selected ']").click();
      await (await this.page.waitForSelector(this.usermanagementLocator.deleteBtn)).waitForElementState('stable');
      await this.page.locator(this.usermanagementLocator.deleteBtn).click();
      await this.page.waitForTimeout(3000);
      //await this.page.waitForSelector('.loader', { state: 'hidden' });


    }

    async waitForTimeout(timeoutValue : number){
      await this.page.waitForTimeout(timeoutValue);
    }


    async navigateToMenuSubMenu(mainMenu:string,subMenu:string){

      await this.page.click(`//span[normalize-space()='${mainMenu}']`);
      await this.waitForTimeout(2000);
      await this.page.click(`//a[text()='${subMenu}']`);
  }


  async verifyPageTitle(titleValue:string){
    await this.waitForTimeout(2000);
    const title =  await this.page.locator(`//*[normalize-space()='${titleValue}']`).textContent();
    console.log('title is ' , title);
    await this.waitForTimeout(1500);
    let boo = expect (title).toEqual(titleValue);
    
    return boo;
  }

  async verifyPageTitleByPassingLocator(titleValue:string,locator :string){
    await this.waitForTimeout(2000);
    await this.waitForSelector(locator);
    const title =  await this.page.locator(locator).textContent();
    console.log('title is ' , title);
    await this.waitForTimeout(1500);
    let boo = expect(title).toEqual(titleValue);
    
    return boo;
  }

  async clickOnButton(buttonName : string){
    const btn = await this.page.locator(`//button[normalize-space()='${buttonName}']`)
    btn.click();
  }

  async getButtonElement(buttonName : string){
    await (await this.page.waitForSelector(this.buttonEle(buttonName))).waitForElementState('stable');
    const btn = this.page.locator(this.buttonEle(buttonName));
    console.log(buttonName);
    return btn;
  }

  

  async getTextElement(textElementName : string){
    await this.waitForSelector(this.textEle(textElementName));
    const textElement = this.page.locator(this.textEle(textElementName));
    return textElement;
  }

  async waitForSelector(locator:string){
    await (await this.page.waitForSelector(locator)).waitForElementState('stable');
    
  }

  async waitForSpinnerToDisappear() {
    await this.page.waitForLoadState("domcontentloaded");
    const spinner = await this.page.waitForSelector(this.spinner);
    await spinner.waitForElementState("hidden");
  }
    
    
}