import { TimetableGroup } from "./timetable.group";
import { TimetablePeriod } from "./timetable.period";

export interface ITimetable {
    days: string[];
    periods: TimetablePeriod[];
    breakPeriods: TimetablePeriod[];
    groups: TimetableGroup[];
    assigned: boolean;
    multiple: boolean;
}