import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanComponent } from './kanban.component';
import { TaskService } from '../service/task.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';
import { Task } from './task';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../form/form.component';
import { TaskComponent } from '../task/task.component'; // Import TaskComponent
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('KanbanComponent', () => {
  let component: KanbanComponent;
  let fixture: ComponentFixture<KanbanComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let cdr: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['tasks$', 'addTask', 'removeTask']);
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    taskServiceSpy.tasks$ = of([
      { id: 1, description: 'Task 1', status: 'To Do' },
      { id: 2, description: 'Task 2', status: 'Done' }
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        KanbanComponent,
        FormComponent,
        TaskComponent // Declare TaskComponent here
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    cdr = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with tasks from the service', () => {
    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].description).toBe('Task 1');
  });

  it('should call taskService.addTask when addTask is called', () => {
    component.addTask('New Task');
    expect(taskService.addTask).toHaveBeenCalledWith('New Task');
  });

  it('should filter tasks by status using getTasks', () => {
    const toDoTasks = component.getTasks('To Do');
    expect(toDoTasks.length).toBe(1);
    expect(toDoTasks[0].description).toBe('Task 1');
  });

  it('should call taskService.removeTask when removeTask is called', () => {
    component.removeTask(1);
    expect(taskService.removeTask).toHaveBeenCalledWith(1);
  });

});
