import { Component, inject, OnInit } from '@angular/core';
import { TodoItem } from '../../components/todo-item/todo-item';
import { TodoInput } from '../../components/todo-input/todo-input';
import { TodoModel } from '../../models/todo.model';
import { StorageService } from '../../services/storage-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [TodoItem, TodoInput, NgClass],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo implements OnInit {
  todos: TodoModel[] = [];
  api = inject(StorageService);
  activeTab: string = 'all';

  ngOnInit() {
    this.refreshAllTodos()
    console.log('Initial todo list:', this.todos);
  }

  refreshAllTodos() {
    this.todos = this.api.getAllTodoList();
    this.activeTab = 'all';
  }

  onAddTodo(title: string) {
    this.api.addTodo(title);
    this.refreshAllTodos();
  }

  onDeleteTodo(id: number) {
    this.api.deleteTodoById(id);
    this.refreshAllTodos();
  }

  onToggleTodo(todo: TodoModel) {
    this.api.toggleTodoCompletion(todo);
  }

  // Danger zone: clears all completed todos
  onClearCompleted() {
    const isClear = confirm("Are you sure you want to clear all completed todos?")
    if (!isClear) 
      return;

    this.api.clearCompletedTodos();
    this.refreshAllTodos();
  }

  // Danger zone: deletes all todos
  onDeleteAll() {
    const isDelete = confirm("Are you sure you want to delete all todos?")
    if (!isDelete) 
      return;
    
    this.api.deleteAllTodos();
    this.refreshAllTodos();
  }

  // Filters
  onGetActiveTodos() {
    this.activeTab = 'active';
    this.todos = this.api.getActiveTodos();
  }

  onGetCompletedTodos() {
    this.activeTab = 'completed';
    this.todos = this.api.getCompletedTodos();
  }
}
