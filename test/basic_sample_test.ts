import { Browser, Page } from 'playwright';
import {initialize} from "../utilities/init";
import {takeScreenshot} from "../utilities/screenshot";
import configs from "./config/local/config"

//Here we define the configs to be used.
//If there's a CI config in scope (From the test_runner.js) then user that otherwise resolve to the local config
let currentConfig: any;

currentConfig = configs.config;

declare var scopedConfig: any;
try {
    currentConfig = scopedConfig.config
}
catch(referenceError)
{

}

//Describe a test this contains no code and acts as a decorator and scope for the test and its hooks
describe('Sample', async function() {
    let browser: Browser
    let page: Page
    let failedTest : boolean

    //Run before the tests in the suite, this occurs once
    before(async () => {
        ({browser, page} = await initialize(currentConfig));
    })

    //Runs before every it
    beforeEach( async () => {
        //We want to check if the previous test failed if it did don't execute any more tests.
        //This is so we fail fast as opposed to slowly!
        if(failedTest)
        {
            throw new Error('Cannot run test as previous test failed')
        }
    })

    //A Test
    it('Sample', async function() {
        //NOTE: All Playwright API methods are Asynchronous. You must await all interactions with the await keyword.
        //NOTE: The Mocha Methods needs to be asynchronous as well
        await page.goto(currentConfig.endpoint)
    })

    afterEach( async() =>  {
        // @ts-ignore
        if (this.ctx.currentTest.state === 'failed') {
            failedTest = true
            await takeScreenshot("Failure", page, this.ctx);
        }
    })
})
