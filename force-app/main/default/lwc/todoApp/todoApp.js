import { LightningElement, track } from "lwc";

export default class TodoApp extends LightningElement {
  @track
  todoList = [];

  newTodoItem = "";

  updateNewTodoItem(event) {
    this.newTodoItem = event.target.value;
  }

  addTodoItemToList(event) {
    if (this.newTodoItem.trim() === "") {
      this.newTodoItem = "";
      return;
    }
    this.todoList.push({
      id:
        this.todoList.length > 0
          ? this.todoList[this.todoList.length - 1].id + 1
          : 1,
      name: this.newTodoItem
    });
    this.newTodoItem = "";
  }

  deleteTodoItemFromList(event) {
    let idToDelete = event.target.name;
    let todoList = this.todoList;

    todoList.splice(
      todoList.findIndex((todoItem) => todoItem.id === idToDelete),
      1
    );
  }
}
