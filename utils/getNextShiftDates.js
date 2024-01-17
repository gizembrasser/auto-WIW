const getNextShiftDates = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // Get the current date
    const today = new Date();

    // Calculate the number of days until the next week
    const daysUntilNextWeek = (1 - today.getDay() + 7) % 7;

    // Calculate the date for monday of next week
    const nextWeekDate = new Date(today);
    nextWeekDate.setDate(today.getDate() + daysUntilNextWeek);

    // Calculate the date for start of the week that open shifts will be available for
    const openShiftsWeek = new Date(nextWeekDate);
    openShiftsWeek.setDate(nextWeekDate.getDate() + 7);

    // Calculate the date for the specified day in the same week as openShiftsWeek
    const shiftDayIndex = daysOfWeek.indexOf(day);
    const shiftDay = new Date(openShiftsWeek);
    const daysUntilShiftDay = (shiftDayIndex - openShiftsWeek.getDay() + 7) % 7;
    shiftDay.setDate(openShiftsWeek.getDate() + daysUntilShiftDay);

    const shift = {
        month: months[shiftDay.getMonth()],
        day: shiftDay.getDate().toString().padStart(2, "0")
    };

    return shift
};

export default getNextShiftDates;