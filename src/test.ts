import { days, periods, breakPeriods, groups } from "./../data/timetable.multi.json";
import { TimetableManager } from "./utils/timetable.manager";
import { Groups } from './../data/groups.data';

const t = new TimetableManager({ days, periods, breakPeriods, groups, type: 'single' });
// const aaagroups = JSON.parse(JSON.stringify(Groups))
// const tgroup = t.getGroup('608e73327568794f9448e263')

// const cgroup: IGroup = Groups.find(g => g._id == '608e73327568794f9448e263');
// const items = cgroup.items.map(t => t._id);
// const r = t.getGroupConflict('608e73327568794f9448e263', Groups)


const tu = t.used(Groups);

const a = t.automateMultiple(Groups);
const au = a.used(Groups);

console.log(tu, t.getIssues(Groups), t.data.groups);
console.log(au, a.getIssues(Groups), a.data.groups);

(window as any).groups = Groups;
(window as any).timetable = t;



// group 608e73327568794f9448e263

// item 608e73337568794f9448e27f

// assignee d31b7699-b009-49cc-a4aa-ffcefcc9cd64