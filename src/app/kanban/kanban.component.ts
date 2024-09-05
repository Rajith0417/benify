import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from './task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  statuses = ['To Do', 'Implementing', 'Done'];
  tasks: Task[] = [];

  constructor(private cdr: ChangeDetectorRef, private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.cdr.detectChanges();
    });
  }

  addTask(taskDescription: string) {
    this.taskService.addTask(taskDescription);
  }

  getTasks(status: string) {
    return this.tasks.filter((task) => task.status === status);
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }

  checkStateManagement(){
    this.router.navigate(['/state-management-check']);
  };

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
