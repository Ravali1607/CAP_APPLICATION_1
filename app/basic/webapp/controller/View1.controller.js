sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,Filter,FilterOperator) => {
    "use strict";
    var that;
    return Controller.extend("basic.controller.View1", {
        onInit() {
            that = this;
        },
        formatDate: function(date){
            if(date){
                var formattedDate = sap.ui.core.format.DateFormat.getDateInstance({pattern: "dd-MM-YYYY"});
                return formattedDate.format(new Date(date));
            }
        },
        onCreatePress: function(){
            if(!that.OnCreate){
                that.OnCreate = sap.ui.xmlfragment("basic.fragment.onCreate",that);
            }
            var oList = sap.ui.getCore().byId("tabList");
                if (oList) {
                    oList.removeSelections();
                }
            that.OnCreate.open();
        },
        onListSelectionChange: function(oEvent){
            var oSelected = oEvent.getParameter("listItem");
            var oTitle = oSelected.getTitle();
            if(oTitle){
                switch(oTitle){
                    case 'Project' : this.getOwnerComponent().getRouter().navTo("View2", { tab: "Project" });break;
                    case 'Project Members' : that.getOwnerComponent().getRouter().navTo("View2",{tab : "Project Members"});break;
                    case 'Task' : that.getOwnerComponent().getRouter().navTo("View2",{tab : "Task"});break;
                    case 'Project Budget' : that.getOwnerComponent().getRouter().navTo("View2",{tab : "Project Budget"});break;
                }
            }
            that.OnCreate.close();
        },
        onDialogCancel: function(){        
            that.OnCreate.close();
        },

        onTabSelect: function () {
            var sQuery = this._globalSearchQuery || "";
            if (sQuery) {
                var oSearchField = this.byId("searchField");
                this.onSearch({ getSource: function () { return oSearchField; } });
            }
        },
        
        onSearch: function (oEvent) {
            var sQuery = oEvent.getSource().getValue();
            this._globalSearchValue = sQuery;
            var oIconTabBar = this.byId("iconTabBar");
        
            var tabConfig = {
                "Project": ["proj_id", "proj_name", "status"],
                "Project Members": ["proj_mem_id", "mem_name", "mem_role", "project_proj_id"],
                "Task Info": ["task_id", "task_title", "task_desc", "project_proj_id"],
                "Task Status": ["task_assignedTo", "task_status"],
                "Project Budget": ["budget_id", "budget_category", "project_proj_id"]
            };
        
            oIconTabBar.getItems().forEach((oTab) => {
                var sKey = oTab.getKey();
        
                if (sKey === "Task") {
                    var oInnerTabBar = oTab.getContent()[0];
                    var aInnerTabs = oInnerTabBar.getItems();
                    for (var i = 0; i < aInnerTabs.length; i++) {
                        var oInnerTab = aInnerTabs[i];
                        var sInnerKey = oInnerTab.getKey();
                        var aFields = tabConfig[sInnerKey];
                        
                        var oTable = oInnerTab.getContent()[0];
                        if (oTable && oTable.getBinding("items")) {
                            this._applyFiltersToTable(oTable, aFields, sQuery);
                        }
                    }
                }else {
                    var aFields = tabConfig[sKey];
                    var oTable = oTab.getContent()[0];
                    if (oTable && oTable.getBinding("items")) {
                        this._applyFiltersToTable(oTable, aFields, sQuery);
                    }
                }
            });
        },
        
        _applyFiltersToTable: function (oTable, aFields, sQuery) {
            if (!aFields) return;
            if (sQuery) {
                var aFilters = aFields.map(field =>
                    new sap.ui.model.Filter({
                        path: field,
                        operator: sap.ui.model.FilterOperator.StartsWith,
                        value1: sQuery,
                        caseSensitive : false
                    })
                );
                var oOrFilter = new sap.ui.model.Filter({ filters: aFilters, and: false });
                oTable.getBinding("items").filter(oOrFilter);
            } else {
                oTable.getBinding("items").filter([]);
            }
        }
        
    });
});
