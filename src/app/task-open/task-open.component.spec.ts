import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskOpenComponent } from './task-open.component';
import { ActivatedRoute, Router, convertToParamMap, ParamMap } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Task } from '../kanban/task';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('TaskOpenComponent', () => {
  let component: TaskOpenComponent;
  let fixture: ComponentFixture<TaskOpenComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRouteSnapshot: jasmine.SpyObj<any>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRouteSnapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', [], {
      paramMap: convertToParamMap({ id: '1' }),
      url: [],
      params: {},
    });

    mockActivatedRoute = {
      snapshot: mockActivatedRouteSnapshot
    };

    await TestBed.configureTestingModule({
      declarations: [ TaskOpenComponent ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [ MatIconModule,
        MatButtonModule,
        MatCardModule,
        NoopAnimationsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOpenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task on init', () => {
    const mockTask: Task = { id: 1, description: 'Test Description', status: 'To Do' };
    mockTaskService.getTaskById.and.returnValue(mockTask);

    fixture.detectChanges();

    console.log('Task after init:', component.task);
    console.log('getTaskById called with:', mockTaskService.getTaskById.calls.mostRecent()?.args[0]);


    expect(component.task).toEqual(mockTask);
    expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
  });

  it('should navigate back to kanban board when goBack is called', () => {
    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/kanban']);
  });
});
