sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/DatePicker",
    "sap/m/MessageBox"
], function (Controller, MessageToast, Label, Input, DatePicker, MessageBox) {
    "use strict";

    return Controller.extend("basic.controller.View2", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("View2").attachPatternMatched(this.onRouteMatched, this);
            var oMenuButton = this.byId("menuButton");
            oMenuButton.attachBeforeMenuOpen(this.onMenuBeforeOpen, this);
        },

        onRouteMatched: function (oEvent) {
            var selectedTab = oEvent.getParameter("arguments");
            var sTab = selectedTab.tab;
            this.createForm(sTab);
        },

        onMenuBeforeOpen: function () {
            var sCurrent = this.currentView || "Project";
            var oMenu = this.byId("changeViewMenu");

            oMenu.getItems().forEach(function (oItem) {
                oItem.setIcon(oItem.getText() === sCurrent ? "sap-icon://accept" : "");
            });
        },

        createForm: function (sTab) {
            var oContainer = this.byId("formContainer");
            oContainer.getItems().forEach(function (oItem) {
                oItem.destroy();
            });
            oContainer.removeAllItems();

            var oForm = new sap.ui.layout.form.SimpleForm({
                editable: true,
                layout: "ResponsiveGridLayout",
                maxContainerCols: 2,
                content: []
            });

            var aFields = [];
            switch (sTab) {
                case "Project":
                    aFields = [
                        new Label({ text: "Project ID" }), new Input({ id: this.createId("projectId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Project Name" }), new Input({ id: this.createId("projectName"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Start Date" }), new DatePicker({ id: this.createId("startDate"), width: "50%", liveChange: this.onDateValidate.bind(this), change: this.onDateValidate.bind(this) }),
                        new Label({ text: "End Date" }), new DatePicker({ id: this.createId("endDate"), width: "50%", liveChange: this.onDateValidate.bind(this), change: this.onDateValidate.bind(this) }),
                        new Label({ text: "Status" }), new Input({ id: this.createId("status"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                    ];
                    break;

                case "Project Members":
                    aFields = [
                        new Label({ text: "Member ID" }), new Input({ id: this.createId("memberId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Name" }), new Input({ id: this.createId("memberName"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Role" }), new Input({ id: this.createId("memberRole"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Project ID" }), new Input({ id: this.createId("memberProjectId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                    ];
                    break;

                case "Task":
                    aFields = [
                        new Label({ text: "Task ID" }), new Input({ id: this.createId("taskId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Title" }), new Input({ id: this.createId("taskTitle"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Description" }), new Input({ id: this.createId("taskDesc"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Assigned To" }), new Input({ id: this.createId("taskAssigned"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Status" }), new Input({ id: this.createId("taskStatus"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Project ID" }), new Input({ id: this.createId("taskProjectId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                    ];
                    break;

                case "Project Budget":
                    aFields = [
                        new Label({ text: "Budget ID" }), new Input({ id: this.createId("budgetId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Category" }), new Input({ id: this.createId("budgetCategory"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Total Budget" }), new Input({ id: this.createId("totalBudget"), type: "Number", width: "50%", liveChange: this.onInputValidate.bind(this) }),
                        new Label({ text: "Project ID" }), new Input({ id: this.createId("budgetProjectId"), width: "50%", liveChange: this.onInputValidate.bind(this) }),
                    ];
                    break;
            }

            aFields.forEach(function (form) {
                oForm.addContent(form);
            });
            oContainer.addItem(oForm);
            this.byId("pageTitle").setText("Create " + sTab);
            this.currentView = sTab;
        },

        onChangeTabView: function () {
            if (!this.OnCreate) {
                this.OnCreate = sap.ui.xmlfragment(this.getView().getId(), "basic.fragment.onCreate", this);
            }

            var oList = sap.ui.getCore().byId(this.createId("tabList"));
            var aItems = oList.getItems();
            aItems.forEach(function (oItem) {
                if (oItem.getTitle() === this.currentView) {
                    oList.setSelectedItem(oItem);
                }
            }.bind(this));

            this.OnCreate.open();
        },

        onDialogCancel: function () {
            this.OnCreate.close();
        },

        onListSelectionChange: function (oEvent) {
            var sSelected = oEvent.getParameter("listItem").getTitle();
            this.OnCreate.close();
            this.createForm(sSelected);
        },

        onSave: function () {
            var oModel = this.getOwnerComponent().getModel();
            var sTab = this.currentView;
            var oData = {};
            var aFieldIds = [];
            switch (sTab) {
                case "Project":
                    aFieldIds = ["projectId", "projectName", "startDate", "endDate", "status"]
                    if (!this._validateForm(aFieldIds)) {
                        MessageBox.warning("Please correct the highlighted errors before saving.");
                        return;
                    }
                    oData = {
                        proj_id: this.byId("projectId").getValue(),
                        proj_name: this.byId("projectName").getValue(),
                        start_date: this.toUTCDate(this.byId("startDate").getDateValue()),
                        end_date: this.toUTCDate(this.byId("endDate").getDateValue()),
                        status: this.byId("status").getValue()
                    };
                    break;

                case "Project Members":
                    aFieldIds = ["memberId", "memberName", "memberRole", "memberProjectId"]
                    if (!this._validateForm(aFieldIds)) {
                        MessageBox.warning("Please correct the highlighted errors before saving.");
                        return;
                    }
                    oData = {
                        proj_mem_id: this.byId("memberId").getValue(),
                        mem_name: this.byId("memberName").getValue(),
                        mem_role: this.byId("memberRole").getValue(),
                        project_proj_id: this.byId("memberProjectId").getValue()
                    };
                    break;

                case "Task":
                    aFieldIds = ["taskId", "taskTitle", "taskDesc", "taskAssigned", "taskStatus", "taskProjectId"]
                    if (!this._validateForm(aFieldIds)) {
                        MessageBox.warning("Please correct the highlighted errors before saving.");
                        return;
                    }
                    oData = {
                        task_id: this.byId("taskId").getValue(),
                        task_title: this.byId("taskTitle").getValue(),
                        task_desc: this.byId("taskDesc").getValue(),
                        task_assignedTo: this.byId("taskAssigned").getValue(),
                        task_status: this.byId("taskStatus").getValue(),
                        project_proj_id: this.byId("taskProjectId").getValue()
                    };
                    break;

                case "Project Budget":
                    aFieldIds = ["budgetId", "budgetCategory", "totalBudget", "budgetProjectId"]
                    if (!this._validateForm(aFieldIds)) {
                        MessageBox.warning("Please correct the highlighted errors before saving.");
                        return;
                    }
                    oData = {
                        budget_id: this.byId("budgetId").getValue(),
                        budget_category: this.byId("budgetCategory").getValue(),
                        total_budget: parseFloat(this.byId("totalBudget").getValue()),
                        project_proj_id: this.byId("budgetProjectId").getValue()
                    };
                    break;
            }

            var sEntitySet = "";
            switch (sTab) {
                case "Project": sEntitySet = "/PROJECT"; break;
                case "Project Members": sEntitySet = "/PROJECT_MEMBERS"; break;
                case "Task": sEntitySet = "/TASK"; break;
                case "Project Budget": sEntitySet = "/PROJECT_BUDGET"; break;
            }

            oModel.create(sEntitySet, oData, {
                success: function () {
                    MessageToast.show(sTab + " created successfully!");
                },
                error: function () {
                    MessageToast.show("Failed to create " + sTab + ".");
                }
            });
            this.clearForm();
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("View1");
        },

        clearForm: function () {
            var sTab = this.currentView;

            var aFieldIds = [];
            switch (sTab) {
                case "Project":
                    aFieldIds = ["projectId", "projectName", "startDate", "endDate", "status"];
                    break;
                case "Project Members":
                    aFieldIds = ["memberId", "memberName", "memberRole", "memberProjectId"];
                    break;
                case "Task":
                    aFieldIds = ["taskId", "taskTitle", "taskDesc", "taskAssigned", "taskStatus", "taskProjectId"];
                    break;
                case "Project Budget":
                    aFieldIds = ["budgetId", "budgetCategory", "totalBudget", "budgetProjectId"];
                    break;
            }

            // Clear all values + reset ValueStates
            aFieldIds.forEach(function (sId) {
                var oControl = this.byId(sId);
                if (oControl) {
                    if (oControl.setValue) {
                        oControl.setValue("");
                    }
                    if (oControl.setValueState) {
                        oControl.setValueState("None");
                    }
                }
            }.bind(this));
        },

        onMenuItemSelected: function (oEvent) {
            var sSelected = oEvent.getParameter("item").getText();
            this.createForm(sSelected);
            this.currentView = sSelected;
        },

        toUTCDate: function (oDate) {
            return new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
        },

        _validateForm: function (aFieldIds) {
            var bValid = true;
            var oView = this.getView();

            aFieldIds.forEach(function (sId) {
                var oControl = oView.byId(sId);
                if (!oControl) return;

                var sValue = oControl.getValue ? oControl.getValue().trim() : "";
                var bError = false;

                // Check for empty value
                if (!sValue) {
                    bError = true;
                    oControl.setValueState("Error");
                    oControl.setValueStateText("This field is required");
                }

                // For DatePicker: also check getDateValue()
                if (oControl instanceof sap.m.DatePicker) {
                    var oDateVal = oControl.getDateValue();
                    if (!oDateVal) {
                        bError = true;
                        oControl.setValueStateText("Please select a valid date");
                    }
                }

                // Update value state based on current value
                if (bError) {
                    bValid = false;
                } else {
                    oControl.setValueState("None");
                }
            });

            return bValid;
        },

        onDateValidate: function (oEvent) {
            var oDatePicker = oEvent.getSource();
            var sValue = oDatePicker.getValue().trim();
            var oDateObj = oDatePicker.getDateValue(); // Picker-selected date

            // If value is empty
            if (!sValue && !oDateObj) {
                oDatePicker.setValueState("Error");
                oDatePicker.setValueStateText("This field is required");
                return;
            }

            // If date is selected via picker (always valid)
            if (oDateObj) {
                oDatePicker.setValueState("None");
                return;
            }

            // Validate typed value formats
            var oDateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd-MM-yyyy" });
            var oDateFormat2 = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MMMM dd, yyyy" });

            var oParsed1 = oDateFormat1.parse(sValue);
            var oParsed2 = oDateFormat2.parse(sValue);

            if (!oParsed1 && !oParsed2) {
                oDatePicker.setValueState("Error");
                oDatePicker.setValueStateText("Please enter date as dd-MM-yyyy or Month dd, yyyy");
            } else {
                oDatePicker.setValueState("None");
            }
        },

        onInputValidate: function (oEvent) {
            var oInput = oEvent.getSource();
            var sValue = oInput.getValue().trim();

            if (!sValue) {
                oInput.setValueState("Error");
                oInput.setValueStateText("This field is required");
            } else {
                oInput.setValueState("None");
            }
        }

    });
});





//     _fieldConfig: {
//         "Project": [
//             { id: "projectId", label: "Project ID", type: "Input" },
//             { id: "projectName", label: "Project Name", type: "Input" },
//             { id: "startDate", label: "Start Date", type: "DatePicker" },
//             { id: "endDate", label: "End Date", type: "DatePicker" },
//             { id: "status", label: "Status", type: "Input" }
//         ],
//         "Project Members": [
//             { id: "memberId", label: "Member ID", type: "Input" },
//             { id: "memberName", label: "Name", type: "Input" },
//             { id: "memberRole", label: "Role", type: "Input" },
//             { id: "memberProjectId", label: "Project ID", type: "Input" }
//         ],
//         "Task": [
//             { id: "taskId", label: "Task ID", type: "Input" },
//             { id: "taskTitle", label: "Title", type: "Input" },
//             { id: "taskDesc", label: "Description", type: "Input" },
//             { id: "taskAssigned", label: "Assigned To", type: "Input" },
//             { id: "taskStatus", label: "Status", type: "Input" },
//             { id: "taskProjectId", label: "Project ID", type: "Input" }
//         ],
//         "Project Budget": [
//             { id: "budgetId", label: "Budget ID", type: "Input" },
//             { id: "budgetCategory", label: "Category", type: "Input" },
//             { id: "totalBudget", label: "Total Budget", type: "Input", inputType: "Number" },
//             { id: "budgetProjectId", label: "Project ID", type: "Input" }
//         ]
//     },

//     onRouteMatched: function (oEvent) {
//         this.createForm(oEvent.getParameter("arguments").tab);
//     },

//     onMenuBeforeOpen: function () {
//         var sCurrent = this.currentView || "Project";
//         this.byId("changeViewMenu").getItems().forEach(function (oItem) {
//             oItem.setIcon(oItem.getText() === sCurrent ? "sap-icon://accept" : "");
//         });
//     },

//     // --- Dynamic form builder ---
//     createForm: function (sTab) {
//         var oContainer = this.byId("formContainer");
//         oContainer.destroyItems();
//         var oForm = new SimpleForm({ editable: true, layout: "ResponsiveGridLayout", maxContainerCols: 2 });

//         this._fieldConfig[sTab].forEach(function (field) {
//             oForm.addContent(new Label({ text: field.label }));
//             if (field.type === "DatePicker") {
//                 oForm.addContent(new DatePicker({
//                     id: this.createId(field.id),
//                     width: "50%",
//                     change: this.onFieldValidate.bind(this),
//                     liveChange: this.onFieldValidate.bind(this)
//                 }));
//             } else {
//                 oForm.addContent(new Input({
//                     id: this.createId(field.id),
//                     width: "50%",
//                     type: field.inputType || "Text",
//                     liveChange: this.onFieldValidate.bind(this)
//                 }));
//             }
//         }.bind(this));

//         oContainer.addItem(oForm);
//         this.byId("pageTitle").setText("Create " + sTab);
//         this.currentView = sTab;
//     },

//     // --- Save handler ---
//     onSave: function () {
//         var aFieldIds = this._fieldConfig[this.currentView].map(f => f.id);
//         if (!this._validateForm(aFieldIds)) {
//             return MessageBox.warning("Please correct the highlighted errors before saving.");
//         }

//         var oData = {};
//         aFieldIds.forEach(function (sId) {
//             var oControl = this.byId(sId);
//             oData[sId.replace(/([A-Z])/g, '_$1').toLowerCase()] =
//                 oControl instanceof DatePicker ? this.toUTCDate(oControl.getDateValue()) : oControl.getValue();
//         }.bind(this));

//         var sEntitySet = "/" + this.currentView.replace(/\s/g, "_").toUpperCase();
//         this.getOwnerComponent().getModel().create(sEntitySet, oData, {
//             success: () => MessageToast.show(this.currentView + " created successfully!"),
//             error: () => MessageToast.show("Failed to create " + this.currentView + ".")
//         });

//         this.clearForm();
//     },

//     // --- Clear all fields & reset value states ---
//     clearForm: function () {
//         this._fieldConfig[this.currentView].forEach(function (field) {
//             var oControl = this.byId(field.id);
//             if (oControl?.setValue) oControl.setValue("");
//             if (oControl?.setValueState) oControl.setValueState("None");
//         }.bind(this));
//     },

//     // --- Generic validation for both Inputs & DatePickers ---
//     _validateForm: function (aFieldIds) {
//         var bValid = true;
//         aFieldIds.forEach(function (sId) {
//             var oControl = this.byId(sId);
//             var sValue = oControl.getValue().trim();
//             if (!sValue || (oControl instanceof DatePicker && !oControl.getDateValue())) {
//                 oControl.setValueState("Error").setValueStateText("This field is required");
//                 bValid = false;
//             } else {
//                 oControl.setValueState("None");
//             }
//         }.bind(this));
//         return bValid;
//     },

//     onFieldValidate: function (oEvent) {
//         var oControl = oEvent.getSource();
//         var sValue = oControl.getValue().trim();
//         if (!sValue || (oControl instanceof DatePicker && !oControl.getDateValue())) {
//             oControl.setValueState("Error").setValueStateText("This field is required");
//         } else {
//             oControl.setValueState("None");
//         }
//     },

//     toUTCDate: function (oDate) {
//         return oDate ? new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate())) : null;
//     }

