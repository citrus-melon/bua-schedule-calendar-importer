import type { Interval } from "luxon";
import type { CourseEvent } from "./types";

const formatEvent = (event: CourseEvent, dateRange: Interval): gapi.client.calendar.EventInput => {
    let start = dateRange.start.set({ hour: event.startTime.hours, minute: event.startTime.minutes });
    while (start.weekday !== event.day) start = start.plus({ days: 1 });

    const end = start.set({ hour: event.endTime.hours, minute: event.endTime.minutes });

    const recurrence = [`RRULE:FREQ=WEEKLY;UNTIL=${
        dateRange.end.toUTC().toISO({ suppressMilliseconds: true, format: "basic" })
    }`];

    const description = [
        event.block ? `<strong>Block:</strong> ${event.block}` : null,
        event.teacher ? `<strong>Teacher:</strong> ${event.teacher}`: null,
        event.room ? `<strong>Room:</strong> ${event.room}` : null,
    ].filter(Boolean).join("\n");

    return {
        start: {
            dateTime: start.toISO(),
            timeZone: "America/New_York"
        },
        end: {
            dateTime: end.toISO(),
            timeZone: "America/New_York"
        },
        recurrence,
        summary: `${event.title} (${event.block})`,
        description,
        source: {
            title: "BUA Schedule → Google Calendar Importer",
            url: window.location.toString()
        }
    }
}

export default formatEvent;