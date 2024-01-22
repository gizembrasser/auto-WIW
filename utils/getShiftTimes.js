export const getShiftTimes = (shiftName) => {
    const shiftTimes = {
        m1: "7:30 - 10:05",
        m2: "10:15 - 12:50",
        m1m2: "7:30 - 12:50",
        s1: "14:15 - 16:50",
        s2: "17:00 - 19:35",
        s1s2: "14:15 - 19:35",
        s3: "19:45 - 22:20",
        s2s3: "17:00 - 22:20",
        s1s2s3: "14:15 - 22:20"
    };

    const shiftTime = shiftTimes[shiftName];

    if (shiftTime) {
        return { time: shiftTime };
    } else {
        console.log("Provide a valid shift name (m1, m2, s1, s2, s3)");
    }
};


export const getShiftTimesWeekend = (shiftName) => {
    const shiftTimes = {
        m1: "8:00 - 10:40",
        m2: "10:40 - 13:20",
        m1m2: "8:00 - 13:20",
        s1: "14:15 - 16:50",
        s2: "17:00 - 19:35",
        s1s2: "14:15 - 19:35",
        s3: "19:45 - 22:20",
        s2s3: "17:00 - 22:20",
        s1s2s3: "14:15 - 22:20"
    };

    const shiftTime = shiftTimes[shiftName];

    if (shiftTime) {
        return { time: shiftTime };
    } else {
        console.log("Provide a valid shift name (m1, m2, s1, s2, s3)");
    }
};