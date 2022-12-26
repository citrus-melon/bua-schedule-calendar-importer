import type { CourseEvent } from "./types";

const formatEvent = (event: CourseEvent, dateRange: {start: Date, end: Date}): gapi.client.calendar.EventInput => {
    const start = new Date(dateRange.start);
    while (start.getDay() !== event.day) start.setDate(start.getDate() + 1);
    start.setHours(event.startTime.hours);
    start.setMinutes(event.startTime.minutes);

    const end = new Date(start);
    end.setHours(event.endTime.hours);
    end.setHours(event.endTime.minutes);

    return {
        start: {
            dateTime: start.toISOString(),
            timeZone: "America/New_York"
        },
        end: {
            dateTime: end.toISOString(),
            timeZone: "America/New_York"
        },
        recurrence: [`RRULE:FREQ=WEEKLY;UNTIL=${dateRange.end.toISOString()}`],
        summary: `${event.title} (${event.block})`,
        description: `<strong>Block:</strong> ${event.block}
<strong>Teacher:</teacher> ${event.teacher}
<strong>Room:</strong> ${event.room}`,
        location: `Room ${event.room}`,
        source: {
            title: "BUA Schedule → Google Calendar Importer",
            url: window.location.toString()
        }
    }
}

export default formatEvent;