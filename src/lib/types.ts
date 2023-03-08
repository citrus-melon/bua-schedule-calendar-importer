export enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
}

export class Time {
  constructor (public readonly hours, public readonly minutes) {
    if (!Number.isInteger(hours) || hours < 0 || hours > 23) throw new RangeError('Invalid hours');
    if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) throw new RangeError('Invalid minutes');
  }

  toString () {
    return `${this.hours}:${this.minutes.toString().padStart(2, "0")}`;
  }
}

export interface CourseEvent {
  startTime: Time;
  endTime: Time;
  day: DayOfWeek;
  title: string;
  block: string;
  teacher?: string;
  room?: string;
}

export type CalendarLike = Omit<gapi.client.calendar.Calendar, 'kind'>;