import { IGroup } from "../models/group.interface";
import { TimetableConflict } from "../models/timetable.conflict";
import { TimetableGroup } from "../models/timetable.group";
import { ITimetable } from "../models/timetable.interface";
import { TimetablePeriod } from "../models/timetable.period";
import { TimetableSlot } from "../models/timetable.slot";
export declare class Timetable implements ITimetable {
    days: string[];
    periods: TimetablePeriod[];
    breakPeriods: number[];
    groups: TimetableGroup[];
    type: 'single' | 'multiple';
    get data(): ITimetable;
    constructor(days: string[], periods: TimetablePeriod[], breakPeriods: number[], groups: TimetableGroup[], type: 'single' | 'multiple');
    getSlots(): string[][][];
    getMissingItems(groups: IGroup[]): {
        _id: string;
        missing: string[];
    }[];
    getInvalidItems(groups: IGroup[]): {
        _id: string;
        invalid: string[];
    }[];
    getGroup(_id: string): TimetableGroup | undefined;
    getGroupSlots(_id: string): string[][] | undefined;
    getGroupAssignees(group: IGroup): string[];
    getGroupSlotsAsList(_id: string): string[];
    getGroupMissingItems(_id: string, items: string[]): string[];
    getGroupInvalidItems(_id: string, items: string[]): string[];
    getSlotItems(day: string, period: string): string[];
    getGroupSlotItem(_id: string, day: string, period: string): string | null;
    getSlotAssignees(day: string, period: string, groups: IGroup[]): {
        _id: string;
        assignee: string | null;
        section: string;
        item: string;
    }[];
    getGroupSlotAssignee(day: string, period: string, group: IGroup): string | null;
    getItemSlots(item: string): TimetableSlot[];
    getAssigneeSlots(assignee: string, groups: IGroup[]): TimetableSlot[];
    getGroupItemSlot(_id: string, item: string): TimetableSlot[] | {
        day: string;
        period: string;
        _id: string;
    };
    getGroupAssigneeSlots(assignee: string, group: IGroup): TimetableSlot[];
    getSlotConflicts(day: string, period: string, groups: IGroup[]): {
        _id: string;
        conflicts: TimetableConflict[];
    }[];
    getConflicts(groups: IGroup[]): {
        _id: string;
        conflicts: TimetableConflict[];
    }[];
    getGroupConflict(_id: string, groups: IGroup[]): TimetableConflict[] | undefined;
    getItemConflicts(item: string, groups: IGroup[]): {
        _id: string;
        conflicts: TimetableConflict[];
    }[];
    getAssigneeConflicts(assignee: string, groups: IGroup[]): {
        _id: string;
        conflicts: TimetableConflict[];
    }[];
    getAssigneeSlotConflicts(day: string, period: string, assignee: string, groups: IGroup[]): {
        _id: string;
        conflicts: TimetableConflict[];
    }[];
    getIssues(groups: IGroup[]): {
        missing: {
            _id: string;
            missing: string[];
        }[];
        invalid: {
            _id: string;
            invalid: string[];
        }[];
        conflicts: {
            _id: string;
            conflicts: TimetableConflict[];
        }[];
    };
    getGroupIssues(id: string, groups: IGroup[]): {
        missing: {
            _id: string;
            missing: string[];
        } | undefined;
        invalid: {
            _id: string;
            invalid: string[];
        } | undefined;
        conflicts: {
            _id: string;
            conflicts: TimetableConflict[];
        } | undefined;
    };
    clone(): ITimetable;
    assignGroupSlot(day: number, period: number, item: string, _id: string, groups: IGroup[]): Timetable;
    automate(groups: IGroup[], random?: boolean): Timetable;
    automateMultiple(groups: IGroup[], heirachy?: {
        item: string;
        level: number;
    }[]): Timetable;
    canAssignToSlot(item: string, groupId: string, day: string, period: string, groups: IGroup[]): boolean;
    groupSections(groups: IGroup[]): IGroup[][];
    assignedToSameInSection(groups: IGroup[]): any;
}