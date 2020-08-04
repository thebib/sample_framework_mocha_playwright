import {chromium, webkit, firefox, Browser, Page, devices} from "playwright";

export async function initialize(config: any) {
    let browser : Browser;
    let page : Page;

    let browserName = config.browser
    let headless = config.headless
    let device;
    if(config.device) {
        device = devices[config.device]
    }

    if(browserName === 'chromium') {
        //These are necessary options to run in a pipeline on Ubuntu OS (Only applicable for Chrome)
        const deviceargs = ['--no-sandbox', '--disable-setuid-sandbox'];
        //Create a new browser
        browser = await chromium.launch({
            //Pass a JS object which contains runtime options
            //Headless means that it will not display the browser Window
            headless: headless,
            args: deviceargs,
        });
    }
    if(browserName === 'webkit') {
        browser = await webkit.launch({
            headless: headless
        });
    }
    if(browserName === 'firefox') {
        browser = await firefox.launch({
            headless: headless
        });
    }

    else {
        const deviceargs = ['--no-sandbox', '--disable-setuid-sandbox'];
        browser = await chromium.launch({
            headless: headless,
            args: deviceargs,
        });
    }

    var context = await browser.newContext({
        ...device
    });
    page = await context.newPage()
    return { browser, page }
}
