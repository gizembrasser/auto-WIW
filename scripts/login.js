import log from "../utils/log.js";


const login = async (credentials, browser, page) => {
    console.time("Total time elapsed");

    try {
        // Open the website
        await page.goto("https://login.wheniwork.com");

        // Find and type into the input fields
        log("Attempting to log in...");
        await page.type("input[name='email']", credentials.email);
        await page.keyboard.press("Enter");

        await page.type("input[name='password']", credentials.password);
        await page.keyboard.press("Enter");

        // Wait for login process to complete
        await page.waitForNavigation({
            waitUntil: "domcontentloaded",
            timeout: 10000,
        });

        log("Login process completed!");
        console.timeEnd("Total time elapsed");

        return { browser: browser, page: page };

    } catch (error) {
        await browser.close();
        throw error; // Throw error to signal that login failed
    }
};

export default login;