import {Page} from "playwright";
import fs from 'fs'
import path from 'path'
import Context = Mocha.Context;

//Capture a screenshot and save it to a report (If there is one active)
export async function takeScreenshot(name: String, page: Page, context: Context) {
    setupDirectories();
    let currentDate = getDateString();
    let rootdir = './report'
    let screenshotdir = `/screenshots/`
    let path = rootdir + screenshotdir + name + currentDate + `.png`;

    await page.screenshot({ path: path });

    let reportscreenshotPath = `./` + screenshotdir + name + currentDate + `.png`
    const addContext = require('mochawesome/addContext');
    await addContext(context, reportscreenshotPath)
}

function setupDirectories() {
    //If the report directories don't exist create them.
    var dir = path.join(__dirname + '/..', 'report')
    var ssdir = path.join(__dirname + '/..', 'report', 'screenshots')

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(ssdir)) {
        fs.mkdirSync(ssdir);
    }
}

//This is used to give a screenshot a unique tag
function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day =`${date.getDate()}`.padStart(2, '0');
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return `${year}${month}${day}${hour}${minutes}${seconds}${milliseconds}`
}

