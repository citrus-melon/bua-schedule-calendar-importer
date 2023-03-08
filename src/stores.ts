import type { Interval } from "luxon";
import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
import { defaultDateRange } from "./config";
import type { CalendarLike, CourseEvent } from "./lib/types";

export const currentPage = writable<ComponentType>();
export const courseEvents = writable<CourseEvent[]>([]);
export const dateRange = writable<Interval>(defaultDateRange);
export const calendar = writable<CalendarLike>();
export const failedEvents = writable<CourseEvent[]>([]);