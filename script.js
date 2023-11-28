import puppeteer from "puppeteer"

async function ExtensionStart() {
  const browser = await puppeteer.launch({headless:true,
  executablePath:""});
  const page = await browser.newPage();
  await page.goto("https://www.amazon.in/s?bbn=81107432031&rh=n%3A81107432031%2Cp_85%3A10440599031&_encoding=UTF8&content-id=amzn1.sym.0fbbbf4f-28a3-416c-9a01-83f0ac37db7a&pd_rd_r=071d86ca-c194-4279-876e-1b49e684359b&pd_rd_w=IvZd3&pd_rd_wg=rXX50&pf_rd_p=0fbbbf4f-28a3-416c-9a01-83f0ac37db7a&pf_rd_r=H7SVATVHJDMJ6RMQKFH8&ref=pd_gw_unk");
  await page.screenshot({path:"amazon.png"})
}

ExtensionStart();