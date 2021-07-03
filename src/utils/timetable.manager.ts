import { IGroup } from "../models/group.interface";
import { TimetableConflict } from "../models/timetable.conflict";
import { TimetableGroup } from "../models/timetable.group";
import { ITimetable } from "../models/timetable.interface";
import { TimetableSlot } from "../models/timetable.slot";

export class TimetableManager {

    constructor(
        public data: ITimetable
    ) { }

    getSlots() {
        return this.data.groups.map(g => g.slots);
    }

    getAssignees(groups: IGroup[]) {
        const assignees = groups.reduce((acc: string[], reducer) => {
            return [...acc, ...reducer.items.map(r => r.assignee)]
        }, []);

        return Array.from(new Set(assignees));
    }

    getMissingItems(groups: IGroup[]) {
        const allMissing: { _id: string, missing: string[] }[] = [];
        for (let group of groups) {
            const items = group.items.map(i => i._id);
            allMissing.push({ _id: group._id, missing: this.getGroupMissingItems(group._id, items) });
        }

        return allMissing.filter(alm => alm.missing.length);
    }

    getInvalidItems(groups: IGroup[]) {
        const allInvalid: { _id: string, invalid: string[] }[] = [];
        for (let group of groups) {
            const items = group.items.map(i => i._id);
            allInvalid.push({ _id: group._id, invalid: this.getGroupInvalidItems(group._id, items) });
        }

        return allInvalid.filter(alm => alm.invalid.length);
    }

    getGroup(_id: string) {
        const group = this.data.groups.find(c => c._id.toString() == _id.toString());
        return group;
    }

    getGroupSlots(_id: string) {
        return this.getGroup(_id)?.slots || [];
    }

    getGroupAssignees(group: IGroup) {
        const slots = this.getGroupSlots(group._id);
        const assignees: string[] = [];

        for (let d in slots) {
            for (let p in slots[d]) {
                const item = slots[d][p];
                const assignment = group.items.find(a => a._id == item);
                if (assignment) assignees.push(assignment.assignee);
            }
        }

        return Array.from(new Set(assignees));
    }

    getGroupSlotsAsList(_id: string) {
        const slots = this.getGroupSlots(_id) || [];
        const list = slots.reduce((acc, t) => {
            return [...acc, ...t];
        }, []);

        return list;
    }

    getGroupMissingItems(_id: string, items: string[]): string[] {
        const slotsAsList = this.getGroupSlotsAsList(_id);
        const missing: string[] = [];

        for (let i of items) {
            if (!slotsAsList.includes(i)) missing.push(i);
        }

        return missing;
    }

    getGroupInvalidItems(_id: string, items: string[]): string[] {
        const slotsAsList = this.getGroupSlotsAsList(_id);
        const invalid: string[] = [];

        for (let i of slotsAsList) {
            if (i && !items.includes(i)) invalid.push(i);
        }

        return invalid;
    }

    getSlotItems(day: string, period: string) {
        const items: (string | null)[] = [];

        for (let slots of this.getSlots()) {
            for (let d in slots) {
                for (let p in slots[d]) {
                    if (d == day && p == period) items.push(slots[d][p]);
                }
            }
        }

        return Array.from(new Set(items));
    }

    getGroupSlotItem(_id: string, day: string, period: string) {
        const slots = this.getGroupSlots(_id);

        for (let d in slots) {
            for (let p in slots[d]) {
                if (d == day && p == period) return slots[d][p];
            }
        }

        return null;
    }

    getSlotAssignees(day: string, period: string, groups: IGroup[]) {
        const assignees: { _id: string, assignee: string | null, section: string, item: string | null }[] = [];

        for (let g of groups) {
            const slots = this.getGroupSlots(g._id);

            for (let d in slots) {
                for (let p in slots[d]) {
                    if (d == day && p == period) {
                        const item = slots[d][p];
                        const assignment = g.items.find(a => a._id == item);
                        assignees.push({ _id: g._id, assignee: assignment?.assignee || null, section: g.section, item });
                    }
                }
            }
        }

        return assignees;
    }

    getAssignedSlotAssignees(day: string, period: string, groups: IGroup[]) {
        const assignees: { _id: string, assignee: string | null, section: string, item: string | null }[] = [];

        for (let g of groups) {
            const slots = this.getGroupSlots(g._id);

            for (let d in slots) {
                for (let p in slots[d]) {
                    if (d == day && p == period) {
                        const item = slots[d][p];
                        const assignee = (this.data.groups.find(ag => ag._id == g._id)?.assignees as (string | null)[][])[d][p];
                        assignees.push({ _id: g._id, assignee, section: g.section, item });
                    }
                }
            }
        }

        return assignees;
    }

    getGroupSlotAssignee(day: string, period: string, group: IGroup) {
        const slots = this.getGroupSlots(group._id);

        for (let d in slots) {
            for (let p in slots[d]) {
                if (d == day && p == period) {
                    const item = slots[d][p];
                    const assignment = group.items.find(a => a._id == item);
                    if (assignment) return assignment.assignee;
                }
            }
        }

        return null;
    }

    getItemSlots(item: string) {
        const slots: TimetableSlot[] = [];

        for (let group of this.data.groups) {
            const s = this.getGroupSlots(group._id);

            for (let day in s) {
                for (let period in s[day]) {
                    if (s[day][period] == item) slots.push({ day, period, _id: group._id });
                }
            }
        }

        return slots;
    }

    getAssigneeSlots(assignee: string, groups: IGroup[]) {
        const slots: TimetableSlot[] = [];

        for (let group of groups) {
            const s = this.getGroupSlots(group._id);
            for (let day in s) {
                for (let period in s[day]) {
                    const item = s[day][period];
                    const assignment = group.items.find(i => i._id == item);

                    if (assignment?.assignee == assignee) slots.push({ day, period, _id: group._id });
                }
            }
        }

        return slots;
    }

    getGroupItemSlot(_id: string, item: string) {
        const s = this.getGroupSlots(_id);
        const slots: TimetableSlot[] = [];

        for (let day in s) {
            for (let period in s[day]) {
                if (s[day][period] == item) return ({ day, period, _id });
            }
        }

        return slots;
    }

    getGroupAssigneeSlots(assignee: string, group: IGroup) {
        const slots: TimetableSlot[] = [];

        const s = this.getGroupSlots(group._id);
        for (let day in s) {
            for (let period in s[day]) {
                const item = s[day][period];
                const assignment = group.items.find(i => i._id == item);

                if (assignment?.assignee == assignee) slots.push({ day, period, _id: group._id });
            }
        }

        return slots;
    }

    getSlotConflicts(day: string, period: string, groups: IGroup[]) {
        const conflicts = this.getConflicts(groups);
        const slotConflicts: typeof conflicts = [];

        for (let g of conflicts) {
            const sC: typeof g = { _id: g._id, conflicts: [] };

            for (let c of g.conflicts) {
                if (c.day == day && c.period == period) {
                    sC.conflicts.push(c);
                }
            }

            slotConflicts.push(sC);
        }

        return slotConflicts;
    }

    getConflicts(groups: IGroup[]) {
        const conflicts: { _id: string, conflicts: TimetableConflict[] }[] = [];
        const assigned: { item: string, assignee: string, section: string }[] = [];
        
        for (let group of groups) {
            const slots = this.getGroupSlots(group._id);
            const groupConflicts: TimetableConflict[] = [];

            for (let day in slots) {
                for (let period in slots[day]) {
                    const item = this.getGroupSlotItem(day, period, group._id);
                    const assignee = this.data.assigned ? this.data.groups.find(g => g._id == group._id)?.assignees[day][period] : this.getGroupSlotAssignee(day, period, group);

                    if (!item) continue;
                    if (!assignee) continue;

                    const groupItems = group.items.map(i => i._id);
                    if (this.getGroupInvalidItems(group._id, groupItems).includes(item)) continue;

                    if ((assigned as any)[`${day}.${period}`]?.assignee == assignee) {
                        if (
                            (assigned as any)[`${day}.${period}`]?.item != item
                            || (assigned as any)[`${day}.${period}`]?.section != group.section
                        ) {
                            groupConflicts.push({ day, period, item, assignee });
                        }
                        else {
                            (assigned as any)[`${day}.${period}`] = { assignee, item, section: group.section };
                        }
                    }
                }
            }

            conflicts.push({ _id: group._id, conflicts: groupConflicts });
        }

        return conflicts.filter(alc => alc.conflicts.length);
    }

    getGroupConflict(_id: string, groups: IGroup[]) {
        const conflicts = this.getConflicts(groups).find(c => c._id == _id)?.conflicts;
        return conflicts;
    }

    getItemConflicts(item: string, groups: IGroup[]) {
        const conflicts = this.getConflicts(groups);

        return conflicts.map(c => {
            return { _id: c._id, conflicts: c.conflicts.filter(cc => cc.item == item) };
        });
    }

    getAssigneeConflicts(assignee: string, groups: IGroup[]) {
        const conflicts = this.getConflicts(groups);

        return conflicts.map(c => {
            return { _id: c._id, conflicts: c.conflicts.filter(cc => cc.assignee == assignee) };
        });
    }

    getAssigneeSlotConflicts(day: string, period: string, assignee: string, groups: IGroup[]) {
        const conflicts = this.getAssigneeConflicts(assignee, groups);

        return conflicts.map(c => {
            return { _id: c._id, conflicts: c.conflicts.filter(cc => cc.day == day && cc.period == period) };
        });
    }

    getIssues(groups: IGroup[]) {
        const missing = this.getMissingItems(groups);
        const invalid = this.getInvalidItems(groups);
        const conflicts = this.getConflicts(groups);

        return { missing, invalid, conflicts };
    }

    getGroupIssues(id: string, groups: IGroup[]) {
        const issues = this.getIssues(groups);

        return {
            missing: issues.missing.find(m => m._id == id),
            invalid: issues.invalid.find(m => m._id == id),
            conflicts: issues.conflicts.find(m => m._id == id)
        }
    }

    clone() {
        const data: ITimetable = { ...this.data };
        const timeTable = JSON.parse(JSON.stringify(data)) as ITimetable;
        return timeTable;
    }

    assignGroupSlot(day: number, period: number, item: string, _id: string, groups: IGroup[]) {
        const data = this.clone();
        const group = groups.find(g => g._id == _id);

        if (!group) throw new Error('Group not found');

        const timetable = new TimetableManager(data);

        if (timetable.getGroupInvalidItems(_id, group.items.map(i => i._id)))
            throw new Error("This item should not be assigned to this group");

        const slots = timetable.getGroupSlots(_id);
        slots[day][period] = item;

        timetable.data.groups = timetable.data.groups.map(g => {
            if (g._id == _id) g.slots = slots;
            return g;
        });

        const conflicts = timetable.getGroupConflict(_id, groups);
        const assignee = group.items.find(i => i._id)?.assignee;

        const theConflict = conflicts?.find(c => c.assignee == assignee);
        if (theConflict) throw new Error("This item created a conflict in this group");

        return timetable;
    }

    automate(groups: IGroup[]) {
        const data = this.clone();
        const timetable = new TimetableManager({ ...data, assigned: false, multiple: false });

        timetable.data.groups = [];
        for (let group of groups) {
            const itemsAsList = group.items.map(i => i._id);
            const used: string[] = [];

            const g: TimetableGroup = { _id: group._id, slots: [], assignees: [] };

            for (let d in timetable.data.days) {
                g.slots[d] = [];

                for (let p in timetable.data.periods) {
                    if (used.length == itemsAsList.length) break;
                    while (!g.slots[d][p]) {
                        let n = Math.floor(Math.random() * itemsAsList.length);
                        let item = itemsAsList[n];

                        if (!used.includes(item)) {
                            g.slots[d][p] = item;
                            used.push(item);
                        }
                        n = n == itemsAsList.length - 1 ? 0 : n + 1;
                    }
                }
            }
            timetable.data.groups.push(g);
        }

        return timetable;
    }

    automate_assigne(groups: IGroup[]) {
        const data = this.clone();
        const timetable = new TimetableManager({ ...data, assigned: true, multiple: false });

        const allAssignees = this.getAssignees(groups);

        //truncate groups
        timetable.data.groups = [];

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            // turn group items into a flat list
            const itemsAsList = group.items.map(i => i._id);

            // get a set of all assigned in group
            const groupAssignees = Array.from(new Set(group.items.map(it => it.assignee)));

            const newGroup: TimetableGroup = { _id: group._id, slots: [], assignees: [] };
            // used to store assigned items
            let assignedItems: string[] = [];

            // store checked items to know when all items have been checked
            let checkedItems: string[] = [];

            for (let d in timetable.data.days) {
                newGroup.slots[d] = [];
                newGroup.assignees[d] = [];
                // store checked assignees to know when all assignees have been checked and escape infinite loop
                const checkAssignees: string[] = [];

                for (let p in timetable.data.periods) {

                    // get all assigned to this particular slot
                    const assignees = timetable.getAssignedSlotAssignees(d, p, groups);

                    let item: string;
                    let assignee: string = allAssignees.find(a => assignees.find(ass => ass.assignee == a))
                        || assignees.find(ass => ass.section == group.section)?.assignee as string;

                    newGroup.slots[d][p] = null;
                    newGroup.assignees[d][p] = null;
                    // till assigned
                    while (!newGroup.slots[d][p]) {

                        // truncate assignedItems if all items have been assigned to make sure no item has more heirachy
                        if (assignedItems.length == itemsAsList.length) assignedItems = [];

                        // escape loop if nobody can be assigned to this slot
                        if (groupAssignees.length == checkAssignees.length) break;

                        // generate a random point in the items list
                        let n = Math.floor(Math.random() * itemsAsList.length);

                        item = itemsAsList[n];
                        assignee = group.items.find(i => i._id == item)?.assignee as string;

                        if (!checkedItems.includes(item)) checkedItems.push(item);

                        // who was assigned to this slot?
                        const usedSlot = assignees.find(a => a.assignee == assignee);

                        // is slot free?
                        if (!usedSlot) {
                            // run again if item has been assigned in a round 
                            if (assignedItems.includes(item) && checkedItems.length != itemsAsList.length) continue;

                            newGroup.slots[d][p] = item;
                            newGroup.assignees[d][p] = item;
                            if (!assignedItems.includes(item)) assignedItems.push(item);
                        }

                        // slot is used and 
                        // the item is the same with the slot item and 
                        // the groups are in the same section
                        else if (usedSlot.section == group.section && usedSlot.item == item) {
                            newGroup.slots[d][p] = item;
                            newGroup.assignees[d][p] = item;
                            if (!assignedItems.includes(item)) assignedItems.push(item);
                        }

                        if (!checkAssignees.includes(assignee)) checkAssignees.push(assignee);
                    }
                }
            }
            timetable.data.groups.push(newGroup);
        }
        return timetable;
    }

    automateMultiple(groups: IGroup[]) {
        const data = this.clone();
        const timetable = new TimetableManager({ ...data, assigned: false, multiple: true });

        //truncate groups
        timetable.data.groups = [];

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            // turn group items into a flat list
            const itemsAsList = group.items.map(i => i._id);

            // get a set of all assigned in group
            const groupAssignees = Array.from(new Set(group.items.map(it => it.assignee)));

            const newGroup: TimetableGroup = { _id: group._id, slots: [], assignees: [] };

            // used to store assigned items
            let assignedItems: string[] = [];

            // store checked items to know when all items have been checked
            let checkedItems: string[] = [];

            for (let d in timetable.data.days) {
                newGroup.slots[d] = [];

                // store checked assignees to know when all assignees have been checked and escape infinite loop
                const checkAssignees: string[] = [];

                for (let p in timetable.data.periods) {

                    // get all assigned to this particular slot
                    const assignees = timetable.getSlotAssignees(d, p, groups);

                    let item: string;
                    let assignee: string;

                    newGroup.slots[d][p] = null
                    // till assigned
                    while (!newGroup.slots[d][p]) {

                        // truncate assignedItems if all items have been assigned to make sure no item has more heirachy
                        if (assignedItems.length == itemsAsList.length) assignedItems = [];

                        // escape loop if nobody can be assigned to this slot
                        if (groupAssignees.length == checkAssignees.length) break;

                        // generate a random point in the items list
                        let n = Math.floor(Math.random() * itemsAsList.length);

                        item = itemsAsList[n];
                        assignee = group.items.find(i => i._id == item)?.assignee as string;

                        if (!checkedItems.includes(item)) checkedItems.push(item);

                        // who was assigned to this slot?
                        const usedSlot = assignees.find(a => a.assignee == assignee);

                        // is slot free?
                        if (!usedSlot) {

                            // run again if item has been assigned in a round 
                            if (assignedItems.includes(item) && checkedItems.length != itemsAsList.length) continue;

                            newGroup.slots[d][p] = item;
                            if (!assignedItems.includes(item)) assignedItems.push(item);
                        }

                        // slot is used and 
                        // the item is the same with the slot item and 
                        // the groups are in the same section
                        else if (usedSlot.section == group.section && usedSlot.item == item) {
                            newGroup.slots[d][p] = item;
                            if (!assignedItems.includes(item)) assignedItems.push(item);
                        }

                        if (!checkAssignees.includes(assignee)) checkAssignees.push(assignee);
                    }
                }
            }
            timetable.data.groups.push(newGroup);
        }
        return timetable;
    }

    canAssignToSlot(item: string, groupId: string, day: string, period: string, groups: IGroup[]) {
        const assignees = this.getSlotAssignees(day, period, groups);
        const group = groups.find(g => g._id == groupId);
        if (!group) throw new Error('Group not found');

        const assignee = group.items.find(i => i._id == item)?.assignee;

        const assigned = assignees.find(a => a.assignee == assignee);
        return !(assigned && assigned.section != group.section);
    }

    groupSections(groups: IGroup[]) {
        const sections: IGroup[][] = [];

        for (let group of groups) {
            if (!(sections as any)[group.section]) (sections as any)[group.section] = [];
            (sections as any)[group.section].push(group);
        }

        return sections;
    }

    assignedToSameInSection(groups: IGroup[]) {
        const sections = this.groupSections(groups);

        const assigned: any = {};
        for (let section in sections) {
            assigned[section] = {};

            for (let group of sections[section]) {
                for (let item of group.items) {
                    if (!assigned[section][JSON.stringify(item)]) assigned[section][JSON.stringify(item)] = [];
                    assigned[section][JSON.stringify(item)].push(group._id)
                }
            }
        }

        return assigned;
    }

    used(groups: IGroup[]) {
        const len = groups.reduce((acc, reducer) => {
            return acc + reducer.items.length;
        }, 1);

        const missing = this.getMissingItems(groups);
        const used = len - missing.reduce((acc, reducer) => {
            return acc + reducer.missing.length;
        }, 1)

        return (used / len) * 100 + '%';
    }

    nully() {
        const len = this.data.groups.length * this.data.days.length * this.data.periods.length;

        const used = this.data.groups.reduce((acc, red) => {
            return acc + red.slots.reduce((accc, redd) => {
                return accc + redd.reduce((acccc, reddd) => {
                    return acccc += reddd ? 1 : 0;
                }, 0)
            }, 0)
        }, 0);

        return (used / len) * 100 + '%';
    }

    hasIssues(groups: IGroup[]) {
        const issues = this.getIssues(groups);
        return !!(issues.conflicts.length || issues.invalid.length || issues.missing.length);
    }
}