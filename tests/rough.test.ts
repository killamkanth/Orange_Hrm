import test from "@playwright/test";

test('',async({page})=>{

    async function generateRandomNumber(length: number) {
        const characters = '1234567890';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
      
        return result;
      }

     const num =  await generateRandomNumber(2);
     console.log(num)
       
     async function getRanNum(length: number) {
        const randomNumber = Math.floor(Math.random() * 100); // generates a random number between 0 and 99
        //const myString = "Random Number:";
        const concatenatedString =  randomNumber.toString();
        console.log(concatenatedString); // "Random Number: 42" (or any other random number between 0 and 99)

     }

    //  async function multiselectcheckbox(){
    //   const table = await page.locator('#myTable');
    //   const rows = await table.$$('tbody tr');
    //   for (const row of rows) {
    //   const checkbox = await row.$('input[type="checkbox"]');
    //   await checkbox.click();
    //     }
    //  }
     
    
    // generateRandomNumber1(length: number) {
    //     const characters = '1234567890';
    //     let result = '';
      
    //     for (let i = 0; i < length; i++) {
    //       const randomIndex = Math.floor(Math.random() * characters.length);
    //       result += characters[randomIndex];
    //     }
      
    //     return result;
    //   }

})
