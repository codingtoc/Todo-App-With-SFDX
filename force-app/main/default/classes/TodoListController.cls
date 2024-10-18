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

  @AuraEnabled
  public static Task insertTask(String subject) {
    try {
      Task task = new Task(
        Subject = subject,
        OwnerId = UserInfo.getUserId(),
        Status = 'Not Started',
        Priority = 'Normal'
      );
      insert as user task;
      return task;
    } catch (Exception e) {
      System.debug(e.getMessage());
    }
    return null;
  }
}
