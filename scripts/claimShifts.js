import puppeteer from "puppeteer";
import { noSuchElementErrorHandler } from "../errors/errorHandling.js";
import login from "./login.js";


const claimShifts = async (targetShifts) => {
    let browser, page;

    try {
        browser, page = await login();

        // Wait for the container of open shifts to be present
        await page.waitForSelector("#main-content > div.container.available-openshifts > div:nth-child(2)");

        // Find all shift cards within the container
        const shiftCards = await page.$$(".shift-card.col-3.pr-0");

        // Iterate through each target shift
        for (const targetShift of targetShifts) {
            // Check if any shift matches the current targetShift
            const shiftExists = await shiftCards.some(async (shift) => {
                // Find the necessary info from the current shift, convert to text
                const month = await shift.$eval(".col-md-4.date.text-center span", span => span.textContent.trim());
                const day = await shift.$eval('.col-md-4.date.text-center div', div => div.textContent.trim());
                const time = await shift.$eval('.row.no-gutters.align-items-center', row => row.textContent.trim());

                // Check if current shifts available matches the targetShift
                return month === targetShift.month && day === targetShift.day && time === targetShift.time;
            });

            // If a matching shift is found for any targetShift, return true
            if (shiftExists) {
                return true;
            }
        }

        // Otherwise return false
        return false;

    } catch (error) {
        noSuchElementErrorHandler(error);
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

export default claimShifts;
