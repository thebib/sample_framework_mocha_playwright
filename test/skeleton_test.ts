import { Browser, Page } from 'playwright';
import {initialize} from "../utilities/init";
import {takeScreenshot} from "../utilities/screenshot";
import configs from "./config/local/config"

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

    it('Sample', async function() {
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
