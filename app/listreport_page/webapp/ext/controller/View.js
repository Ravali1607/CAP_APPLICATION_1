sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';
    var that;
    return {
        onInit(){
            that=this;
        },
        buttonFunction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            if(!this.createDialog){
                this.createDialog = sap.ui.xmlfragment("listreportpage.ext.fragment.create");
            }
            this.createDialog.open();
        },

        onRadioSelect: function(oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedButton().getId();
            console.log("Selected Tab Key: ", sSelectedKey);
        },

        onDialogProceed: function(oEvent){
            var oRadioGroup = sap.ui.getCore().byId("tabSelector");
            var iSelectedIndex = oRadioGroup.getSelectedIndex();
        
            if (iSelectedIndex === -1) {
                sap.m.MessageToast.show("Please select a tab before proceeding.");
                return;
            }
        
            var oSelectedButton = oRadioGroup.getButtons()[iSelectedIndex];
            var sSelectedText = oSelectedButton.getText();
            switch (sSelectedText) {
                case "Project":
                    sap.m.MessageToast.show("You selected Tab 1");
                    break;
                case "Project Members":
                    sap.m.MessageToast.show("You selected Tab 2");
                    break;
                case "Task":
                    sap.m.MessageToast.show("You selected Tab 3");
                    break;
                case "Project Budget":
                    sap.m.MessageToast.show("You selected Tab 4");
                    break;
            }
            var oDialog = sap.ui.getCore().byId("createDialog");
            if (oDialog) {
                oDialog.close();
            }
            // that.createDialog.close();
        },
    
        onDialogCancel: function() {
            var oDialog = sap.ui.getCore().byId("createDialog");
            if (oDialog) {
                oDialog.close();
            }
            // that.createDialog.close();
        }
    };
});

