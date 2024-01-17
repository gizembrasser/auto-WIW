import { By, until } from "selenium-webdriver";
import login from "./login.js"

const claimShifts = async () => {
    const driver = await login();

    try {
        // Wait for the `row` html element, containing open shifts, to be present
        const openShifts = await driver.wait(until.elementLocated(By.css("#main-content > div.container.available-openshifts > div:nth-child(2)")));

        // Find all shift cards within the `row` html element
        const shiftCards = await openShifts.findElements(By.css(".shift-card.col-3.pr-0"));

        // Iterate through each shift card
        for (const shift of shiftCards) {
            const shiftInfo = await shift.getText();
            console.log("Shift info:", shiftInfo)
        }

    } catch (error) {
        console.error("An error occured:", error);
    } finally {
        await driver.quit();
    }
};

export default claimShifts
