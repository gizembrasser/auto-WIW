import log from "../utils/log.js"


const claimShifts = async (targetShifts, browser, page) => {
    let matchingShifts = [];
    let timeout = 300000; // 5 minutes timeout

    try {
        log("Searching for matching open shifts...")
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
                    const button = await shift.$("button[type='button']");

                    const openShift = { month: month, day: day, time: time };

                    // Check if current shift available matches the targetShift
                    if (areShiftsMatching(targetShift, openShift) && !isShiftClaimed(openShift, matchingShifts)) {
                        await button.evaluate(node => node.click());
                        // Wait for pop-up to appear and click it
                        const popup = await page.waitForSelector(".dialog-footer.justify-content-end");
                        const sumbit = await popup.$("button[type='submit']");
                        // await sumbit.click();

                        log("Shift claimed:", openShift);
                        matchingShifts.push(openShift);
                        return openShift;
                    }
                    return null;
                }));
            };

            if (matchingShifts.length === targetShifts.length) {
                // All targetShifts have matching shifts, break out of the loop
                break;
            }

            // No matches found for current targetShift, refresh the page
            await page.reload({ waitUntil: "domcontentloaded" });
            timeout -= 2000; // Subtract two seconds from the timeout
            log("Refreshing page...")
        };

        // Check if the timer has run out
        if (timeout <= 0) {
            log("Unable to locate more shifts. Visit https://appx.wheniwork.com/myschedule to manually claim.")
        }
        return matchingShifts;

    } catch (error) {
        await browser.close();
        throw error;
    }
};

export default claimShifts;


const areShiftsMatching = (targetShift, openShift) => {
    Object.entries(targetShift).every(([key, value]) => openShift[key] === value);
};

const isShiftClaimed = (openShift, matchingShifts) => {
    matchingShifts.some(claimed => areShiftsMatching(claimed, openShift));
};
