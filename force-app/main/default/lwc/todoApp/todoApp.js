import { LightningElement } from "lwc";

export default class TodoApp extends LightningElement {
  todoList = [
    {
      id: 1,
      name: "Task 1"
    },
    {
      id: 2,
      name: "Task 2"
    },
    {
      id: 3,
      name: "Task 3"
    },
    {
      id: 4,
      name: "Task 4"
    }
  ];
}
