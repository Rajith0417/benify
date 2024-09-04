import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../kanban/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskId = new EventEmitter<number>();

  removeTask(id: number) {
    this.removeTaskId.emit(id);
  }
}
