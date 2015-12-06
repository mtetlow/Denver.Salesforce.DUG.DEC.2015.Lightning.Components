({
	doInit : function(component, event, helper) {
    var recordId = helper.getRecordId(component);
    
    if(recordId==null){
      component.set("v.noRecordIdFound", true);
    } else{
      helper.fetchContacts(recordId, component);
    }
	},
  handleExternalChange : function(component, event, helper) {
    var recordId = helper.getRecordId(component);
    helper.fetchContacts(recordId, component);
  }
})