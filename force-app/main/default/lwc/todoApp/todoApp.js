import { LightningElement, track, wire } from "lwc";
import getTasks from "@salesforce/apex/TodoListController.getTasks";
import { refreshApex } from "@salesforce/apex";
import insertTask from "@salesforce/apex/TodoListController.insertTask";
import deleteTask from "@salesforce/apex/TodoListController.deleteTask";

export default class TodoApp extends LightningElement {
  @track
  todoList = [];

  todoListResponse;

  newTodoItem = "";

  updateNewTodoItem(event) {
    this.newTodoItem = event.target.value;
  }

  addTodoItemToList(event) {
    if (this.newTodoItem.trim() === "") {
      this.newTodoItem = "";
      return;
    }
    insertTask({ subject: this.newTodoItem })
      .then((result) => {
        this.todoList.push({
          id:
            this.todoList.length > 0
              ? this.todoList[this.todoList.length - 1].id + 1
              : 1,
          name: this.newTodoItem,
          recordId: result.Id
        });
        this.newTodoItem = "";
      })
      .catch((error) => console.log(error));
  }

  deleteTodoItemFromList(event) {
    let idToDelete = event.target.name;
    let todoList = this.todoList;
    let todoItemIndex = todoList.findIndex(
      (todoItem) => todoItem.id === idToDelete
    );
    let recordIdToDelete = todoList[todoItemIndex].recordId;
    deleteTask({ recordId: recordIdToDelete })
      .then((result) => {
        if (result) {
          todoList.splice(todoItemIndex, 1);
        } else {
          console.log("Unable to delete task");
        }
      })
      .catch((error) => console.log(error));
  }

  @wire(getTasks)
  getTodoList(response) {
    this.todoListResponse = response;
    let data = response.data;
    let error = response.error;
    if (data) {
      this.todoList = [];
      data.forEach((todoItem) => {
        this.todoList.push({
          id:
            this.todoList.length > 0
              ? this.todoList[this.todoList.length - 1].id + 1
              : 1,
          name: todoItem.Subject,
          recordId: todoItem.Id
        });
      });
    } else if (error) {
      console.log(error);
    }
  }

  refreshTodoList() {
    refreshApex(this.todoListResponse);
  }
}
