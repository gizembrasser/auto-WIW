const getNextShiftDates = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const today = new Date();

    // Calculate the date for start of the week that open shifts will be available for
    const openShiftsWeek = new Date(today);
    openShiftsWeek.setDate(today.getDate() + (15 - today.getDay()));

    // Calculate the date for the specified day in the same week as openShiftsWeek
    const shiftDayIndex = daysOfWeek.indexOf(day);

    if (shiftDayIndex === -1) {
        console.log("Please provide a valid day.");
    } else {
        const shiftDay = new Date(openShiftsWeek);
        shiftDay.setDate(openShiftsWeek.getDate() + (shiftDayIndex + 7 - openShiftsWeek.getDay()) % 7);

        const shift = {
            month: months[shiftDay.getMonth()],
            day: shiftDay.getDate().toString().padStart(2, "0")
        };

        return shift
    }
};

console.log(getNextShiftDates("Mo"));

export default getNextShiftDates;