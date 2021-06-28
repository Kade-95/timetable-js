export interface IGroup {
    _id: string;
    section: string;
    items: {
        _id: string;
        assignee: string;
    }[];
}
