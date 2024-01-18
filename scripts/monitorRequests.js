import login from "./login.js";


const monitorRequests = async () => {
    let driver;

    try {
        driver = await login();

        await driver.executeScript(() => {
            // Override the fetch function to log POST requests
            const originalFetch = window.fetch;

            window.fetch = function (url, options) {
                const method = options && options.method ? options.method.toUpperCase() : 'GET';

                if (method === 'POST') {
                    console.log('POST request sent to:', url);
                }

                // Call the original fetch function
                return originalFetch.apply(this, arguments);
            };

            console.log('POST request interceptor is active. Ready to log POST requests.');
        });

    } catch (error) {
        console.error("An error occured:", error);
    }
};

export default monitorRequests;


