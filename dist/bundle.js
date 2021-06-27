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
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
    TimetableManager.prototype.getMissingItems = function (groups) {
        var e_1, _a;
        var allMissing = [];
        try {
            for (var groups_1 = __values(groups), groups_1_1 = groups_1.next(); !groups_1_1.done; groups_1_1 = groups_1.next()) {
                var group = groups_1_1.value;
                var items = group.items.map(function (i) { return i._id; });
                allMissing.push({ _id: group._id, missing: this.getGroupMissingItems(group._id, items) });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (groups_1_1 && !groups_1_1.done && (_a = groups_1.return)) _a.call(groups_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return allMissing;
    };
    TimetableManager.prototype.getInvalidItems = function (groups) {
        var e_2, _a;
        var allInvalid = [];
        try {
            for (var groups_2 = __values(groups), groups_2_1 = groups_2.next(); !groups_2_1.done; groups_2_1 = groups_2.next()) {
                var group = groups_2_1.value;
                var items = group.items.map(function (i) { return i._id; });
                allInvalid.push({ _id: group._id, invalid: this.getGroupInvalidItems(group._id, items) });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (groups_2_1 && !groups_2_1.done && (_a = groups_2.return)) _a.call(groups_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return allInvalid;
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
        return __spreadArray([], __read(new Set(assignees)));
    };
    TimetableManager.prototype.getGroupSlotsAsList = function (_id) {
        var slots = this.getGroupSlots(_id) || [];
        var list = slots.reduce(function (acc, t) {
            return __spreadArray(__spreadArray([], __read(acc)), __read(t));
        }, []);
        return list;
    };
    TimetableManager.prototype.getGroupMissingItems = function (_id, items) {
        var e_3, _a;
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var missing = [];
        try {
            for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var i = items_1_1.value;
                if (!slotsAsList.includes(i))
                    missing.push(i);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return missing;
    };
    TimetableManager.prototype.getGroupInvalidItems = function (_id, items) {
        var e_4, _a;
        var slotsAsList = this.getGroupSlotsAsList(_id);
        var invalid = [];
        try {
            for (var slotsAsList_1 = __values(slotsAsList), slotsAsList_1_1 = slotsAsList_1.next(); !slotsAsList_1_1.done; slotsAsList_1_1 = slotsAsList_1.next()) {
                var i = slotsAsList_1_1.value;
                if (i && !items.includes(i))
                    invalid.push(i);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (slotsAsList_1_1 && !slotsAsList_1_1.done && (_a = slotsAsList_1.return)) _a.call(slotsAsList_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return invalid;
    };
    TimetableManager.prototype.getSlotItems = function (day, period) {
        var e_5, _a;
        var items = [];
        try {
            for (var _b = __values(this.getSlots()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var slots = _c.value;
                for (var d in slots) {
                    for (var p in slots[d]) {
                        if (d == day && p == period)
                            items.push(slots[d][p]);
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return __spreadArray([], __read(new Set(items)));
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
        var e_6, _a;
        var assignees = [];
        try {
            for (var groups_3 = __values(groups), groups_3_1 = groups_3.next(); !groups_3_1.done; groups_3_1 = groups_3.next()) {
                var g = groups_3_1.value;
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
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (groups_3_1 && !groups_3_1.done && (_a = groups_3.return)) _a.call(groups_3);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return assignees;
    };
    TimetableManager.prototype.getGroupSlotAssignee = function (day, period, group) {
        var slots = this.getGroupSlots(group._id);
        for (var d in slots) {
            var _loop_3 = function (p) {
                if (d == day && p == period) {
                    var item_2 = slots[d][p];
                    var assignment = group.items.find(function (a) { return a._id == item_2; });
                    if (assignment)
                        return { value: assignment.assignee };
                }
            };
            for (var p in slots[d]) {
                var state_1 = _loop_3(p);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        return null;
    };
    TimetableManager.prototype.getItemSlots = function (item) {
        var e_7, _a;
        var slots = [];
        try {
            for (var _b = __values(this.data.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var group = _c.value;
                var s = this.getGroupSlots(group._id);
                for (var day in s) {
                    for (var period in s[day]) {
                        if (s[day][period] == item)
                            slots.push({ day: day, period: period, _id: group._id });
                    }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return slots;
    };
    TimetableManager.prototype.getAssigneeSlots = function (assignee, groups) {
        var e_8, _a;
        var slots = [];
        try {
            for (var groups_4 = __values(groups), groups_4_1 = groups_4.next(); !groups_4_1.done; groups_4_1 = groups_4.next()) {
                var group = groups_4_1.value;
                var s = this.getGroupSlots(group._id);
                for (var day in s) {
                    var _loop_4 = function (period) {
                        var item = s[day][period];
                        var assignment = group.items.find(function (i) { return i._id == item; });
                        if ((assignment === null || assignment === void 0 ? void 0 : assignment.assignee) == assignee)
                            slots.push({ day: day, period: period, _id: group._id });
                    };
                    for (var period in s[day]) {
                        _loop_4(period);
                    }
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (groups_4_1 && !groups_4_1.done && (_a = groups_4.return)) _a.call(groups_4);
            }
            finally { if (e_8) throw e_8.error; }
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
        return slots;
    };
    TimetableManager.prototype.getSlotConflicts = function (day, period, groups) {
        var e_9, _a, e_10, _b;
        var conflicts = this.getConflicts(groups);
        var slotConflicts = [];
        try {
            for (var conflicts_1 = __values(conflicts), conflicts_1_1 = conflicts_1.next(); !conflicts_1_1.done; conflicts_1_1 = conflicts_1.next()) {
                var g = conflicts_1_1.value;
                var sC = { _id: g._id, conflicts: [] };
                try {
                    for (var _c = (e_10 = void 0, __values(g.conflicts)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var c = _d.value;
                        if (c.day == day && c.period == period) {
                            sC.conflicts.push(c);
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
                slotConflicts.push(sC);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (conflicts_1_1 && !conflicts_1_1.done && (_a = conflicts_1.return)) _a.call(conflicts_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return slotConflicts;
    };
    TimetableManager.prototype.getConflicts = function (groups) {
        var e_11, _a;
        var _b, _c, _d;
        var conflicts = [];
        var assigned = [];
        try {
            for (var groups_5 = __values(groups), groups_5_1 = groups_5.next(); !groups_5_1.done; groups_5_1 = groups_5.next()) {
                var group = groups_5_1.value;
                var slots = this.getGroupSlots(group._id);
                var groupConflicts = [];
                for (var day in slots) {
                    for (var period in slots[day]) {
                        var item = this.getGroupSlotItem(day, period, group._id);
                        var assignee = this.getGroupSlotAssignee(day, period, group);
                        if (!item)
                            continue;
                        if (!assignee)
                            continue;
                        var groupItems = group.items.map(function (i) { return i._id; });
                        if (this.getGroupInvalidItems(group._id, groupItems).includes(item))
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
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (groups_5_1 && !groups_5_1.done && (_a = groups_5.return)) _a.call(groups_5);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return conflicts;
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
        var data = { days: this.data.days, periods: this.data.periods, groups: this.data.groups, breakPeriods: this.data.breakPeriods, type: this.data.type };
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
    TimetableManager.prototype.automate = function (groups, random) {
        var e_12, _a;
        if (random === void 0) { random = true; }
        var data = this.clone();
        var timetable = new TimetableManager(data);
        timetable.data.groups = [];
        try {
            for (var groups_6 = __values(groups), groups_6_1 = groups_6.next(); !groups_6_1.done; groups_6_1 = groups_6.next()) {
                var group = groups_6_1.value;
                var itemsAsList = group.items.map(function (i) { return i._id; });
                var used = [];
                var g = { _id: group._id, slots: [] };
                for (var d in timetable.data.days) {
                    g.slots[d] = [];
                    for (var p in timetable.data.periods) {
                        if (used.length == itemsAsList.length)
                            break;
                        if (!random) {
                            var item = itemsAsList.pop();
                            if (item) {
                                g.slots[d][p] = item;
                                used.push(item);
                            }
                        }
                        else {
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
                }
                timetable.data.groups.push(g);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (groups_6_1 && !groups_6_1.done && (_a = groups_6.return)) _a.call(groups_6);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return timetable;
    };
    TimetableManager.prototype.automateMultiple = function (groups) {
        var _a;
        var data = this.clone();
        var timetable = new TimetableManager(data);
        //truncate groups
        timetable.data.groups = [];
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            // turn group items into a flat list
            var itemsAsList = group.items.map(function (i) { return i._id; });
            // get a set of all assigned in group
            var groupAssignees = __spreadArray([], __read(new Set(group.items.map(function (it) { return it.assignee; }))));
            var newGroup = { _id: group._id, slots: [] };
            // used to store assigned items
            var assignedItems = [];
            // store checked items to know when all items have been checked
            var checkedItems = [];
            for (var d in timetable.data.days) {
                newGroup.slots[d] = [];
                // store checked assignees to know when all assignees have been checked and escape infinite loop
                var checkAssignees = [];
                var _loop_6 = function (p) {
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
                    _loop_6(p);
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
        var e_13, _a;
        var sections = [];
        try {
            for (var groups_7 = __values(groups), groups_7_1 = groups_7.next(); !groups_7_1.done; groups_7_1 = groups_7.next()) {
                var group = groups_7_1.value;
                if (!sections[group.section])
                    sections[group.section] = [];
                sections[group.section].push(group);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (groups_7_1 && !groups_7_1.done && (_a = groups_7.return)) _a.call(groups_7);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return sections;
    };
    TimetableManager.prototype.assignedToSameInSection = function (groups) {
        var e_14, _a, e_15, _b;
        var sections = this.groupSections(groups);
        var assigned = {};
        for (var section in sections) {
            assigned[section] = {};
            try {
                for (var _c = (e_14 = void 0, __values(sections[section])), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    try {
                        for (var _e = (e_15 = void 0, __values(group.items)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var item = _f.value;
                            if (!assigned[section][JSON.stringify(item)])
                                assigned[section][JSON.stringify(item)] = [];
                            assigned[section][JSON.stringify(item)].push(group._id);
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        return assigned;
    };
    TimetableManager.prototype.used = function (timeTable, groups) {
        var len = groups.reduce(function (acc, reducer) {
            return acc + reducer.items.length;
        }, 1);
        var missing = timeTable.getMissingItems(groups);
        var used = len - missing.reduce(function (acc, reducer) {
            return acc + reducer.missing.length;
        }, 1);
        return (used / len) * 100 + '%';
    };
    TimetableManager.prototype.nully = function (timeTable) {
        var len = timeTable.groups.length * timeTable.days.length * timeTable.periods.length;
        var used = timeTable.groups.reduce(function (acc, red) {
            return acc + red.slots.reduce(function (accc, redd) {
                return accc + redd.reduce(function (acccc, reddd) {
                    return acccc += reddd ? 1 : 0;
                }, 0);
            }, 0);
        }, 0);
        return (used / len) * 100 + '%';
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


// import { days, periods, breakPeriods, groups } from "./../data/timetable.multi.json";
// import * as Groups from './../data/groups.json';
// import { IGroup } from "./models/group.interface";
// function used(timeTable: Timetable) {    
//     const len = Groups.reduce((acc, reducer) => {
//         return acc + reducer.items.length;
//     }, 1);
//     const missing = timeTable.getMissingItems(Groups);
//     const used = len - missing.reduce((acc, reducer) => {
//         return acc + reducer.missing.length;
//     }, 1)
//     return (used / len) * 100 + '%';
// }
// const t = new Timetable(days, periods, breakPeriods, groups, 'single');
// // const aaagroups = JSON.parse(JSON.stringify(Groups))
// // const tgroup = t.getGroup('608e73327568794f9448e263')
// // const cgroup: IGroup = Groups.find(g => g._id == '608e73327568794f9448e263');
// // const items = cgroup.items.map(t => t._id);
// // const r = t.getGroupConflict('608e73327568794f9448e263', Groups)
// const tu = used(t);
// console.log(tu, t.getIssues(Groups), t.groups);
// const a = t.automateMultiple(Groups);
// const au = used(a);
// console.log(au, a.getIssues(Groups), a.groups);
// (window as any).groups = Groups;
// (window as any).timetable = t;
// group 608e73327568794f9448e263
// item 608e73337568794f9448e27f
// assignee d31b7699-b009-49cc-a4aa-ffcefcc9cd64

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbnktdGltZXRhYmxlLy4vc3JjL3V0aWxzL3RpbWV0YWJsZS5tYW5hZ2VyLnRzIiwid2VicGFjazovL2FueS10aW1ldGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYW55LXRpbWV0YWJsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYW55LXRpbWV0YWJsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FueS10aW1ldGFibGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hbnktdGltZXRhYmxlLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtJQUVJLDBCQUNXLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdkIsQ0FBQztJQUVMLG1DQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixNQUFnQjs7UUFDNUIsSUFBTSxVQUFVLEdBQXlDLEVBQUUsQ0FBQzs7WUFDNUQsS0FBa0IsOEJBQU0saUZBQUU7Z0JBQXJCLElBQUksS0FBSztnQkFDVixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEdBQUcsRUFBTCxDQUFLLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JB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QixrREFBa0Q7QUFDbEQsd0NBQXdDO0FBRXhDLHNCQUFzQjtBQUV0QixrREFBa0Q7QUFFbEQsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUlqQyxpQ0FBaUM7QUFFakMsZ0NBQWdDO0FBRWhDLGdEQUFnRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2dyb3VwLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVDb25mbGljdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmNvbmZsaWN0XCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuZ3JvdXBcIjtcclxuaW1wb3J0IHsgSVRpbWV0YWJsZSB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVTbG90IH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuc2xvdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZU1hbmFnZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBkYXRhOiBJVGltZXRhYmxlXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGdldFNsb3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ3JvdXBzLm1hcChnID0+IGcuc2xvdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1pc3NpbmdJdGVtcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYWxsTWlzc2luZzogeyBfaWQ6IHN0cmluZywgbWlzc2luZzogc3RyaW5nW10gfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBhbGxNaXNzaW5nLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgbWlzc2luZzogdGhpcy5nZXRHcm91cE1pc3NpbmdJdGVtcyhncm91cC5faWQsIGl0ZW1zKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxNaXNzaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEludmFsaWRJdGVtcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYWxsSW52YWxpZDogeyBfaWQ6IHN0cmluZywgaW52YWxpZDogc3RyaW5nW10gfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBhbGxJbnZhbGlkLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgaW52YWxpZDogdGhpcy5nZXRHcm91cEludmFsaWRJdGVtcyhncm91cC5faWQsIGl0ZW1zKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxJbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmRhdGEuZ3JvdXBzLmZpbmQoYyA9PiBjLl9pZC50b1N0cmluZygpID09IF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90cyhfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwKF9pZCk/LnNsb3RzIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVzKGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIGFzc2lnbmVlcy5wdXNoKGFzc2lnbm1lbnQuYXNzaWduZWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gWy4uLm5ldyBTZXQoYXNzaWduZWVzKV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCkgfHwgW107XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHNsb3RzLnJlZHVjZSgoYWNjLCB0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbLi4uYWNjLCAuLi50XTtcclxuICAgICAgICB9LCBbXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwTWlzc2luZ0l0ZW1zKF9pZDogc3RyaW5nLCBpdGVtczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHNBc0xpc3QgPSB0aGlzLmdldEdyb3VwU2xvdHNBc0xpc3QoX2lkKTtcclxuICAgICAgICBjb25zdCBtaXNzaW5nOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghc2xvdHNBc0xpc3QuaW5jbHVkZXMoaSkpIG1pc3NpbmcucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtaXNzaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSW52YWxpZEl0ZW1zKF9pZDogc3RyaW5nLCBpdGVtczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHNBc0xpc3QgPSB0aGlzLmdldEdyb3VwU2xvdHNBc0xpc3QoX2lkKTtcclxuICAgICAgICBjb25zdCBpbnZhbGlkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpIG9mIHNsb3RzQXNMaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChpICYmICFpdGVtcy5pbmNsdWRlcyhpKSkgaW52YWxpZC5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGludmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdEl0ZW1zKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zOiAoc3RyaW5nIHwgbnVsbClbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzbG90cyBvZiB0aGlzLmdldFNsb3RzKCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkID09IGRheSAmJiBwID09IHBlcmlvZCkgaXRlbXMucHVzaChzbG90c1tkXVtwXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbLi4ubmV3IFNldChpdGVtcyldO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEl0ZW0oX2lkOiBzdHJpbmcsIGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSByZXR1cm4gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RBc3NpZ25lZXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiB7IF9pZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nIHwgbnVsbCwgc2VjdGlvbjogc3RyaW5nLCBpdGVtOiBzdHJpbmcgfCBudWxsIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhnLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGcuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZXMucHVzaCh7IF9pZDogZy5faWQsIGFzc2lnbmVlOiBhc3NpZ25tZW50Py5hc3NpZ25lZSB8fCBudWxsLCBzZWN0aW9uOiBnLnNlY3Rpb24sIGl0ZW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEFzc2lnbmVlKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIHJldHVybiBhc3NpZ25tZW50LmFzc2lnbmVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtU2xvdHMoaXRlbTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiB0aGlzLmRhdGEuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXRlbVNsb3QoX2lkOiBzdHJpbmcsIGl0ZW06IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzW2RheV1bcGVyaW9kXSA9PSBpdGVtKSByZXR1cm4gKHsgZGF5LCBwZXJpb2QsIF9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVTbG90cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudD8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90Q29uZmxpY3RzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3Qgc2xvdENvbmZsaWN0czogdHlwZW9mIGNvbmZsaWN0cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCBzQzogdHlwZW9mIGcgPSB7IF9pZDogZy5faWQsIGNvbmZsaWN0czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgZy5jb25mbGljdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLmRheSA9PSBkYXkgJiYgYy5wZXJpb2QgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc0MuY29uZmxpY3RzLnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsb3RDb25mbGljdHMucHVzaChzQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdENvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25mbGljdHMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogeyBfaWQ6IHN0cmluZywgY29uZmxpY3RzOiBUaW1ldGFibGVDb25mbGljdFtdIH1bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkOiB7IGl0ZW06IHN0cmluZywgYXNzaWduZWU6IHN0cmluZywgc2VjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBDb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNsb3RzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRHcm91cFNsb3RJdGVtKGRheSwgcGVyaW9kLCBncm91cC5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gdGhpcy5nZXRHcm91cFNsb3RBc3NpZ25lZShkYXksIHBlcmlvZCwgZ3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXNzaWduZWUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgZ3JvdXBJdGVtcykuaW5jbHVkZXMoaXRlbSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uaXRlbSAhPSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cENvbmZsaWN0cy5wdXNoKHsgZGF5LCBwZXJpb2QsIGl0ZW0sIGFzc2lnbmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXSA9IHsgYXNzaWduZWUsIGl0ZW0sIHNlY3Rpb246IGdyb3VwLnNlY3Rpb24gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgY29uZmxpY3RzOiBncm91cENvbmZsaWN0cyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBDb25mbGljdChfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3VwcykuZmluZChjID0+IGMuX2lkID09IF9pZCk/LmNvbmZsaWN0cztcclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db25mbGljdHMoaXRlbTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLml0ZW0gPT0gaXRlbSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmFzc2lnbmVlID09IGFzc2lnbmVlKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdENvbmZsaWN0cyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldEFzc2lnbmVlQ29uZmxpY3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuZGF5ID09IGRheSAmJiBjYy5wZXJpb2QgPT0gcGVyaW9kKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHRoaXMuZ2V0SW52YWxpZEl0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWlzc2luZywgaW52YWxpZCwgY29uZmxpY3RzIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJc3N1ZXMoaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Npbmc6IGlzc3Vlcy5taXNzaW5nLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGludmFsaWQ6IGlzc3Vlcy5pbnZhbGlkLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGNvbmZsaWN0czogaXNzdWVzLmNvbmZsaWN0cy5maW5kKG0gPT4gbS5faWQgPT0gaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IElUaW1ldGFibGUgPSB7IGRheXM6IHRoaXMuZGF0YS5kYXlzLCBwZXJpb2RzOiB0aGlzLmRhdGEucGVyaW9kcywgZ3JvdXBzOiB0aGlzLmRhdGEuZ3JvdXBzLCBicmVha1BlcmlvZHM6IHRoaXMuZGF0YS5icmVha1BlcmlvZHMsIHR5cGU6IHRoaXMuZGF0YS50eXBlIH07XHJcbiAgICAgICAgY29uc3QgdGltZVRhYmxlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSkgYXMgSVRpbWV0YWJsZTtcclxuICAgICAgICByZXR1cm4gdGltZVRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbkdyb3VwU2xvdChkYXk6IG51bWJlciwgcGVyaW9kOiBudW1iZXIsIGl0ZW06IHN0cmluZywgX2lkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBfaWQpO1xyXG5cclxuICAgICAgICBpZiAoIWdyb3VwKSB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcihkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZS5nZXRHcm91cEludmFsaWRJdGVtcyhfaWQsIGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKSkpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXRlbSBzaG91bGQgbm90IGJlIGFzc2lnbmVkIHRvIHRoaXMgZ3JvdXBcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGltZXRhYmxlLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBzbG90c1tkYXldW3BlcmlvZF0gPSBpdGVtO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMgPSB0aW1ldGFibGUuZGF0YS5ncm91cHMubWFwKGcgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZy5faWQgPT0gX2lkKSBnLnNsb3RzID0gc2xvdHM7XHJcbiAgICAgICAgICAgIHJldHVybiBnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aW1ldGFibGUuZ2V0R3JvdXBDb25mbGljdChfaWQsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWUgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQpPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhlQ29uZmxpY3QgPSBjb25mbGljdHM/LmZpbmQoYyA9PiBjLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuICAgICAgICBpZiAodGhlQ29uZmxpY3QpIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXRlbSBjcmVhdGVkIGEgY29uZmxpY3QgaW4gdGhpcyBncm91cFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZShncm91cHM6IElHcm91cFtdLCByYW5kb20gPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcihkYXRhKTtcclxuXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZzogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgZy5zbG90c1tkXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VkLmxlbmd0aCA9PSBpdGVtc0FzTGlzdC5sZW5ndGgpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmFuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc0FzTGlzdC5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICghZy5zbG90c1tkXVtwXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtc0FzTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc0FzTGlzdFtuXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWQuaW5jbHVkZXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gbiA9PSBpdGVtc0FzTGlzdC5sZW5ndGggLSAxID8gMCA6IG4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3Vwcy5wdXNoKGcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZU11bHRpcGxlKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKGRhdGEpO1xyXG5cclxuICAgICAgICAvL3RydW5jYXRlIGdyb3Vwc1xyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHR1cm4gZ3JvdXAgaXRlbXMgaW50byBhIGZsYXQgbGlzdFxyXG4gICAgICAgICAgICBjb25zdCBpdGVtc0FzTGlzdCA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBhbGwgYXNzaWduZWQgaW4gZ3JvdXBcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBBc3NpZ25lZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi5uZXcgU2V0KGdyb3VwLml0ZW1zLm1hcChpdCA9PiBpdC5hc3NpZ25lZSkpXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgYXNzaWduZWQgaXRlbXNcclxuICAgICAgICAgICAgbGV0IGFzc2lnbmVkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGl0ZW1zIHRvIGtub3cgd2hlbiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGNoZWNrZWRcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldFNsb3RBc3NpZ25lZXMoZCwgcCwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVuIGFnYWluIGlmIGl0ZW0gaGFzIGJlZW4gYXNzaWduZWQgaW4gYSByb3VuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pICYmIGNoZWNrZWRJdGVtcy5sZW5ndGggIT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQXNzaWduVG9TbG90KGl0ZW06IHN0cmluZywgZ3JvdXBJZDogc3RyaW5nLCBkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSB0aGlzLmdldFNsb3RBc3NpZ25lZXMoZGF5LCBwZXJpb2QsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IGdyb3VwSWQpO1xyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIHJldHVybiAhKGFzc2lnbmVkICYmIGFzc2lnbmVkLnNlY3Rpb24gIT0gZ3JvdXAuc2VjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdXBTZWN0aW9ucyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnM6IElHcm91cFtdW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb25zIGFzIGFueSlbZ3JvdXAuc2VjdGlvbl0pIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dID0gW107XHJcbiAgICAgICAgICAgIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbmVkVG9TYW1lSW5TZWN0aW9uKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuZ3JvdXBTZWN0aW9ucyhncm91cHMpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZDogYW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBpbiBzZWN0aW9ucykge1xyXG4gICAgICAgICAgICBhc3NpZ25lZFtzZWN0aW9uXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2Ygc2VjdGlvbnNbc2VjdGlvbl0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZ3JvdXAuaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSkgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldLnB1c2goZ3JvdXAuX2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlZCh0aW1lVGFibGU6IFRpbWV0YWJsZU1hbmFnZXIsIGdyb3VwczogSUdyb3VwW10pIHsgICAgXHJcbiAgICAgICAgY29uc3QgbGVuID0gZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICB9LCAxKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aW1lVGFibGUuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgdXNlZCA9IGxlbiAtIG1pc3NpbmcucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIubWlzc2luZy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSlcclxuICAgIFxyXG4gICAgICAgIHJldHVybiAodXNlZCAvIGxlbikgKiAxMDAgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgbnVsbHkodGltZVRhYmxlOiBJVGltZXRhYmxlKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gdGltZVRhYmxlLmdyb3Vwcy5sZW5ndGggKiB0aW1lVGFibGUuZGF5cy5sZW5ndGggKiB0aW1lVGFibGUucGVyaW9kcy5sZW5ndGg7XHJcbiAgICBcclxuICAgICAgICBjb25zdCB1c2VkID0gdGltZVRhYmxlLmdyb3Vwcy5yZWR1Y2UoKGFjYywgcmVkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWQuc2xvdHMucmVkdWNlKChhY2NjLCByZWRkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjYyArIHJlZGQucmVkdWNlKChhY2NjYywgcmVkZGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjY2MgKz0gcmVkZGQgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gKHVzZWQgLyBsZW4pICogMTAwICsgJyUnO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlTWFuYWdlciB9IGZyb20gXCIuL3V0aWxzL3RpbWV0YWJsZS5tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgVGltZXRhYmxlTWFuYWdlcixcclxuICAgIElUaW1ldGFibGVcclxufVxyXG5cclxuLy8gaW1wb3J0IHsgZGF5cywgcGVyaW9kcywgYnJlYWtQZXJpb2RzLCBncm91cHMgfSBmcm9tIFwiLi8uLi9kYXRhL3RpbWV0YWJsZS5tdWx0aS5qc29uXCI7XHJcbi8vIGltcG9ydCAqIGFzIEdyb3VwcyBmcm9tICcuLy4uL2RhdGEvZ3JvdXBzLmpzb24nO1xyXG4vLyBpbXBvcnQgeyBJR3JvdXAgfSBmcm9tIFwiLi9tb2RlbHMvZ3JvdXAuaW50ZXJmYWNlXCI7XHJcblxyXG4vLyBmdW5jdGlvbiB1c2VkKHRpbWVUYWJsZTogVGltZXRhYmxlKSB7ICAgIFxyXG4vLyAgICAgY29uc3QgbGVuID0gR3JvdXBzLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbi8vICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIuaXRlbXMubGVuZ3RoO1xyXG4vLyAgICAgfSwgMSk7XHJcblxyXG4vLyAgICAgY29uc3QgbWlzc2luZyA9IHRpbWVUYWJsZS5nZXRNaXNzaW5nSXRlbXMoR3JvdXBzKTtcclxuLy8gICAgIGNvbnN0IHVzZWQgPSBsZW4gLSBtaXNzaW5nLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbi8vICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIubWlzc2luZy5sZW5ndGg7XHJcbi8vICAgICB9LCAxKVxyXG5cclxuLy8gICAgIHJldHVybiAodXNlZCAvIGxlbikgKiAxMDAgKyAnJSc7XHJcbi8vIH1cclxuXHJcbi8vIGNvbnN0IHQgPSBuZXcgVGltZXRhYmxlKGRheXMsIHBlcmlvZHMsIGJyZWFrUGVyaW9kcywgZ3JvdXBzLCAnc2luZ2xlJyk7XHJcbi8vIC8vIGNvbnN0IGFhYWdyb3VwcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoR3JvdXBzKSlcclxuLy8gLy8gY29uc3QgdGdyb3VwID0gdC5nZXRHcm91cCgnNjA4ZTczMzI3NTY4Nzk0Zjk0NDhlMjYzJylcclxuXHJcbi8vIC8vIGNvbnN0IGNncm91cDogSUdyb3VwID0gR3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSAnNjA4ZTczMzI3NTY4Nzk0Zjk0NDhlMjYzJyk7XHJcbi8vIC8vIGNvbnN0IGl0ZW1zID0gY2dyb3VwLml0ZW1zLm1hcCh0ID0+IHQuX2lkKTtcclxuLy8gLy8gY29uc3QgciA9IHQuZ2V0R3JvdXBDb25mbGljdCgnNjA4ZTczMzI3NTY4Nzk0Zjk0NDhlMjYzJywgR3JvdXBzKVxyXG5cclxuXHJcbi8vIGNvbnN0IHR1ID0gdXNlZCh0KTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKHR1LCB0LmdldElzc3VlcyhHcm91cHMpLCB0Lmdyb3Vwcyk7XHJcbi8vIGNvbnN0IGEgPSB0LmF1dG9tYXRlTXVsdGlwbGUoR3JvdXBzKTtcclxuXHJcbi8vIGNvbnN0IGF1ID0gdXNlZChhKTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKGF1LCBhLmdldElzc3VlcyhHcm91cHMpLCBhLmdyb3Vwcyk7XHJcblxyXG4vLyAod2luZG93IGFzIGFueSkuZ3JvdXBzID0gR3JvdXBzO1xyXG4vLyAod2luZG93IGFzIGFueSkudGltZXRhYmxlID0gdDtcclxuXHJcblxyXG5cclxuLy8gZ3JvdXAgNjA4ZTczMzI3NTY4Nzk0Zjk0NDhlMjYzXHJcblxyXG4vLyBpdGVtIDYwOGU3MzMzNzU2ODc5NGY5NDQ4ZTI3ZlxyXG5cclxuLy8gYXNzaWduZWUgZDMxYjc2OTktYjAwOS00OWNjLWE0YWEtZmZjZWZjYzljZDY0Il0sInNvdXJjZVJvb3QiOiIifQ==