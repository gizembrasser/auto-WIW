export const noSuchElementErrorHandler = (error) => {
    if (error.name === "NoSuchElementError") {
        console.error("No open shifts found.");
    }
};


export const timeoutErrorHandler = (error) => {
    if (error.name === "TimeoutError") {
        console.error("Incorrect username and/or password.");
    }
};


export const networkErrorHandler = (error) => {
    if (error.name === "NetworkError") {
        console.error("Experiencing network-related issues.");
    }
};