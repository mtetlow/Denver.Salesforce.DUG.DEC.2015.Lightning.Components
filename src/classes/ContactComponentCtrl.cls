public with sharing class ContactComponentCtrl {
	public ContactComponentCtrl() {
		
	}

  @AuraEnabled
  public static List<Contact> getContactsForOppId(Id oppId){
    Opportunity opp = [Select AccountId FROM Opportunity WHERE Id=:oppId];
    List<Contact> contacts = [SELECT Id, Name, Account.Name FROM Contact WHERE AccountId=:opp.AccountId ORDER BY CreatedDate];
    return contacts;
  }

  @AuraEnabled
  public static List<Contact> addContactToOppId(Id oppId, String firstName, String lastName){
    Opportunity opp = [Select AccountId FROM Opportunity WHERE Id=:oppId];
    //DEMO BELOW FOR ERROR HANDLING
    //Contact newContact = new Contact(FirstName=firstName, LastName=lastName, AccountId='1234');
    Contact newContact = new Contact(FirstName=firstName, LastName=lastName, AccountId=opp.AccountId);
    insert newContact;
    return ContactComponentCtrl.getContactsForOppId(oppId);
  }
}