// import { days, periods, breakPeriods, groups } from "./../data/timetable.multi.json";
// import { Timetable } from "./utils/timetable.class";
// import * as Groups from './../data/groups.json';
// import { IGroup } from "./models/group.interface";
// import { ITimetable } from "./models/timetable.interface";


// function used(timeTable: Timetable) {    
//     const len = Groups.reduce((acc, reducer) => {
//         return acc + reducer.items.length;
//     }, 1);

//     const missing = timeTable.getMissingItems(Groups);
//     const used = len - missing.reduce((acc, reducer) => {
//         return acc + reducer.missing.length;
//     }, 1)

//     return (used / len) * 100 + '%';
// }

// const t = new Timetable(days, periods, breakPeriods, groups, 'single');
// // const aaagroups = JSON.parse(JSON.stringify(Groups))
// // const tgroup = t.getGroup('608e73327568794f9448e263')

// // const cgroup: IGroup = Groups.find(g => g._id == '608e73327568794f9448e263');
// // const items = cgroup.items.map(t => t._id);
// // const r = t.getGroupConflict('608e73327568794f9448e263', Groups)


// const tu = used(t);

// console.log(tu, t.getIssues(Groups), t.groups);
// const a = t.automateMultiple(Groups);

// const au = used(a);

// console.log(au, a.getIssues(Groups), a.groups);

// (window as any).groups = Groups;
// (window as any).timetable = t;



// // group 608e73327568794f9448e263

// // item 608e73337568794f9448e27f

// // assignee d31b7699-b009-49cc-a4aa-ffcefcc9cd64