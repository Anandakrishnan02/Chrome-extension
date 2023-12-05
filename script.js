import puppeteer from "puppeteer";
import xlsx from "xlsx";

function readExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  return jsonData;
}

async function RpaAutomate() {
  const jsonDataFromXlsx = readExcelFile("./challenge.xlsx");
  const browser = await puppeteer.launch({ headless:false });
  const page = await browser.newPage();

  await page.goto('https://rpachallenge.com/');
  await page.waitForSelector('.btn-large');
  await page.click('.btn-large');


  for (let i = 0; i < 10; i++) {
    const currentData = jsonDataFromXlsx[i]; 
    // await page.waitForTimeout(3000);

    await page.type('input[ng-reflect-name="labelFirstName"]', currentData['First Name'], { delay: 30 });
    await page.type('input[ng-reflect-name="labelLastName"]', currentData['Last Name '], { delay: 30 });
    await page.type('input[ng-reflect-name="labelCompanyName"]', currentData['Company Name'], { delay: 30 });
    await page.type('input[ng-reflect-name="labelRole"]', currentData['Role in Company'], { delay: 30 });
    await page.type('input[ng-reflect-name="labelAddress"]', currentData['Address'], { delay: 30 });
    await page.type('input[ng-reflect-name="labelEmail"]', currentData['Email'], { delay: 30 });
    await page.type('input[ng-reflect-name="labelPhone"]', currentData['Phone Number'].toString(), { delay: 30 });

    await page.click('input[type="submit"]'); 

    await page.waitForTimeout(1000);
  }

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
}

RpaAutomate();

async function ExtensionStart() {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.goto('https://rpachallenge.com/');
  //tagname[contains(@attribute,'value')]
  await page.$x("//input[contains(ng-reflect-name,'labelRole')]", el => el.value = 'Adenosine triphosphate')[0]
  const b = (await page.$x("//*[text()='Library']"))[0]
  await page.screenshot({path:"screenshot2.png"})
  
}

ExtensionStart();
