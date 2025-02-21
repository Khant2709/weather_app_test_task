export const getDateAndTime = (dateTime: string): { date?: string; time?: string } => {
    const errorCase = {date: undefined, time: undefined};

    if (!dateTime.trim()) return errorCase;

    const dateTimeParts = dateTime.split(" ");
    if (dateTimeParts.length !== 2) return errorCase;

    const [date, time] = dateTimeParts;
    const dateParts = date.split("-");
    const timeParts = time.split(":");

    if (dateParts.length !== 3 || timeParts.length < 2) return errorCase;

    const [year, month, day] = dateParts;
    const [hours, minutes] = timeParts;

    if (!year || !month || !day || !hours || !minutes) return errorCase;

    return {
        date: `${day}.${month}`,
        time: `${hours}:${minutes}`,
    };
};
