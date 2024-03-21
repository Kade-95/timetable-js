import { expect } from "expect";
import { Timetable } from "../../src/utils/timetable";
import { periodListStub } from "../stubs/periodList.stub";
import { scheduleStub } from "../stubs/schedule.stub";
import { dataStub } from "../stubs/data.stub";


describe('Set Frequencies', () => {
    let timetable: Timetable;

    it('should initiate correct frequncies with 3 periods', async () => {
        timetable = new Timetable(dataStub, periodListStub, scheduleStub);
        await timetable.generate();
        const list = timetable.getList();
        timetable.setCell(0, 0, list[0]);

        const cell = timetable.getCell(0, 0);
        expect(cell).toEqual(list[0].name);
    });
});