import claimShifts from "../claimShifts";
import login from "../login.js";
import "dotenv/config";
import puppeteer from "puppeteer";

// Launch browser before tests
let browser = await puppeteer.launch({ headless: "new" });
let page = await browser.newPage();

const credentials = {
    email: process.env.EMAIL_ADDRESS,
    password: process.env.PASSWORD
};

// Receive browser and page from login for test environment
const mySchedule = await login(credentials, browser, page);
browser = mySchedule.browser;
page = mySchedule.page;

const timeout = 20000;


describe("claimShifts function", () => {
    afterAll(async () => {
        // Clean up after all tests
        await browser.close();
    });

    it("should iterate through open shifts to find a matching one", async () => {
        const targetShifts = [
            { month: "Feb", day: "10", time: "14:15 - 19:35" },
            { month: "Feb", day: "11", time: "17:00 - 22:20" }
        ]

        const result = await claimShifts(targetShifts, browser, page);

        expect(result).toBeDefined();
    })
}, timeout);

