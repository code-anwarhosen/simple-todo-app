import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.css',
})
export class TodoInput {
  @Output() addTask = new EventEmitter<string>();

  newTask: string = '';

  onAddClick() {
    const task = this.newTask;
    if (task.length === 0)
      return;
    
    if (task.trim()) {
      this.addTask.emit(task.trim());
    }
    
    this.newTask = '';
  }
}
