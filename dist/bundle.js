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


// require('./test')

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci8uL3NyYy91dGlscy90aW1ldGFibGUubWFuYWdlci50cyIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGltZXRhYmxlLW1hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90aW1ldGFibGUtbWFuYWdlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RpbWV0YWJsZS1tYW5hZ2VyLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtJQUVJLDBCQUNXLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdkIsQ0FBQztJQUVMLG1DQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixNQUFnQjs7UUFDNUIsSUFBTSxVQUFVLEdBQXlDLEVBQUUsQ0FBQzs7WUFDNUQsS0FBa0IsOEJBQU0saUZBQUU7Z0JBQXJCLElBQUksS0FBSztnQkFDVixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEdBQUcsRUFBTCxDQUFLLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFF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QkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNMNkQ7QUFLNUQ7QUFFRCxvQkFBb0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy9ncm91cC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29uZmxpY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5jb25mbGljdFwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVHcm91cCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmdyb3VwXCI7XHJcbmltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlU2xvdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLnNsb3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGVNYW5hZ2VyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZGF0YTogSVRpbWV0YWJsZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBnZXRTbG90cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdyb3Vwcy5tYXAoZyA9PiBnLnNsb3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNaXNzaW5nSXRlbXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFsbE1pc3Npbmc6IHsgX2lkOiBzdHJpbmcsIG1pc3Npbmc6IHN0cmluZ1tdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgYWxsTWlzc2luZy5wdXNoKHsgX2lkOiBncm91cC5faWQsIG1pc3Npbmc6IHRoaXMuZ2V0R3JvdXBNaXNzaW5nSXRlbXMoZ3JvdXAuX2lkLCBpdGVtcykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsTWlzc2luZy5maWx0ZXIoYWxtID0+IGFsbS5taXNzaW5nLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW52YWxpZEl0ZW1zKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhbGxJbnZhbGlkOiB7IF9pZDogc3RyaW5nLCBpbnZhbGlkOiBzdHJpbmdbXSB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGFsbEludmFsaWQucHVzaCh7IF9pZDogZ3JvdXAuX2lkLCBpbnZhbGlkOiB0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgaXRlbXMpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFsbEludmFsaWQuZmlsdGVyKGFsbSA9PiBhbG0uaW52YWxpZC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmRhdGEuZ3JvdXBzLmZpbmQoYyA9PiBjLl9pZC50b1N0cmluZygpID09IF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90cyhfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyb3VwKF9pZCk/LnNsb3RzIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVzKGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChhID0+IGEuX2lkID09IGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQpIGFzc2lnbmVlcy5wdXNoKGFzc2lnbm1lbnQuYXNzaWduZWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFzc2lnbmVlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwU2xvdHNBc0xpc3QoX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhfaWQpIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBzbG90cy5yZWR1Y2UoKGFjYywgdCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgLi4udF07XHJcbiAgICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cE1pc3NpbmdJdGVtcyhfaWQ6IHN0cmluZywgaXRlbXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzQXNMaXN0ID0gdGhpcy5nZXRHcm91cFNsb3RzQXNMaXN0KF9pZCk7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZzogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBpdGVtcykge1xyXG4gICAgICAgICAgICBpZiAoIXNsb3RzQXNMaXN0LmluY2x1ZGVzKGkpKSBtaXNzaW5nLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWlzc2luZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cEludmFsaWRJdGVtcyhfaWQ6IHN0cmluZywgaXRlbXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzQXNMaXN0ID0gdGhpcy5nZXRHcm91cFNsb3RzQXNMaXN0KF9pZCk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZDogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBzbG90c0FzTGlzdCkge1xyXG4gICAgICAgICAgICBpZiAoaSAmJiAhaXRlbXMuaW5jbHVkZXMoaSkpIGludmFsaWQucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbnZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RJdGVtcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBpdGVtczogKHN0cmluZyB8IG51bGwpW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2xvdHMgb2YgdGhpcy5nZXRTbG90cygpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIGl0ZW1zLnB1c2goc2xvdHNbZF1bcF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGl0ZW1zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90SXRlbShfaWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHJldHVybiBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdEFzc2lnbmVlcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHsgX2lkOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcgfCBudWxsLCBzZWN0aW9uOiBzdHJpbmcsIGl0ZW06IHN0cmluZyB8IG51bGwgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGcuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZy5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlcy5wdXNoKHsgX2lkOiBnLl9pZCwgYXNzaWduZWU6IGFzc2lnbm1lbnQ/LmFzc2lnbmVlIHx8IG51bGwsIHNlY3Rpb246IGcuc2VjdGlvbiwgaXRlbSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NpZ25lZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90QXNzaWduZWUoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudCkgcmV0dXJuIGFzc2lnbm1lbnQuYXNzaWduZWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1TbG90cyhpdGVtOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHRoaXMuZGF0YS5ncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc1tkYXldW3BlcmlvZF0gPT0gaXRlbSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdHMoYXNzaWduZWU6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc1tkYXldW3BlcmlvZF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQ/LmFzc2lnbmVlID09IGFzc2lnbmVlKSBzbG90cy5wdXNoKHsgZGF5LCBwZXJpb2QsIF9pZDogZ3JvdXAuX2lkIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJdGVtU2xvdChfaWQ6IHN0cmluZywgaXRlbTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhfaWQpO1xyXG4gICAgICAgIGNvbnN0IHNsb3RzOiBUaW1ldGFibGVTbG90W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHJldHVybiAoeyBkYXksIHBlcmlvZCwgX2lkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwOiBJR3JvdXApIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICBmb3IgKGxldCBkYXkgaW4gcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc1tkYXldW3BlcmlvZF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3RDb25mbGljdHMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBzbG90Q29uZmxpY3RzOiB0eXBlb2YgY29uZmxpY3RzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgY29uZmxpY3RzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNDOiB0eXBlb2YgZyA9IHsgX2lkOiBnLl9pZCwgY29uZmxpY3RzOiBbXSB9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiBnLmNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMuZGF5ID09IGRheSAmJiBjLnBlcmlvZCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzQy5jb25mbGljdHMucHVzaChjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2xvdENvbmZsaWN0cy5wdXNoKHNDKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90Q29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbmZsaWN0cyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzOiB7IF9pZDogc3RyaW5nLCBjb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gfVtdID0gW107XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQ6IHsgaXRlbTogc3RyaW5nLCBhc3NpZ25lZTogc3RyaW5nLCBzZWN0aW9uOiBzdHJpbmcgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90cyA9IHRoaXMuZ2V0R3JvdXBTbG90cyhncm91cC5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCBncm91cENvbmZsaWN0czogVGltZXRhYmxlQ29uZmxpY3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZGF5IGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc2xvdHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldEdyb3VwU2xvdEl0ZW0oZGF5LCBwZXJpb2QsIGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWUgPSB0aGlzLmdldEdyb3VwU2xvdEFzc2lnbmVlKGRheSwgcGVyaW9kLCBncm91cCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwSXRlbXMgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0R3JvdXBJbnZhbGlkSXRlbXMoZ3JvdXAuX2lkLCBncm91cEl0ZW1zKS5pbmNsdWRlcyhpdGVtKSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5hc3NpZ25lZSA9PSBhc3NpZ25lZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5pdGVtICE9IGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IChhc3NpZ25lZCBhcyBhbnkpW2Ake2RheX0uJHtwZXJpb2R9YF0/LnNlY3Rpb24gIT0gZ3JvdXAuc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQ29uZmxpY3RzLnB1c2goeyBkYXksIHBlcmlvZCwgaXRlbSwgYXNzaWduZWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdID0geyBhc3NpZ25lZSwgaXRlbSwgc2VjdGlvbjogZ3JvdXAuc2VjdGlvbiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25mbGljdHMucHVzaCh7IF9pZDogZ3JvdXAuX2lkLCBjb25mbGljdHM6IGdyb3VwQ29uZmxpY3RzIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5maWx0ZXIoYWxjID0+IGFsYy5jb25mbGljdHMubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cENvbmZsaWN0KF9pZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKS5maW5kKGMgPT4gYy5faWQgPT0gX2lkKT8uY29uZmxpY3RzO1xyXG4gICAgICAgIHJldHVybiBjb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUNvbmZsaWN0cyhpdGVtOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuaXRlbSA9PSBpdGVtKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlQ29uZmxpY3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuYXNzaWduZWUgPT0gYXNzaWduZWUpIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzaWduZWVTbG90Q29uZmxpY3RzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgYXNzaWduZWU6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0QXNzaWduZWVDb25mbGljdHMoYXNzaWduZWUsIGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHMubWFwKGMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfaWQ6IGMuX2lkLCBjb25mbGljdHM6IGMuY29uZmxpY3RzLmZpbHRlcihjYyA9PiBjYy5kYXkgPT0gZGF5ICYmIGNjLnBlcmlvZCA9PSBwZXJpb2QpIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNzdWVzKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBtaXNzaW5nID0gdGhpcy5nZXRNaXNzaW5nSXRlbXMoZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBpbnZhbGlkID0gdGhpcy5nZXRJbnZhbGlkSXRlbXMoZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldENvbmZsaWN0cyhncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4geyBtaXNzaW5nLCBpbnZhbGlkLCBjb25mbGljdHMgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cElzc3VlcyhpZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgaXNzdWVzID0gdGhpcy5nZXRJc3N1ZXMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlzc2luZzogaXNzdWVzLm1pc3NpbmcuZmluZChtID0+IG0uX2lkID09IGlkKSxcclxuICAgICAgICAgICAgaW52YWxpZDogaXNzdWVzLmludmFsaWQuZmluZChtID0+IG0uX2lkID09IGlkKSxcclxuICAgICAgICAgICAgY29uZmxpY3RzOiBpc3N1ZXMuY29uZmxpY3RzLmZpbmQobSA9PiBtLl9pZCA9PSBpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YTogSVRpbWV0YWJsZSA9IHsgZGF5czogdGhpcy5kYXRhLmRheXMsIHBlcmlvZHM6IHRoaXMuZGF0YS5wZXJpb2RzLCBncm91cHM6IHRoaXMuZGF0YS5ncm91cHMsIGJyZWFrUGVyaW9kczogdGhpcy5kYXRhLmJyZWFrUGVyaW9kcywgdHlwZTogdGhpcy5kYXRhLnR5cGUgfTtcclxuICAgICAgICBjb25zdCB0aW1lVGFibGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSBhcyBJVGltZXRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aW1lVGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduR3JvdXBTbG90KGRheTogbnVtYmVyLCBwZXJpb2Q6IG51bWJlciwgaXRlbTogc3RyaW5nLCBfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IF9pZCk7XHJcblxyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAodGltZXRhYmxlLmdldEdyb3VwSW52YWxpZEl0ZW1zKF9pZCwgZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpKSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpdGVtIHNob3VsZCBub3QgYmUgYXNzaWduZWQgdG8gdGhpcyBncm91cFwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aW1ldGFibGUuZ2V0R3JvdXBTbG90cyhfaWQpO1xyXG4gICAgICAgIHNsb3RzW2RheV1bcGVyaW9kXSA9IGl0ZW07XHJcblxyXG4gICAgICAgIHRpbWV0YWJsZS5kYXRhLmdyb3VwcyA9IHRpbWV0YWJsZS5kYXRhLmdyb3Vwcy5tYXAoZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnLl9pZCA9PSBfaWQpIGcuc2xvdHMgPSBzbG90cztcclxuICAgICAgICAgICAgcmV0dXJuIGc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRpbWV0YWJsZS5nZXRHcm91cENvbmZsaWN0KF9pZCwgZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCk/LmFzc2lnbmVlO1xyXG5cclxuICAgICAgICBjb25zdCB0aGVDb25mbGljdCA9IGNvbmZsaWN0cz8uZmluZChjID0+IGMuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIGlmICh0aGVDb25mbGljdCkgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpdGVtIGNyZWF0ZWQgYSBjb25mbGljdCBpbiB0aGlzIGdyb3VwXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlKGdyb3VwczogSUdyb3VwW10sIHJhbmRvbSA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGVNYW5hZ2VyKGRhdGEpO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXNBc0xpc3QgPSBncm91cC5pdGVtcy5tYXAoaSA9PiBpLl9pZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZWQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnOiBUaW1ldGFibGVHcm91cCA9IHsgX2lkOiBncm91cC5faWQsIHNsb3RzOiBbXSB9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZCBpbiB0aW1ldGFibGUuZGF0YS5kYXlzKSB7XHJcbiAgICAgICAgICAgICAgICBnLnNsb3RzW2RdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiB0aW1ldGFibGUuZGF0YS5wZXJpb2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZWQubGVuZ3RoID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyYW5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zQXNMaXN0LnBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFnLnNsb3RzW2RdW3BdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zQXNMaXN0W25dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlZC5pbmNsdWRlcyhpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCAtIDEgPyAwIDogbiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzLnB1c2goZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlTXVsdGlwbGUoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgdGltZXRhYmxlID0gbmV3IFRpbWV0YWJsZU1hbmFnZXIoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmRhdGEuZ3JvdXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gdHVybiBncm91cCBpdGVtcyBpbnRvIGEgZmxhdCBsaXN0XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IGEgc2V0IG9mIGFsbCBhc3NpZ25lZCBpbiBncm91cFxyXG4gICAgICAgICAgICBjb25zdCBncm91cEFzc2lnbmVlcyA9IEFycmF5LmZyb20obmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcm91cDogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZWQgdG8gc3RvcmUgYXNzaWduZWQgaXRlbXNcclxuICAgICAgICAgICAgbGV0IGFzc2lnbmVkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGl0ZW1zIHRvIGtub3cgd2hlbiBhbGwgaXRlbXMgaGF2ZSBiZWVuIGNoZWNrZWRcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWRJdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRhdGEuZGF5cykge1xyXG4gICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSBjaGVja2VkIGFzc2lnbmVlcyB0byBrbm93IHdoZW4gYWxsIGFzc2lnbmVlcyBoYXZlIGJlZW4gY2hlY2tlZCBhbmQgZXNjYXBlIGluZmluaXRlIGxvb3BcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrQXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gdGltZXRhYmxlLmRhdGEucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldFNsb3RBc3NpZ25lZXMoZCwgcCwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVuIGFnYWluIGlmIGl0ZW0gaGFzIGJlZW4gYXNzaWduZWQgaW4gYSByb3VuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pICYmIGNoZWNrZWRJdGVtcy5sZW5ndGggIT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZGF0YS5ncm91cHMucHVzaChuZXdHcm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1ldGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQXNzaWduVG9TbG90KGl0ZW06IHN0cmluZywgZ3JvdXBJZDogc3RyaW5nLCBkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXMgPSB0aGlzLmdldFNsb3RBc3NpZ25lZXMoZGF5LCBwZXJpb2QsIGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IGdyb3VwSWQpO1xyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIHJldHVybiAhKGFzc2lnbmVkICYmIGFzc2lnbmVkLnNlY3Rpb24gIT0gZ3JvdXAuc2VjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ3JvdXBTZWN0aW9ucyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnM6IElHcm91cFtdW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGlmICghKHNlY3Rpb25zIGFzIGFueSlbZ3JvdXAuc2VjdGlvbl0pIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dID0gW107XHJcbiAgICAgICAgICAgIChzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnbmVkVG9TYW1lSW5TZWN0aW9uKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuZ3JvdXBTZWN0aW9ucyhncm91cHMpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZDogYW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBpbiBzZWN0aW9ucykge1xyXG4gICAgICAgICAgICBhc3NpZ25lZFtzZWN0aW9uXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2Ygc2VjdGlvbnNbc2VjdGlvbl0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZ3JvdXAuaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSkgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl1bSlNPTi5zdHJpbmdpZnkoaXRlbSldLnB1c2goZ3JvdXAuX2lkKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzaWduZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlZChncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gZ3JvdXBzLnJlZHVjZSgoYWNjLCByZWR1Y2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyByZWR1Y2VyLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICB9LCAxKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgdXNlZCA9IGxlbiAtIG1pc3NpbmcucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYyArIHJlZHVjZXIubWlzc2luZy5sZW5ndGg7XHJcbiAgICAgICAgfSwgMSlcclxuXHJcbiAgICAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuICAgIH1cclxuXHJcbiAgICBudWxseSgpIHtcclxuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmRhdGEuZ3JvdXBzLmxlbmd0aCAqIHRoaXMuZGF0YS5kYXlzLmxlbmd0aCAqIHRoaXMuZGF0YS5wZXJpb2RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgY29uc3QgdXNlZCA9IHRoaXMuZGF0YS5ncm91cHMucmVkdWNlKChhY2MsIHJlZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjICsgcmVkLnNsb3RzLnJlZHVjZSgoYWNjYywgcmVkZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2MgKyByZWRkLnJlZHVjZSgoYWNjY2MsIHJlZGRkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY2NjICs9IHJlZGRkID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gKHVzZWQgLyBsZW4pICogMTAwICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0lzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgaXNzdWVzID0gdGhpcy5nZXRJc3N1ZXMoZ3JvdXBzKTtcclxuICAgICAgICByZXR1cm4gISEoaXNzdWVzLmNvbmZsaWN0cy5sZW5ndGggfHwgaXNzdWVzLmludmFsaWQubGVuZ3RoIHx8IGlzc3Vlcy5taXNzaW5nLmxlbmd0aCk7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IElUaW1ldGFibGUgfSBmcm9tIFwiLi9tb2RlbHMvdGltZXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVNYW5hZ2VyIH0gZnJvbSBcIi4vdXRpbHMvdGltZXRhYmxlLm1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBUaW1ldGFibGVNYW5hZ2VyLFxyXG4gICAgSVRpbWV0YWJsZVxyXG59XHJcblxyXG4vLyByZXF1aXJlKCcuL3Rlc3QnKSJdLCJzb3VyY2VSb290IjoiIn0=