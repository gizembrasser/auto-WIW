const getShiftTimes = (shiftName) => {
    const shiftTimes = {
        md1: "7:30 - 10:05",
        md2: "10:15 - 12:50",
        s1: "14:15 - 16:50",
        s2: "17:00 - 19:35",
        s3: "19:45 - 22:20",
    };

    const shiftTime = shiftTimes[shiftName];

    if (shiftTime) {
        return { time: shiftTime };
    } else {
        console.log("Provide a valid shift name (md1, md2, s1, s2, s3)");
    }
};

export default getShiftTimes;