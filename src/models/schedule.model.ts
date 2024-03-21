export interface Time {
    hour: number;
    minute: number;
}

export type Schedule = {
    [key: string]: { start: Time, stop: Time }
}