import * as pdfjs from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";

enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
}

interface CourseEvent {
  pdfIndex: number;
  time: string;
  day: DayOfWeek;
  title: string;
  block: string;
  teacher?: string;
  room?: string;
}

const COLUMNS = [
  {day: DayOfWeek.Monday, x: 38},
  {day: DayOfWeek.Tuesday, x: 147},
  {day: DayOfWeek.Wednesday, x: 255},
  {day: DayOfWeek.Thursday, x: 363},
  {day: DayOfWeek.Friday, x: 471},
].reverse();

const timeStringRegex = /^\d{1,2}:\d{2} - \d{1,2}:\d{2}$/; // 8:00 - 9:30
const roomStringRegex = /^[A-Z0-9]+$/; // 205, ASM
const teacherStringRegex = /^(?:Dr|Mr|Mrs|Ms|Mx)\. /; // Dr. Jane Doe

export const getRelevantContent = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const document = await pdfjs.getDocument(buffer).promise;
  const page = await document.getPage(1);
  const content = await page.getTextContent({
    includeMarkedContent: false,
    disableCombineTextItems: false
  });
  const items = content.items as TextItem[];
  return items.slice(
    content.items.findIndex(
      (item) => "str" in item && item.str.startsWith("<#SPLIT#")
    ) + 1
  )
}

const parse = async (file: File) => {
  const pdfContent = await getRelevantContent(file);
  const consumedItems: boolean[] = [];
  const courses: CourseEvent[] = [];

  // Time, day, block, title
  for (let i = 0; i < pdfContent.length; i++) {
    const item = pdfContent[i];

    if (timeStringRegex.test(item.str)) {
      consumedItems[i] = true;
      const time = item.str;

      const day = COLUMNS.find(
        (column) => column.x <= item.transform[4]
      ).day;

      const block = pdfContent[i+1].str;
      consumedItems[i+1] = true;

      const title = pdfContent[i+2].str;
      consumedItems[i+2] = true;

      courses.push({ pdfIndex: i, time, day, block, title });
    }
  }

  // Room
  for (const courseEvent of courses) {
    const i = courseEvent.pdfIndex - 1;
    if (
      roomStringRegex.test(pdfContent[i].str)
      && !consumedItems[i]
    ) {
      courseEvent.room = pdfContent[i].str;
      consumedItems[i] = true;
    }
  }

  // Additional title lines, teacher
  for (const courseEvent of courses) {
    for (
      let i = courseEvent.pdfIndex + 3;
      i < pdfContent.length && !consumedItems[i];
      i++
    ) {
      const item = pdfContent[i];
      if (item.str.trim().length === 0) continue;

      if (teacherStringRegex.test(item.str)) {
        courseEvent.teacher = item.str;
        break;
      } else {
        courseEvent.title += " " + item.str;
      }

      i++;
    }
  }

  return courses;
};

export default parse;