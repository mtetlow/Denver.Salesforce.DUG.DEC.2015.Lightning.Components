({
	quickAddKeyUp : function(component, event, helper) {
    //Docs light: https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/events_demo.htm
    //Have to know the structure of the normal dom event or somehow figure out that getParms() works and dig through that
    var keyCode = event.getParam('keyCode');

    if(keyCode === 13){
      var quickAddStr = component.get("v.quickAddStr");
      var nameArr = quickAddStr.split(' ');
      var validNameEntry = (nameArr.length === 2) ? true: false;
      if(!validNameEntry){
        component.set("v.incompleteNameEntry", true);
      }
      if(nameArr.length===2){
        var firstName = nameArr[0];
        var lastName = nameArr[1];
        var action = component.get("c.addContactToOppId");
        action.setParams({
            "oppId": component.get("v.recordId"),
            "firstName": firstName,
            "lastName": lastName
        });
            
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
              var appEvent = $A.get("e.c:externalContactChange");           
              appEvent.fire();
              component.set("v.quickAddStr",'');
            } else {
              component.set("v.error", JSON.stringify(response.getError(),null,2));
            }
        });
        $A.enqueueAction(action);
      }
    }

    //If we are showing the incomplete error message, see if we can clear it
    var incompleteNameEntry = component.get("v.incompleteNameEntry");
    if(incompleteNameEntry === true){
      var quickAddStr = component.get("v.quickAddStr");
      var nameArr = quickAddStr.split(' ');
      var validNameEntry = (nameArr.length === 2) ? true: false;
      //If the string is now valid, clear the error message
      if(validNameEntry){
        component.set("v.incompleteNameEntry", false);
      }
    }
	},
  hideErrorMessage : function(component, event, helper) {
    component.set("v.incompleteNameEntry", false);
  },
  beAJerk : function(component, event, helper) {
    helper.removeElementsWithClass('TASKRAY_LTNGTrProjectSnapshot');
    helper.removeElementsWithClass('TASKRAY_LTNGTrQuickKanbanBoard');
    helper.removeElementsWithClass('TASKRAY_LTNGTrProjectStatusBar');
    helper.removeElementsWithClass('TASKRAY_LTNGTrToDo');
  }
})