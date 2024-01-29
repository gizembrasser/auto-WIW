import fs from "fs";

const logStream = fs.createWriteStream("activity.log", { flags: "w" });


const log = (message, isTimeLog = false, timerLabel = null, customLogStream = null) => {
    const stream = customLogStream || logStream

    console.log(message); // Log to console
    stream.write(`${message}\n`);

    if (isTimeLog) {
        if (timerLabel) {
            const elapsedTime = console.timeLog(timerLabel);
            stream.write(`${timerLabel}: ${elapsedTime}ms\n`);
        } else {
            console.time(message); // Start timer
        }
    }
};


log.closeStream = () => {
    logStream.end();
};

export default log;