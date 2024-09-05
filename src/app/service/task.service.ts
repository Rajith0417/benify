import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../kanban/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  addTask(taskDescription: string) {
    const tasks = this.tasksSubject.getValue();
    const newTask: Task = {
      id: tasks.length + 1,
      description: taskDescription,
      status: 'To Do', // Explicitly set to a valid status
    };
    this.tasksSubject.next([...tasks, newTask]);
  }

  removeTask(id: number) {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.filter((singleTask) => singleTask.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  updateTaskStatus(task: Task, status: 'To Do' | 'Implementing' | 'Done') {
    const tasks = this.tasksSubject.getValue();
    const updatedTasks = tasks.map((singleTask) =>
      singleTask.id === task.id ? { ...singleTask, status } : singleTask
    );
    this.tasksSubject.next(updatedTasks);
  }

}
