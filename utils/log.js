import fs from "fs";

const logStream = fs.createWriteStream("activity.log", { flags: "a" });


const log = (message, isTimeLog = false, customLogStream = null) => {
    const stream = customLogStream || logStream

    console.log(message); // Log to console
    stream.write(`${message}\n`);

    if (isTimeLog) {
        console.timeLog("Total time elapsed");
    }
};


log.closeStream = () => {
    logStream.end();
};

export default log;