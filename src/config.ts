import { DateTime, Interval } from "luxon";

export const defaultDateRange = Interval.fromDateTimes(
  DateTime.local(2023, 1, 4, { zone: "America/New_York" }),
  DateTime.local(2023, 6, 10, { zone: "America/New_York" })
);

export const minAMHour = 7;