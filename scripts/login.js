import { Builder, By, Key, until } from "selenium-webdriver";
import "dotenv/config";
import { noSuchElementErrorHandler, timeoutErrorHandler } from "../errors/errorHandling.js";


const login = async () => {
    console.time("Login process completed in");

    const driver = new Builder().forBrowser("chrome").build();

    try {
        // Open the website
        await driver.get("https://login.wheniwork.com");

        // Find and click an input filed by name and send keys (simulate typing)
        console.log("Attempting to log in...");
        const emailInput = await driver.findElement(By.name("email"));
        await emailInput.sendKeys(process.env.EMAIL_ADDRESS, Key.ENTER);

        const passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys(process.env.PASSWORD, Key.ENTER);

        // Wait for login process to complete
        await driver.wait(until.titleIs("When I Work :: Schedule, Track, Communicate"), 5000);

        console.timeEnd("Login process completed in");

        return driver

    } catch (error) {
        noSuchElementErrorHandler(error);
        timeoutErrorHandler(error);

        console.error("An error occured during login:", error);

        await driver.quit();
        throw error; // Re-throw error to signal that login failed
    }
};

export default login