export interface TimetableGroup {
    _id: string;
    slots: (string | null)[][];
    assignees: (string | null)[][];
}