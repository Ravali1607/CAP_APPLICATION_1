using projectService as service from '../../srv/service';

annotate service.PROJECT with @(UI.SelectionFields: [
    members.proj_mem_id,
    tasks.task_id,
    budgets.budget_id,
], );
