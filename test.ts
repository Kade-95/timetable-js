import { singleTimetable } from "./data/timetable.single";
import { TimetableManager } from "./src/utils/timetable.manager";
import { Groups } from './data/groups.data';

const t = new TimetableManager({ ...singleTimetable });
// const aaagroups = JSON.parse(JSON.stringify(Groups))
// const tgroup = t.getGroup('608e73327568794f9448e263')

// const cgroup: IGroup = Groups.find(g => g._id == '608e73327568794f9448e263');
// const items = cgroup.items.map(t => t._id);
// const r = t.getGroupConflict('608e73327568794f9448e263', Groups)

// const a = t.automate_assigne(Groups);
// const au = a.used(Groups);

// console.log(au, a.hasIssues(Groups));
// console.log(au, a.hasIssues(Groups), a.data.groups);

(window as any).groups = Groups;
// (window as any).timetable = t;


const groupId =  '608e73327568794f9448e263'

const item = '608e73337568794f9448e27f'

const assignee = 'd31b7699-b009-49cc-a4aa-ffcefcc9cd64'

const n = t.itemAssignmentConflicts(item, assignee, groupId, Groups)
console.log(n);

console.log(t.data.groups);

console.log(Groups)
