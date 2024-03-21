export interface Time {
    hour: number;
    minute: number;
}
export declare type Schedule = {
    [key: string]: {
        start: Time;
        stop: Time;
    };
};
