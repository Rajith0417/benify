import { Component } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  statuses = ['To Do', 'Implementing', 'Done'];
  tasks: Task[] = [];
  newTask: string = '';

  addTask() {
    this.tasks.push({
      id: this.tasks.length + 1,
      description: this.newTask,
      status: 'To Do',
    });
    this.newTask = '';
  }

  getTasks(status: string) {
    return this.tasks.filter(task => task.status === status);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log("dropped");
    console.log(event);


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = event.container.id as 'To Do' | 'Implementing' | 'Done';
    }
  }
}
