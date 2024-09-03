import { DateTime, Interval } from "luxon";

export const defaultDateRange = Interval.fromDateTimes(
  DateTime.local(2024, 9, 3, { zone: "America/New_York" }),
  DateTime.local(2024, 12, 21, { zone: "America/New_York" })
);

export const minAMHour = 7;
