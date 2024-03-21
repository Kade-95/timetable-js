import { expect } from "expect";
import { Timetable } from "../../src/utils/timetable";
import { periodListStub } from "../stubs/periodList.stub";
import { scheduleStub } from "../stubs/schedule.stub";
import { dataStub } from "../stubs/data.stub";
import { PriorityEnum } from "../../src/models/priority.enum";


describe('Timetable List', () => {
    let timetable: Timetable;

    it('should initiate correct frequncies with 3 periods', () => {
        timetable = new Timetable(dataStub, periodListStub, scheduleStub);
        timetable.setList();
        const list = timetable.getList();
        
        expect(list).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'a', frequency: 3, priority: PriorityEnum.MEDIUM, count: 0 }),
            expect.objectContaining({ name: 'b', frequency: 1.5, priority: PriorityEnum.MININUM, count: 0 }),
            expect.objectContaining({ name: 'c', frequency: 4.5, priority: PriorityEnum.MAXIMUM, count: 0 })
        ]));
    });

    it('should initiate correct frequncies with 2 periods', () => {

        timetable = new Timetable(dataStub, ['Monday', 'Tuesday'], scheduleStub);
        timetable.setList();
        const list = timetable.getList();
        
        expect(list).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'a', frequency: 2, priority: PriorityEnum.MEDIUM, count: 0 }),
            expect.objectContaining({ name: 'b', frequency: 1, priority: PriorityEnum.MININUM, count: 0 }),
            expect.objectContaining({ name: 'c', frequency: 3, priority: PriorityEnum.MAXIMUM, count: 0 })
        ]));
    });
});