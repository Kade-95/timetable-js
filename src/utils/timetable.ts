import { Item } from "../models/item.model";
import { PriorityEnum } from "../models/priority.enum";
import { Schedule } from "../models/schedule.model";

export class Timetable {
    /**
     * @remarks
     * A basic timetable generator
     * 
     */

    private cells: string[][] = [];
    private list: Item[] = [];

    constructor(
        public readonly data: { [key: string]: PriorityEnum },
        public readonly periods: string[],
        public readonly schedule: Schedule
    ) { }

    private pickItem(pace: number) {
        return new Promise<Item>((resolve) => {
            const interval = setInterval(() => {
                const item = this.selectRandomItem();
                if (item.frequency > item.count) {
                    clearInterval(interval);
                    resolve(item);
                }
            }, pace);
        });
    }

    private getItemFrequency (name: string) {
        const cellCount = this.periods.length * Object.keys(this.schedule).length;
        let totalPriority = 0;

        for (const key in this.data) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                totalPriority += this.data[key];
            }
        }
    
        return cellCount / (totalPriority/this.data[name]);
    }

    private selectRandomItem() {
        const availableItems = this.list.filter(item => item.frequency > item.count);
        let index = Math.floor(Math.random() * availableItems.length);

        return availableItems[index];
    }

    setList() {
        /**
         * @remarks
         * Initialize the timetable items list
         * Set the frequency based on the priority of the item
         * Reset count to 0
         * 
         */

        this.list = Object.keys(this.data)
            .map(key => {
                const frequency = this.getItemFrequency(key);
                return { name: key, frequency, priority: this.data[key], count: 0 };
            });
    }

    getList() {
        /**
         * @remarks
         * Get the private list of the timetable
         * 
         */
        return this.list;
    }

    async generate (pace = 1) {
        /**
         * @remarks
         * Generate a random timetable based on the items priorities
         * 
         */

        this.setList();        
        const periodLength = this.periods.length;
        const frameLength = Object.keys(this.schedule).length;

        for (let period=0; period < periodLength; period++) {
            this.cells[period] = [];
            for (let schedule=0; schedule < frameLength; schedule++) {  
                const item = await this.pickItem(pace);
                this.setCell(period, schedule, item);
            }
        }
        
        return this.cells;
    }

    setCell(period: number, schedule: number, item: Item) {
        /**
         * @remarks
         * Update the content of a cell with a provided item
         * 
         */

        this.cells[period][schedule] = item.name;
        const itemIndex = this.list.findIndex(i => i.name === item.name);
        this.list[itemIndex] = { ...item, count: item.count + 1 };
    }

    getCell(period: number, schedule: number) {
        /**
         * @remarks
         * Get the current value of a cell
         * 
         */
        return this.cells[period][schedule];
    }
}