import { Component } from '@angular/core';
import { TodoItem } from '../../components/todo-item/todo-item';
import { TodoInput } from '../../components/todo-input/todo-input';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  imports: [ TodoItem, TodoInput ],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  todos: TodoModel[] = [
    { id: 1, title: 'Add filtering functionality', completed: false },
    { id: 2, title: 'Implement drag-and-drop', completed: true },
    { id: 3, title: 'Create user authentication', completed: false },
  ];

  onToggleTodo(todo: TodoModel) {
    this.todos = this.todos.map( (task) => {
      if (task.id === todo.id) 
        return { ...task, completed: todo.completed };
      return task;
    });
  }

  onDeleteTodo(id: number) {
    this.todos = this.todos.filter( (task) => task.id !== id );
  }

  onAddTodo(title: string) {
    const newTodo: TodoModel = {
      id: this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
      title: title,
      completed: false,
    };

    this.todos = [ ...this.todos, newTodo ];
    console.log(this.todos);
  }

  // Danger zone: clears all completed todos
  onClearCompleted() {
    const isClear = confirm("Are you sure you want to clear all completed todos?")
    if (!isClear) 
      return;

    this.todos = this.todos.filter( (todo: TodoModel) => {
      return !todo.completed
    });
  }

  // Danger zone: deletes all todos
  onDeleteAll() {
    const isDelete = confirm("Are you sure you want to delete all todos?")
    if (!isDelete) 
      return;
    
    this.todos = []
  }

  // Filters
  onGetActiveTodos() {
    this.todos = this.todos.filter( (todo: TodoModel) => !todo.completed)
  }

  onGetCompletedTodos() {
    this.todos = this.todos.filter( (todo: TodoModel) => todo.completed)
  }
}
