import * as pdfjs from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { DayOfWeek, Time, type CourseEvent } from "./types";

const COLUMNS = [
  {day: DayOfWeek.Monday, x: 38},
  {day: DayOfWeek.Tuesday, x: 147},
  {day: DayOfWeek.Wednesday, x: 255},
  {day: DayOfWeek.Thursday, x: 363},
  {day: DayOfWeek.Friday, x: 471},
].reverse();

const timeStringRegex = /^(\d{1,2}):(\d{2}) - (\d{1,2}):(\d{2})$/; // 8:00 - 9:30
const roomStringRegex = /^[A-Z0-9]+$/; // 205, ASM

type pdfCourseEvent = CourseEvent & { pdfIndex: number };

const getRelevantContent = async (file: File) => {
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

const parsePDF = async (file: File) => {
  const pdfContent = await getRelevantContent(file);
  const consumedItems: boolean[] = [];
  const courses: pdfCourseEvent[] = [];

  // Time, day, block, title
  for (let i = 0; i < pdfContent.length; i++) {
    const item = pdfContent[i];

    const timeRegexResult = timeStringRegex.exec(item.str);
    if (timeRegexResult) {
      consumedItems[i] = true;

      let startTime = new Time(Number(timeRegexResult[1]), Number(timeRegexResult[2]));
      if (startTime.hours < 6) startTime = new Time(startTime.hours + 12, startTime.minutes);
      let endTime = new Time(Number(timeRegexResult[3]), Number(timeRegexResult[4]));
      if (endTime.hours < 6) endTime = new Time(endTime.hours + 12, endTime.minutes);

      const day = COLUMNS.find(
        (column) => column.x <= item.transform[4]
      ).day;

      const block = pdfContent[i+1].str;
      consumedItems[i+1] = true;

      const title = pdfContent[i+2].str;
      consumedItems[i+2] = true;

      courses.push({ pdfIndex: i, startTime, endTime, day, block, title });
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
      if (item.str.trim().length === 0) {
        i++;
        if (i < pdfContent.length && !consumedItems[i]) {
          courseEvent.teacher = pdfContent[i].str;
        }
        break;
      };
      courseEvent.title += " " + item.str;
    }
  }

  return courses;
};

export default parsePDF;