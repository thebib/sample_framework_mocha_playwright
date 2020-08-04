import {Browser, Page, Selectors} from 'playwright';
import {initialize} from "../../../utilities/init";
import {takeScreenshot} from "../../../utilities/screenshot";
import configs from "../../config/local/config"
import HomePage from "./pages/home_page"
import Womens from "./pages/womens_clothes";
import Map from "./pages/map"
import {Keyboard} from "playwright/types/types";

let currentConfig: any;

currentConfig = configs.config

declare var scopedConfig: any;
try {
    currentConfig = scopedConfig.config
}
catch(referenceError)
{

}

describe('Sample', async function() {
    let browser: Browser
    let page: Page
    let failedTest : boolean

    before(async () => {
        ({browser, page} = await initialize(currentConfig));
    })

    beforeEach( async () => {
        if(failedTest)
        {
            throw new Error('Cannot run test as previous test failed')
        }
    })

    it('Load Page', async function() {
        await page.goto(currentConfig.endpoint)
    })

    it('Click on Womens', async function() {
        //Equivalent of element.click() nice advantage here is that commands are sent to Playwright and not the selectors
        // (Note that elements do not have state
        await page.click(HomePage.Women)
    })

    it('Perform a search', async function() {
        //Equivalent of elem.sendKeys
        await page.fill(Womens.Search, "Faded")

        //You can manually use the Keyboard and Mouse if needed
        await page.keyboard.press('Enter')
    })

    it('Should show the search result', async function() {
        await page.waitForSelector(Womens.Match)
    })

    it('Should not show the search result for Blouse', async function() {
        //Most interactions support the passing of objects here we pass in a state object
        //This state object has a state of hidden which means it will wait for it to be NOT displayed on the page
        await page.waitForSelector(Womens.NotMatch, {
            state: "hidden"
        })
    })

    afterEach( async() =>  {
        // @ts-ignore
        if (this.ctx.currentTest.state === 'failed') {
            failedTest = true
            await takeScreenshot("Failure", page, this.ctx);
        }
    })
})
