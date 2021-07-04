/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/timetable.manager.ts":
/*!****************************************!*\
  !*** ./src/utils/timetable.manager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimetableManager": () => (/* binding */ TimetableManager)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var TimetableManager = /** @class */ (function () {
    function TimetableManager(data) {
        this.data = data;
    }
    TimetableManager.prototype.getSlots = function () {
        return this.data.groups.map(function (g) { return g.slots; });
    };
    TimetableManager.prototype.getAssignees = function (groups) {
        var assignees = groups.reduce(function (acc, reducer) {
            return __spreadArray(__spreadArray([], acc), reducer.items.map(function (r) { return r.assignee; }));
        }, []);
        return Array.from(new Set(assignees));
    };
    TimetableManager.prototype.getMissingItems = function (groups) {
        var allMissing = [];
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            var items = group.items.map(function (i) { return i._id; });
            allMissing.push({ _id: group._id, missing: this.getGroupMissingItems(group._id, items) });
        }
        return allMissing.filter(function (alm) { return alm.missing.length; });
    };
    TimetableManager.prototype.getInvalidItems = function (groups) {
        var allInvalid = [];
        for (var _i = 0, groups_2 = groups; _i < groups_2.length; _i++) {
            var group = groups_2[_i];
            var items = group.items.map(function (i) { return i._id; });
            allInvalid.push({ _id: group._id, invalid: this.getGroupInvalidItems(group._id, items) });
        }
        return allInvalid.filter(function (alm) { return alm.invalid.length; });
    };
    TimetableManager.prototype.getGroup = function (_id) {
        var group = this.data.groups.find(function (c) { return c._id.toString() == _id.toString(); });
        return group;
    };
    TimetableManager.prototype.getGroupSlots = function (_id) {
        var _a;
        return ((_a = this.getGroup(_id)) === null || _a === void 0 ? void 0 : _a.slots) || [];
    };
    TimetableManager.prototype.getGroupAssignees = function (group) {
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
    TimetableManager.prototype.getGroupSlotsAsList = function (_id) {
        var slots = this.getGroupSlots(_id) || [];
        var list = slots.reduce(function (acc, t) {
            return __spreadArray(__spreadArray([], acc), t);
        }, []);
        return list;
    };
    TimetableManager.prototype.getGroupMissingItems = function (_id, items) {
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var missing = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var i = items_1[_i];
            if (!slotsAsList.includes(i))
                missing.push(i);
        }
        return missing;
    };
    TimetableManager.prototype.getGroupInvalidItems = function (_id, items) {
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var invalid = [];
        for (var _i = 0, slotsAsList_1 = slotsAsList; _i < slotsAsList_1.length; _i++) {
            var i = slotsAsList_1[_i];
            if (i && !items.includes(i))
                invalid.push(i);
        }
        return invalid;
    };
    TimetableManager.prototype.getSlotItems = function (day, period) {
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
    TimetableManager.prototype.getGroupSlotItem = function (_id, day, period) {
        var slots = this.getGroupSlots(_id);
        for (var d in slots) {
            for (var p in slots[d]) {
                if (d == day && p == period)
                    return slots[d][p];
            }
        }
        return null;
    };
    TimetableManager.prototype.getSlotAssignees = function (day, period, groups) {
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
    TimetableManager.prototype.getAssignedSlotAssignees = function (day, period, groups) {
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
    TimetableManager.prototype.getGroupSlotAssignee = function (day, period, group) {
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
    TimetableManager.prototype.getItemSlots = function (item) {
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
    TimetableManager.prototype.getAssigneeSlots = function (assignee, groups) {
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
    TimetableManager.prototype.getGroupItemSlot = function (_id, item) {
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
    TimetableManager.prototype.getGroupAssigneeSlots = function (assignee, group) {
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
    TimetableManager.prototype.getSlotConflicts = function (day, period, groups) {
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
    TimetableManager.prototype.getConflicts = function (groups) {
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
    TimetableManager.prototype.getGroupConflict = function (_id, groups) {
        var _a;
        var conflicts = (_a = this.getConflicts(groups).find(function (c) { return c._id == _id; })) === null || _a === void 0 ? void 0 : _a.conflicts;
        return conflicts;
    };
    TimetableManager.prototype.getItemConflicts = function (item, groups) {
        var conflicts = this.getConflicts(groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.item == item; }) };
        });
    };
    TimetableManager.prototype.getAssigneeConflicts = function (assignee, groups) {
        var conflicts = this.getConflicts(groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.assignee == assignee; }) };
        });
    };
    TimetableManager.prototype.getAssigneeSlotConflicts = function (day, period, assignee, groups) {
        var conflicts = this.getAssigneeConflicts(assignee, groups);
        return conflicts.map(function (c) {
            return { _id: c._id, conflicts: c.conflicts.filter(function (cc) { return cc.day == day && cc.period == period; }) };
        });
    };
    TimetableManager.prototype.getIssues = function (groups) {
        var missing = this.getMissingItems(groups);
        var invalid = this.getInvalidItems(groups);
        var conflicts = this.getConflicts(groups);
        return { missing: missing, invalid: invalid, conflicts: conflicts };
    };
    TimetableManager.prototype.getGroupIssues = function (id, groups) {
        var issues = this.getIssues(groups);
        return {
            missing: issues.missing.find(function (m) { return m._id == id; }),
            invalid: issues.invalid.find(function (m) { return m._id == id; }),
            conflicts: issues.conflicts.find(function (m) { return m._id == id; })
        };
    };
    TimetableManager.prototype.clone = function () {
        var data = __assign({}, this.data);
        var timeTable = JSON.parse(JSON.stringify(data));
        return timeTable;
    };
    TimetableManager.prototype.assignGroupSlot = function (day, period, item, _id, groups) {
        var _a;
        var data = this.clone();
        var group = groups.find(function (g) { return g._id == _id; });
        if (!group)
            throw new Error('Group not found');
        var timetable = new TimetableManager(data);
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
    TimetableManager.prototype.automate = function (groups) {
        var data = this.clone();
        var timetable = new TimetableManager(__assign(__assign({}, data), { assigned: false, multiple: false }));
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
    TimetableManager.prototype.automate_assigne = function (groups) {
        var _a, _b;
        var data = this.clone();
        var timetable = new TimetableManager(__assign(__assign({}, data), { assigned: true, multiple: false }));
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
    TimetableManager.prototype.automateMultiple = function (groups) {
        var _a;
        var data = this.clone();
        var timetable = new TimetableManager(__assign(__assign({}, data), { assigned: false, multiple: true }));
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
    TimetableManager.prototype.canAssignToSlot = function (item, groupId, day, period, groups) {
        var _a;
        var assignees = this.getSlotAssignees(day, period, groups);
        var group = groups.find(function (g) { return g._id == groupId; });
        if (!group)
            throw new Error('Group not found');
        var assignee = (_a = group.items.find(function (i) { return i._id == item; })) === null || _a === void 0 ? void 0 : _a.assignee;
        var assigned = assignees.find(function (a) { return a.assignee == assignee; });
        return !(assigned && assigned.section != group.section);
    };
    TimetableManager.prototype.itemAssignmentConflicts = function (item, assignee, groupId, groups) {
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
    TimetableManager.prototype.groupSections = function (groups) {
        var sections = [];
        for (var _i = 0, groups_8 = groups; _i < groups_8.length; _i++) {
            var group = groups_8[_i];
            if (!sections[group.section])
                sections[group.section] = [];
            sections[group.section].push(group);
        }
        return sections;
    };
    TimetableManager.prototype.assignedToSameInSection = function (groups) {
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
    TimetableManager.prototype.used = function (groups) {
        var len = groups.reduce(function (acc, reducer) {
            return acc + reducer.items.length;
        }, 1);
        var missing = this.getMissingItems(groups);
        var used = len - missing.reduce(function (acc, reducer) {
            return acc + reducer.missing.length;
        }, 1);
        return (used / len) * 100 + '%';
    };
    TimetableManager.prototype.nully = function () {
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
    TimetableManager.prototype.hasIssues = function (groups) {
        var issues = this.getIssues(groups);
        return !!(issues.conflicts.length || issues.invalid.length || issues.missing.length);
    };
    return TimetableManager;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimetableManager": () => (/* reexport safe */ _utils_timetable_manager__WEBPACK_IMPORTED_MODULE_0__.TimetableManager)
/* harmony export */ });
/* harmony import */ var _utils_timetable_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/timetable.manager */ "./src/utils/timetable.manager.ts");


// require('../test')

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci8uL3NyYy91dGlscy90aW1ldGFibGUubWFuYWdlci50cyIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGltZXRhYmxlLW1hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpbWV0YWJsZS1tYW5hZ2VyLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BO0lBRUksMEJBQ1csSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN2QixDQUFDO0lBRUwsbUNBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsTUFBZ0I7UUFDekIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQWEsRUFBRSxPQUFPO1lBQ25ELHVDQUFXLEdBQUcsR0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsRUFBQztRQUMxRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMs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SSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7VUMzcUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTDZEO0FBTzVEO0FBRUQscUJBQXFCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvZ3JvdXAuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUNvbmZsaWN0IH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuY29uZmxpY3RcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5ncm91cFwiO1xyXG5pbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZVNsb3QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5zbG90XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlTWFuYWdlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGRhdGE6IElUaW1ldGFibGVcclxuICAgICkgeyB9XHJcblxyXG4gICAgZ2V0U2xvdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5ncm91cHMubWFwKGcgPT4gZy5zbG90cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWVzKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSBncm91cHMucmVkdWNlKChhY2M6IHN0cmluZ1tdLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCAuLi5yZWR1Y2VyLml0ZW1zLm1hcChyID0+IHIuYXNzaWduZWUpXVxyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhc3NpZ25lZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNaXNzaW5nSXRlbXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFsbE1pc3Npbmc6IHsgX2lkOiBzdHJpbmcsIG1pc3Npbmc6IHN0cmluZ1tdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgYWxsTWlzc2luZy5wdXNoKHsgX2lkOiBncm91cC5faWQsIG1pc3Npbmc6IHRoaXMuZ2V0R3JvdXBNaXNzaW5nSXRlbXMoZ3JvdXAuX2lkLCBpdGVtcykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsTWlzc2luZy5maWx0ZXIoYWxtID0+IGFsbS5taXNzaW5nLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW52YWxpZEl0ZW1zKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhbGxJbnZhbGlkOiB7IF9pZDogc3RyaW5nLCBpbnZhbGlkOiBzdHJpbmdbXSB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGFsbEludmFsaWQucHVzaCh7IF9pZDogZ3JvdXAuX2lkLCBpbnZhbGlkOiB0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgaXRlbXMpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbEludmFsaWQuZmlsdGVyKGFsbSA9PiBhbG0uaW52YWxpZC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmRhdGEuZ3JvdXBzLmZpbmQoYyA9PiBjLl9pZC50b1N0cmluZygpID09IF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90cyhfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwKF9pZCk/LnNsb3RzIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVzKGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIGFzc2lnbmVlcy5wdXNoKGFzc2lnbm1lbnQuYXNzaWduZWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFzc2lnbmVlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdHNBc0xpc3QoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhfaWQpIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBzbG90cy5yZWR1Y2UoKGFjYywgdCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgLi4udF07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cE1pc3NpbmdJdGVtcyhfaWQ6IHN0cmluZywgaXRlbXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzQXNMaXN0ID0gdGhpcy5nZXRHcm91cFNsb3RzQXNMaXN0KF9pZCk7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZzogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgICBpZiAoIXNsb3RzQXNMaXN0LmluY2x1ZGVzKGkpKSBtaXNzaW5nLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWlzc2luZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEludmFsaWRJdGVtcyhfaWQ6IHN0cmluZywgaXRlbXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzQXNMaXN0ID0gdGhpcy5nZXRHcm91cFNsb3RzQXNMaXN0KF9pZCk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBzbG90c0FzTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaSAmJiAhaXRlbXMuaW5jbHVkZXMoaSkpIGludmFsaWQucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RJdGVtcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBpdGVtczogKHN0cmluZyB8IG51bGwpW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2xvdHMgb2YgdGhpcy5nZXRTbG90cygpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIGl0ZW1zLnB1c2goc2xvdHNbZF1bcF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGl0ZW1zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90SXRlbShfaWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHJldHVybiBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdEFzc2lnbmVlcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHsgX2lkOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcgfCBudWxsLCBzZWN0aW9uOiBzdHJpbmcsIGl0ZW06IHN0cmluZyB8IG51bGwgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGcuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZy5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlcy5wdXNoKHsgX2lkOiBnLl9pZCwgYXNzaWduZWU6IGFzc2lnbm1lbnQ/LmFzc2lnbmVlIHx8IG51bGwsIHNlY3Rpb246IGcuc2VjdGlvbiwgaXRlbSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NpZ25lZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWRTbG90QXNzaWduZWVzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlczogeyBfaWQ6IHN0cmluZywgYXNzaWduZWU6IHN0cmluZyB8IG51bGwsIHNlY3Rpb246IHN0cmluZywgaXRlbTogc3RyaW5nIHwgbnVsbCB9W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZyBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZy5faWQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gKHRoaXMuZGF0YS5ncm91cHMuZmluZChhZyA9PiBhZy5faWQgPT0gZy5faWQpPy5hc3NpZ25lZXMgYXMgKHN0cmluZyB8IG51bGwpW11bXSlbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlcy5wdXNoKHsgX2lkOiBnLl9pZCwgYXNzaWduZWUsIHNlY3Rpb246IGcuc2VjdGlvbiwgaXRlbSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NpZ25lZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90QXNzaWduZWUoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudCkgcmV0dXJuIGFzc2lnbm1lbnQuYXNzaWduZWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1TbG90cyhpdGVtOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHRoaXMuZGF0YS5ncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc1tkYXldW3BlcmlvZF0gPT0gaXRlbSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdHMoYXNzaWduZWU6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc1tkYXldW3BlcmlvZF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQ/LmFzc2lnbmVlID09IGFzc2lnbmVlKSBzbG90cy5wdXNoKHsgZGF5LCBwZXJpb2QsIF9pZDogZ3JvdXAuX2lkIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJdGVtU2xvdChfaWQ6IHN0cmluZywgaXRlbTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhfaWQpO1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHJldHVybiAoeyBkYXksIHBlcmlvZCwgX2lkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICBmb3IgKGxldCBkYXkgaW4gcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc1tkYXldW3BlcmlvZF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RDb25mbGljdHMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBzbG90Q29uZmxpY3RzOiB0eXBlb2YgY29uZmxpY3RzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgY29uZmxpY3RzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNDOiB0eXBlb2YgZyA9IHsgX2lkOiBnLl9pZCwgY29uZmxpY3RzOiBbXSB9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiBnLmNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuZGF5ID09IGRheSAmJiBjLnBlcmlvZCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzQy5jb25mbGljdHMucHVzaChjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2xvdENvbmZsaWN0cy5wdXNoKHNDKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90Q29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbmZsaWN0cyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzOiB7IF9pZDogc3RyaW5nLCBjb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gfVtdID0gW107XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQ6IHsgaXRlbTogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBzZWN0aW9uOiBzdHJpbmcgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCBncm91cENvbmZsaWN0czogVGltZXRhYmxlQ29uZmxpY3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc2xvdHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldEdyb3VwU2xvdEl0ZW0oZGF5LCBwZXJpb2QsIGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWUgPSB0aGlzLmRhdGEuYXNzaWduZWQgPyB0aGlzLmRhdGEuZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cC5faWQpPy5hc3NpZ25lZXNbZGF5XVtwZXJpb2RdIDogdGhpcy5nZXRHcm91cFNsb3RBc3NpZ25lZShkYXksIHBlcmlvZCwgZ3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXNzaWduZWUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgZ3JvdXBJdGVtcykuaW5jbHVkZXMoaXRlbSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uaXRlbSAhPSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cENvbmZsaWN0cy5wdXNoKHsgZGF5LCBwZXJpb2QsIGl0ZW0sIGFzc2lnbmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXSA9IHsgYXNzaWduZWUsIGl0ZW0sIHNlY3Rpb246IGdyb3VwLnNlY3Rpb24gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgY29uZmxpY3RzOiBncm91cENvbmZsaWN0cyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMuZmlsdGVyKGFsYyA9PiBhbGMuY29uZmxpY3RzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBDb25mbGljdChfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3VwcykuZmluZChjID0+IGMuX2lkID09IF9pZCk/LmNvbmZsaWN0cztcclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db25mbGljdHMoaXRlbTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLml0ZW0gPT0gaXRlbSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmFzc2lnbmVlID09IGFzc2lnbmVlKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdENvbmZsaWN0cyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldEFzc2lnbmVlQ29uZmxpY3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuZGF5ID09IGRheSAmJiBjYy5wZXJpb2QgPT0gcGVyaW9kKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHRoaXMuZ2V0SW52YWxpZEl0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWlzc2luZywgaW52YWxpZCwgY29uZmxpY3RzIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJc3N1ZXMoaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Npbmc6IGlzc3Vlcy5taXNzaW5nLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGludmFsaWQ6IGlzc3Vlcy5pbnZhbGlkLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGNvbmZsaWN0czogaXNzdWVzLmNvbmZsaWN0cy5maW5kKG0gPT4gbS5faWQgPT0gaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IElUaW1ldGFibGUgPSB7IC4uLnRoaXMuZGF0YSB9O1xyXG4gICAgICAgIGNvbnN0IHRpbWVUYWJsZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpIGFzIElUaW1ldGFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRpbWVUYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25Hcm91cFNsb3QoZGF5OiBudW1iZXIsIHBlcmlvZDogbnVtYmVyLCBpdGVtOiBzdHJpbmcsIF9pZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwcy5maW5kKGcgPT4gZy5faWQgPT0gX2lkKTtcclxuXHJcbiAgICAgICAgaWYgKCFncm91cCkgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBub3QgZm91bmQnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZU1hbmFnZXIoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1ldGFibGUuZ2V0R3JvdXBJbnZhbGlkSXRlbXMoX2lkLCBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGl0ZW0gc2hvdWxkIG5vdCBiZSBhc3NpZ25lZCB0byB0aGlzIGdyb3VwXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBzbG90cyA9IHRpbWV0YWJsZS5nZXRHcm91cFNsb3RzKF9pZCk7XHJcbiAgICAgICAgc2xvdHNbZGF5XVtwZXJpb2RdID0gaXRlbTtcclxuXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gdGltZXRhYmxlLmRhdGEuZ3JvdXBzLm1hcChnID0+IHtcclxuICAgICAgICAgICAgaWYgKGcuX2lkID09IF9pZCkgZy5zbG90cyA9IHNsb3RzO1xyXG4gICAgICAgICAgICByZXR1cm4gZztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGltZXRhYmxlLmdldEdyb3VwQ29uZmxpY3QoX2lkLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkKT8uYXNzaWduZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHRoZUNvbmZsaWN0ID0gY29uZmxpY3RzPy5maW5kKGMgPT4gYy5hc3NpZ25lZSA9PSBhc3NpZ25lZSk7XHJcbiAgICAgICAgaWYgKHRoZUNvbmZsaWN0KSB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGl0ZW0gY3JlYXRlZCBhIGNvbmZsaWN0IGluIHRoaXMgZ3JvdXBcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b21hdGUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZU1hbmFnZXIoeyAuLi5kYXRhLCBhc3NpZ25lZDogZmFsc2UsIG11bHRpcGxlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZzogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10sIGFzc2lnbmVlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgZy5zbG90c1tkXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VkLmxlbmd0aCA9PSBpdGVtc0FzTGlzdC5sZW5ndGgpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghZy5zbG90c1tkXVtwXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWQuaW5jbHVkZXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCAtIDEgPyAwIDogbiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3Vwcy5wdXNoKGcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZV9hc3NpZ25lKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKHsgLi4uZGF0YSwgYXNzaWduZWQ6IHRydWUsIG11bHRpcGxlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgYWxsQXNzaWduZWVzID0gdGhpcy5nZXRBc3NpZ25lZXMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgLy90cnVuY2F0ZSBncm91cHNcclxuICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyB0dXJuIGdyb3VwIGl0ZW1zIGludG8gYSBmbGF0IGxpc3RcclxuICAgICAgICAgICAgY29uc3QgaXRlbXNBc0xpc3QgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2YgYWxsIGFzc2lnbmVkIGluIGdyb3VwXHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwQXNzaWduZWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGdyb3VwLml0ZW1zLm1hcChpdCA9PiBpdC5hc3NpZ25lZSkpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwOiBUaW1ldGFibGVHcm91cCA9IHsgX2lkOiBncm91cC5faWQsIHNsb3RzOiBbXSwgYXNzaWduZWVzOiBbXSB9O1xyXG4gICAgICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIGFzc2lnbmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGxldCBhc3NpZ25lZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBpdGVtcyB0byBrbm93IHdoZW4gYWxsIGl0ZW1zIGhhdmUgYmVlbiBjaGVja2VkXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHRpbWV0YWJsZS5kYXRhLmRheXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdID0gW107XHJcbiAgICAgICAgICAgICAgICBuZXdHcm91cC5hc3NpZ25lZXNbZF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIGNoZWNrZWQgYXNzaWduZWVzIHRvIGtub3cgd2hlbiBhbGwgYXNzaWduZWVzIGhhdmUgYmVlbiBjaGVja2VkIGFuZCBlc2NhcGUgaW5maW5pdGUgbG9vcFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tBc3NpZ25lZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiB0aW1ldGFibGUuZGF0YS5wZXJpb2RzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBhbGwgYXNzaWduZWQgdG8gdGhpcyBwYXJ0aWN1bGFyIHNsb3RcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSB0aW1ldGFibGUuZ2V0QXNzaWduZWRTbG90QXNzaWduZWVzKGQsIHAsIGdyb3Vwcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2lnbmVlOiBzdHJpbmcgPSBhbGxBc3NpZ25lZXMuZmluZChhID0+IGFzc2lnbmVlcy5maW5kKGFzcyA9PiBhc3MuYXNzaWduZWUgPT0gYSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGFzc2lnbmVlcy5maW5kKGFzcyA9PiBhc3Muc2VjdGlvbiA9PSBncm91cC5zZWN0aW9uKT8uYXNzaWduZWUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuYXNzaWduZWVzW2RdW3BdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aWxsIGFzc2lnbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFuZXdHcm91cC5zbG90c1tkXVtwXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJ1bmNhdGUgYXNzaWduZWRJdGVtcyBpZiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGFzc2lnbmVkIHRvIG1ha2Ugc3VyZSBubyBpdGVtIGhhcyBtb3JlIGhlaXJhY2h5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmxlbmd0aCA9PSBpdGVtc0FzTGlzdC5sZW5ndGgpIGFzc2lnbmVkSXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBsb29wIGlmIG5vYm9keSBjYW4gYmUgYXNzaWduZWQgdG8gdGhpcyBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncm91cEFzc2lnbmVlcy5sZW5ndGggPT0gY2hlY2tBc3NpZ25lZXMubGVuZ3RoKSBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGEgcmFuZG9tIHBvaW50IGluIHRoZSBpdGVtcyBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXNBc0xpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtc0FzTGlzdFtuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk/LmFzc2lnbmVlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBjaGVja2VkSXRlbXMucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdobyB3YXMgYXNzaWduZWQgdG8gdGhpcyBzbG90P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VkU2xvdCA9IGFzc2lnbmVlcy5maW5kKGEgPT4gYS5hc3NpZ25lZSA9PSBhc3NpZ25lZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBzbG90IGZyZWU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlZFNsb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJ1biBhZ2FpbiBpZiBpdGVtIGhhcyBiZWVuIGFzc2lnbmVkIGluIGEgcm91bmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSAmJiBjaGVja2VkSXRlbXMubGVuZ3RoICE9IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuYXNzaWduZWVzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXNzaWduZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgYXNzaWduZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbG90IGlzIHVzZWQgYW5kIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgaXRlbSBpcyB0aGUgc2FtZSB3aXRoIHRoZSBzbG90IGl0ZW0gYW5kIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZ3JvdXBzIGFyZSBpbiB0aGUgc2FtZSBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVzZWRTbG90LnNlY3Rpb24gPT0gZ3JvdXAuc2VjdGlvbiAmJiB1c2VkU2xvdC5pdGVtID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLmFzc2lnbmVlc1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b21hdGVNdWx0aXBsZShncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcih7IC4uLmRhdGEsIGFzc2lnbmVkOiBmYWxzZSwgbXVsdGlwbGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gdHVybiBncm91cCBpdGVtcyBpbnRvIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIGFsbCBhc3NpZ25lZCBpbiBncm91cFxyXG4gICAgICAgICAgICBjb25zdCBncm91cEFzc2lnbmVlcyA9IEFycmF5LmZyb20obmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10sIGFzc2lnbmVlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgYXNzaWduZWQgaXRlbXNcclxuICAgICAgICAgICAgbGV0IGFzc2lnbmVkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGl0ZW1zIHRvIGtub3cgd2hlbiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGNoZWNrZWRcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldFNsb3RBc3NpZ25lZXMoZCwgcCwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVuIGFnYWluIGlmIGl0ZW0gaGFzIGJlZW4gYXNzaWduZWQgaW4gYSByb3VuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pICYmIGNoZWNrZWRJdGVtcy5sZW5ndGggIT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQXNzaWduVG9TbG90KGl0ZW06IHN0cmluZywgZ3JvdXBJZDogc3RyaW5nLCBkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSB0aGlzLmdldFNsb3RBc3NpZ25lZXMoZGF5LCBwZXJpb2QsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IGdyb3VwSWQpO1xyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIHJldHVybiAhKGFzc2lnbmVkICYmIGFzc2lnbmVkLnNlY3Rpb24gIT0gZ3JvdXAuc2VjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbUFzc2lnbm1lbnRDb25mbGljdHMoaXRlbTogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBncm91cElkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0R3JvdXAoZ3JvdXBJZCk7XHJcbiAgICAgICAgY29uc3QgaWdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cElkKTtcclxuICAgICAgICBjb25zdCBpdGVtU2xvdHMgPSB0aGlzLmdldEl0ZW1TbG90cyhpdGVtKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZVNsb3RzID0gdGhpcy5nZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBpdGVtU2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYSBvZiBhc3NpZ25lZVNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS5kYXkgPT0gYS5kYXkgJiYgaS5wZXJpb2QgPT0gYS5wZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZyA9IGdyb3Vwcy5maW5kKGcgPT4gZy5faWQgPT0gYS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZz8uc2VjdGlvbiAhPSBpZ3JvdXA/LnNlY3Rpb24pIGNvbmZsaWN0cy5wdXNoKHsgaXRlbTogKGdyb3VwPy5zbG90cyBhcyBhbnkpW2EuZGF5XVthLnBlcmlvZF0gYXMgc3RyaW5nLCBkYXk6IGEuZGF5LCBwZXJpb2Q6IGEucGVyaW9kLCBfaWQ6IGFnPy5faWQgYXMgc3RyaW5nIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdXBTZWN0aW9ucyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnM6IElHcm91cFtdW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb25zIGFzIGFueSlbZ3JvdXAuc2VjdGlvbl0pIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dID0gW107XHJcbiAgICAgICAgICAgIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbmVkVG9TYW1lSW5TZWN0aW9uKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuZ3JvdXBTZWN0aW9ucyhncm91cHMpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZDogYW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBpbiBzZWN0aW9ucykge1xyXG4gICAgICAgICAgICBhc3NpZ25lZFtzZWN0aW9uXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2Ygc2VjdGlvbnNbc2VjdGlvbl0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZ3JvdXAuaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSkgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldLnB1c2goZ3JvdXAuX2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlZChncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgdXNlZCA9IGxlbiAtIG1pc3NpbmcucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIubWlzc2luZy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSlcclxuXHJcbiAgICAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuICAgIH1cclxuXHJcbiAgICBudWxseSgpIHtcclxuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmRhdGEuZ3JvdXBzLmxlbmd0aCAqIHRoaXMuZGF0YS5kYXlzLmxlbmd0aCAqIHRoaXMuZGF0YS5wZXJpb2RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlZCA9IHRoaXMuZGF0YS5ncm91cHMucmVkdWNlKChhY2MsIHJlZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgcmVkLnNsb3RzLnJlZHVjZSgoYWNjYywgcmVkZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2MgKyByZWRkLnJlZHVjZSgoYWNjY2MsIHJlZGRkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY2NjICs9IHJlZGRkID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gKHVzZWQgLyBsZW4pICogMTAwICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0lzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgaXNzdWVzID0gdGhpcy5nZXRJc3N1ZXMoZ3JvdXBzKTtcclxuICAgICAgICByZXR1cm4gISEoaXNzdWVzLmNvbmZsaWN0cy5sZW5ndGggfHwgaXNzdWVzLmludmFsaWQubGVuZ3RoIHx8IGlzc3Vlcy5taXNzaW5nLmxlbmd0aCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi9tb2RlbHMvdGltZXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVNYW5hZ2VyIH0gZnJvbSBcIi4vdXRpbHMvdGltZXRhYmxlLm1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSUdyb3VwIH0gZnJvbSAnLi9tb2RlbHMvZ3JvdXAuaW50ZXJmYWNlJ1xyXG5cclxuZXhwb3J0IHtcclxuICAgIFRpbWV0YWJsZU1hbmFnZXIsXHJcbiAgICBJVGltZXRhYmxlLFxyXG4gICAgSUdyb3VwXHJcbn1cclxuXHJcbi8vIHJlcXVpcmUoJy4uL3Rlc3QnKSJdLCJzb3VyY2VSb290IjoiIn0=