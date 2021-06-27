/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/timetable.class.ts":
/*!**************************************!*\
  !*** ./src/utils/timetable.class.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timetable": () => (/* binding */ Timetable)
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
var Timetable = /** @class */ (function () {
    function Timetable(days, periods, breakPeriods, groups, type) {
        this.days = days;
        this.periods = periods;
        this.breakPeriods = breakPeriods;
        this.groups = groups;
        this.type = type;
    }
    Object.defineProperty(Timetable.prototype, "data", {
        get: function () {
            return this.clone();
        },
        enumerable: false,
        configurable: true
    });
    Timetable.prototype.getSlots = function () {
        return this.groups.map(function (g) { return g.slots; });
    };
    Timetable.prototype.getMissingItems = function (groups) {
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
    Timetable.prototype.getInvalidItems = function (groups) {
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
    Timetable.prototype.getGroup = function (_id) {
        var group = this.groups.find(function (c) { return c._id.toString() == _id.toString(); });
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
        return __spreadArray([], __read(new Set(assignees)));
    };
    Timetable.prototype.getGroupSlotsAsList = function (_id) {
        var slots = this.getGroupSlots(_id) || [];
        var list = slots.reduce(function (acc, t) {
            return __spreadArray(__spreadArray([], __read(acc)), __read(t));
        }, []);
        return list;
    };
    Timetable.prototype.getGroupMissingItems = function (_id, items) {
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
    Timetable.prototype.getGroupInvalidItems = function (_id, items) {
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
    Timetable.prototype.getSlotItems = function (day, period) {
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
    Timetable.prototype.getGroupSlotAssignee = function (day, period, group) {
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
    Timetable.prototype.getItemSlots = function (item) {
        var e_7, _a;
        var slots = [];
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    Timetable.prototype.getAssigneeSlots = function (assignee, groups) {
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
    Timetable.prototype.getSlotConflicts = function (day, period, groups) {
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
    Timetable.prototype.getConflicts = function (groups) {
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
        var data = { days: this.days, periods: this.periods, groups: this.groups, breakPeriods: this.breakPeriods, type: this.type };
        var timeTable = JSON.parse(JSON.stringify(data));
        return timeTable;
    };
    Timetable.prototype.assignGroupSlot = function (day, period, item, _id, groups) {
        var _a;
        var data = this.clone();
        var group = groups.find(function (g) { return g._id == _id; });
        if (!group)
            throw new Error('Group not found');
        var timetable = new Timetable(data.days, data.periods, data.breakPeriods, data.groups, data.type);
        if (timetable.getGroupInvalidItems(_id, group.items.map(function (i) { return i._id; })))
            throw new Error("This item should not be assigned to this group");
        var slots = timetable.getGroupSlots(_id);
        slots[day][period] = item;
        timetable.groups = timetable.groups.map(function (g) {
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
    Timetable.prototype.automate = function (groups, random) {
        var e_12, _a;
        if (random === void 0) { random = true; }
        var data = this.clone();
        var timetable = new Timetable(data.days, data.periods, data.breakPeriods, data.groups, 'single');
        timetable.groups = [];
        try {
            for (var groups_6 = __values(groups), groups_6_1 = groups_6.next(); !groups_6_1.done; groups_6_1 = groups_6.next()) {
                var group = groups_6_1.value;
                var itemsAsList = group.items.map(function (i) { return i._id; });
                var used = [];
                var g = { _id: group._id, slots: [] };
                for (var d in timetable.days) {
                    g.slots[d] = [];
                    for (var p in timetable.periods) {
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
                timetable.groups.push(g);
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
    Timetable.prototype.automateMultiple = function (groups) {
        var _a;
        var data = this.clone();
        var timetable = new Timetable(data.days, data.periods, data.breakPeriods, data.groups, 'multiple');
        //truncate groups
        timetable.groups = [];
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
            for (var d in timetable.days) {
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
                for (var p in timetable.periods) {
                    _loop_6(p);
                }
            }
            timetable.groups.push(newGroup);
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
    Timetable.prototype.groupSections = function (groups) {
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
    Timetable.prototype.assignedToSameInSection = function (groups) {
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
/* harmony export */   "Timetable": () => (/* reexport safe */ _utils_timetable_class__WEBPACK_IMPORTED_MODULE_0__.Timetable)
/* harmony export */ });
/* harmony import */ var _utils_timetable_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/timetable.class */ "./src/utils/timetable.class.ts");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbnktdGltZXRhYmxlLy4vc3JjL3V0aWxzL3RpbWV0YWJsZS5jbGFzcy50cyIsIndlYnBhY2s6Ly9hbnktdGltZXRhYmxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FueS10aW1ldGFibGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FueS10aW1ldGFibGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hbnktdGltZXRhYmxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYW55LXRpbWV0YWJsZS8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFNSSxtQkFDVyxJQUFjLEVBQ2QsT0FBMEIsRUFDMUIsWUFBc0IsRUFDdEIsTUFBd0IsRUFDeEIsSUFBMkI7UUFKM0IsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQzFCLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQXVCO0lBQ2xDLENBQUM7SUFWTCxzQkFBSSwyQkFBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFVRCw0QkFBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsbUNBQWUsR0FBZixVQUFnQixNQUFnQjs7UUFDNUIsSUFBTSxVQUFVLEdBQXlDLEVBQUUsQ0FBQzs7WUFDNUQs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YTtBQUViLHlEQUF5RDtBQUN6RCw0REFBNEQ7QUFDNUQsK0NBQStDO0FBQy9DLFlBQVk7QUFFWix1Q0FBdUM7QUFDdkMsSUFBSTtBQUVKLDBFQUEwRTtBQUMxRSwwREFBMEQ7QUFDMUQsMkRBQTJEO0FBRTNELG1GQUFtRjtBQUNuRixpREFBaUQ7QUFDakQsc0VBQXNFO0FBR3RFLHNCQUFzQjtBQUV0QixrREFBa0Q7QUFDbEQsd0NBQXdDO0FBRXhDLHNCQUFzQjtBQUV0QixrREFBa0Q7QUFFbEQsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUlqQyxpQ0FBaUM7QUFFakMsZ0NBQWdDO0FBRWhDLGdEQUFnRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJR3JvdXAgfSBmcm9tIFwiLi4vbW9kZWxzL2dyb3VwLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVDb25mbGljdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmNvbmZsaWN0XCI7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUdyb3VwIH0gZnJvbSBcIi4uL21vZGVscy90aW1ldGFibGUuZ3JvdXBcIjtcclxuaW1wb3J0IHsgSVRpbWV0YWJsZSB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVQZXJpb2QgfSBmcm9tIFwiLi4vbW9kZWxzL3RpbWV0YWJsZS5wZXJpb2RcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlU2xvdCB9IGZyb20gXCIuLi9tb2RlbHMvdGltZXRhYmxlLnNsb3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1ldGFibGUgaW1wbGVtZW50cyBJVGltZXRhYmxlIHtcclxuXHJcbiAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBkYXlzOiBzdHJpbmdbXSxcclxuICAgICAgICBwdWJsaWMgcGVyaW9kczogVGltZXRhYmxlUGVyaW9kW10sXHJcbiAgICAgICAgcHVibGljIGJyZWFrUGVyaW9kczogbnVtYmVyW10sXHJcbiAgICAgICAgcHVibGljIGdyb3VwczogVGltZXRhYmxlR3JvdXBbXSxcclxuICAgICAgICBwdWJsaWMgdHlwZTogJ3NpbmdsZScgfCAnbXVsdGlwbGUnXHJcbiAgICApIHsgfVxyXG5cclxuICAgIGdldFNsb3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3Vwcy5tYXAoZyA9PiBnLnNsb3RzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNaXNzaW5nSXRlbXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFsbE1pc3Npbmc6IHsgX2lkOiBzdHJpbmcsIG1pc3Npbmc6IHN0cmluZ1tdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgYWxsTWlzc2luZy5wdXNoKHsgX2lkOiBncm91cC5faWQsIG1pc3Npbmc6IHRoaXMuZ2V0R3JvdXBNaXNzaW5nSXRlbXMoZ3JvdXAuX2lkLCBpdGVtcykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsTWlzc2luZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnZhbGlkSXRlbXMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGFsbEludmFsaWQ6IHsgX2lkOiBzdHJpbmcsIGludmFsaWQ6IHN0cmluZ1tdIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuICAgICAgICAgICAgYWxsSW52YWxpZC5wdXNoKHsgX2lkOiBncm91cC5faWQsIGludmFsaWQ6IHRoaXMuZ2V0R3JvdXBJbnZhbGlkSXRlbXMoZ3JvdXAuX2lkLCBpdGVtcykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsSW52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cChfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ncm91cHMuZmluZChjID0+IGMuX2lkLnRvU3RyaW5nKCkgPT0gX2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RzKF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXAoX2lkKT8uc2xvdHMgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBBc3NpZ25lZXMoZ3JvdXA6IElHcm91cCkge1xyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudCkgYXNzaWduZWVzLnB1c2goYXNzaWdubWVudC5hc3NpZ25lZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbLi4ubmV3IFNldChhc3NpZ25lZXMpXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHcm91cFNsb3RzQXNMaXN0KF9pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKSB8fCBbXTtcclxuICAgICAgICBjb25zdCBsaXN0ID0gc2xvdHMucmVkdWNlKChhY2MsIHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLnRdO1xyXG4gICAgICAgIH0sIFtdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBNaXNzaW5nSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IG1pc3Npbmc6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2YgaXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKCFzbG90c0FzTGlzdC5pbmNsdWRlcyhpKSkgbWlzc2luZy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pc3Npbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJbnZhbGlkSXRlbXMoX2lkOiBzdHJpbmcsIGl0ZW1zOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBzbG90c0FzTGlzdCA9IHRoaXMuZ2V0R3JvdXBTbG90c0FzTGlzdChfaWQpO1xyXG4gICAgICAgIGNvbnN0IGludmFsaWQ6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgb2Ygc2xvdHNBc0xpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGkgJiYgIWl0ZW1zLmluY2x1ZGVzKGkpKSBpbnZhbGlkLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW52YWxpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90SXRlbXMoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbXM6IChzdHJpbmcgfCBudWxsKVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNsb3RzIG9mIHRoaXMuZ2V0U2xvdHMoKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHNsb3RzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT0gZGF5ICYmIHAgPT0gcGVyaW9kKSBpdGVtcy5wdXNoKHNsb3RzW2RdW3BdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgU2V0KGl0ZW1zKV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90SXRlbShfaWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHJldHVybiBzbG90c1tkXVtwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvdEFzc2lnbmVlcyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZXM6IHsgX2lkOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcgfCBudWxsLCBzZWN0aW9uOiBzdHJpbmcsIGl0ZW06IHN0cmluZyB8IG51bGwgfVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGcgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsb3RzID0gdGhpcy5nZXRHcm91cFNsb3RzKGcuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gc2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHAgaW4gc2xvdHNbZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNsb3RzW2RdW3BdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gZy5pdGVtcy5maW5kKGEgPT4gYS5faWQgPT0gaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlcy5wdXNoKHsgX2lkOiBnLl9pZCwgYXNzaWduZWU6IGFzc2lnbm1lbnQ/LmFzc2lnbmVlIHx8IG51bGwsIHNlY3Rpb246IGcuc2VjdGlvbiwgaXRlbSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NpZ25lZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBTbG90QXNzaWduZWUoZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZCBpbiBzbG90cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIHNsb3RzW2RdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PSBkYXkgJiYgcCA9PSBwZXJpb2QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gc2xvdHNbZF1bcF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoYSA9PiBhLl9pZCA9PSBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudCkgcmV0dXJuIGFzc2lnbm1lbnQuYXNzaWduZWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1TbG90cyhpdGVtOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHRoaXMuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNbZGF5XVtwZXJpb2RdID09IGl0ZW0pIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZVNsb3RzKGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwZXJpb2QgaW4gc1tkYXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBncm91cC5pdGVtcy5maW5kKGkgPT4gaS5faWQgPT0gaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Py5hc3NpZ25lZSA9PSBhc3NpZ25lZSkgc2xvdHMucHVzaCh7IGRheSwgcGVyaW9kLCBfaWQ6IGdyb3VwLl9pZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwSXRlbVNsb3QoX2lkOiBzdHJpbmcsIGl0ZW06IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBjb25zdCBzbG90czogVGltZXRhYmxlU2xvdFtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGRheSBpbiBzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBlcmlvZCBpbiBzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzW2RheV1bcGVyaW9kXSA9PSBpdGVtKSByZXR1cm4gKHsgZGF5LCBwZXJpb2QsIF9pZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNsb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwQXNzaWduZWVTbG90cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cDogSUdyb3VwKSB7XHJcbiAgICAgICAgY29uc3Qgc2xvdHM6IFRpbWV0YWJsZVNsb3RbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5nZXRHcm91cFNsb3RzKGdyb3VwLl9pZCk7XHJcbiAgICAgICAgZm9yIChsZXQgZGF5IGluIHMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNbZGF5XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNbZGF5XVtwZXJpb2RdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudD8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHNsb3RzLnB1c2goeyBkYXksIHBlcmlvZCwgX2lkOiBncm91cC5faWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzbG90cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG90Q29uZmxpY3RzKGRheTogc3RyaW5nLCBwZXJpb2Q6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3Qgc2xvdENvbmZsaWN0czogdHlwZW9mIGNvbmZsaWN0cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBnIG9mIGNvbmZsaWN0cykge1xyXG4gICAgICAgICAgICBjb25zdCBzQzogdHlwZW9mIGcgPSB7IF9pZDogZy5faWQsIGNvbmZsaWN0czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgZy5jb25mbGljdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLmRheSA9PSBkYXkgJiYgYy5wZXJpb2QgPT0gcGVyaW9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc0MuY29uZmxpY3RzLnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsb3RDb25mbGljdHMucHVzaChzQyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2xvdENvbmZsaWN0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25mbGljdHMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0czogeyBfaWQ6IHN0cmluZywgY29uZmxpY3RzOiBUaW1ldGFibGVDb25mbGljdFtdIH1bXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkOiB7IGl0ZW06IHN0cmluZywgYXNzaWduZWU6IHN0cmluZywgc2VjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBncm91cCBvZiBncm91cHMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEdyb3VwU2xvdHMoZ3JvdXAuX2lkKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBDb25mbGljdHM6IFRpbWV0YWJsZUNvbmZsaWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRheSBpbiBzbG90cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGVyaW9kIGluIHNsb3RzW2RheV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5nZXRHcm91cFNsb3RJdGVtKGRheSwgcGVyaW9kLCBncm91cC5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVlID0gdGhpcy5nZXRHcm91cFNsb3RBc3NpZ25lZShkYXksIHBlcmlvZCwgZ3JvdXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXNzaWduZWUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cEl0ZW1zID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEdyb3VwSW52YWxpZEl0ZW1zKGdyb3VwLl9pZCwgZ3JvdXBJdGVtcykuaW5jbHVkZXMoaXRlbSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uYXNzaWduZWUgPT0gYXNzaWduZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXT8uaXRlbSAhPSBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAoYXNzaWduZWQgYXMgYW55KVtgJHtkYXl9LiR7cGVyaW9kfWBdPy5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cENvbmZsaWN0cy5wdXNoKHsgZGF5LCBwZXJpb2QsIGl0ZW0sIGFzc2lnbmVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFzc2lnbmVkIGFzIGFueSlbYCR7ZGF5fS4ke3BlcmlvZH1gXSA9IHsgYXNzaWduZWUsIGl0ZW0sIHNlY3Rpb246IGdyb3VwLnNlY3Rpb24gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goeyBfaWQ6IGdyb3VwLl9pZCwgY29uZmxpY3RzOiBncm91cENvbmZsaWN0cyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25mbGljdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBDb25mbGljdChfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRoaXMuZ2V0Q29uZmxpY3RzKGdyb3VwcykuZmluZChjID0+IGMuX2lkID09IF9pZCk/LmNvbmZsaWN0cztcclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1Db25mbGljdHMoaXRlbTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLml0ZW0gPT0gaXRlbSkgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NpZ25lZUNvbmZsaWN0cyhhc3NpZ25lZTogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZsaWN0cy5tYXAoYyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IF9pZDogYy5faWQsIGNvbmZsaWN0czogYy5jb25mbGljdHMuZmlsdGVyKGNjID0+IGNjLmFzc2lnbmVlID09IGFzc2lnbmVlKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2lnbmVlU2xvdENvbmZsaWN0cyhkYXk6IHN0cmluZywgcGVyaW9kOiBzdHJpbmcsIGFzc2lnbmVlOiBzdHJpbmcsIGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBjb25mbGljdHMgPSB0aGlzLmdldEFzc2lnbmVlQ29uZmxpY3RzKGFzc2lnbmVlLCBncm91cHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmxpY3RzLm1hcChjID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgX2lkOiBjLl9pZCwgY29uZmxpY3RzOiBjLmNvbmZsaWN0cy5maWx0ZXIoY2MgPT4gY2MuZGF5ID09IGRheSAmJiBjYy5wZXJpb2QgPT0gcGVyaW9kKSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzc3Vlcyhncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgbWlzc2luZyA9IHRoaXMuZ2V0TWlzc2luZ0l0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZCA9IHRoaXMuZ2V0SW52YWxpZEl0ZW1zKGdyb3Vwcyk7XHJcbiAgICAgICAgY29uc3QgY29uZmxpY3RzID0gdGhpcy5nZXRDb25mbGljdHMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWlzc2luZywgaW52YWxpZCwgY29uZmxpY3RzIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXBJc3N1ZXMoaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGlzc3VlcyA9IHRoaXMuZ2V0SXNzdWVzKGdyb3Vwcyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pc3Npbmc6IGlzc3Vlcy5taXNzaW5nLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGludmFsaWQ6IGlzc3Vlcy5pbnZhbGlkLmZpbmQobSA9PiBtLl9pZCA9PSBpZCksXHJcbiAgICAgICAgICAgIGNvbmZsaWN0czogaXNzdWVzLmNvbmZsaWN0cy5maW5kKG0gPT4gbS5faWQgPT0gaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGE6IElUaW1ldGFibGUgPSB7IGRheXM6IHRoaXMuZGF5cywgcGVyaW9kczogdGhpcy5wZXJpb2RzLCBncm91cHM6IHRoaXMuZ3JvdXBzLCBicmVha1BlcmlvZHM6IHRoaXMuYnJlYWtQZXJpb2RzLCB0eXBlOiB0aGlzLnR5cGUgfTtcclxuICAgICAgICBjb25zdCB0aW1lVGFibGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSBhcyBJVGltZXRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aW1lVGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduR3JvdXBTbG90KGRheTogbnVtYmVyLCBwZXJpb2Q6IG51bWJlciwgaXRlbTogc3RyaW5nLCBfaWQ6IHN0cmluZywgZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZmluZChnID0+IGcuX2lkID09IF9pZCk7XHJcblxyXG4gICAgICAgIGlmICghZ3JvdXApIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGUoZGF0YS5kYXlzLCBkYXRhLnBlcmlvZHMsIGRhdGEuYnJlYWtQZXJpb2RzLCBkYXRhLmdyb3VwcywgZGF0YS50eXBlKTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWV0YWJsZS5nZXRHcm91cEludmFsaWRJdGVtcyhfaWQsIGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKSkpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXRlbSBzaG91bGQgbm90IGJlIGFzc2lnbmVkIHRvIHRoaXMgZ3JvdXBcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3RzID0gdGltZXRhYmxlLmdldEdyb3VwU2xvdHMoX2lkKTtcclxuICAgICAgICBzbG90c1tkYXldW3BlcmlvZF0gPSBpdGVtO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZ3JvdXBzID0gdGltZXRhYmxlLmdyb3Vwcy5tYXAoZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnLl9pZCA9PSBfaWQpIGcuc2xvdHMgPSBzbG90cztcclxuICAgICAgICAgICAgcmV0dXJuIGc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZsaWN0cyA9IHRpbWV0YWJsZS5nZXRHcm91cENvbmZsaWN0KF9pZCwgZ3JvdXBzKTtcclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCk/LmFzc2lnbmVlO1xyXG5cclxuICAgICAgICBjb25zdCB0aGVDb25mbGljdCA9IGNvbmZsaWN0cz8uZmluZChjID0+IGMuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG4gICAgICAgIGlmICh0aGVDb25mbGljdCkgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpdGVtIGNyZWF0ZWQgYSBjb25mbGljdCBpbiB0aGlzIGdyb3VwXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dG9tYXRlKGdyb3VwczogSUdyb3VwW10sIHJhbmRvbSA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGUoZGF0YS5kYXlzLCBkYXRhLnBlcmlvZHMsIGRhdGEuYnJlYWtQZXJpb2RzLCBkYXRhLmdyb3VwcywgJ3NpbmdsZScpO1xyXG5cclxuICAgICAgICB0aW1ldGFibGUuZ3JvdXBzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3JvdXAgb2YgZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zQXNMaXN0ID0gZ3JvdXAuaXRlbXMubWFwKGkgPT4gaS5faWQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VkOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZzogVGltZXRhYmxlR3JvdXAgPSB7IF9pZDogZ3JvdXAuX2lkLCBzbG90czogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGQgaW4gdGltZXRhYmxlLmRheXMpIHtcclxuICAgICAgICAgICAgICAgIGcuc2xvdHNbZF0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwIGluIHRpbWV0YWJsZS5wZXJpb2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZWQubGVuZ3RoID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyYW5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zQXNMaXN0LnBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFnLnNsb3RzW2RdW3BdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zQXNMaXN0W25dO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXNlZC5pbmNsdWRlcyhpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuc2xvdHNbZF1bcF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSBuID09IGl0ZW1zQXNMaXN0Lmxlbmd0aCAtIDEgPyAwIDogbiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGltZXRhYmxlLmdyb3Vwcy5wdXNoKGcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWV0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvbWF0ZU11bHRpcGxlKGdyb3VwczogSUdyb3VwW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRpbWV0YWJsZSA9IG5ldyBUaW1ldGFibGUoZGF0YS5kYXlzLCBkYXRhLnBlcmlvZHMsIGRhdGEuYnJlYWtQZXJpb2RzLCBkYXRhLmdyb3VwcywgJ211bHRpcGxlJyk7XHJcblxyXG4gICAgICAgIC8vdHJ1bmNhdGUgZ3JvdXBzXHJcbiAgICAgICAgdGltZXRhYmxlLmdyb3VwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHR1cm4gZ3JvdXAgaXRlbXMgaW50byBhIGZsYXQgbGlzdFxyXG4gICAgICAgICAgICBjb25zdCBpdGVtc0FzTGlzdCA9IGdyb3VwLml0ZW1zLm1hcChpID0+IGkuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBhbGwgYXNzaWduZWQgaW4gZ3JvdXBcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBBc3NpZ25lZXMgPSAgW1xyXG4gICAgICAgICAgICAgICAgLi4ubmV3IFNldChncm91cC5pdGVtcy5tYXAoaXQgPT4gaXQuYXNzaWduZWUpKVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3R3JvdXA6IFRpbWV0YWJsZUdyb3VwID0geyBfaWQ6IGdyb3VwLl9pZCwgc2xvdHM6IFtdIH07XHJcblxyXG4gICAgICAgICAgICAvLyB1c2VkIHRvIHN0b3JlIGFzc2lnbmVkIGl0ZW1zXHJcbiAgICAgICAgICAgIGxldCBhc3NpZ25lZEl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgY2hlY2tlZCBpdGVtcyB0byBrbm93IHdoZW4gYWxsIGl0ZW1zIGhhdmUgYmVlbiBjaGVja2VkXHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkSXRlbXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBkIGluIHRpbWV0YWJsZS5kYXlzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIGNoZWNrZWQgYXNzaWduZWVzIHRvIGtub3cgd2hlbiBhbGwgYXNzaWduZWVzIGhhdmUgYmVlbiBjaGVja2VkIGFuZCBlc2NhcGUgaW5maW5pdGUgbG9vcFxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tBc3NpZ25lZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiB0aW1ldGFibGUucGVyaW9kcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGFzc2lnbmVkIHRvIHRoaXMgcGFydGljdWxhciBzbG90XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGltZXRhYmxlLmdldFNsb3RBc3NpZ25lZXMoZCwgcCwgZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXNzaWduZWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R3JvdXAuc2xvdHNbZF1bcF0gPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlsbCBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV3R3JvdXAuc2xvdHNbZF1bcF0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydW5jYXRlIGFzc2lnbmVkSXRlbXMgaWYgYWxsIGl0ZW1zIGhhdmUgYmVlbiBhc3NpZ25lZCB0byBtYWtlIHN1cmUgbm8gaXRlbSBoYXMgbW9yZSBoZWlyYWNoeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWRJdGVtcy5sZW5ndGggPT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBhc3NpZ25lZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgbG9vcCBpZiBub2JvZHkgY2FuIGJlIGFzc2lnbmVkIHRvIHRoaXMgc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBBc3NpZ25lZXMubGVuZ3RoID09IGNoZWNrQXNzaWduZWVzLmxlbmd0aCkgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBhIHJhbmRvbSBwb2ludCBpbiB0aGUgaXRlbXMgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zQXNMaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gaXRlbXNBc0xpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlID0gZ3JvdXAuaXRlbXMuZmluZChpID0+IGkuX2lkID09IGl0ZW0pPy5hc3NpZ25lZSBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkgY2hlY2tlZEl0ZW1zLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aG8gd2FzIGFzc2lnbmVkIHRvIHRoaXMgc2xvdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFNsb3QgPSBhc3NpZ25lZXMuZmluZChhID0+IGEuYXNzaWduZWUgPT0gYXNzaWduZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgc2xvdCBmcmVlP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVzZWRTbG90KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVuIGFnYWluIGlmIGl0ZW0gaGFzIGJlZW4gYXNzaWduZWQgaW4gYSByb3VuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25lZEl0ZW1zLmluY2x1ZGVzKGl0ZW0pICYmIGNoZWNrZWRJdGVtcy5sZW5ndGggIT0gaXRlbXNBc0xpc3QubGVuZ3RoKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdCBpcyB1c2VkIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGl0ZW0gaXMgdGhlIHNhbWUgd2l0aCB0aGUgc2xvdCBpdGVtIGFuZCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGdyb3VwcyBhcmUgaW4gdGhlIHNhbWUgc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VkU2xvdC5zZWN0aW9uID09IGdyb3VwLnNlY3Rpb24gJiYgdXNlZFNsb3QuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdHcm91cC5zbG90c1tkXVtwXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbmVkSXRlbXMuaW5jbHVkZXMoaXRlbSkpIGFzc2lnbmVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja0Fzc2lnbmVlcy5pbmNsdWRlcyhhc3NpZ25lZSkpIGNoZWNrQXNzaWduZWVzLnB1c2goYXNzaWduZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aW1ldGFibGUuZ3JvdXBzLnB1c2gobmV3R3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFzc2lnblRvU2xvdChpdGVtOiBzdHJpbmcsIGdyb3VwSWQ6IHN0cmluZywgZGF5OiBzdHJpbmcsIHBlcmlvZDogc3RyaW5nLCBncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWVzID0gdGhpcy5nZXRTbG90QXNzaWduZWVzKGRheSwgcGVyaW9kLCBncm91cHMpO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmZpbmQoZyA9PiBnLl9pZCA9PSBncm91cElkKTtcclxuICAgICAgICBpZiAoIWdyb3VwKSB0aHJvdyBuZXcgRXJyb3IoJ0dyb3VwIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgICAgICBjb25zdCBhc3NpZ25lZSA9IGdyb3VwLml0ZW1zLmZpbmQoaSA9PiBpLl9pZCA9PSBpdGVtKT8uYXNzaWduZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkID0gYXNzaWduZWVzLmZpbmQoYSA9PiBhLmFzc2lnbmVlID09IGFzc2lnbmVlKTtcclxuICAgICAgICByZXR1cm4gIShhc3NpZ25lZCAmJiBhc3NpZ25lZC5zZWN0aW9uICE9IGdyb3VwLnNlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGdyb3VwU2VjdGlvbnMoZ3JvdXBzOiBJR3JvdXBbXSkge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25zOiBJR3JvdXBbXVtdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGdyb3VwIG9mIGdyb3Vwcykge1xyXG4gICAgICAgICAgICBpZiAoIShzZWN0aW9ucyBhcyBhbnkpW2dyb3VwLnNlY3Rpb25dKSAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXSA9IFtdO1xyXG4gICAgICAgICAgICAoc2VjdGlvbnMgYXMgYW55KVtncm91cC5zZWN0aW9uXS5wdXNoKGdyb3VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZWN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25lZFRvU2FtZUluU2VjdGlvbihncm91cHM6IElHcm91cFtdKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvbnMgPSB0aGlzLmdyb3VwU2VjdGlvbnMoZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzaWduZWQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHNlY3Rpb24gaW4gc2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgYXNzaWduZWRbc2VjdGlvbl0gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGdyb3VwIG9mIHNlY3Rpb25zW3NlY3Rpb25dKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGdyb3VwLml0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25lZFtzZWN0aW9uXVtKU09OLnN0cmluZ2lmeShpdGVtKV0pIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbmVkW3NlY3Rpb25dW0pTT04uc3RyaW5naWZ5KGl0ZW0pXS5wdXNoKGdyb3VwLl9pZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2lnbmVkO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBJVGltZXRhYmxlIH0gZnJvbSBcIi4vbW9kZWxzL3RpbWV0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVGltZXRhYmxlIH0gZnJvbSBcIi4vdXRpbHMvdGltZXRhYmxlLmNsYXNzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgVGltZXRhYmxlLFxyXG4gICAgSVRpbWV0YWJsZVxyXG59XHJcblxyXG4vLyBpbXBvcnQgeyBkYXlzLCBwZXJpb2RzLCBicmVha1BlcmlvZHMsIGdyb3VwcyB9IGZyb20gXCIuLy4uL2RhdGEvdGltZXRhYmxlLm11bHRpLmpzb25cIjtcclxuLy8gaW1wb3J0ICogYXMgR3JvdXBzIGZyb20gJy4vLi4vZGF0YS9ncm91cHMuanNvbic7XHJcbi8vIGltcG9ydCB7IElHcm91cCB9IGZyb20gXCIuL21vZGVscy9ncm91cC5pbnRlcmZhY2VcIjtcclxuXHJcbi8vIGZ1bmN0aW9uIHVzZWQodGltZVRhYmxlOiBUaW1ldGFibGUpIHsgICAgXHJcbi8vICAgICBjb25zdCBsZW4gPSBHcm91cHMucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuLy8gICAgICAgICByZXR1cm4gYWNjICsgcmVkdWNlci5pdGVtcy5sZW5ndGg7XHJcbi8vICAgICB9LCAxKTtcclxuXHJcbi8vICAgICBjb25zdCBtaXNzaW5nID0gdGltZVRhYmxlLmdldE1pc3NpbmdJdGVtcyhHcm91cHMpO1xyXG4vLyAgICAgY29uc3QgdXNlZCA9IGxlbiAtIG1pc3NpbmcucmVkdWNlKChhY2MsIHJlZHVjZXIpID0+IHtcclxuLy8gICAgICAgICByZXR1cm4gYWNjICsgcmVkdWNlci5taXNzaW5nLmxlbmd0aDtcclxuLy8gICAgIH0sIDEpXHJcblxyXG4vLyAgICAgcmV0dXJuICh1c2VkIC8gbGVuKSAqIDEwMCArICclJztcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgdCA9IG5ldyBUaW1ldGFibGUoZGF5cywgcGVyaW9kcywgYnJlYWtQZXJpb2RzLCBncm91cHMsICdzaW5nbGUnKTtcclxuLy8gLy8gY29uc3QgYWFhZ3JvdXBzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShHcm91cHMpKVxyXG4vLyAvLyBjb25zdCB0Z3JvdXAgPSB0LmdldEdyb3VwKCc2MDhlNzMzMjc1Njg3OTRmOTQ0OGUyNjMnKVxyXG5cclxuLy8gLy8gY29uc3QgY2dyb3VwOiBJR3JvdXAgPSBHcm91cHMuZmluZChnID0+IGcuX2lkID09ICc2MDhlNzMzMjc1Njg3OTRmOTQ0OGUyNjMnKTtcclxuLy8gLy8gY29uc3QgaXRlbXMgPSBjZ3JvdXAuaXRlbXMubWFwKHQgPT4gdC5faWQpO1xyXG4vLyAvLyBjb25zdCByID0gdC5nZXRHcm91cENvbmZsaWN0KCc2MDhlNzMzMjc1Njg3OTRmOTQ0OGUyNjMnLCBHcm91cHMpXHJcblxyXG5cclxuLy8gY29uc3QgdHUgPSB1c2VkKHQpO1xyXG5cclxuLy8gY29uc29sZS5sb2codHUsIHQuZ2V0SXNzdWVzKEdyb3VwcyksIHQuZ3JvdXBzKTtcclxuLy8gY29uc3QgYSA9IHQuYXV0b21hdGVNdWx0aXBsZShHcm91cHMpO1xyXG5cclxuLy8gY29uc3QgYXUgPSB1c2VkKGEpO1xyXG5cclxuLy8gY29uc29sZS5sb2coYXUsIGEuZ2V0SXNzdWVzKEdyb3VwcyksIGEuZ3JvdXBzKTtcclxuXHJcbi8vICh3aW5kb3cgYXMgYW55KS5ncm91cHMgPSBHcm91cHM7XHJcbi8vICh3aW5kb3cgYXMgYW55KS50aW1ldGFibGUgPSB0O1xyXG5cclxuXHJcblxyXG4vLyBncm91cCA2MDhlNzMzMjc1Njg3OTRmOTQ0OGUyNjNcclxuXHJcbi8vIGl0ZW0gNjA4ZTczMzM3NTY4Nzk0Zjk0NDhlMjdmXHJcblxyXG4vLyBhc3NpZ25lZSBkMzFiNzY5OS1iMDA5LTQ5Y2MtYTRhYS1mZmNlZmNjOWNkNjQiXSwic291cmNlUm9vdCI6IiJ9