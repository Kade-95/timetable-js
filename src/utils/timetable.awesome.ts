import { IGroup } from "../models/group.interface";
import { Timetable } from "./timetable.class";

export function used(timeTable: Timetable, groups: IGroup[]) {    
    const len = groups.reduce((acc, reducer) => {
        return acc + reducer.items.length;
    }, 1);

    const missing = timeTable.getMissingItems(groups);
    const used = len - missing.reduce((acc, reducer) => {
        return acc + reducer.missing.length;
    }, 1)

    return (used / len) * 100 + '%';
}

export function nully(timeTable: Timetable) {
    const len = timeTable.groups.length * timeTable.days.length * timeTable.periods.length;

    const used = timeTable.groups.reduce((acc, red) => {
        return acc + red.slots.reduce((accc, redd) => {
            return accc + redd.reduce((acccc, reddd) => {
                return acccc += reddd ? 1 : 0;
            }, 0)
        }, 0)
    }, 0);

    return (used / len) * 100 + '%';
}