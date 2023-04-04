import { Page, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

export class Utils {
  readonly page: Page;
  readonly leftPanelEle: (link: any) => string;
  readonly titleElement: (titleHeader: any) => string;
  readonly subPageTitleElement: (titleName: any) => string;
  readonly textEle: (textElementName: any) => string;
  readonly buttonEle: (buttonName: any) => string;
  readonly menuEle: (menuElement: any) => string;
  readonly slider: (sliderValue: any) => string;
  readonly tableElementValue: (elementValue: any) => string;

  constructor(page: Page) {
    this.page = page;
    this.leftPanelEle = (sideMenuName) => {
      return `//a[span[normalize-space()='${sideMenuName}']]`;

    }
    this.titleElement = (titleHeader) => {
      return `//h6[normalize-space()='${titleHeader}']`;
    }
    this.subPageTitleElement = (titleName) => {
      return `//*[normalize-space()='${titleName}']`;
    }
    this.textEle = (textElementName) => {
      return `//div[label[normalize-space()='${textElementName}']]//following-sibling::div/*`;
    }

    this.buttonEle = (buttonName) => {
      return `//button[normalize-space()='${buttonName}']`;
    }
    this.menuEle = (menuElement) => {
      return `//a[text()='${menuElement}']`;
    }

    this.slider = (sliderValue) => {
      return `//div[p[contains(normalize-space(),'${sliderValue}')]]//label`;
    }

    this.tableElementValue = (elementValue) =>{
      return `//div[div[text()='${elementValue}']]/../div`;
    }

  }

  async clickOnMenuElement(elementName: string) {
    //const titleValue = await this.page.locator(this.leftPanelEle(titleName)).textContent();
    //expect (titleValue).toBe(titleName);
    await this.page.locator(this.leftPanelEle(elementName)).click();

  }

  async verifyMainTitle(titleName: string) {
    const titleValue = await this.page.locator(this.titleElement(titleName)).textContent();
    expect(titleValue).toBe(titleName);

  }

  async verifyPageTitle(titleValue: string) {
    //await this.page.waitForTimeout(2000);
    await this.waitForSelector(this.subPageTitleElement(titleValue));
    const title = await this.page.locator(this.subPageTitleElement(titleValue)).textContent();
    console.log('title is ', title);
    //await this.page.waitForTimeout(1500);
    let boo = expect(title).toEqual(titleValue);

    return boo;
  }

  async waitForSelector(locator: string) {
    await this.page.waitForLoadState("domcontentloaded");
    await (await this.page.waitForSelector(locator)).waitForElementState('stable');

  }

  async getTextElement(textElementName: string) {
    await this.waitForSelector(this.textEle(textElementName));
    await this.page.waitForTimeout(1000);
    const textElement = this.page.locator(this.textEle(textElementName));
    return textElement;
  }

  async getButtonElement(buttonName: string) {
    await (await this.page.waitForSelector(this.buttonEle(buttonName))).waitForElementState('stable');
    const btn = this.page.locator(this.buttonEle(buttonName));
    console.log(buttonName);
    return btn;
  }

  async clickOnElement(locator: string) {
    await (await this.page.waitForSelector(locator)).waitForElementState('stable');
    await this.page.click(locator);
  }

  async verifyRecordTable(tablelocator: string, locator: string, value: string) {

    await (await this.page.waitForSelector(tablelocator)).waitForElementState('stable');
    await this.page.waitForTimeout(3000);
    const locationArray = await this.page.locator(locator).allTextContents();
    console.log(locationArray, locationArray.length);

    console.log(locationArray.length);

    let boo = locationArray.includes(value);
    return boo;

  }

  async verifyErrorMessage(locator: string, message: string) {
    const mesg = await this.page.locator(locator).textContent();
    console.log('mesg is ', mesg);
    expect(mesg).toEqual(message);
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

  async getCustomisedStringNumber(inputValue: string, length: number) {
    let value = inputValue + this.getRanNum(length);
    return value.toString();
  }

  async generatePathForDeleteIcon(tableRecValue: string) {
    let ele = await this.page.locator(`//div[div[text()='${tableRecValue}']]/following-sibling::div//button[i[@class='oxd-icon bi-trash']]`)
    return ele;
  }

  async generatePathForEditIcon(tableRecValue: string) {
    let ele = await this.page.locator(`//div[div[text()='${tableRecValue}']]/following-sibling::div//button[i[@class='oxd-icon bi-pencil-fill']]`)
    return ele;
  }

  async generatePathForCheckBoxElement(jobName: string) {
    let ele = await this.page.locator(`//div[div[text()='${jobName}']]/preceding-sibling::div//label`)
    return ele;
  }

  async selectChckboxInTable(inputvalue: string, locator: string) {
    //await this.page.waitForTimeout(3000);
    await (await this.page.waitForSelector(locator)).waitForElementState('stable');
    await (await this.generatePathForCheckBoxElement(inputvalue)).click();
    await this.page.waitForTimeout(1000);

  }

  async navigateToMenuSubMenu(menu: string) {
    await this.page.waitForTimeout(2000);
    await this.page.click(this.menuEle(menu));
  }

  async verifyPageTitleByPassingLocator(locator: string, titleValue: string) {
    await this.page.waitForTimeout(2000);
    const title = await this.page.locator(locator).textContent();
    console.log('title is ', title);
    await this.page.waitForTimeout(1500);
    let boo = expect(title).toEqual(titleValue);

    return boo;
  }

  async getSliderstatus(sliderValue: string, checkedStatus: boolean) {
    let bool = await this.page.locator(this.slider(sliderValue)).isChecked();
    console.log("bool", bool);
    if (bool) {
      console.log("Slider is already Checked");
    } else {
      await this.page.locator(this.slider(sliderValue)).setChecked(checkedStatus);
      console.log("Slider is now Checked");
      await this.waitForSelector(this.slider(sliderValue));
      bool = await this.page.locator(this.slider(sliderValue)).isChecked();
    }
    return bool;
  }

  async selectDropdownValues(ddName: string, ddValue: string) {
    await (await this.getTextElement(ddName)).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(`//div[span[normalize-space()='${ddValue}']]`).click();
    await this.page.waitForTimeout(2000);
  }
  async verifySpecificRowData(tableElementValue:string,elementValue: string){
    const rowDataArray =await this.page.locator(this.tableElementValue(tableElementValue)).allTextContents();
    console.log(rowDataArray,rowDataArray.length);
    let boo =rowDataArray.includes(elementValue);
    return boo;
  }

}
