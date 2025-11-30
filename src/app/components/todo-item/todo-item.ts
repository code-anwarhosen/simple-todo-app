import { Component, Input, Output } from '@angular/core';
import { TodoModel } from '../../models/todo.model';
import { NgClass } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [NgClass],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo: TodoModel = { id: 0, title: '', completed: false };

  @Output() toggleTask = new EventEmitter<TodoModel>();
  @Output() deleteTask = new EventEmitter<number>();

  onToggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.toggleTask.emit(this.todo);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.todo.id);
  }
}
