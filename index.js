import login from "./scripts/login.js";
import claimShifts from "./scripts/claimShifts.js";
import getTargetShifts from "./utils/getTargetShifts.js";
import availabilityData from "./data/availability.json" assert { type: "json" };
import "dotenv/config";
import log from "./utils/log.js";

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const PASSWORD = process.env.PASSWORD;


async function main() {
    const targetShifts = getTargetShifts(availabilityData);
    let browser, page;

    try {
        // Log in to the account to redirect to /myschedule route
        const mySchedule = await login(EMAIL_ADDRESS, PASSWORD);
        browser = mySchedule.browser;
        page = mySchedule.page;

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






