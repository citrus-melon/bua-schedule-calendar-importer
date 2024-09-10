import * as pdfjs from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { minAMHour } from "../config";
import { DayOfWeek, Time, type CourseEvent } from "./types";

const line2Regex = /^(\d{1,2}):(\d{2}) - (\d{1,2}):(\d{2}) \(Period (.*)\)$/; // 8:00 - 9:30

const parsePDF = async (file: File) => {
  // Cached constants and regexes
  const COLUMNS = [ // minimum x values for each day
    {day: DayOfWeek.Monday, x: 48},
    {day: DayOfWeek.Tuesday, x: 190},
    {day: DayOfWeek.Wednesday, x: 330},
    {day: DayOfWeek.Thursday, x: 475},
    {day: DayOfWeek.Friday, x: 618},
  ].reverse();

  // Load and extract text content
  const buffer = await file.arrayBuffer();
  const document = await pdfjs.getDocument(buffer).promise;
  const page = await document.getPage(1);
  const content = await page.getTextContent();
  let textItems = content.items as TextItem[];

  // Trim and exclude whitespace
  for (const item of textItems) item.str = item.str.trim();
  textItems = textItems.filter((item) => item.str);

  // Find first line of actual schedule
  // (first line that doesn't end with "PM" after any lines that do)
  let start = 0;
  for (; start < textItems.length; start++) {
    if (textItems[start].str.endsWith("PM")) break;
  }
  for (; start < textItems.length; start++) {
    if (!textItems[start].str.endsWith("PM")) break;
  }

  // Slice to only include schedule
  textItems = textItems.slice(start, -1);
  
  const courses: CourseEvent[] = [];

  for (let i = 0; i+2 < textItems.length; i+=3) {
    let title = '';
    let line2Parsed = null;

    for (let j = 0; j < 3; j++) {
      title += textItems[i].str;
      i++;
      line2Parsed = line2Regex.exec(textItems[i].str);
      if (line2Parsed) break;
    }

    if (!line2Parsed) throw new Error(`Can't find line 2 for course ${title}`);

    let startTime = new Time(Number(line2Parsed[1]), Number(line2Parsed[2]));
    if (startTime.hours < minAMHour) startTime = new Time(startTime.hours + 12, startTime.minutes);
    let endTime = new Time(Number(line2Parsed[3]), Number(line2Parsed[4]));
    if (endTime.hours < minAMHour) endTime = new Time(endTime.hours + 12, endTime.minutes);

    const day = COLUMNS.find(
      (column) => column.x <= textItems[i].transform[4]
    )?.day;
    if (!day) throw new Error(`Invalid day (x=${textItems[i].transform[4]}) for course ${title}`);

    let line3Split = textItems[i+1].str.split("-")
      .map((str) => str.trim())
      .map((str) => str === "None" ? undefined : str)

    courses.push({
      title,
      startTime,
      endTime,
      day,
      block: line2Parsed[5],
      teacher: line3Split[0],
      room: line3Split[1],
    })
  }

  return courses;
};

export default parsePDF;