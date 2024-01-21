import { noSuchElementErrorHandler, networkErrorHandler } from "../errors/errorHandling.js";
import login from "./login.js";


const claimShifts = async (targetShifts) => {
    const { browser, page } = await login();

    let matchingShifts = [];
    let timeout = 300000; // 5 minutes timeout

    try {
        console.log("Searching for matching open shifts...")
        while (timeout > 0) {
            // Wait for the container of open shifts to be present
            await page.waitForSelector("#main-content > div.container.available-openshifts > div:nth-child(2)");

            // Find all shift cards within the container
            const shiftCards = await page.$$(".shift-card.col-3.pr-0");

            // Iterate through each target shift
            for (const targetShift of targetShifts) {
                // Check if any shift matches the current targetShift and is not already claimed
                await Promise.all(shiftCards.map(async (shift) => {
                    // Find the necessary info from the current shift, convert to text
                    const month = await shift.$eval(".col-md-4.date.text-center span", span => span.textContent.trim());
                    const day = await shift.$eval('.col-md-4.date.text-center div', div => div.textContent.trim());
                    const time = await shift.$eval('.row.no-gutters.align-items-center', row => row.textContent.trim());
                    const button = await shift.$("button[type='button'].btn.btn-primary.btn-sm");

                    const openShift = { month: month, day: day, time: time };

                    // Check if current shift available matches the targetShift
                    if (Object.entries(targetShift).every(([key, value]) => openShift[key] === value)
                        &&
                        !matchingShifts.some(claimed => claimed.month === month && claimed.day === day && claimed.time === time)) {
                        // await button.click();

                        console.log("Shift claimed:", openShift);
                        matchingShifts.push(openShift);
                        return openShift;
                    }

                    return null;
                }));
            }

            if (matchingShifts.length === targetShifts.length) {
                // All targetshifts have matching shifts, break out of the loop
                break;
            }

            // No matches found for current targetShift, refresh the page
            await page.reload({ waitUntil: "domcontentloaded" });
            timeout -= 2000; // Subtract two seconds from the timeout
            console.log("Refreshing page...")
        };

        // Check if the timeout has run out
        if (timeout <= 0) {
            console.log("5 minute timer ran out. Visit https://appx.wheniwork.com/myschedule to maunally claim shifts.")
        }

        return matchingShifts;

    } catch (error) {
        noSuchElementErrorHandler(error);
        networkErrorHandler(error);
        console.error('An error occurred:', error);

        await browser.close();
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

export default claimShifts;
