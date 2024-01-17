import { Builder, By, Key } from "selenium-webdriver";
import "dotenv/config";

const login = async () => {
    const driver = new Builder().forBrowser("chrome").build();

    try {
        // Open the website
        await driver.get("https://login.wheniwork.com");

        // Find and click an input filed by name and send keys (simulate typing)
        const emailInput = await driver.findElement(By.name("email"));
        await emailInput.sendKeys(process.env.EMAIL_ADDRESS, Key.ENTER);

        const passwordInput = await driver.findElement(By.name("password"));
        await passwordInput.sendKeys(process.env.PASSWORD, Key.ENTER);

    } catch (error) {
        console.error("An error occured:", error);
    }
};

export default login