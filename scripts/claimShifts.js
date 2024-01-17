import { By, until } from "selenium-webdriver";
import login from "./login.js"

const claimShifts = async () => {
    const driver = await login();

    try {
        const row = await driver.wait(until.elementLocated(By.css("#main-content > div.container.available-openshifts > div:nth-child(2)")));

        // Find all shift cards within the `row` html element
        const shiftCards = await row.findElements(By.css(".shift-card.col-3.pr-0"));

        // Iterate through each shift card
        for (const shiftCard of shiftCards) {
            const shiftInfo = await shiftCard.getText();
            console.log("Shift info:", shiftInfo)
        }

    } catch (error) {
        console.error("An error occured:", error);
    } finally {
        await driver.quit();
    }
};

export default claimShifts
