import { expect } from "expect";
import { Timetable } from "../../src/utils/timetable";
import { periodListStub } from "../stubs/periodList.stub";
import { scheduleStub } from "../stubs/schedule.stub";
import { dataStub } from "../stubs/data.stub";


describe('Create Timetable Object', () => {
    let timetable: Timetable;

    it('should create', () => {
        timetable = new Timetable(dataStub, periodListStub, scheduleStub);
        expect(timetable).toBeDefined();
    });
});