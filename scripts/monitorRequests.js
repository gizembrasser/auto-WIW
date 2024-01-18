import puppeteer from "puppeteer";

const monitorRequests = async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    // Listen for request event
    page.on("request", (request) => {
        const method = request.method();
        const url = request.url();

        if (method === "POST") {
            console.log(`POST request sent to: ${url}`);
        }

        request.continue();
    });

    await page.goto("https://login.wheniwork.com");

    await browser.close();
};

export default monitorRequests;



