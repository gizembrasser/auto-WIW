import { Builder, By, Key } from "selenium-webdriver";

const claimShifts = async (shiftMonth, shiftDay) => {
    const driver = new Builder().forBrowser("chrome").build();

    try {
        // Find the `span` and `div` elements by their CSS selectors
        const spanElement = await driver.findElement(By.css(".col-md-4.date.text-center span"));
        const divElement = await driver.findElement(By.css(".col-md-4.date.text-center div"));

        // Get the text content of the `span` and `div` elements
        const month = await spanElement.getText();
        const day = await divElement.getText();

        // Compare the values with the arguments
        return month === shiftMonth && day === shiftDay;

    } catch (error) {
        console.error("An error occured:", error);
    }
};