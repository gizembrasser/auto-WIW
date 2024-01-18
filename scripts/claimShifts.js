import { By, until } from "selenium-webdriver";
import { noSuchElementErrorHandler } from "../errors/errorHandling.js";
import login from "./login.js";

const claimShifts = async (targetShifts) => {
    let driver;

    try {
        // Attempt to login
        driver = await login();

        // Wait for the `row` html element, containing open shifts, to be present
        const openShifts = await driver.wait(until.elementLocated(By.css("#main-content > div.container.available-openshifts > div:nth-child(2)")));

        // Find all shift cards within the `row` html element
        const shiftCards = await openShifts.findElements(By.css(".shift-card.col-3.pr-0"));

        // Iterate through each shift card
        for (const targetShift of targetShifts) {
            // Check if any shift matches the current targetShift
            const shiftExists = shiftCards.some(async (shift) => {
                // Find the necessary info from the current shift, convert to text
                const dateElement = await shift.findElement(By.css(".col-md-4.date.text-center"));
                const month = await date.findElement(By.css("span")).getText();
                const day = await date.findElement(By.css("div")).getText();
                const time = await shift.findElement(By.css(".row.no-gutters.align-items-center")).getText();

                // Check if current shifts available matches the targetShift
                return month == targetShift.month && day === targetShift.day && time === targetShift.time;
            });

            // If a matching shift is found for any targetShift, return true
            if (shiftExists) {
                return true;
            }
        }

        // If no matching shift is found for any targetShift, return false
        return false;

    } catch (error) {
        noSuchElementErrorHandler(error);

        console.error("An error occured:", error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
};

export default claimShifts;
