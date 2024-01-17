import { By, until } from "selenium-webdriver";
import login from "./login.js"

const claimShifts = async () => {
    try {
        const driver = await login();

        const openShifts = await driver.wait(until.elementLocated(By.css("#main-content > div.container.available-openshifts > div:nth-child(2) > div:nth-child(2) > div > div > div.col-md-4.date.text-center")));
        const shiftDates = await openShifts.getText();

        console.log("Text:", shiftDates);
    } catch (error) {
        console.error("An error occured:", error);
    }
};

export default claimShifts
