using projectService as service from '../../srv/service';
annotate service.PROJECT with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : proj_id,
            },
            {
                $Type : 'UI.DataField',
                Value : proj_name,
            },
            {
                $Type : 'UI.DataField',
                Value : start_date,
            },
            {
                $Type : 'UI.DataField',
                Value : end_date,
            },
            {
                $Type : 'UI.DataField',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : proj_id,
        },
        {
            $Type : 'UI.DataField',
            Value : proj_name,
        },
        {
            $Type : 'UI.DataField',
            Value : start_date,
        },
        {
            $Type : 'UI.DataField',
            Value : end_date,
        },
        {
            $Type : 'UI.DataField',
            Value : status,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Project',
    },
);

annotate service.PROJECT_BUDGET with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : budget_id,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : budget_category,
            Label : 'Category',
        },
        {
            $Type : 'UI.DataField',
            Value : total_budget,
            Label : 'Budget',
        },
        {
            $Type : 'UI.DataField',
            Value : project_proj_id,
            Label : 'project_proj_id',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Project Budget',
    },
);

annotate service.TASK with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : task_id,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : task_title,
            Label : 'Title',
        },
        {
            $Type : 'UI.DataField',
            Value : task_desc,
            Label : 'Description',
        },
        {
            $Type : 'UI.DataField',
            Value : task_status,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : task_assignedTo,
            Label : 'Assigned To',
        },
        {
            $Type : 'UI.DataField',
            Value : project_proj_id,
            Label : 'project_proj_id',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Task',
    },
);

annotate service.PROJECT_MEMBERS with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : proj_mem_id,
            Label : 'ID',
        },
        {
            $Type : 'UI.DataField',
            Value : mem_name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : mem_role,
            Label : 'Role',
        },
        {
            $Type : 'UI.DataField',
            Value : project_proj_id,
            Label : 'project_proj_id',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Project Members',
    },
);

