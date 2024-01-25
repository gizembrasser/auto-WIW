import getNextShiftDates from "./getNextShiftDates.js";
import { getShiftTimes, getShiftTimesWeekend } from "./getShiftTimes.js";
import availabilityData from "../data/availability.json" assert { type: "json" };


const getTargetShifts = () => {
    const { availability } = availabilityData;
    const days = [];
    const times = [];

    // Extract the weekdays and times I want to work
    for (const shifts of availability) {
        days.push(shifts.day);
        times.push(shifts.time);
    }

    // Get the date for each weekday, and convert shiftNames to correct times
    const shiftDates = getNextShiftDates(days);
    const shiftTimes = [];

    // If it's saturday or sunday, get the shift times for weekends
    for (const [i, day] of days.entries()) {
        if (day === "Saturday" || day === "Sunday") {
            shiftTimes.push(getShiftTimesWeekend(times[i]));
        } else {
            shiftTimes.push(getShiftTimes(times[i]));
        }
    }

    // Put the dates and times into one object so that they match shiftcards on WIW website
    const targetShifts = shiftDates.map((date, index) => {
        return { ...date, ...shiftTimes[index] };
    });

    return targetShifts;
};

getTargetShifts();
