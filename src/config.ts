import { DateTime, Interval } from "luxon";

export const defaultDateRange = Interval.fromDateTimes(
  DateTime.local(2023, 9, 5, { zone: "America/New_York" }),
  DateTime.local(2023, 12, 15, { zone: "America/New_York" })
);

export const minAMHour = 7;
