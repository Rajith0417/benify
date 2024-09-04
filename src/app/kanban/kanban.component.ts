import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from './task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  statuses = ['To Do', 'Implementing', 'Done'];
  tasks: Task[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  addTask(taskDescription: string) {
    console.log(taskDescription);

    this.tasks.push({
      id: this.tasks.length + 1,
      description: taskDescription,
      status: 'To Do',
    });
    this.cdr.detectChanges();
  }

  getTasks(status: string) {
    return this.tasks.filter((task) => task.status === status);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('Drop event:', event); // Check the event in the console

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task = event.container.data[event.currentIndex];
      console.log('Moved task:', task); // Log the moved task
      task.status = event.container.id as 'To Do' | 'Implementing' | 'Done';
    }

    // Log the current state of tasks
    console.log('Current tasks state:', JSON.parse(JSON.stringify(this.tasks)));

    this.cdr.detectChanges();
  }
}
