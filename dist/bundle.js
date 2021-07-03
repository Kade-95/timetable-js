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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci8uL3NyYy91dGlscy90aW1ldGFibGUubWFuYWdlci50cyIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGltZXRhYmxlLW1hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpbWV0YWJsZS1tYW5hZ2VyLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BO0lBRUksMEJBQ1csSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN2QixDQUFDO0lBRUwsbUNBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsTUFBZ0I7UUFDekIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQWEsRUFBRSxPQUFPO1lBQ25ELHVDQUFXLEdBQUcsR0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsRUFBQztRQUMxRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMs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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFPNUQ7QUFFRCxxQkFBcUIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9ncm91cC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29uZmxpY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5jb25mbGljdFwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmdyb3VwXCI7XHJcbmltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlU2xvdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLnNsb3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGVNYW5hZ2VyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZGF0YTogSVRpbWV0YWJsZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBnZXRTbG90cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdyb3Vwcy5tYXAoZyA9PiBnLnNsb3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlcyA9IGdyb3Vwcy5yZWR1Y2UoKGFjYzogc3RyaW5nW10sIHJlZHVjZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLnJlZHVjZXIuaXRlbXMubWFwKHIgPT4gci5hc3NpZ25lZSldXHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFzc2lnbmVlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1pc3NpbmdJdGVtcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYWxsTWlzc2luZzogeyBfaWQ6IHN0cmluZywgbWlzc2luZzogc3RyaW5nW10gfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBhbGxNaXNzaW5nLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgbWlzc2luZzogdGhpcy5nZXRHcm91cE1pc3NpbmdJdGVtcyhncm91cC5faWQsIGl0ZW1zKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxNaXNzaW5nLmZpbHRlcihhbG0gPT4gYWxtLm1pc3NpbmcubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnZhbGlkSXRlbXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFsbEludmFsaWQ6IHsgX2lkOiBzdHJpbmcsIGludmFsaWQ6IHN0cmluZ1tdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgYWxsSW52YWxpZC5wdXNoKHsgX2lkOiBncm91cC5faWQsIGludmFsaWQ6IHRoaXMuZ2V0R3JvdXBJbnZhbGlkSXRlbXMoZ3JvdXAuX2lkLCBpdGVtcykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsSW52YWxpZC5maWx0ZXIoYWxtID0+IGFsbS5pbnZhbGlkLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXAoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZGF0YS5ncm91cHMuZmluZChjID0+IGMuX2lkLnRvU3RyaW5nKCkgPT0gX2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RzKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXAoX2lkKT8uc2xvdHMgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBBc3NpZ25lZXMoZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudCkgYXNzaWduZWVzLnB1c2goYXNzaWdubWVudC5hc3NpZ25lZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXNzaWduZWVzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCkgfHwgW107XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHNsb3RzLnJlZHVjZSgoYWNjLCB0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCAuLi50XTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwTWlzc2luZ0l0ZW1zKF9pZDogc3RyaW5nLCBpdGVtczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHNBc0xpc3QgPSB0aGlzLmdldEdyb3VwU2xvdHNBc0xpc3QoX2lkKTtcclxuICAgICAgICBjb25zdCBtaXNzaW5nOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghc2xvdHNBc0xpc3QuaW5jbHVkZXMoaSkpIG1pc3NpbmcucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtaXNzaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSW52YWxpZEl0ZW1zKF9pZDogc3RyaW5nLCBpdGVtczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHNBc0xpc3QgPSB0aGlzLmdldEdyb3VwU2xvdHNBc0xpc3QoX2lkKTtcclxuICAgICAgICBjb25zdCBpbnZhbGlkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIG9mIHNsb3RzQXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpICYmICFpdGVtcy5pbmNsdWRlcyhpKSkgaW52YWxpZC5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGludmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdEl0ZW1zKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zOiAoc3RyaW5nIHwgbnVsbClbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzbG90cyBvZiB0aGlzLmdldFNsb3RzKCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkgaXRlbXMucHVzaChzbG90c1tkXVtwXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoaXRlbXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RJdGVtKF9pZDogc3RyaW5nLCBkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhfaWQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkgcmV0dXJuIHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90QXNzaWduZWVzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlczogeyBfaWQ6IHN0cmluZywgYXNzaWduZWU6IHN0cmluZyB8IG51bGwsIHNlY3Rpb246IHN0cmluZywgaXRlbTogc3RyaW5nIHwgbnVsbCB9W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZyBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZy5faWQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBnLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWVzLnB1c2goeyBfaWQ6IGcuX2lkLCBhc3NpZ25lZTogYXNzaWdubWVudD8uYXNzaWduZWUgfHwgbnVsbCwgc2VjdGlvbjogZy5zZWN0aW9uLCBpdGVtIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZFNsb3RBc3NpZ25lZXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiB7IF9pZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nIHwgbnVsbCwgc2VjdGlvbjogc3RyaW5nLCBpdGVtOiBzdHJpbmcgfCBudWxsIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhnLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWUgPSAodGhpcy5kYXRhLmdyb3Vwcy5maW5kKGFnID0+IGFnLl9pZCA9PSBnLl9pZCk/LmFzc2lnbmVlcyBhcyAoc3RyaW5nIHwgbnVsbClbXVtdKVtkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWVzLnB1c2goeyBfaWQ6IGcuX2lkLCBhc3NpZ25lZSwgc2VjdGlvbjogZy5zZWN0aW9uLCBpdGVtIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RBc3NpZ25lZShkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50KSByZXR1cm4gYXNzaWdubWVudC5hc3NpZ25lZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbVNsb3RzKGl0ZW06IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgdGhpcy5kYXRhLmdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgaW4gcykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzW2RheV1bcGVyaW9kXSA9PSBpdGVtKSBzbG90cy5wdXNoKHsgZGF5LCBwZXJpb2QsIF9pZDogZ3JvdXAuX2lkIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWVTbG90cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXkgaW4gcykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzW2RheV1bcGVyaW9kXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudD8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEl0ZW1TbG90KF9pZDogc3RyaW5nLCBpdGVtOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCk7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkYXkgaW4gcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc1tkYXldW3BlcmlvZF0gPT0gaXRlbSkgcmV0dXJuICh7IGRheSwgcGVyaW9kLCBfaWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEFzc2lnbmVlU2xvdHMoYXNzaWduZWU6IHN0cmluZywgZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzW2RheV1bcGVyaW9kXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQ/LmFzc2lnbmVlID09IGFzc2lnbmVlKSBzbG90cy5wdXNoKHsgZGF5LCBwZXJpb2QsIF9pZDogZ3JvdXAuX2lkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdENvbmZsaWN0cyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IHNsb3RDb25mbGljdHM6IHR5cGVvZiBjb25mbGljdHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZyBvZiBjb25mbGljdHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc0M6IHR5cGVvZiBnID0geyBfaWQ6IGcuX2lkLCBjb25mbGljdHM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIGcuY29uZmxpY3RzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYy5kYXkgPT0gZGF5ICYmIGMucGVyaW9kID09IHBlcmlvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNDLmNvbmZsaWN0cy5wdXNoKGMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzbG90Q29uZmxpY3RzLnB1c2goc0MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RDb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29uZmxpY3RzKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHM6IHsgX2lkOiBzdHJpbmcsIGNvbmZsaWN0czogVGltZXRhYmxlQ29uZmxpY3RbXSB9W10gPSBbXTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZDogeyBpdGVtOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcsIHNlY3Rpb246IHN0cmluZyB9W10gPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBDb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNsb3RzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRHcm91cFNsb3RJdGVtKGRheSwgcGVyaW9kLCBncm91cC5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gdGhpcy5kYXRhLmFzc2lnbmVkID8gdGhpcy5kYXRhLmdyb3Vwcy5maW5kKGcgPT4gZy5faWQgPT0gZ3JvdXAuX2lkKT8uYXNzaWduZWVzW2RheV1bcGVyaW9kXSA6IHRoaXMuZ2V0R3JvdXBTbG90QXNzaWduZWUoZGF5LCBwZXJpb2QsIGdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRHcm91cEludmFsaWRJdGVtcyhncm91cC5faWQsIGdyb3VwSXRlbXMpLmluY2x1ZGVzKGl0ZW0pKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0/LmFzc2lnbmVlID09IGFzc2lnbmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0/Lml0ZW0gIT0gaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uc2VjdGlvbiAhPSBncm91cC5zZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBDb25mbGljdHMucHVzaCh7IGRheSwgcGVyaW9kLCBpdGVtLCBhc3NpZ25lZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0gPSB7IGFzc2lnbmVlLCBpdGVtLCBzZWN0aW9uOiBncm91cC5zZWN0aW9uIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbmZsaWN0cy5wdXNoKHsgX2lkOiBncm91cC5faWQsIGNvbmZsaWN0czogZ3JvdXBDb25mbGljdHMgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLmZpbHRlcihhbGMgPT4gYWxjLmNvbmZsaWN0cy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQ29uZmxpY3QoX2lkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpLmZpbmQoYyA9PiBjLl9pZCA9PSBfaWQpPy5jb25mbGljdHM7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtQ29uZmxpY3RzKGl0ZW06IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfaWQ6IGMuX2lkLCBjb25mbGljdHM6IGMuY29uZmxpY3RzLmZpbHRlcihjYyA9PiBjYy5pdGVtID09IGl0ZW0pIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWVDb25mbGljdHMoYXNzaWduZWU6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfaWQ6IGMuX2lkLCBjb25mbGljdHM6IGMuY29uZmxpY3RzLmZpbHRlcihjYyA9PiBjYy5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RDb25mbGljdHMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZSwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmRheSA9PSBkYXkgJiYgY2MucGVyaW9kID09IHBlcmlvZCkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc3N1ZXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLmdldE1pc3NpbmdJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGludmFsaWQgPSB0aGlzLmdldEludmFsaWRJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IG1pc3NpbmcsIGludmFsaWQsIGNvbmZsaWN0cyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXNzdWVzKGlkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBpc3N1ZXMgPSB0aGlzLmdldElzc3Vlcyhncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaXNzaW5nOiBpc3N1ZXMubWlzc2luZy5maW5kKG0gPT4gbS5faWQgPT0gaWQpLFxyXG4gICAgICAgICAgICBpbnZhbGlkOiBpc3N1ZXMuaW52YWxpZC5maW5kKG0gPT4gbS5faWQgPT0gaWQpLFxyXG4gICAgICAgICAgICBjb25mbGljdHM6IGlzc3Vlcy5jb25mbGljdHMuZmluZChtID0+IG0uX2lkID09IGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuICAgICAgICBjb25zdCBkYXRhOiBJVGltZXRhYmxlID0geyAuLi50aGlzLmRhdGEgfTtcclxuICAgICAgICBjb25zdCB0aW1lVGFibGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSBhcyBJVGltZXRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aW1lVGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduR3JvdXBTbG90KGRheTogbnVtYmVyLCBwZXJpb2Q6IG51bWJlciwgaXRlbTogc3RyaW5nLCBfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IF9pZCk7XHJcblxyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAodGltZXRhYmxlLmdldEdyb3VwSW52YWxpZEl0ZW1zKF9pZCwgZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpKSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpdGVtIHNob3VsZCBub3QgYmUgYXNzaWduZWQgdG8gdGhpcyBncm91cFwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aW1ldGFibGUuZ2V0R3JvdXBTbG90cyhfaWQpO1xyXG4gICAgICAgIHNsb3RzW2RheV1bcGVyaW9kXSA9IGl0ZW07XHJcblxyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IHRpbWV0YWJsZS5kYXRhLmdyb3Vwcy5tYXAoZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnLl9pZCA9PSBfaWQpIGcuc2xvdHMgPSBzbG90cztcclxuICAgICAgICAgICAgcmV0dXJuIGc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRpbWV0YWJsZS5nZXRHcm91cENvbmZsaWN0KF9pZCwgZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCk/LmFzc2lnbmVlO1xyXG5cclxuICAgICAgICBjb25zdCB0aGVDb25mbGljdCA9IGNvbmZsaWN0cz8uZmluZChjID0+IGMuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIGlmICh0aGVDb25mbGljdCkgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpdGVtIGNyZWF0ZWQgYSBjb25mbGljdCBpbiB0aGlzIGdyb3VwXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKHsgLi4uZGF0YSwgYXNzaWduZWQ6IGZhbHNlLCBtdWx0aXBsZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtc0FzTGlzdCA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlZDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGc6IFRpbWV0YWJsZUdyb3VwID0geyBfaWQ6IGdyb3VwLl9pZCwgc2xvdHM6IFtdLCBhc3NpZ25lZXM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHRpbWV0YWJsZS5kYXRhLmRheXMpIHtcclxuICAgICAgICAgICAgICAgIGcuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHRpbWV0YWJsZS5kYXRhLnBlcmlvZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlZC5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIWcuc2xvdHNbZF1bcF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtc0FzTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zQXNMaXN0W25dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VkLmluY2x1ZGVzKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuID0gbiA9PSBpdGVtc0FzTGlzdC5sZW5ndGggLSAxID8gMCA6IG4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b21hdGVfYXNzaWduZShncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcih7IC4uLmRhdGEsIGFzc2lnbmVkOiB0cnVlLCBtdWx0aXBsZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsbEFzc2lnbmVlcyA9IHRoaXMuZ2V0QXNzaWduZWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gdHVybiBncm91cCBpdGVtcyBpbnRvIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIGFsbCBhc3NpZ25lZCBpbiBncm91cFxyXG4gICAgICAgICAgICBjb25zdCBncm91cEFzc2lnbmVlcyA9IEFycmF5LmZyb20obmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10sIGFzc2lnbmVlczogW10gfTtcclxuICAgICAgICAgICAgLy8gdXNlZCB0byBzdG9yZSBhc3NpZ25lZCBpdGVtc1xyXG4gICAgICAgICAgICBsZXQgYXNzaWduZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0b3JlIGNoZWNrZWQgaXRlbXMgdG8ga25vdyB3aGVuIGFsbCBpdGVtcyBoYXZlIGJlZW4gY2hlY2tlZFxyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiB0aW1ldGFibGUuZGF0YS5kYXlzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuYXNzaWduZWVzW2RdID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldEFzc2lnbmVkU2xvdEFzc2lnbmVlcyhkLCBwLCBncm91cHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhc3NpZ25lZTogc3RyaW5nID0gYWxsQXNzaWduZWVzLmZpbmQoYSA9PiBhc3NpZ25lZXMuZmluZChhc3MgPT4gYXNzLmFzc2lnbmVlID09IGEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBhc3NpZ25lZXMuZmluZChhc3MgPT4gYXNzLnNlY3Rpb24gPT0gZ3JvdXAuc2VjdGlvbik/LmFzc2lnbmVlIGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLmFzc2lnbmVlc1tkXVtwXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBydW4gYWdhaW4gaWYgaXRlbSBoYXMgYmVlbiBhc3NpZ25lZCBpbiBhIHJvdW5kIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkgJiYgY2hlY2tlZEl0ZW1zLmxlbmd0aCAhPSBpdGVtc0FzTGlzdC5sZW5ndGgpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLmFzc2lnbmVlc1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5hc3NpZ25lZXNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tBc3NpZ25lZXMuaW5jbHVkZXMoYXNzaWduZWUpKSBjaGVja0Fzc2lnbmVlcy5wdXNoKGFzc2lnbmVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2gobmV3R3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlTXVsdGlwbGUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZU1hbmFnZXIoeyAuLi5kYXRhLCBhc3NpZ25lZDogZmFsc2UsIG11bHRpcGxlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAvL3RydW5jYXRlIGdyb3Vwc1xyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHR1cm4gZ3JvdXAgaXRlbXMgaW50byBhIGZsYXQgbGlzdFxyXG4gICAgICAgICAgICBjb25zdCBpdGVtc0FzTGlzdCA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBhbGwgYXNzaWduZWQgaW4gZ3JvdXBcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBBc3NpZ25lZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZ3JvdXAuaXRlbXMubWFwKGl0ID0+IGl0LmFzc2lnbmVlKSkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3R3JvdXA6IFRpbWV0YWJsZUdyb3VwID0geyBfaWQ6IGdyb3VwLl9pZCwgc2xvdHM6IFtdLCBhc3NpZ25lZXM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIGFzc2lnbmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGxldCBhc3NpZ25lZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBpdGVtcyB0byBrbm93IHdoZW4gYWxsIGl0ZW1zIGhhdmUgYmVlbiBjaGVja2VkXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHRpbWV0YWJsZS5kYXRhLmRheXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBhc3NpZ25lZXMgdG8ga25vdyB3aGVuIGFsbCBhc3NpZ25lZXMgaGF2ZSBiZWVuIGNoZWNrZWQgYW5kIGVzY2FwZSBpbmZpbml0ZSBsb29wXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Fzc2lnbmVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHRpbWV0YWJsZS5kYXRhLnBlcmlvZHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCBhc3NpZ25lZCB0byB0aGlzIHBhcnRpY3VsYXIgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlcyA9IHRpbWV0YWJsZS5nZXRTbG90QXNzaWduZWVzKGQsIHAsIGdyb3Vwcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2lnbmVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdW3BdID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbGwgYXNzaWduZWRcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIW5ld0dyb3VwLnNsb3RzW2RdW3BdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVuY2F0ZSBhc3NpZ25lZEl0ZW1zIGlmIGFsbCBpdGVtcyBoYXZlIGJlZW4gYXNzaWduZWQgdG8gbWFrZSBzdXJlIG5vIGl0ZW0gaGFzIG1vcmUgaGVpcmFjaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVkSXRlbXMubGVuZ3RoID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgYXNzaWduZWRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIGxvb3AgaWYgbm9ib2R5IGNhbiBiZSBhc3NpZ25lZCB0byB0aGlzIHNsb3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwQXNzaWduZWVzLmxlbmd0aCA9PSBjaGVja0Fzc2lnbmVlcy5sZW5ndGgpIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgYSByYW5kb20gcG9pbnQgaW4gdGhlIGl0ZW1zIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtc0FzTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1zQXNMaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKT8uYXNzaWduZWUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja2VkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGNoZWNrZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hvIHdhcyBhc3NpZ25lZCB0byB0aGlzIHNsb3Q/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZWRTbG90ID0gYXNzaWduZWVzLmZpbmQoYSA9PiBhLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIHNsb3QgZnJlZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VkU2xvdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJ1biBhZ2FpbiBpZiBpdGVtIGhhcyBiZWVuIGFzc2lnbmVkIGluIGEgcm91bmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSAmJiBjaGVja2VkSXRlbXMubGVuZ3RoICE9IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3QgaXMgdXNlZCBhbmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBpdGVtIGlzIHRoZSBzYW1lIHdpdGggdGhlIHNsb3QgaXRlbSBhbmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBncm91cHMgYXJlIGluIHRoZSBzYW1lIHNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXNlZFNsb3Quc2VjdGlvbiA9PSBncm91cC5zZWN0aW9uICYmIHVzZWRTbG90Lml0ZW0gPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tBc3NpZ25lZXMuaW5jbHVkZXMoYXNzaWduZWUpKSBjaGVja0Fzc2lnbmVlcy5wdXNoKGFzc2lnbmVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2gobmV3R3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFzc2lnblRvU2xvdChpdGVtOiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGhpcy5nZXRTbG90QXNzaWduZWVzKGRheSwgcGVyaW9kLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cElkKTtcclxuICAgICAgICBpZiAoIWdyb3VwKSB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKT8uYXNzaWduZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkID0gYXNzaWduZWVzLmZpbmQoYSA9PiBhLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuICAgICAgICByZXR1cm4gIShhc3NpZ25lZCAmJiBhc3NpZ25lZC5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3VwU2VjdGlvbnMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25zOiBJR3JvdXBbXVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBpZiAoIShzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dKSAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXSA9IFtdO1xyXG4gICAgICAgICAgICAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXS5wdXNoKGdyb3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25lZFRvU2FtZUluU2VjdGlvbihncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSB0aGlzLmdyb3VwU2VjdGlvbnMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gaW4gc2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHNlY3Rpb25zW3NlY3Rpb25dKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGdyb3VwLml0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZFtzZWN0aW9uXVtKU09OLnN0cmluZ2lmeShpdGVtKV0pIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXS5wdXNoKGdyb3VwLl9pZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWQoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGdyb3Vwcy5yZWR1Y2UoKGFjYywgcmVkdWNlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgcmVkdWNlci5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLmdldE1pc3NpbmdJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IHVzZWQgPSBsZW4gLSBtaXNzaW5nLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLm1pc3NpbmcubGVuZ3RoO1xyXG4gICAgICAgIH0sIDEpXHJcblxyXG4gICAgICAgIHJldHVybiAodXNlZCAvIGxlbikgKiAxMDAgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgbnVsbHkoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5kYXRhLmdyb3Vwcy5sZW5ndGggKiB0aGlzLmRhdGEuZGF5cy5sZW5ndGggKiB0aGlzLmRhdGEucGVyaW9kcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZWQgPSB0aGlzLmRhdGEuZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZC5zbG90cy5yZWR1Y2UoKGFjY2MsIHJlZGQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2NjICsgcmVkZC5yZWR1Y2UoKGFjY2NjLCByZWRkZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2NjYyArPSByZWRkZCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuICAgIH1cclxuXHJcbiAgICBoYXNJc3N1ZXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcbiAgICAgICAgcmV0dXJuICEhKGlzc3Vlcy5jb25mbGljdHMubGVuZ3RoIHx8IGlzc3Vlcy5pbnZhbGlkLmxlbmd0aCB8fCBpc3N1ZXMubWlzc2luZy5sZW5ndGgpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlTWFuYWdlciB9IGZyb20gXCIuL3V0aWxzL3RpbWV0YWJsZS5tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElHcm91cCB9IGZyb20gJy4vbW9kZWxzL2dyb3VwLmludGVyZmFjZSdcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBUaW1ldGFibGVNYW5hZ2VyLFxyXG4gICAgSVRpbWV0YWJsZSxcclxuICAgIElHcm91cFxyXG59XHJcblxyXG4vLyByZXF1aXJlKCcuLi90ZXN0JykiXSwic291cmNlUm9vdCI6IiJ9