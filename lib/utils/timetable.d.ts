import { Item } from "../models/item.model";
import { PriorityEnum } from "../models/priority.enum";
import { Schedule } from "../models/schedule.model";
export declare class Timetable {
    readonly data: {
        [key: string]: PriorityEnum;
    };
    readonly periods: string[];
    readonly schedule: Schedule;
    /**
     * @remarks
     * A basic timetable generator
     *
     */
    private cells;
    private list;
    constructor(data: {
        [key: string]: PriorityEnum;
    }, periods: string[], schedule: Schedule);
    private pickItem;
    private getItemFrequency;
    private selectRandomItem;
    setList(): void;
    getList(): Item[];
    generate(pace?: number): Promise<string[][]>;
    setCell(period: number, schedule: number, item: Item): void;
    getCell(period: number, schedule: number): string;
}
