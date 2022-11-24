export enum DayOfWeek {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
}

export interface CourseEvent {
    pdfIndex: number;
    time: string;
    day: DayOfWeek;
    title: string;
    block: string;
    teacher?: string;
    room?: string;
  }
  