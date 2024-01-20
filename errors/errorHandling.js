export const noSuchElementErrorHandler = (error) => {
    if (error.name === "NoSuchElementError") {
        console.error("No openshifts found.");
    } else {
        throw error; // Re-throw if it's not the expected error
    }
};


export const timeoutErrorHandler = (error) => {
    if (error.name === "TimeoutError") {
        console.error("Incorrect username and/or password.");
    } else {
        throw error;
    }
};