import { expect, Page } from "@playwright/test";

export class LoginPage{

    readonly page : Page;
    readonly loginLocators: any;
    readonly homePageLocators : any;

    constructor(page : Page){
        this.page =page;
        this.loginLocators={
            username : 'Username',
            password : 'Password',
            loginBtn : "button[type='submit']",

        }

        this.homePageLocators ={
            admin : "//span[text()='Admin']"
        }
           
        }

        async goToBaseURL(){
            await this.page.goto("/");
        }

        async fillLoginDetails(){
            await this.page.getByPlaceholder(this.loginLocators.username).fill("Admin");
            await this.page.getByPlaceholder(this.loginLocators.password).fill("admin123");

        }

        async clickOnLogin(){
            await this.page.locator(this.loginLocators.loginBtn).click();
        }

        async verifyLogin(){
            await expect (this.page.locator(this.homePageLocators.admin)).toHaveText("Admin");
        }

        async verifyLogout(){
            const url = await this.page.url();
            console.log(url);
            expect (url).toContain('login');
        }
        
    }
