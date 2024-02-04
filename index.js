import login from "./scripts/login.js";
import claimShifts from "./scripts/claimShifts.js";
import getTargetShifts from "./utils/getTargetShifts.js";
import availabilityData from "./data/availability.json" assert { type: "json" };
import log from "./utils/log.js";
import "dotenv/config";
import { noSuchElementErrorHandler, networkErrorHandler, timeoutErrorHandler } from "./errors/errorHandling.js";
import puppeteer from "puppeteer";

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const PASSWORD = process.env.PASSWORD;

async function main() {
    const targetShifts = getTargetShifts(availabilityData);
    const credentials = { email: EMAIL_ADDRESS, password: PASSWORD };
    // Open browser
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    try {
        // Go to login page, login and redirect to /myschedule route
        const mySchedule = await login(credentials, browser, page);
        browser = mySchedule.browser;
        page = mySchedule.page;

        // Use redirected page to claim shifts
        await claimShifts(targetShifts, browser, page);

    } catch (error) {
        noSuchElementErrorHandler(error);
        networkErrorHandler(error);
        timeoutErrorHandler(error);

        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close()
            log.closeStream();
        }
    }
};

main();






