import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../kanban/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskId = new EventEmitter<number>();
  @Output() showTaskId = new EventEmitter<number>();

  constructor(
    private router: Router
  ) {}

  removeTask(id: number) {
    this.removeTaskId.emit(id);
  }

  openTask(id: number) {
    this.showTaskId.emit(id);
  }
}
