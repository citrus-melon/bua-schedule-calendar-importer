import { DateTime, Interval } from "luxon";

export const defaultDateRange = Interval.fromDateTimes(
  DateTime.local(2024, 1, 3, { zone: "America/New_York" }),
  DateTime.local(2024, 5, 31, { zone: "America/New_York" })
);

export const minAMHour = 7;
