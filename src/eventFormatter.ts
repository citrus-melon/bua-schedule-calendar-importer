import type { Interval } from "luxon";
import type { CourseEvent } from "./types";

const formatEvent = (event: CourseEvent, dateRange: Interval): gapi.client.calendar.EventInput => {
    let start = dateRange.start.set({ hour: event.startTime.hours, minute: event.startTime.minutes });
    while (start.weekday !== event.day) start = start.plus({ days: 1 });

    const end = start.set({ hour: event.endTime.hours, minute: event.endTime.minutes });

    return {
        start: {
            dateTime: start.toISO(),
            timeZone: "America/New_York"
        },
        end: {
            dateTime: end.toISO(),
            timeZone: "America/New_York"
        },
        recurrence: [`RRULE:FREQ=WEEKLY;UNTIL=${dateRange.end.toISO()}`],
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