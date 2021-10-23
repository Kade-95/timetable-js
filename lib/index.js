'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var Timetable = /** @class */ (function () {
    function Timetable(data) {
        this.data = data;
    }
    Timetable.prototype.getSlots = function () {
        return this.data.groups.map(function (g) { return g.slots; });
    };
    Timetable.prototype.getAssignees = function (groups) {
        var assignees = groups.reduce(function (acc, reducer) {
            return __spreadArray(__spreadArray([], acc), reducer.items.map(function (r) { return r.assignee; }));
        }, []);
        return Array.from(new Set(assignees));
    };
    Timetable.prototype.getMissingItems = function (groups) {
        var allMissing = [];
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            var items = group.items.map(function (i) { return i._id; });
            allMissing.push({ _id: group._id, missing: this.getGroupMissingItems(group._id, items) });
        }
        return allMissing.filter(function (alm) { return alm.missing.length; });
    };
    Timetable.prototype.getInvalidItems = function (groups) {
        var allInvalid = [];
        for (var _i = 0, groups_2 = groups; _i < groups_2.length; _i++) {
            var group = groups_2[_i];
            var items = group.items.map(function (i) { return i._id; });
            allInvalid.push({ _id: group._id, invalid: this.getGroupInvalidItems(group._id, items) });
        }
        return allInvalid.filter(function (alm) { return alm.invalid.length; });
    };
    Timetable.prototype.getGroup = function (_id) {
        var group = this.data.groups.find(function (c) { return c._id.toString() == _id.toString(); });
        return group;
    };
    Timetable.prototype.getGroupSlots = function (_id) {
        var _a;
        return ((_a = this.getGroup(_id)) === null || _a === void 0 ? void 0 : _a.slots) || [];
    };
    Timetable.prototype.getGroupAssignees = function (group) {
        var slots = this.getGroupSlots(group._id);
        var assignees = [];
        for (var d in slots) {
            var _loop_1 = function (p) {
                var item = slots[d][p];
                var assignment = group.items.find(function (a) { return a._id == item; });
                if (assignment)
                    assignees.push(assignment.assignee);
            };
            for (var p in slots[d]) {
                _loop_1(p);
            }
        }
        return Array.from(new Set(assignees));
    };
    Timetable.prototype.getGroupSlotsAsList = function (_id) {
        var slots = this.getGroupSlots(_id) || [];
        var list = slots.reduce(function (acc, t) {
            return __spreadArray(__spreadArray([], acc), t);
        }, []);
        return list;
    };
    Timetable.prototype.getGroupMissingItems = function (_id, items) {
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var missing = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var i = items_1[_i];
            if (!slotsAsList.includes(i))
                missing.push(i);
        }
        return missing;
    };
    Timetable.prototype.getGroupInvalidItems = function (_id, items) {
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var invalid = [];
        for (var _i = 0, slotsAsList_1 = slotsAsList; _i < slotsAsList_1.length; _i++) {
            var i = slotsAsList_1[_i];
            if (i && !items.includes(i))
                invalid.push(i);
        }
        return invalid;
    };
    Timetable.prototype.getSlotItems = function (day, period) {
        var items = [];
        for (var _i = 0, _a = this.getSlots(); _i < _a.length; _i++) {
            var slots = _a[_i];
            for (var d in slots) {
                for (var p in slots[d]) {
                    if (d == day && p == period)
                        items.push(slots[d][p]);
                }
            }
        }
        return Array.from(new Set(items));
    };
    Timetable.prototype.getGroupSlotItem = function (_id, day, period) {
        var slots = this.getGroupSlots(_id);
        for (var d in slots) {
            for (var p in slots[d]) {
                if (d == day && p == period)
                    return slots[d][p];
            }
        }
        return null;
    };
    Timetable.prototype.getSlotAssignees = function (day, period, groups) {
        var assignees = [];
        for (var _i = 0, groups_3 = groups; _i < groups_3.length; _i++) {
            var g = groups_3[_i];
            var slots = this.getGroupSlots(g._id);
            for (var d in slots) {
                var _loop_2 = function (p) {
                    if (d == day && p == period) {
                        var item_1 = slots[d][p];
                        var assignment = g.items.find(function (a) { return a._id == item_1; });
                        assignees.push({ _id: g._id, assignee: (assignment === null || assignment === void 0 ? void 0 : assignment.assignee) || null, section: g.section, item: item_1 });
                    }
                };
                for (var p in slots[d]) {
                    _loop_2(p);
                }
            }
        }
        return assignees;
    };
    Timetable.prototype.getAssignedSlotAssignees = function (day, period, groups) {
        var _a;
        var assignees = [];
        var _loop_3 = function (g) {
            var slots = this_1.getGroupSlots(g._id);
            for (var d in slots) {
                for (var p in slots[d]) {
                    if (d == day && p == period) {
                        var item = slots[d][p];
                        var assignee = ((_a = this_1.data.groups.find(function (ag) { return ag._id == g._id; })) === null || _a === void 0 ? void 0 : _a.assignees)[d][p];
                        assignees.push({ _id: g._id, assignee: assignee, section: g.section, item: item });
                    }
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, groups_4 = groups; _i < groups_4.length; _i++) {
            var g = groups_4[_i];
            _loop_3(g);
        }
        return assignees;
    };
    Timetable.prototype.getGroupSlotAssignee = function (day, period, group) {
        var slots = this.getGroupSlots(group._id);
        for (var d in slots) {
            var _loop_4 = function (p) {
                if (d == day && p == period) {
                    var item_2 = slots[d][p];
                    var assignment = group.items.find(function (a) { return a._id == item_2; });
                    if (assignment)
                        return { value: assignment.assignee };
                }
            };
            for (var p in slots[d]) {
                var state_1 = _loop_4(p);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        return null;
    };
    Timetable.prototype.getItemSlots = function (item) {
        var slots = [];
        for (var _i = 0, _a = this.data.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            var s = this.getGroupSlots(group._id);
            for (var day in s) {
                for (var period in s[day]) {
                    if (s[day][period] == item)
                        slots.push({ day: day, period: period, _id: group._id });
                }
            }
        }
        return slots;
    };
    Timetable.prototype.getAssigneeSlots = function (assignee, groups) {
        var slots = [];
        for (var _i = 0, groups_5 = groups; _i < groups_5.length; _i++) {
            var group = groups_5[_i];
            var s = this.getGroupSlots(group._id);
            for (var day in s) {
                var _loop_5 = function (period) {
                    var item = s[day][period];
                    var assignment = group.items.find(function (i) { return i._id == item; });
                    if ((assignment === null || assignment === void 0 ? void 0 : assignment.assignee) == assignee)
                        slots.push({ day: day, period: period, _id: group._id });
                };
                for (var period in s[day]) {
                    _loop_5(period);
                }
            }
        }
        return slots;
    };
    Timetable.prototype.getGroupItemSlot = function (_id, item) {
        var s = this.getGroupSlots(_id);
        var slots = [];
        for (var day in s) {
            for (var period in s[day]) {
                if (s[day][period] == item)
                    return ({ day: day, period: period, _id: _id });
            }
        }
        return slots;
    };
    Timetable.prototype.getGroupAssigneeSlots = function (assignee, group) {
        var slots = [];
        var s = this.getGroupSlots(group._id);
        for (var day in s) {
            var _loop_6 = function (period) {
                var item = s[day][period];
                var assignment = group.items.find(function (i) { return i._id == item; });
                if ((assignment === null || assignment === void 0 ? void 0 : assignment.assignee) == assignee)
                    slots.push({ day: day, period: period, _id: group._id });
            };
            for (var period in s[day]) {
                _loop_6(period);
            }
        }
        return slots;
    };
    Timetable.prototype.getSlotConflicts = function (day, period, groups) {
        var conflicts = this.getConflicts(groups);
        var slotConflicts = [];
        for (var _i = 0, conflicts_1 = conflicts; _i < conflicts_1.length; _i++) {
            var g = conflicts_1[_i];
            var sC = { _id: g._id, conflicts: [] };
            for (var _a = 0, _b = g.conflicts; _a < _b.length; _a++) {
                var c = _b[_a];
                if (c.day == day && c.period == period) {
                    sC.conflicts.push(c);
                }
            }
            slotConflicts.push(sC);
        }
        return slotConflicts;
    };
    Timetable.prototype.getConflicts = function (groups) {
        var _a, _b, _c, _d;
        var conflicts = [];
        var assigned = [];
        var _loop_7 = function (group) {
            var slots = this_2.getGroupSlots(group._id);
            var groupConflicts = [];
            for (var day in slots) {
                for (var period in slots[day]) {
                    var item = this_2.getGroupSlotItem(day, period, group._id);
                    var assignee = this_2.data.assigned ? (_a = this_2.data.groups.find(function (g) { return g._id == group._id; })) === null || _a === void 0 ? void 0 : _a.assignees[day][period] : this_2.getGroupSlotAssignee(day, period, group);
                    if (!item)
                        continue;
                    if (!assignee)
                        continue;
                    var groupItems = group.items.map(function (i) { return i._id; });
                    if (this_2.getGroupInvalidItems(group._id, groupItems).includes(item))
                        continue;
                    if (((_b = assigned[day + "." + period]) === null || _b === void 0 ? void 0 : _b.assignee) == assignee) {
                        if (((_c = assigned[day + "." + period]) === null || _c === void 0 ? void 0 : _c.item) != item
                            || ((_d = assigned[day + "." + period]) === null || _d === void 0 ? void 0 : _d.section) != group.section) {
                            groupConflicts.push({ day: day, period: period, item: item, assignee: assignee });
                        }
                        else {
                            assigned[day + "." + period] = { assignee: assignee, item: item, section: group.section };
                        }
                    }
                }
            }
            conflicts.push({ _id: group._id, conflicts: groupConflicts });
        };
        var this_2 = this;
        for (var _i = 0, groups_6 = groups; _i < groups_6.length; _i++) {
            var group = groups_6[_i];
            _loop_7(group);
        }
        return conflicts.filter(function (alc) { return alc.conflicts.length; });
    };
    Timetable.prototype.getGroupConflict = function (_id, groups) {
        var _a;
        var conflicts = (_a = this.getConflicts(groups).find(function (c) { return c._id == _id; })) === null || _a === void 0 ? void 0 : _a.conflicts;
        return conflicts;
    };
    Timetable.prototype.getItemConflicts = function (item, groups) {
        var conflicts = this.getConflicts(groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.item == item; }) };
        });
    };
    Timetable.prototype.getAssigneeConflicts = function (assignee, groups) {
        var conflicts = this.getConflicts(groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.assignee == assignee; }) };
        });
    };
    Timetable.prototype.getAssigneeSlotConflicts = function (day, period, assignee, groups) {
        var conflicts = this.getAssigneeConflicts(assignee, groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.day == day && cc.period == period; }) };
        });
    };
    Timetable.prototype.getIssues = function (groups) {
        var missing = this.getMissingItems(groups);
        var invalid = this.getInvalidItems(groups);
        var conflicts = this.getConflicts(groups);
        return { missing: missing, invalid: invalid, conflicts: conflicts };
    };
    Timetable.prototype.getGroupIssues = function (id, groups) {
        var issues = this.getIssues(groups);
        return {
            missing: issues.missing.find(function (m) { return m._id == id; }),
            invalid: issues.invalid.find(function (m) { return m._id == id; }),
            conflicts: issues.conflicts.find(function (m) { return m._id == id; })
        };
    };
    Timetable.prototype.clone = function () {
        var data = __assign({}, this.data);
        var timeTable = JSON.parse(JSON.stringify(data));
        return timeTable;
    };
    Timetable.prototype.assignGroupSlot = function (day, period, item, _id, groups) {
        var _a;
        var data = this.clone();
        var group = groups.find(function (g) { return g._id == _id; });
        if (!group)
            throw new Error('Group not found');
        var timetable = new Timetable(data);
        if (timetable.getGroupInvalidItems(_id, group.items.map(function (i) { return i._id; })))
            throw new Error("This item should not be assigned to this group");
        var slots = timetable.getGroupSlots(_id);
        slots[day][period] = item;
        timetable.data.groups = timetable.data.groups.map(function (g) {
            if (g._id == _id)
                g.slots = slots;
            return g;
        });
        var conflicts = timetable.getGroupConflict(_id, groups);
        var assignee = (_a = group.items.find(function (i) { return i._id; })) === null || _a === void 0 ? void 0 : _a.assignee;
        var theConflict = conflicts === null || conflicts === void 0 ? void 0 : conflicts.find(function (c) { return c.assignee == assignee; });
        if (theConflict)
            throw new Error("This item created a conflict in this group");
        return timetable;
    };
    Timetable.prototype.automate = function (groups) {
        var data = this.clone();
        var timetable = new Timetable(__assign(__assign({}, data), { assigned: false, multiple: false }));
        timetable.data.groups = [];
        for (var _i = 0, groups_7 = groups; _i < groups_7.length; _i++) {
            var group = groups_7[_i];
            var itemsAsList = group.items.map(function (i) { return i._id; });
            var used = [];
            var g = { _id: group._id, slots: [], assignees: [] };
            for (var d in timetable.data.days) {
                g.slots[d] = [];
                for (var p in timetable.data.periods) {
                    if (used.length == itemsAsList.length)
                        break;
                    while (!g.slots[d][p]) {
                        var n = Math.floor(Math.random() * itemsAsList.length);
                        var item = itemsAsList[n];
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
    };
    Timetable.prototype.automate_assigne = function (groups) {
        var _a, _b;
        var data = this.clone();
        var timetable = new Timetable(__assign(__assign({}, data), { assigned: true, multiple: false }));
        var allAssignees = this.getAssignees(groups);
        //truncate groups
        timetable.data.groups = [];
        var _loop_8 = function (i) {
            var group = groups[i];
            // turn group items into a flat list
            var itemsAsList = group.items.map(function (i) { return i._id; });
            // get a set of all assigned in group
            var groupAssignees = Array.from(new Set(group.items.map(function (it) { return it.assignee; })));
            var newGroup = { _id: group._id, slots: [], assignees: [] };
            // used to store assigned items
            var assignedItems = [];
            // store checked items to know when all items have been checked
            var checkedItems = [];
            for (var d in timetable.data.days) {
                newGroup.slots[d] = [];
                newGroup.assignees[d] = [];
                // store checked assignees to know when all assignees have been checked and escape infinite loop
                var checkAssignees = [];
                var _loop_9 = function (p) {
                    // get all assigned to this particular slot
                    var assignees = timetable.getAssignedSlotAssignees(d, p, groups);
                    var item;
                    var assignee = allAssignees.find(function (a) { return assignees.find(function (ass) { return ass.assignee == a; }); })
                        || ((_a = assignees.find(function (ass) { return ass.section == group.section; })) === null || _a === void 0 ? void 0 : _a.assignee);
                    newGroup.slots[d][p] = null;
                    newGroup.assignees[d][p] = null;
                    // till assigned
                    while (!newGroup.slots[d][p]) {
                        // truncate assignedItems if all items have been assigned to make sure no item has more heirachy
                        if (assignedItems.length == itemsAsList.length)
                            assignedItems = [];
                        // escape loop if nobody can be assigned to this slot
                        if (groupAssignees.length == checkAssignees.length)
                            break;
                        // generate a random point in the items list
                        var n = Math.floor(Math.random() * itemsAsList.length);
                        item = itemsAsList[n];
                        assignee = (_b = group.items.find(function (i) { return i._id == item; })) === null || _b === void 0 ? void 0 : _b.assignee;
                        if (!checkedItems.includes(item))
                            checkedItems.push(item);
                        // who was assigned to this slot?
                        var usedSlot = assignees.find(function (a) { return a.assignee == assignee; });
                        // is slot free?
                        if (!usedSlot) {
                            // run again if item has been assigned in a round 
                            if (assignedItems.includes(item) && checkedItems.length != itemsAsList.length)
                                continue;
                            newGroup.slots[d][p] = item;
                            newGroup.assignees[d][p] = item;
                            if (!assignedItems.includes(item))
                                assignedItems.push(item);
                        }
                        // slot is used and 
                        // the item is the same with the slot item and 
                        // the groups are in the same section
                        else if (usedSlot.section == group.section && usedSlot.item == item) {
                            newGroup.slots[d][p] = item;
                            newGroup.assignees[d][p] = item;
                            if (!assignedItems.includes(item))
                                assignedItems.push(item);
                        }
                        if (!checkAssignees.includes(assignee))
                            checkAssignees.push(assignee);
                    }
                };
                for (var p in timetable.data.periods) {
                    _loop_9(p);
                }
            }
            timetable.data.groups.push(newGroup);
        };
        for (var i = 0; i < groups.length; i++) {
            _loop_8(i);
        }
        return timetable;
    };
    Timetable.prototype.automateMultiple = function (groups) {
        var _a;
        var data = this.clone();
        var timetable = new Timetable(__assign(__assign({}, data), { assigned: false, multiple: true }));
        //truncate groups
        timetable.data.groups = [];
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            // turn group items into a flat list
            var itemsAsList = group.items.map(function (i) { return i._id; });
            // get a set of all assigned in group
            var groupAssignees = Array.from(new Set(group.items.map(function (it) { return it.assignee; })));
            var newGroup = { _id: group._id, slots: [], assignees: [] };
            // used to store assigned items
            var assignedItems = [];
            // store checked items to know when all items have been checked
            var checkedItems = [];
            for (var d in timetable.data.days) {
                newGroup.slots[d] = [];
                // store checked assignees to know when all assignees have been checked and escape infinite loop
                var checkAssignees = [];
                var _loop_10 = function (p) {
                    // get all assigned to this particular slot
                    var assignees = timetable.getSlotAssignees(d, p, groups);
                    var item;
                    var assignee;
                    newGroup.slots[d][p] = null;
                    // till assigned
                    while (!newGroup.slots[d][p]) {
                        // truncate assignedItems if all items have been assigned to make sure no item has more heirachy
                        if (assignedItems.length == itemsAsList.length)
                            assignedItems = [];
                        // escape loop if nobody can be assigned to this slot
                        if (groupAssignees.length == checkAssignees.length)
                            break;
                        // generate a random point in the items list
                        var n = Math.floor(Math.random() * itemsAsList.length);
                        item = itemsAsList[n];
                        assignee = (_a = group.items.find(function (i) { return i._id == item; })) === null || _a === void 0 ? void 0 : _a.assignee;
                        if (!checkedItems.includes(item))
                            checkedItems.push(item);
                        // who was assigned to this slot?
                        var usedSlot = assignees.find(function (a) { return a.assignee == assignee; });
                        // is slot free?
                        if (!usedSlot) {
                            // run again if item has been assigned in a round 
                            if (assignedItems.includes(item) && checkedItems.length != itemsAsList.length)
                                continue;
                            newGroup.slots[d][p] = item;
                            if (!assignedItems.includes(item))
                                assignedItems.push(item);
                        }
                        // slot is used and 
                        // the item is the same with the slot item and 
                        // the groups are in the same section
                        else if (usedSlot.section == group.section && usedSlot.item == item) {
                            newGroup.slots[d][p] = item;
                            if (!assignedItems.includes(item))
                                assignedItems.push(item);
                        }
                        if (!checkAssignees.includes(assignee))
                            checkAssignees.push(assignee);
                    }
                };
                for (var p in timetable.data.periods) {
                    _loop_10(p);
                }
            }
            timetable.data.groups.push(newGroup);
        }
        return timetable;
    };
    Timetable.prototype.canAssignToSlot = function (item, groupId, day, period, groups) {
        var _a;
        var assignees = this.getSlotAssignees(day, period, groups);
        var group = groups.find(function (g) { return g._id == groupId; });
        if (!group)
            throw new Error('Group not found');
        var assignee = (_a = group.items.find(function (i) { return i._id == item; })) === null || _a === void 0 ? void 0 : _a.assignee;
        var assigned = assignees.find(function (a) { return a.assignee == assignee; });
        return !(assigned && assigned.section != group.section);
    };
    Timetable.prototype.itemAssignmentConflicts = function (item, assignee, groupId, groups) {
        var group = this.getGroup(groupId);
        var igroup = groups.find(function (g) { return g._id == groupId; });
        var itemSlots = this.getItemSlots(item);
        var assigneeSlots = this.getAssigneeSlots(assignee, groups);
        var conflicts = [];
        for (var _i = 0, itemSlots_1 = itemSlots; _i < itemSlots_1.length; _i++) {
            var i = itemSlots_1[_i];
            var _loop_11 = function (a) {
                if (i.day == a.day && i.period == a.period) {
                    var ag = groups.find(function (g) { return g._id == a._id; });
                    if ((ag === null || ag === void 0 ? void 0 : ag.section) != (igroup === null || igroup === void 0 ? void 0 : igroup.section))
                        conflicts.push({ item: (group === null || group === void 0 ? void 0 : group.slots)[a.day][a.period], day: a.day, period: a.period, _id: ag === null || ag === void 0 ? void 0 : ag._id });
                }
            };
            for (var _a = 0, assigneeSlots_1 = assigneeSlots; _a < assigneeSlots_1.length; _a++) {
                var a = assigneeSlots_1[_a];
                _loop_11(a);
            }
        }
        return conflicts;
    };
    Timetable.prototype.groupSections = function (groups) {
        var sections = [];
        for (var _i = 0, groups_8 = groups; _i < groups_8.length; _i++) {
            var group = groups_8[_i];
            if (!sections[group.section])
                sections[group.section] = [];
            sections[group.section].push(group);
        }
        return sections;
    };
    Timetable.prototype.assignedToSameInSection = function (groups) {
        var sections = this.groupSections(groups);
        var assigned = {};
        for (var section in sections) {
            assigned[section] = {};
            for (var _i = 0, _a = sections[section]; _i < _a.length; _i++) {
                var group = _a[_i];
                for (var _b = 0, _c = group.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (!assigned[section][JSON.stringify(item)])
                        assigned[section][JSON.stringify(item)] = [];
                    assigned[section][JSON.stringify(item)].push(group._id);
                }
            }
        }
        return assigned;
    };
    Timetable.prototype.used = function (groups) {
        var len = groups.reduce(function (acc, reducer) {
            return acc + reducer.items.length;
        }, 1);
        var missing = this.getMissingItems(groups);
        var used = len - missing.reduce(function (acc, reducer) {
            return acc + reducer.missing.length;
        }, 1);
        return (used / len) * 100 + '%';
    };
    Timetable.prototype.nully = function () {
        var len = this.data.groups.length * this.data.days.length * this.data.periods.length;
        var used = this.data.groups.reduce(function (acc, red) {
            return acc + red.slots.reduce(function (accc, redd) {
                return accc + redd.reduce(function (acccc, reddd) {
                    return acccc += reddd ? 1 : 0;
                }, 0);
            }, 0);
        }, 0);
        return (used / len) * 100 + '%';
    };
    Timetable.prototype.hasIssues = function (groups) {
        var issues = this.getIssues(groups);
        return !!(issues.conflicts.length || issues.invalid.length || issues.missing.length);
    };
    return Timetable;
}());

exports.Timetable = Timetable;
