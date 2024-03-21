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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Timetable = /** @class */ (function () {
    function Timetable(data, periods, schedule) {
        this.data = data;
        this.periods = periods;
        this.schedule = schedule;
        /**
         * @remarks
         * A basic timetable generator
         *
         */
        this.cells = [];
        this.list = [];
    }
    Timetable.prototype.pickItem = function (pace) {
        var _this = this;
        return new Promise(function (resolve) {
            var interval = setInterval(function () {
                var item = _this.selectRandomItem();
                if (item.frequency > item.count) {
                    clearInterval(interval);
                    resolve(item);
                }
            }, pace);
        });
    };
    Timetable.prototype.getItemFrequency = function (name) {
        var cellCount = this.periods.length * Object.keys(this.schedule).length;
        var totalPriority = 0;
        for (var key in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                totalPriority += this.data[key];
            }
        }
        return cellCount / (totalPriority / this.data[name]);
    };
    Timetable.prototype.selectRandomItem = function () {
        var availableItems = this.list.filter(function (item) { return item.frequency > item.count; });
        var index = Math.floor(Math.random() * availableItems.length);
        return availableItems[index];
    };
    Timetable.prototype.setList = function () {
        /**
         * @remarks
         * Initialize the timetable items list
         * Set the frequency based on the priority of the item
         * Reset count to 0
         *
         */
        var _this = this;
        this.list = Object.keys(this.data)
            .map(function (key) {
            var frequency = _this.getItemFrequency(key);
            return { name: key, frequency: frequency, priority: _this.data[key], count: 0 };
        });
    };
    Timetable.prototype.getList = function () {
        /**
         * @remarks
         * Get the private list of the timetable
         *
         */
        return this.list;
    };
    Timetable.prototype.generate = function (pace) {
        if (pace === void 0) { pace = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var periodLength, frameLength, period, schedule, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * @remarks
                         * Generate a random timetable based on the items priorities
                         *
                         */
                        this.setList();
                        periodLength = this.periods.length;
                        frameLength = Object.keys(this.schedule).length;
                        period = 0;
                        _a.label = 1;
                    case 1:
                        if (!(period < periodLength)) return [3 /*break*/, 6];
                        this.cells[period] = [];
                        schedule = 0;
                        _a.label = 2;
                    case 2:
                        if (!(schedule < frameLength)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.pickItem(pace)];
                    case 3:
                        item = _a.sent();
                        this.setCell(period, schedule, item);
                        _a.label = 4;
                    case 4:
                        schedule++;
                        return [3 /*break*/, 2];
                    case 5:
                        period++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, this.cells];
                }
            });
        });
    };
    Timetable.prototype.setCell = function (period, schedule, item) {
        /**
         * @remarks
         * Update the content of a cell with a provided item
         *
         */
        this.cells[period][schedule] = item.name;
        var itemIndex = this.list.findIndex(function (i) { return i.name === item.name; });
        this.list[itemIndex] = __assign(__assign({}, item), { count: item.count + 1 });
    };
    Timetable.prototype.getCell = function (period, schedule) {
        /**
         * @remarks
         * Get the current value of a cell
         *
         */
        return this.cells[period][schedule];
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



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVAsVUFBUSxNQUFjLEVBQUUsUUFBZ0I7UUFDcEM7Ozs7V0FJRztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQ3ZIRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBSTVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJsYWNrLWluay90aW1ldGFibGUvLi9zcmMvdXRpbHMvdGltZXRhYmxlLnRzIiwid2VicGFjazovL0BibGFjay1pbmsvdGltZXRhYmxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BibGFjay1pbmsvdGltZXRhYmxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AYmxhY2staW5rL3RpbWV0YWJsZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BibGFjay1pbmsvdGltZXRhYmxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGJsYWNrLWluay90aW1ldGFibGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvaXRlbS5tb2RlbFwiO1xuaW1wb3J0IHsgUHJpb3JpdHlFbnVtIH0gZnJvbSBcIi4uL21vZGVscy9wcmlvcml0eS5lbnVtXCI7XG5pbXBvcnQgeyBTY2hlZHVsZSB9IGZyb20gXCIuLi9tb2RlbHMvc2NoZWR1bGUubW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZSB7XG4gICAgLyoqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBBIGJhc2ljIHRpbWV0YWJsZSBnZW5lcmF0b3JcbiAgICAgKiBcbiAgICAgKi9cblxuICAgIHByaXZhdGUgY2VsbHM6IHN0cmluZ1tdW10gPSBbXTtcbiAgICBwcml2YXRlIGxpc3Q6IEl0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkYXRhOiB7IFtrZXk6IHN0cmluZ106IFByaW9yaXR5RW51bSB9LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcGVyaW9kczogc3RyaW5nW10sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzY2hlZHVsZTogU2NoZWR1bGVcbiAgICApIHsgfVxuXG4gICAgcHJpdmF0ZSBwaWNrSXRlbShwYWNlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEl0ZW0+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zZWxlY3RSYW5kb21JdGVtKCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZnJlcXVlbmN5ID4gaXRlbS5jb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBwYWNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJdGVtRnJlcXVlbmN5IChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2VsbENvdW50ID0gdGhpcy5wZXJpb2RzLmxlbmd0aCAqIE9iamVjdC5rZXlzKHRoaXMuc2NoZWR1bGUpLmxlbmd0aDtcbiAgICAgICAgbGV0IHRvdGFsUHJpb3JpdHkgPSAwO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFByaW9yaXR5ICs9IHRoaXMuZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBjZWxsQ291bnQgLyAodG90YWxQcmlvcml0eS90aGlzLmRhdGFbbmFtZV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0UmFuZG9tSXRlbSgpIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlSXRlbXMgPSB0aGlzLmxpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbS5mcmVxdWVuY3kgPiBpdGVtLmNvdW50KTtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlSXRlbXMubGVuZ3RoKTtcblxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlSXRlbXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHNldExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmVtYXJrc1xuICAgICAgICAgKiBJbml0aWFsaXplIHRoZSB0aW1ldGFibGUgaXRlbXMgbGlzdFxuICAgICAgICAgKiBTZXQgdGhlIGZyZXF1ZW5jeSBiYXNlZCBvbiB0aGUgcHJpb3JpdHkgb2YgdGhlIGl0ZW1cbiAgICAgICAgICogUmVzZXQgY291bnQgdG8gMFxuICAgICAgICAgKiBcbiAgICAgICAgICovXG5cbiAgICAgICAgdGhpcy5saXN0ID0gT2JqZWN0LmtleXModGhpcy5kYXRhKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyZXF1ZW5jeSA9IHRoaXMuZ2V0SXRlbUZyZXF1ZW5jeShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGtleSwgZnJlcXVlbmN5LCBwcmlvcml0eTogdGhpcy5kYXRhW2tleV0sIGNvdW50OiAwIH07XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHJlbWFya3NcbiAgICAgICAgICogR2V0IHRoZSBwcml2YXRlIGxpc3Qgb2YgdGhlIHRpbWV0YWJsZVxuICAgICAgICAgKiBcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Q7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGUgKHBhY2UgPSAxKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmVtYXJrc1xuICAgICAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSB0aW1ldGFibGUgYmFzZWQgb24gdGhlIGl0ZW1zIHByaW9yaXRpZXNcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMuc2V0TGlzdCgpOyAgICAgICAgXG4gICAgICAgIGNvbnN0IHBlcmlvZExlbmd0aCA9IHRoaXMucGVyaW9kcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGZyYW1lTGVuZ3RoID0gT2JqZWN0LmtleXModGhpcy5zY2hlZHVsZSkubGVuZ3RoO1xuXG4gICAgICAgIGZvciAobGV0IHBlcmlvZD0wOyBwZXJpb2QgPCBwZXJpb2RMZW5ndGg7IHBlcmlvZCsrKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxzW3BlcmlvZF0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHNjaGVkdWxlPTA7IHNjaGVkdWxlIDwgZnJhbWVMZW5ndGg7IHNjaGVkdWxlKyspIHsgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCB0aGlzLnBpY2tJdGVtKHBhY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2VsbChwZXJpb2QsIHNjaGVkdWxlLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHM7XG4gICAgfVxuXG4gICAgc2V0Q2VsbChwZXJpb2Q6IG51bWJlciwgc2NoZWR1bGU6IG51bWJlciwgaXRlbTogSXRlbSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHJlbWFya3NcbiAgICAgICAgICogVXBkYXRlIHRoZSBjb250ZW50IG9mIGEgY2VsbCB3aXRoIGEgcHJvdmlkZWQgaXRlbVxuICAgICAgICAgKiBcbiAgICAgICAgICovXG5cbiAgICAgICAgdGhpcy5jZWxsc1twZXJpb2RdW3NjaGVkdWxlXSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5saXN0LmZpbmRJbmRleChpID0+IGkubmFtZSA9PT0gaXRlbS5uYW1lKTtcbiAgICAgICAgdGhpcy5saXN0W2l0ZW1JbmRleF0gPSB7IC4uLml0ZW0sIGNvdW50OiBpdGVtLmNvdW50ICsgMSB9O1xuICAgIH1cblxuICAgIGdldENlbGwocGVyaW9kOiBudW1iZXIsIHNjaGVkdWxlOiBudW1iZXIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZW1hcmtzXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSBvZiBhIGNlbGxcbiAgICAgICAgICogXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1twZXJpb2RdW3NjaGVkdWxlXTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUaW1ldGFibGUgfSBmcm9tIFwiLi91dGlscy90aW1ldGFibGVcIjtcblxuZXhwb3J0IHtcbiAgICBUaW1ldGFibGVcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=