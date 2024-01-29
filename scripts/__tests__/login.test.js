import login from "../login.js";
import { describe, it, expect } from "@jest/globals";
import "dotenv/config";
import puppeteer from "puppeteer";

// Launch browser before tests
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();


describe("login function", () => {
    afterAll(async () => {
        // Clean up after all tests
        await browser.close();
    });

    it("should log in successfully", async () => {
        // Valid user credentials
        const credentials = {
            email: process.env.EMAIL_ADDRESS,
            password: process.env.PASSWORD
        }

        const result = await login(credentials, browser, page);

        // Assertions
        expect(result).toBeDefined();
        expect(result.browser).toBeDefined();
        expect(result.page).toBeDefined();
    });

    it("should throw an error for invalid credentials", async () => {
        // Invalid user credentials
        const credentials = {
            email: "invalid@example.com",
            password: "invalidpassword"
        }

        // Assertions
        await expect(login(credentials, browser, page)).rejects.toThrow();
    })
});