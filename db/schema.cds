namespace project;

entity PROJECT {
  key proj_id       : String(10) @title : 'ID';
  proj_name         : String(100) @title : 'Name';
  start_date        : Date @title : 'Start Date';
  end_date          : Date @title : 'End Date';
  status            : String(10) @title : 'Status';

  members           : Composition of many PROJECT_MEMBERS on members.project = $self;
  tasks             : Composition of many TASK on tasks.project = $self;
  budgets           : Composition of many PROJECT_BUDGET on budgets.project = $self;
}

entity PROJECT_MEMBERS {
  key proj_mem_id   : String(10);
  mem_name          : String(100);
  mem_role          : String(20);
  project           : Association to one PROJECT;
}

entity TASK {
  key task_id       : String(10);
  task_title        : String(50);
  task_desc         : String(100);
  task_assignedTo   : String(100);
  task_status       : String(20); 
  project           : Association to one PROJECT;
}

entity PROJECT_BUDGET {
  key budget_id     : String(10);
  budget_category   : String(50);
  total_budget      : Decimal(10,2);
  project           : Association to one PROJECT;
}
