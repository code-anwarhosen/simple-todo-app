import { Injectable, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})

export class StorageService implements OnInit {
  localStorageKey: string = 'todos';

  todoList: TodoModel[] = [
    // { id: 1, title: 'Task 1', completed: false },
    // { id: 2, title: 'Task 2', completed: true },
    // { id: 3, title: 'Task 3', completed: false },
  ];
  
  ngOnInit() {
    this.todoList = this.getFromLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.todoList));
  }

  getFromLocalStorage(): TodoModel[] {
    const todosString = localStorage.getItem(this.localStorageKey);
    return todosString ? JSON.parse(todosString) : [];
  }

  // Simulate fetching todo list from an API or database
  getAllTodoList(): TodoModel[] {
    this.todoList = this.getFromLocalStorage();
    return this.todoList;
  }

  toggleTodoCompletion(todo: TodoModel) {
    this.todoList = this.todoList.map((task) => {
      if (task.id === todo.id) 
        return { ...task, completed: todo.completed };
      return task;
    });

    this.saveToLocalStorage();
  }

  deleteTodoById(id: number) {
    this.todoList = this.todoList.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  addTodo(title: string) {
    const id = this.todoList.length 
      ? Math.max(...this.todoList.map(task => task.id)) + 1 
      : 1;

    const newTodo: TodoModel = {
      id,
      title,
      completed: false,
    };

    this.todoList = [ ...this.todoList, newTodo ];
    this.saveToLocalStorage();
  }

  getActiveTodos(): TodoModel[] {
    return this.todoList.filter((task) => !task.completed);
  }

  getCompletedTodos(): TodoModel[] {
    return this.todoList.filter((task) => task.completed);
  }

  clearCompletedTodos() {
    this.todoList = this.todoList.filter((task) => !task.completed);
    this.saveToLocalStorage();
  }

  deleteAllTodos() {
    this.todoList = [];
    this.saveToLocalStorage();
  }
}
