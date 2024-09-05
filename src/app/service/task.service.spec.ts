import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../kanban/task';

describe('TaskService', () => {
  let service: TaskService;
  let tasksSubject: BehaviorSubject<Task[]>;

  const initialTasks: Task[] = [
    { id: 1, description: 'Task 1', status: 'To Do' },
    { id: 2, description: 'Task 2', status: 'Implementing' },
    { id: 3, description: 'Task 3', status: 'Done' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
    tasksSubject = new BehaviorSubject<Task[]>(initialTasks);
    (service as any).tasksSubject = tasksSubject;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task', () => {
    service.addTask('New Task');
    const tasks = tasksSubject.getValue();
    expect(tasks.length).toBe(4);
    expect(tasks[3].description).toBe('New Task');
    expect(tasks[3].status).toBe('To Do');
  });

  it('should remove a task by id', () => {
    service.removeTask(2);
    const tasks = tasksSubject.getValue();
    expect(tasks.length).toBe(2);
    expect(tasks.find(task => task.id === 2)).toBeUndefined();
  });

  it('should update the status of a task', () => {
    const taskToUpdate = initialTasks[0];
    service.updateTaskStatus(taskToUpdate, 'Done');
    const tasks = tasksSubject.getValue();
    expect(tasks[0].status).toBe('Done');
  });

});
