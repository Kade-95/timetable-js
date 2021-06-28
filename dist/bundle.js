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
        return allMissing.filter(function (alm) { return alm.missing.length; });
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
            var groupAssignees = Array.from(new Set(group.items.map(function (it) { return it.assignee; })));
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

// import {}

// require('./test')

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci8uL3NyYy91dGlscy90aW1ldGFibGUubWFuYWdlci50cyIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGltZXRhYmxlLW1hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpbWV0YWJsZS1tYW5hZ2VyLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtJQUVJLDBCQUNXLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdkIsQ0FBQztJQUVMLG1DQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixNQUFnQjs7UUFDNUIsSUFBTSxVQUFVLEdBQXlDLEVBQUUsQ0FBQzs7WUFDNUQsS0FBa0IsOEJBQU0saUZBQUU7Z0JBQXJCLElBQUksS0FBSztnQkFDVixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEdBQUcsRUFBTCxDQUFLLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFF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QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFFN0QsWUFBWTtBQU1YO0FBRUQsb0JBQW9CIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvZ3JvdXAuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUNvbmZsaWN0IH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuY29uZmxpY3RcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5ncm91cFwiO1xyXG5pbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZVNsb3QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5zbG90XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlTWFuYWdlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGRhdGE6IElUaW1ldGFibGVcclxuICAgICkgeyB9XHJcblxyXG4gICAgZ2V0U2xvdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5ncm91cHMubWFwKGcgPT4gZy5zbG90cyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWlzc2luZ0l0ZW1zKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhbGxNaXNzaW5nOiB7IF9pZDogc3RyaW5nLCBtaXNzaW5nOiBzdHJpbmdbXSB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGFsbE1pc3NpbmcucHVzaCh7IF9pZDogZ3JvdXAuX2lkLCBtaXNzaW5nOiB0aGlzLmdldEdyb3VwTWlzc2luZ0l0ZW1zKGdyb3VwLl9pZCwgaXRlbXMpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbE1pc3NpbmcuZmlsdGVyKGFsbSA9PiBhbG0ubWlzc2luZy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEludmFsaWRJdGVtcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYWxsSW52YWxpZDogeyBfaWQ6IHN0cmluZywgaW52YWxpZDogc3RyaW5nW10gfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBhbGxJbnZhbGlkLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgaW52YWxpZDogdGhpcy5nZXRHcm91cEludmFsaWRJdGVtcyhncm91cC5faWQsIGl0ZW1zKSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxJbnZhbGlkLmZpbHRlcihhbG0gPT4gYWxtLmludmFsaWQubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5kYXRhLmdyb3Vwcy5maW5kKGMgPT4gYy5faWQudG9TdHJpbmcoKSA9PSBfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdHMoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcm91cChfaWQpPy5zbG90cyB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEFzc2lnbmVlcyhncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50KSBhc3NpZ25lZXMucHVzaChhc3NpZ25tZW50LmFzc2lnbmVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhc3NpZ25lZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RzQXNMaXN0KF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKSB8fCBbXTtcclxuICAgICAgICBjb25zdCBsaXN0ID0gc2xvdHMucmVkdWNlKChhY2MsIHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLnRdO1xyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBNaXNzaW5nSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IG1pc3Npbmc6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKCFzbG90c0FzTGlzdC5pbmNsdWRlcyhpKSkgbWlzc2luZy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pc3Npbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJbnZhbGlkSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IGludmFsaWQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2Ygc2xvdHNBc0xpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGkgJiYgIWl0ZW1zLmluY2x1ZGVzKGkpKSBpbnZhbGlkLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90SXRlbXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXM6IChzdHJpbmcgfCBudWxsKVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNsb3RzIG9mIHRoaXMuZ2V0U2xvdHMoKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSBpdGVtcy5wdXNoKHNsb3RzW2RdW3BdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChpdGVtcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEl0ZW0oX2lkOiBzdHJpbmcsIGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKF9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSByZXR1cm4gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RBc3NpZ25lZXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiB7IF9pZDogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nIHwgbnVsbCwgc2VjdGlvbjogc3RyaW5nLCBpdGVtOiBzdHJpbmcgfCBudWxsIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhnLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGcuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZXMucHVzaCh7IF9pZDogZy5faWQsIGFzc2lnbmVlOiBhc3NpZ25tZW50Py5hc3NpZ25lZSB8fCBudWxsLCBzZWN0aW9uOiBnLnNlY3Rpb24sIGl0ZW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdEFzc2lnbmVlKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBzbG90c1tkXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIHJldHVybiBhc3NpZ25tZW50LmFzc2lnbmVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtU2xvdHMoaXRlbTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiB0aGlzLmRhdGEuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXRlbVNsb3QoX2lkOiBzdHJpbmcsIGl0ZW06IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzW2RheV1bcGVyaW9kXSA9PSBpdGVtKSByZXR1cm4gKHsgZGF5LCBwZXJpb2QsIF9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVTbG90cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudD8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90Q29uZmxpY3RzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3Qgc2xvdENvbmZsaWN0czogdHlwZW9mIGNvbmZsaWN0cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCBzQzogdHlwZW9mIGcgPSB7IF9pZDogZy5faWQsIGNvbmZsaWN0czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgZy5jb25mbGljdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLmRheSA9PSBkYXkgJiYgYy5wZXJpb2QgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc0MuY29uZmxpY3RzLnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsb3RDb25mbGljdHMucHVzaChzQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdENvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25mbGljdHMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogeyBfaWQ6IHN0cmluZywgY29uZmxpY3RzOiBUaW1ldGFibGVDb25mbGljdFtdIH1bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkOiB7IGl0ZW06IHN0cmluZywgYXNzaWduZWU6IHN0cmluZywgc2VjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBDb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNsb3RzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRHcm91cFNsb3RJdGVtKGRheSwgcGVyaW9kLCBncm91cC5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gdGhpcy5nZXRHcm91cFNsb3RBc3NpZ25lZShkYXksIHBlcmlvZCwgZ3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXNzaWduZWUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgZ3JvdXBJdGVtcykuaW5jbHVkZXMoaXRlbSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uaXRlbSAhPSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cENvbmZsaWN0cy5wdXNoKHsgZGF5LCBwZXJpb2QsIGl0ZW0sIGFzc2lnbmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXSA9IHsgYXNzaWduZWUsIGl0ZW0sIHNlY3Rpb246IGdyb3VwLnNlY3Rpb24gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgY29uZmxpY3RzOiBncm91cENvbmZsaWN0cyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMuZmlsdGVyKGFsYyA9PiBhbGMuY29uZmxpY3RzLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBDb25mbGljdChfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3VwcykuZmluZChjID0+IGMuX2lkID09IF9pZCk/LmNvbmZsaWN0cztcclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db25mbGljdHMoaXRlbTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLml0ZW0gPT0gaXRlbSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmFzc2lnbmVlID09IGFzc2lnbmVlKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdENvbmZsaWN0cyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldEFzc2lnbmVlQ29uZmxpY3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuZGF5ID09IGRheSAmJiBjYy5wZXJpb2QgPT0gcGVyaW9kKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHRoaXMuZ2V0SW52YWxpZEl0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWlzc2luZywgaW52YWxpZCwgY29uZmxpY3RzIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJc3N1ZXMoaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Npbmc6IGlzc3Vlcy5taXNzaW5nLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGludmFsaWQ6IGlzc3Vlcy5pbnZhbGlkLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGNvbmZsaWN0czogaXNzdWVzLmNvbmZsaWN0cy5maW5kKG0gPT4gbS5faWQgPT0gaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IElUaW1ldGFibGUgPSB7IGRheXM6IHRoaXMuZGF0YS5kYXlzLCBwZXJpb2RzOiB0aGlzLmRhdGEucGVyaW9kcywgZ3JvdXBzOiB0aGlzLmRhdGEuZ3JvdXBzLCBicmVha1BlcmlvZHM6IHRoaXMuZGF0YS5icmVha1BlcmlvZHMsIHR5cGU6IHRoaXMuZGF0YS50eXBlIH07XHJcbiAgICAgICAgY29uc3QgdGltZVRhYmxlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSkgYXMgSVRpbWV0YWJsZTtcclxuICAgICAgICByZXR1cm4gdGltZVRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbkdyb3VwU2xvdChkYXk6IG51bWJlciwgcGVyaW9kOiBudW1iZXIsIGl0ZW06IHN0cmluZywgX2lkOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBfaWQpO1xyXG5cclxuICAgICAgICBpZiAoIWdyb3VwKSB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcihkYXRhKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZS5nZXRHcm91cEludmFsaWRJdGVtcyhfaWQsIGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKSkpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXRlbSBzaG91bGQgbm90IGJlIGFzc2lnbmVkIHRvIHRoaXMgZ3JvdXBcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGltZXRhYmxlLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBzbG90c1tkYXldW3BlcmlvZF0gPSBpdGVtO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMgPSB0aW1ldGFibGUuZGF0YS5ncm91cHMubWFwKGcgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZy5faWQgPT0gX2lkKSBnLnNsb3RzID0gc2xvdHM7XHJcbiAgICAgICAgICAgIHJldHVybiBnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aW1ldGFibGUuZ2V0R3JvdXBDb25mbGljdChfaWQsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWUgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQpPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhlQ29uZmxpY3QgPSBjb25mbGljdHM/LmZpbmQoYyA9PiBjLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuICAgICAgICBpZiAodGhlQ29uZmxpY3QpIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXRlbSBjcmVhdGVkIGEgY29uZmxpY3QgaW4gdGhpcyBncm91cFwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZShncm91cHM6IElHcm91cFtdLCByYW5kb20gPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2xvbmUoKTtcclxuICAgICAgICBjb25zdCB0aW1ldGFibGUgPSBuZXcgVGltZXRhYmxlTWFuYWdlcihkYXRhKTtcclxuXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZzogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgZy5zbG90c1tkXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VkLmxlbmd0aCA9PSBpdGVtc0FzTGlzdC5sZW5ndGgpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmFuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc0FzTGlzdC5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICghZy5zbG90c1tkXVtwXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtc0FzTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc0FzTGlzdFtuXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWQuaW5jbHVkZXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLnNsb3RzW2RdW3BdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gbiA9PSBpdGVtc0FzTGlzdC5sZW5ndGggLSAxID8gMCA6IG4gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3Vwcy5wdXNoKGcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZU11bHRpcGxlKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKGRhdGEpO1xyXG5cclxuICAgICAgICAvL3RydW5jYXRlIGdyb3Vwc1xyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHR1cm4gZ3JvdXAgaXRlbXMgaW50byBhIGZsYXQgbGlzdFxyXG4gICAgICAgICAgICBjb25zdCBpdGVtc0FzTGlzdCA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBhbGwgYXNzaWduZWQgaW4gZ3JvdXBcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBBc3NpZ25lZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZ3JvdXAuaXRlbXMubWFwKGl0ID0+IGl0LmFzc2lnbmVlKSkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3R3JvdXA6IFRpbWV0YWJsZUdyb3VwID0geyBfaWQ6IGdyb3VwLl9pZCwgc2xvdHM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIGFzc2lnbmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGxldCBhc3NpZ25lZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBpdGVtcyB0byBrbm93IHdoZW4gYWxsIGl0ZW1zIGhhdmUgYmVlbiBjaGVja2VkXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHRpbWV0YWJsZS5kYXRhLmRheXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBhc3NpZ25lZXMgdG8ga25vdyB3aGVuIGFsbCBhc3NpZ25lZXMgaGF2ZSBiZWVuIGNoZWNrZWQgYW5kIGVzY2FwZSBpbmZpbml0ZSBsb29wXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Fzc2lnbmVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHRpbWV0YWJsZS5kYXRhLnBlcmlvZHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCBhc3NpZ25lZCB0byB0aGlzIHBhcnRpY3VsYXIgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlcyA9IHRpbWV0YWJsZS5nZXRTbG90QXNzaWduZWVzKGQsIHAsIGdyb3Vwcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2lnbmVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dyb3VwLnNsb3RzW2RdW3BdID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbGwgYXNzaWduZWRcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIW5ld0dyb3VwLnNsb3RzW2RdW3BdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVuY2F0ZSBhc3NpZ25lZEl0ZW1zIGlmIGFsbCBpdGVtcyBoYXZlIGJlZW4gYXNzaWduZWQgdG8gbWFrZSBzdXJlIG5vIGl0ZW0gaGFzIG1vcmUgaGVpcmFjaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVkSXRlbXMubGVuZ3RoID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgYXNzaWduZWRJdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIGxvb3AgaWYgbm9ib2R5IGNhbiBiZSBhc3NpZ25lZCB0byB0aGlzIHNsb3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwQXNzaWduZWVzLmxlbmd0aCA9PSBjaGVja0Fzc2lnbmVlcy5sZW5ndGgpIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgYSByYW5kb20gcG9pbnQgaW4gdGhlIGl0ZW1zIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtc0FzTGlzdC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1zQXNMaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKT8uYXNzaWduZWUgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja2VkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGNoZWNrZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hvIHdhcyBhc3NpZ25lZCB0byB0aGlzIHNsb3Q/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZWRTbG90ID0gYXNzaWduZWVzLmZpbmQoYSA9PiBhLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIHNsb3QgZnJlZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VkU2xvdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJ1biBhZ2FpbiBpZiBpdGVtIGhhcyBiZWVuIGFzc2lnbmVkIGluIGEgcm91bmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSAmJiBjaGVja2VkSXRlbXMubGVuZ3RoICE9IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3QgaXMgdXNlZCBhbmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBpdGVtIGlzIHRoZSBzYW1lIHdpdGggdGhlIHNsb3QgaXRlbSBhbmQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBncm91cHMgYXJlIGluIHRoZSBzYW1lIHNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodXNlZFNsb3Quc2VjdGlvbiA9PSBncm91cC5zZWN0aW9uICYmIHVzZWRTbG90Lml0ZW0gPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pKSBhc3NpZ25lZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tBc3NpZ25lZXMuaW5jbHVkZXMoYXNzaWduZWUpKSBjaGVja0Fzc2lnbmVlcy5wdXNoKGFzc2lnbmVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2gobmV3R3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFzc2lnblRvU2xvdChpdGVtOiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGhpcy5nZXRTbG90QXNzaWduZWVzKGRheSwgcGVyaW9kLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cElkKTtcclxuICAgICAgICBpZiAoIWdyb3VwKSB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKT8uYXNzaWduZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkID0gYXNzaWduZWVzLmZpbmQoYSA9PiBhLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuICAgICAgICByZXR1cm4gIShhc3NpZ25lZCAmJiBhc3NpZ25lZC5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3VwU2VjdGlvbnMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25zOiBJR3JvdXBbXVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBpZiAoIShzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dKSAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXSA9IFtdO1xyXG4gICAgICAgICAgICAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXS5wdXNoKGdyb3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25lZFRvU2FtZUluU2VjdGlvbihncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSB0aGlzLmdyb3VwU2VjdGlvbnMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gaW4gc2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHNlY3Rpb25zW3NlY3Rpb25dKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGdyb3VwLml0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZFtzZWN0aW9uXVtKU09OLnN0cmluZ2lmeShpdGVtKV0pIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXS5wdXNoKGdyb3VwLl9pZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWQoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGdyb3Vwcy5yZWR1Y2UoKGFjYywgcmVkdWNlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgcmVkdWNlci5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSB0aGlzLmdldE1pc3NpbmdJdGVtcyhncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IHVzZWQgPSBsZW4gLSBtaXNzaW5nLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLm1pc3NpbmcubGVuZ3RoO1xyXG4gICAgICAgIH0sIDEpXHJcblxyXG4gICAgICAgIHJldHVybiAodXNlZCAvIGxlbikgKiAxMDAgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgbnVsbHkoKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5kYXRhLmdyb3Vwcy5sZW5ndGggKiB0aGlzLmRhdGEuZGF5cy5sZW5ndGggKiB0aGlzLmRhdGEucGVyaW9kcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZWQgPSB0aGlzLmRhdGEuZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZC5zbG90cy5yZWR1Y2UoKGFjY2MsIHJlZGQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2NjICsgcmVkZC5yZWR1Y2UoKGFjY2NjLCByZWRkZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2NjYyArPSByZWRkZCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuICAgIH1cclxuXHJcbiAgICBoYXNJc3N1ZXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcbiAgICAgICAgcmV0dXJuICEhKGlzc3Vlcy5jb25mbGljdHMubGVuZ3RoIHx8IGlzc3Vlcy5pbnZhbGlkLmxlbmd0aCB8fCBpc3N1ZXMubWlzc2luZy5sZW5ndGgpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlTWFuYWdlciB9IGZyb20gXCIuL3V0aWxzL3RpbWV0YWJsZS5tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElHcm91cCB9IGZyb20gJy4vbW9kZWxzL2dyb3VwLmludGVyZmFjZSdcclxuLy8gaW1wb3J0IHt9XHJcbmV4cG9ydCB7XHJcbiAgICBUaW1ldGFibGVNYW5hZ2VyLFxyXG4gICAgSVRpbWV0YWJsZSxcclxuICAgIElHcm91cCxcclxuICAgIFxyXG59XHJcblxyXG4vLyByZXF1aXJlKCcuL3Rlc3QnKSJdLCJzb3VyY2VSb290IjoiIn0=