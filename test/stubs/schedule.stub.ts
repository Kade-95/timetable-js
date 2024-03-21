import { Schedule } from "../../src/models/schedule.model";

export const scheduleStub: Schedule = { 
    morning: {
        start: { hour: 1, minute: 1 }, 
        stop: { hour: 1, minute: 1 } 
    },
    afternoon: {
        start: { hour: 1, minute: 1 }, 
        stop: { hour: 1, minute: 1 } 
    },
    night: {
        start: { hour: 1, minute: 1 }, 
        stop: { hour: 1, minute: 1 } 
    }
}
