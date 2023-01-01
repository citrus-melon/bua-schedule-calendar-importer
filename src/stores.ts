import type { Interval } from "luxon";
import type { ComponentType } from "svelte";
import { writable } from "svelte/store";
import type { CalendarLike, CourseEvent } from "./types";

export const currentPage = writable<ComponentType>();
export const courseEvents = writable<CourseEvent[]>([]);
export const dateRange = writable<Interval>();
export const calendar = writable<CalendarLike>();
export const failedEvents = writable<CourseEvent[]>([]);