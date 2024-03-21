import { PriorityEnum } from "./priority.enum";
export interface Item {
    name: string;
    priority: PriorityEnum;
    frequency: number;
    count: number;
}
