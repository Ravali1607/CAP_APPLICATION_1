using project as db from '../db/schema';

service projectService {
    entity PROJECT as projection on db.PROJECT;
    entity PROJECT_MEMBERS as projection on db.PROJECT_MEMBERS;
    entity TASK as projection on db.TASK;
    entity PROJECT_BUDGET as projection on db.PROJECT_BUDGET;
}

// annotate projectService.PROJECT with @(UI: {
//   LineItem             : [
//     {
//       $Type: 'UI.DataField',
//       Value: proj_id
//     },
//     {
//       $Type: 'UI.DataField',
//       Value: proj_name
//     },
//     {
//       $Type: 'UI.DataField',
//       Value: start_date
//     },
//     {
//       $Type: 'UI.DataField',
//       Value: end_date
//     },
//     {
//       $Type: 'UI.DataField',
//       Value: status
//     },
//   ],
// }) {
//   proj_id        @title: 'ID';
//   proj_name     @title: 'Name';
//   start_date    @title: 'Start Date';
//   end_date      @title : 'End Date';
//   status        @title : 'Status'
// }

