public with sharing class TodoListController {
  @AuraEnabled(cacheable=true)
  public static List<Task> getTasks() {
    return [
      SELECT Subject
      FROM Task
      WHERE OwnerId = :UserInfo.getUserId()
      WITH SECURITY_ENFORCED
    ];
  }
}
