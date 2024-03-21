import { expect } from "expect";
import { Timetable } from "../../src/utils/timetable";
import { periodListStub } from "../stubs/periodList.stub";
import { scheduleStub } from "../stubs/schedule.stub";
import { dataStub } from "../stubs/data.stub";
import { PriorityEnum } from "../../src/models/priority.enum";


describe('Generate Timetable', () => {
    let timetable: Timetable;

    it('should generate timetable', async () => {
        timetable = new Timetable(dataStub, periodListStub, scheduleStub);
        await timetable.generate();
        const list = timetable.getList();
        expect(list).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'a', frequency: 3, priority: PriorityEnum.MEDIUM }),
            expect.objectContaining({ name: 'b', frequency: 1.5, priority: PriorityEnum.MININUM }),
            expect.objectContaining({ name: 'c', frequency: 4.5, priority: PriorityEnum.MAXIMUM })
        ]));

        expect(list[2].count).toBeGreaterThan(list[1].count);
        expect(list[2].count >= list[0].count).toBeTruthy();
    });

    it('should generate timetable', async () => {
        const [_, ...period] = periodListStub;
        const timetable = new Timetable(dataStub, period, scheduleStub);
        await timetable.generate();
        const list = timetable.getList();
        expect(list).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'a', frequency: 2, priority: PriorityEnum.MEDIUM }),
            expect.objectContaining({ name: 'b', frequency: 1, priority: PriorityEnum.MININUM }),
            expect.objectContaining({ name: 'c', frequency: 3, priority: PriorityEnum.MAXIMUM })
        ]));

        expect(list[2].count).toBeGreaterThan(list[1].count);
        expect(list[2].count >= list[0].count).toBeTruthy();
    });
});