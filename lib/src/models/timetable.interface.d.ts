import { TimetableGroup } from "./timetable.group";
import { TimetablePeriod } from "./timetable.period";
export interface ITimetable {
    days: string[];
    periods: TimetablePeriod[];
    breakPeriods: number[];
    groups: TimetableGroup[];
    type: 'single' | 'multiple';
}
