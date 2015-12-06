({
	getRecordId : function(component){
    return component.get("v.recordId");
  },
  fetchContacts : function(recordId, component) {
    var action = component.get("c.getContactsForOppId");
    action.setParams({
        "oppId": recordId
    });
        
    action.setCallback(this, function(response){
        var state = response.getState();
        console.log(response);
        console.log(state);
        if(state === "SUCCESS"){
          console.log('in success');
          console.log(response.getReturnValue());
            // success with records
            if(response.getReturnValue().length > 0) {
                component.set("v.contacts", response.getReturnValue());
            }
            // success with no records
            if(response.getReturnValue().length == 0) {
                component.set("v.noContactsFound", true);
            }
        } else {
          component.set("v.error", JSON.stringify(response.getError(),null,2));
          //Fun Error below
          // component.set("v.error", JSON.stringify(response.getError(),null,2);
        }
    });
    $A.enqueueAction(action);
	}
})