import puppeteer, { BrowserContext } from "puppeteer";
import "dotenv/config";
import { noSuchElementErrorHandler, timeoutErrorHandler } from "../errors/errorHandling.js";


const login = async () => {
    console.time("Login process completed in");

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Open the website
        await page.goto("https://login.wheniwork.com");

        // Find and type into the input fields
        console.log("Attempting to log in...");
        await page.type("input[name='email']", process.env.EMAIL_ADDRESS);
        await page.keyboard.press("Enter");

        await page.type("input[name='password']", process.env.PASSWORD);
        await page.keyboard.press("Enter");

        // Wait for login process to complete
        await page.waitForNavigation({
            waitUntil: "domcontentloaded",
            timeout: 10000,
        });

        console.timeEnd("Login process completed in");

        return { browser: browser, page: page };

    } catch (error) {
        noSuchElementErrorHandler(error);
        timeoutErrorHandler(error);

        console.error("An error occured during login:", error);

        await browser.close();
        throw error; // Re-throw error to signal that login failed
    }
};

export default login;