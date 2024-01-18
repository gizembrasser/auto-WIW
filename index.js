import claimShifts from "./scripts/claimShifts.js"

const testShifts = [
    { month: "JAN", day: "18", time: "17:00 - 19:35" },
    { month: "FEB", day: "14", time: "14:15 - 22:20" }
];

const claimed = await claimShifts(testShifts);
console.log(claimed);

