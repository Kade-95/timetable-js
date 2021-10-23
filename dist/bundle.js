/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/timetable.ts":
/*!********************************!*\
  !*** ./src/utils/timetable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timetable": () => (/* binding */ Timetable)
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
/* harmony export */   "Timetable": () => (/* reexport safe */ _utils_timetable__WEBPACK_IMPORTED_MODULE_0__.Timetable)
/* harmony export */ });
/* harmony import */ var _utils_timetable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/timetable */ "./src/utils/timetable.ts");


// require('../test')

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1ldGFibGUvLi9zcmMvdXRpbHMvdGltZXRhYmxlLnRzIiwid2VicGFjazovL3RpbWV0YWJsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1ldGFibGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RpbWV0YWJsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RpbWV0YWJsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpbWV0YWJsZS8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtJQUVJLG1CQUNXLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdkIsQ0FBQztJQUVMLDRCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsZ0NBQVksR0FBWixVQUFhLE1BQWdCO1FBQ3pCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFhLEVBQUUsT0FBTztZQUNuRCx1Q0FBVyxHQUFHLEdBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLEVBQUM7UUFDMUQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELG1DQUFlLEdBQWYsVUFBZ0IsTUFBZ0I7UUFDNUIsSUFBTSxV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QUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQzNxQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNMOEM7QUFPN0M7QUFFRCxxQkFBcUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9ncm91cC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29uZmxpY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5jb25mbGljdFwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmdyb3VwXCI7XHJcbmltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlU2xvdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLnNsb3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBkYXRhOiBJVGltZXRhYmxlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGdldFNsb3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ3JvdXBzLm1hcChnID0+IGcuc2xvdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzID0gZ3JvdXBzLnJlZHVjZSgoYWNjOiBzdHJpbmdbXSwgcmVkdWNlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgLi4ucmVkdWNlci5pdGVtcy5tYXAociA9PiByLmFzc2lnbmVlKV1cclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXNzaWduZWVzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWlzc2luZ0l0ZW1zKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhbGxNaXNzaW5nOiB7IF9pZDogc3RyaW5nLCBtaXNzaW5nOiBzdHJpbmdbXSB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGFsbE1pc3NpbmcucHVzaCh7IF9pZDogZ3JvdXAuX2lkLCBtaXNzaW5nOiB0aGlzLmdldEdyb3VwTWlzc2luZ0l0ZW1zKGdyb3VwLl9pZCwgaXRlbXMpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbE1pc3NpbmcuZmlsdGVyKGFsbSA9PiBhbG0ubWlzc2luZy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEludmFsaWRJdGVtcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYWxsSW52YWxpZDogeyBfaWQ6IHN0cmluZywgaW52YWxpZDogc3RyaW5nW10gfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBhbGxJbnZhbGlkLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgaW52YWxpZDogdGhpcy5nZXRHcm91cEludmFsaWRJdGVtcyhncm91cC5faWQsIGl0ZW1zKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxJbnZhbGlkLmZpbHRlcihhbG0gPT4gYWxtLmludmFsaWQubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5kYXRhLmdyb3Vwcy5maW5kKGMgPT4gYy5faWQudG9TdHJpbmcoKSA9PSBfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdHMoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcm91cChfaWQpPy5zbG90cyB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEFzc2lnbmVlcyhncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50KSBhc3NpZ25lZXMucHVzaChhc3NpZ25tZW50LmFzc2lnbmVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhc3NpZ25lZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RzQXNMaXN0KF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKSB8fCBbXTtcclxuICAgICAgICBjb25zdCBsaXN0ID0gc2xvdHMucmVkdWNlKChhY2MsIHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLnRdO1xyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBNaXNzaW5nSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IG1pc3Npbmc6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKCFzbG90c0FzTGlzdC5pbmNsdWRlcyhpKSkgbWlzc2luZy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pc3Npbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJbnZhbGlkSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IGludmFsaWQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2Ygc2xvdHNBc0xpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGkgJiYgIWl0ZW1zLmluY2x1ZGVzKGkpKSBpbnZhbGlkLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90SXRlbXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXM6IChzdHJpbmcgfCBudWxsKVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNsb3RzIG9mIHRoaXMuZ2V0U2xvdHMoKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSBpdGVtcy5wdXNoKHNsb3RzW2RdW3BdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChpdGVtcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEl0ZW0oX2lkOiBzdHJpbmcsIGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSByZXR1cm4gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RBc3NpZ25lZXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiB7IF9pZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nIHwgbnVsbCwgc2VjdGlvbjogc3RyaW5nLCBpdGVtOiBzdHJpbmcgfCBudWxsIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhnLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGcuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZXMucHVzaCh7IF9pZDogZy5faWQsIGFzc2lnbmVlOiBhc3NpZ25tZW50Py5hc3NpZ25lZSB8fCBudWxsLCBzZWN0aW9uOiBnLnNlY3Rpb24sIGl0ZW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVkU2xvdEFzc2lnbmVlcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHsgX2lkOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcgfCBudWxsLCBzZWN0aW9uOiBzdHJpbmcsIGl0ZW06IHN0cmluZyB8IG51bGwgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGcuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25lZSA9ICh0aGlzLmRhdGEuZ3JvdXBzLmZpbmQoYWcgPT4gYWcuX2lkID09IGcuX2lkKT8uYXNzaWduZWVzIGFzIChzdHJpbmcgfCBudWxsKVtdW10pW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZXMucHVzaCh7IF9pZDogZy5faWQsIGFzc2lnbmVlLCBzZWN0aW9uOiBnLnNlY3Rpb24sIGl0ZW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEFzc2lnbmVlKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIHJldHVybiBhc3NpZ25tZW50LmFzc2lnbmVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtU2xvdHMoaXRlbTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiB0aGlzLmRhdGEuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXRlbVNsb3QoX2lkOiBzdHJpbmcsIGl0ZW06IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzW2RheV1bcGVyaW9kXSA9PSBpdGVtKSByZXR1cm4gKHsgZGF5LCBwZXJpb2QsIF9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVTbG90cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudD8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90Q29uZmxpY3RzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3Qgc2xvdENvbmZsaWN0czogdHlwZW9mIGNvbmZsaWN0cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCBzQzogdHlwZW9mIGcgPSB7IF9pZDogZy5faWQsIGNvbmZsaWN0czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgZy5jb25mbGljdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLmRheSA9PSBkYXkgJiYgYy5wZXJpb2QgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc0MuY29uZmxpY3RzLnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsb3RDb25mbGljdHMucHVzaChzQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdENvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25mbGljdHMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogeyBfaWQ6IHN0cmluZywgY29uZmxpY3RzOiBUaW1ldGFibGVDb25mbGljdFtdIH1bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkOiB7IGl0ZW06IHN0cmluZywgYXNzaWduZWU6IHN0cmluZywgc2VjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBDb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNsb3RzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRHcm91cFNsb3RJdGVtKGRheSwgcGVyaW9kLCBncm91cC5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gdGhpcy5kYXRhLmFzc2lnbmVkID8gdGhpcy5kYXRhLmdyb3Vwcy5maW5kKGcgPT4gZy5faWQgPT0gZ3JvdXAuX2lkKT8uYXNzaWduZWVzW2RheV1bcGVyaW9kXSA6IHRoaXMuZ2V0R3JvdXBTbG90QXNzaWduZWUoZGF5LCBwZXJpb2QsIGdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRHcm91cEludmFsaWRJdGVtcyhncm91cC5faWQsIGdyb3VwSXRlbXMpLmluY2x1ZGVzKGl0ZW0pKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0/LmFzc2lnbmVlID09IGFzc2lnbmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0/Lml0ZW0gIT0gaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uc2VjdGlvbiAhPSBncm91cC5zZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBDb25mbGljdHMucHVzaCh7IGRheSwgcGVyaW9kLCBpdGVtLCBhc3NpZ25lZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0gPSB7IGFzc2lnbmVlLCBpdGVtLCBzZWN0aW9uOiBncm91cC5zZWN0aW9uIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbmZsaWN0cy5wdXNoKHsgX2lkOiBncm91cC5faWQsIGNvbmZsaWN0czogZ3JvdXBDb25mbGljdHMgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLmZpbHRlcihhbGMgPT4gYWxjLmNvbmZsaWN0cy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQ29uZmxpY3QoX2lkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpLmZpbmQoYyA9PiBjLl9pZCA9PSBfaWQpPy5jb25mbGljdHM7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtQ29uZmxpY3RzKGl0ZW06IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfaWQ6IGMuX2lkLCBjb25mbGljdHM6IGMuY29uZmxpY3RzLmZpbHRlcihjYyA9PiBjYy5pdGVtID09IGl0ZW0pIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWVDb25mbGljdHMoYXNzaWduZWU6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfaWQ6IGMuX2lkLCBjb25mbGljdHM6IGMuY29uZmxpY3RzLmZpbHRlcihjYyA9PiBjYy5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RDb25mbGljdHMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZSwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmRheSA9PSBkYXkgJiYgY2MucGVyaW9kID09IHBlcmlvZCkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc3N1ZXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLmdldE1pc3NpbmdJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGludmFsaWQgPSB0aGlzLmdldEludmFsaWRJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IG1pc3NpbmcsIGludmFsaWQsIGNvbmZsaWN0cyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXNzdWVzKGlkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBpc3N1ZXMgPSB0aGlzLmdldElzc3Vlcyhncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaXNzaW5nOiBpc3N1ZXMubWlzc2luZy5maW5kKG0gPT4gbS5faWQgPT0gaWQpLFxyXG4gICAgICAgICAgICBpbnZhbGlkOiBpc3N1ZXMuaW52YWxpZC5maW5kKG0gPT4gbS5faWQgPT0gaWQpLFxyXG4gICAgICAgICAgICBjb25mbGljdHM6IGlzc3Vlcy5jb25mbGljdHMuZmluZChtID0+IG0uX2lkID09IGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICBjb25zdCBkYXRhOiBJVGltZXRhYmxlID0geyAuLi50aGlzLmRhdGEgfTtcclxuICAgICAgICBjb25zdCB0aW1lVGFibGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSBhcyBJVGltZXRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aW1lVGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduR3JvdXBTbG90KGRheTogbnVtYmVyLCBwZXJpb2Q6IG51bWJlciwgaXRlbTogc3RyaW5nLCBfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IF9pZCk7XHJcblxyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGUoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1ldGFibGUuZ2V0R3JvdXBJbnZhbGlkSXRlbXMoX2lkLCBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCkpKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGl0ZW0gc2hvdWxkIG5vdCBiZSBhc3NpZ25lZCB0byB0aGlzIGdyb3VwXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBzbG90cyA9IHRpbWV0YWJsZS5nZXRHcm91cFNsb3RzKF9pZCk7XHJcbiAgICAgICAgc2xvdHNbZGF5XVtwZXJpb2RdID0gaXRlbTtcclxuXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gdGltZXRhYmxlLmRhdGEuZ3JvdXBzLm1hcChnID0+IHtcclxuICAgICAgICAgICAgaWYgKGcuX2lkID09IF9pZCkgZy5zbG90cyA9IHNsb3RzO1xyXG4gICAgICAgICAgICByZXR1cm4gZztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGltZXRhYmxlLmdldEdyb3VwQ29uZmxpY3QoX2lkLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkKT8uYXNzaWduZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHRoZUNvbmZsaWN0ID0gY29uZmxpY3RzPy5maW5kKGMgPT4gYy5hc3NpZ25lZSA9PSBhc3NpZ25lZSk7XHJcbiAgICAgICAgaWYgKHRoZUNvbmZsaWN0KSB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGl0ZW0gY3JlYXRlZCBhIGNvbmZsaWN0IGluIHRoaXMgZ3JvdXBcIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b21hdGUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZSh7IC4uLmRhdGEsIGFzc2lnbmVkOiBmYWxzZSwgbXVsdGlwbGU6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXNBc0xpc3QgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZWQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnOiBUaW1ldGFibGVHcm91cCA9IHsgX2lkOiBncm91cC5faWQsIHNsb3RzOiBbXSwgYXNzaWduZWVzOiBbXSB9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiB0aW1ldGFibGUuZGF0YS5kYXlzKSB7XHJcbiAgICAgICAgICAgICAgICBnLnNsb3RzW2RdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiB0aW1ldGFibGUuZGF0YS5wZXJpb2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZWQubGVuZ3RoID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFnLnNsb3RzW2RdW3BdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXNBc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc0FzTGlzdFtuXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlZC5pbmNsdWRlcyhpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IG4gPT0gaXRlbXNBc0xpc3QubGVuZ3RoIC0gMSA/IDAgOiBuICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2goZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlX2Fzc2lnbmUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZSh7IC4uLmRhdGEsIGFzc2lnbmVkOiB0cnVlLCBtdWx0aXBsZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsbEFzc2lnbmVlcyA9IHRoaXMuZ2V0QXNzaWduZWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gdHVybiBncm91cCBpdGVtcyBpbnRvIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIGFsbCBhc3NpZ25lZCBpbiBncm91cFxyXG4gICAgICAgICAgICBjb25zdCBncm91cEFzc2lnbmVlcyA9IEFycmF5LmZyb20obmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10sIGFzc2lnbmVlczogW10gfTtcclxuICAgICAgICAgICAgLy8gdXNlZCB0byBzdG9yZSBhc3NpZ25lZCBpdGVtc1xyXG4gICAgICAgICAgICBsZXQgYXNzaWduZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3JlIGNoZWNrZWQgaXRlbXMgdG8ga25vdyB3aGVuIGFsbCBpdGVtcyBoYXZlIGJlZW4gY2hlY2tlZFxyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiB0aW1ldGFibGUuZGF0YS5kYXlzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuYXNzaWduZWVzW2RdID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldEFzc2lnbmVkU2xvdEFzc2lnbmVlcyhkLCBwLCBncm91cHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhc3NpZ25lZTogc3RyaW5nID0gYWxsQXNzaWduZWVzLmZpbmQoYSA9PiBhc3NpZ25lZXMuZmluZChhc3MgPT4gYXNzLmFzc2lnbmVlID09IGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhc3NpZ25lZXMuZmluZChhc3MgPT4gYXNzLnNlY3Rpb24gPT0gZ3JvdXAuc2VjdGlvbik/LmFzc2lnbmVlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLmFzc2lnbmVlc1tkXVtwXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBydW4gYWdhaW4gaWYgaXRlbSBoYXMgYmVlbiBhc3NpZ25lZCBpbiBhIHJvdW5kIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkgJiYgY2hlY2tlZEl0ZW1zLmxlbmd0aCAhPSBpdGVtc0FzTGlzdC5sZW5ndGgpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLmFzc2lnbmVlc1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5hc3NpZ25lZXNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tBc3NpZ25lZXMuaW5jbHVkZXMoYXNzaWduZWUpKSBjaGVja0Fzc2lnbmVlcy5wdXNoKGFzc2lnbmVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2gobmV3R3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlTXVsdGlwbGUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZSh7IC4uLmRhdGEsIGFzc2lnbmVkOiBmYWxzZSwgbXVsdGlwbGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gdHVybiBncm91cCBpdGVtcyBpbnRvIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIGFsbCBhc3NpZ25lZCBpbiBncm91cFxyXG4gICAgICAgICAgICBjb25zdCBncm91cEFzc2lnbmVlcyA9IEFycmF5LmZyb20obmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10sIGFzc2lnbmVlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgYXNzaWduZWQgaXRlbXNcclxuICAgICAgICAgICAgbGV0IGFzc2lnbmVkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGl0ZW1zIHRvIGtub3cgd2hlbiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGNoZWNrZWRcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldFNsb3RBc3NpZ25lZXMoZCwgcCwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVuIGFnYWluIGlmIGl0ZW0gaGFzIGJlZW4gYXNzaWduZWQgaW4gYSByb3VuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pICYmIGNoZWNrZWRJdGVtcy5sZW5ndGggIT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQXNzaWduVG9TbG90KGl0ZW06IHN0cmluZywgZ3JvdXBJZDogc3RyaW5nLCBkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSB0aGlzLmdldFNsb3RBc3NpZ25lZXMoZGF5LCBwZXJpb2QsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IGdyb3VwSWQpO1xyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIHJldHVybiAhKGFzc2lnbmVkICYmIGFzc2lnbmVkLnNlY3Rpb24gIT0gZ3JvdXAuc2VjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbUFzc2lnbm1lbnRDb25mbGljdHMoaXRlbTogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBncm91cElkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0R3JvdXAoZ3JvdXBJZCk7XHJcbiAgICAgICAgY29uc3QgaWdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cElkKTtcclxuICAgICAgICBjb25zdCBpdGVtU2xvdHMgPSB0aGlzLmdldEl0ZW1TbG90cyhpdGVtKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZVNsb3RzID0gdGhpcy5nZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBpdGVtU2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYSBvZiBhc3NpZ25lZVNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS5kYXkgPT0gYS5kYXkgJiYgaS5wZXJpb2QgPT0gYS5wZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZyA9IGdyb3Vwcy5maW5kKGcgPT4gZy5faWQgPT0gYS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZz8uc2VjdGlvbiAhPSBpZ3JvdXA/LnNlY3Rpb24pIGNvbmZsaWN0cy5wdXNoKHsgaXRlbTogKGdyb3VwPy5zbG90cyBhcyBhbnkpW2EuZGF5XVthLnBlcmlvZF0gYXMgc3RyaW5nLCBkYXk6IGEuZGF5LCBwZXJpb2Q6IGEucGVyaW9kLCBfaWQ6IGFnPy5faWQgYXMgc3RyaW5nIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdXBTZWN0aW9ucyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnM6IElHcm91cFtdW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb25zIGFzIGFueSlbZ3JvdXAuc2VjdGlvbl0pIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dID0gW107XHJcbiAgICAgICAgICAgIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbmVkVG9TYW1lSW5TZWN0aW9uKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuZ3JvdXBTZWN0aW9ucyhncm91cHMpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZDogYW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBpbiBzZWN0aW9ucykge1xyXG4gICAgICAgICAgICBhc3NpZ25lZFtzZWN0aW9uXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2Ygc2VjdGlvbnNbc2VjdGlvbl0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZ3JvdXAuaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSkgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldLnB1c2goZ3JvdXAuX2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlZChncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgdXNlZCA9IGxlbiAtIG1pc3NpbmcucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIubWlzc2luZy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSlcclxuXHJcbiAgICAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuICAgIH1cclxuXHJcbiAgICBudWxseSgpIHtcclxuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmRhdGEuZ3JvdXBzLmxlbmd0aCAqIHRoaXMuZGF0YS5kYXlzLmxlbmd0aCAqIHRoaXMuZGF0YS5wZXJpb2RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlZCA9IHRoaXMuZGF0YS5ncm91cHMucmVkdWNlKChhY2MsIHJlZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgcmVkLnNsb3RzLnJlZHVjZSgoYWNjYywgcmVkZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2MgKyByZWRkLnJlZHVjZSgoYWNjY2MsIHJlZGRkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY2NjICs9IHJlZGRkID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gKHVzZWQgLyBsZW4pICogMTAwICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0lzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgaXNzdWVzID0gdGhpcy5nZXRJc3N1ZXMoZ3JvdXBzKTtcclxuICAgICAgICByZXR1cm4gISEoaXNzdWVzLmNvbmZsaWN0cy5sZW5ndGggfHwgaXNzdWVzLmludmFsaWQubGVuZ3RoIHx8IGlzc3Vlcy5taXNzaW5nLmxlbmd0aCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi9tb2RlbHMvdGltZXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGUgfSBmcm9tIFwiLi91dGlscy90aW1ldGFibGVcIjtcclxuaW1wb3J0IHsgSUdyb3VwIH0gZnJvbSAnLi9tb2RlbHMvZ3JvdXAuaW50ZXJmYWNlJ1xyXG5cclxuZXhwb3J0IHtcclxuICAgIFRpbWV0YWJsZSxcclxuICAgIElUaW1ldGFibGUsXHJcbiAgICBJR3JvdXBcclxufVxyXG5cclxuLy8gcmVxdWlyZSgnLi4vdGVzdCcpIl0sInNvdXJjZVJvb3QiOiIifQ==